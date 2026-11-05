#!/usr/bin/env python3
import argparse
import json
import re
import subprocess
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import unquote, urlsplit
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent.parent
BASE = 'https://raw.githubusercontent.com/junchan0412/proxy-configs/main/'
CDN = 'https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/'
REGIONS = ['香港', '台湾', '新加坡', '日本', '美国', '韩国', '英国']


def sections(path):
    result = {}
    current = None
    for raw in path.read_text().splitlines():
        line = raw.strip()
        if line.startswith('#!include '):
            included = sections(path.parent / line.removeprefix('#!include '))
            for name, values in included.items():
                result.setdefault(name, []).extend(values)
        elif line.startswith('[') and line.endswith(']'):
            current = line[1:-1]
            result.setdefault(current, [])
        elif current and line and not line.startswith(('#', ';')):
            result[current].append(line)
    return result


def fields(line):
    return [part.strip().strip('"') for part in re.split(r',(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)', line)]


def mapping(lines):
    return dict(tuple(part.strip() for part in line.split('=', 1)) for line in lines)


def groups(lines):
    result = {}
    for line in lines:
        name, value = line.split('=', 1)
        parts = fields(value)
        members, attrs = [], {}
        for part in parts[1:]:
            if '=' in part:
                key, value = part.split('=', 1)
                attrs[key] = value.strip('"')
            else:
                members.append(part)
        result[name.strip()] = (parts[0], members, attrs)
    return result


def profile(data, order):
    return '\n\n'.join('[' + name + ']\n' + '\n'.join(data.get(name, [])) for name in order) + '\n'


def write(path, text):
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(text)


def yaml_text(data):
    return subprocess.run(['ruby', '-rjson', '-ryaml', '-e', 'puts JSON.parse(STDIN.read).to_yaml'],
                          input=json.dumps(data, ensure_ascii=False), text=True,
                          capture_output=True, check=True).stdout.removeprefix('---\n')


def import_surge(path):
    data = sections(path)
    data['General'] = [line for line in data['General']
                       if line.split('=', 1)[0].strip() not in
                       {'http-api', 'http-api-web-dashboard', 'http-api-tls', 'external-controller-access'}]
    data['Proxy'] = ['# 在此添加节点；也可为「机场合集」添加 policy-path=你的 Surge 订阅地址。',
                     '占位节点 = http, 127.0.0.1, 9']
    source_groups = groups(data['Proxy Group'])
    names = set(source_groups) | {'DIRECT', 'REJECT'}
    public_groups = []
    for name, (kind, members, attrs) in source_groups.items():
        members = [member for member in members if member in names]
        attrs.pop('policy-path', None)
        if name == '机场合集':
            attrs['include-all-proxies'] = '1'
        if kind == 'smart':
            members.insert(0, '占位节点')
        parts = [kind] + members + [key + '=' + ('"' + value + '"' if ',' in value else value)
                                   for key, value in attrs.items()]
        public_groups.append(name + ' = ' + ', '.join(parts))
    data['Proxy Group'] = public_groups
    mitm = mapping(data['MITM'])
    mitm.pop('ca-p12', None)
    mitm.pop('ca-passphrase', None)
    mitm['hostname'] = '-*.icloud.com, g.cn, www.g.cn, google.cn, www.google.cn, ditu.google.cn, maps.google.cn, www.taobao.com, taobao.com, jd.com, mi.com, www.suning.com, www.yhd.com, api.abema.io, github.com, raw.githubusercontent.com, gist.githubusercontent.com'
    data['MITM'] = [key + ' = ' + value for key, value in mitm.items()]
    data['Script'] = []
    order = ['General', 'Proxy', 'Proxy Group', 'Rule', 'Host', 'URL Rewrite', 'Header Rewrite', 'MITM', 'Script']
    write('surge/Surge.conf', profile(data, order))


def download(url):
    with urlopen(Request(url, headers={'User-Agent': 'proxy-configs'}), timeout=45) as response:
        return response.read().decode('utf-8-sig')


def active(text):
    return [re.split(r'\s+//', line.strip(), maxsplit=1)[0] for line in text.splitlines()
            if line.strip() and not line.lstrip().startswith(('#', ';', '//'))]


def source_sets(source, refresh):
    manifest_path = ROOT / 'rules/sources.json'
    previous = {entry['name']: entry for entry in json.loads(manifest_path.read_text())} if manifest_path.exists() else {}
    entries = []
    for line in source['Rule']:
        if line.startswith(('RULE-SET,', 'DOMAIN-SET,')):
            kind, url = fields(line)[:2]
            slug = unquote(urlsplit(url).path.rsplit('/', 1)[-1]).rsplit('.', 1)[0].lower().replace(' ', '-')
            upstream = previous[slug]['url'] if url.startswith(BASE) else url
            kind = previous[slug]['type'] if url.startswith(BASE) else kind
            entries.append((url, upstream, kind, slug))
    entries = list(dict.fromkeys(entries))
    urls = [upstream for _, upstream, _, slug in entries if refresh or not (ROOT / 'rules' / 'source' / (slug + '.list')).exists()]
    with ThreadPoolExecutor(max_workers=8) as pool:
        payloads = dict(zip(urls, pool.map(download, urls)))
    result = {}
    manifest = []
    for url, upstream, kind, slug in entries:
        path = 'rules/source/' + slug + '.list'
        if upstream in payloads:
            text = payloads[upstream]
            if kind == 'DOMAIN-SET':
                text = '\n'.join(('DOMAIN-SUFFIX,' + line[1:] if line.startswith('.') else 'DOMAIN,' + line)
                                 for line in active(text)) + '\n'
            write(path, '# Source: ' + upstream + '\n' + '\n'.join(active(text)) + '\n')
        result[url] = (slug, active((ROOT / path).read_text()))
        manifest.append({'name': slug, 'url': upstream, 'type': kind})
    write('rules/sources.json', json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    return result


def ordered_rules(source, sets):
    pre, regular = [], []
    for line in source['Rule']:
        parts = fields(line)
        target = pre if 'pre-matching' in parts else regular
        parts = [part for part in parts if part not in {'pre-matching', 'extended-matching', 'dns-failed'}
                 and not part.startswith('update-interval=')]
        if parts[0] in {'RULE-SET', 'DOMAIN-SET'}:
            parts[0] = 'RULE-SET'
            parts[1] = BASE + 'rules/source/' + sets[parts[1]][0] + '.list'
        target.append(','.join(parts))
    return pre + regular


def node_filter(name, spec):
    kind, members, attrs = spec[name]
    own = attrs.get('policy-regex-filter')
    includes = attrs.get('include-other-group', '').split(',')
    includes = [item.strip() for item in includes if item.strip()]
    if includes:
        children = [node_filter(child, spec) for child in includes]
        pattern = '(?:' + '|'.join(children) + ')'
        if own:
            pattern = '^(?=.*(?:' + own + '))(?=' + pattern + ').*'
    elif own:
        pattern = own
    else:
        pattern = '.*'
    return pattern


def expanded_rules(rules, sets):
    by_slug = {slug: lines for slug, lines in sets.values()}
    for line in rules:
        parts = fields(line)
        if parts[0] == 'RULE-SET':
            slug = parts[1].rsplit('/', 1)[1].removesuffix('.list')
            for entry in by_slug[slug]:
                fields_ = fields(entry)
                yield fields_[0], fields_[1], parts[2], 'no-resolve' in parts or 'no-resolve' in fields_
        elif parts[0] in {'OR', 'AND'}:
            yield parts[0], line, None, False
        elif parts[0] == 'FINAL':
            yield 'FINAL', None, parts[1], False
        else:
            yield parts[0], parts[1], parts[2], 'no-resolve' in parts


def mihomo(source, rules, sets):
    general = mapping(source['General'])
    spec = groups(source['Proxy Group'])
    node_groups = []
    for name, (kind, members, attrs) in spec.items():
        group = {'name': name, 'type': {'smart': 'url-test'}.get(kind, kind), 'proxies': members}
        if kind != 'select' or attrs.get('include-other-group') or name == '机场合集':
            group['include-all'] = True
            group['filter'] = node_filter(name, spec)
        if kind != 'select':
            group.update(url=general['proxy-test-url'], interval=int(attrs.get('interval', '300')),
                         lazy=True)
            if kind == 'smart':
                group['tolerance'] = int(attrs.get('tolerance', '50'))
        icon = attrs.get('icon-url', '')
        if icon.startswith('https://'):
            group['icon'] = icon
        group['hidden'] = attrs.get('hidden') == '1'
        node_groups.append(group)
    providers = {}
    supported = {'DOMAIN', 'DOMAIN-SUFFIX', 'DOMAIN-KEYWORD', 'DOMAIN-WILDCARD', 'IP-CIDR', 'IP-CIDR6', 'IP-ASN', 'PROCESS-NAME'}
    omitted = Counter()
    for slug, lines in sets.values():
        translated = []
        for line in lines:
            parts = fields(line)
            if parts[0] not in supported:
                omitted[parts[0]] += 1
                continue
            if parts[0] == 'DOMAIN-WILDCARD':
                parts[0] = 'DOMAIN-REGEX'
                parts[1] = '^' + re.escape(parts[1]).replace(r'\*', '.*').replace(r'\?', '.') + '$'
            translated.append(','.join(parts))
        write('rules/mihomo/' + slug + '.list', '\n'.join(translated) + '\n')
        providers[slug] = {'type': 'http', 'behavior': 'classical', 'format': 'text', 'interval': 43200,
                           'url': CDN + 'rules/mihomo/' + slug + '.list', 'path': './rules/' + slug + '.list',
                           'proxy': 'DIRECT'}
    translated = ['DOMAIN,fastly.jsdelivr.net,DIRECT']
    for line in rules:
        parts = fields(line)
        if parts[0] == 'RULE-SET':
            parts[1] = parts[1].rsplit('/', 1)[1].removesuffix('.list')
        elif parts[0] == 'FINAL':
            parts[0] = 'MATCH'
        translated.append(','.join(parts).replace('DEST-PORT,', 'DST-PORT,'))
    dns = {'enable': True, 'ipv6': False, 'enhanced-mode': 'fake-ip', 'fake-ip-range': '198.18.0.1/16',
           'default-nameserver': [item.strip() for item in general['dns-server'].split(',')],
           'nameserver': [item.strip() for item in general['encrypted-dns-server'].split(',')],
           'nameserver-policy': {host: 'system://' if value == 'server:system' else value.removeprefix('server:')
                                 for host, value in mapping(source['Host']).items()},
           'fake-ip-filter-mode': 'rule',
           'fake-ip-filter': ['DOMAIN-REGEX,^' + re.escape(item.strip()).replace(r'\*', '.*').replace(r'\?', '.') + '$,real-ip'
                              for item in general['always-real-ip'].split(',')] +
                             ['DOMAIN-SUFFIX,local,real-ip', 'DOMAIN-SUFFIX,lan,real-ip',
                              'DOMAIN,localhost,real-ip', 'MATCH,fake-ip']}
    override_groups = json.loads(json.dumps(node_groups, ensure_ascii=False))
    for group in override_groups:
        group['proxies'] = ['REJECT' if member == '占位节点' else member for member in group['proxies']]
    override = {'dns': dns, 'proxy-groups': override_groups, 'rule-providers': providers, 'rules': translated,
                'geox-url': {'mmdb': 'https://fastly.jsdelivr.net/gh/Loyalsoldier/geoip@release/Country.mmdb',
                             'asn': 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb'}}
    full = {'mixed-port': 7890, 'allow-lan': False, 'mode': 'rule', 'log-level': 'warning', 'ipv6': False,
            'profile': {'store-selected': True, 'store-fake-ip': True},
            'tun': {'enable': True, 'stack': 'mixed', 'auto-route': True, 'auto-detect-interface': True,
                    'dns-hijack': ['any:53', 'tcp://any:53']},
            'proxies': [{'name': '占位节点', 'type': 'http', 'server': '127.0.0.1', 'port': 9}], 'proxy-providers': {}}
    full.update(override)
    full['proxy-groups'] = node_groups
    write('mihomo/mihomo.yaml', yaml_text(full))
    write('mihomo/mihomo-override.yaml', yaml_text(override))
    write('mihomo/mihomo-override.js', 'function main(config) {\n  return Object.assign(config, ' +
          json.dumps(override, ensure_ascii=False, indent=2) + ');\n}\n')
    return dict(omitted)


def shadowrocket(source, rules):
    general = mapping(source['General'])
    spec = groups(source['Proxy Group'])
    data = {'General': ['ipv6 = false', 'dns-server = ' + general['encrypted-dns-server'],
                        'skip-proxy = localhost, *.local', 'hijack-dns = *:53',
                        'udp-policy-not-supported-behaviour = REJECT'],
            'Proxy': source['Proxy'], 'Proxy Group': [], 'Rule': rules, 'Host': source['Host'],
            'URL Rewrite': source['URL Rewrite'], 'Script': [],
            'MITM': ['enable = false', 'skip-server-cert-verify = false',
                                                           next(line for line in source['MITM'] if line.startswith('hostname ='))]}
    for name, (kind, members, attrs) in spec.items():
        kind = {'smart': 'url-test'}.get(kind, kind)
        parts = [kind] + members
        if kind != 'select' or attrs.get('include-other-group') or name == '机场合集':
            parts += ['policy-regex-filter=' + node_filter(name, spec)]
        if kind != 'select':
            parts += ['url=' + general['proxy-test-url'], 'interval=' + attrs.get('interval', '300'),
                      'timeout=' + general['test-timeout']]
            if kind == 'url-test':
                parts += ['tolerance=' + attrs.get('tolerance', '50')]
        data['Proxy Group'].append(name + ' = ' + ', '.join(parts))
    for index, line in enumerate(source['Header Rewrite']):
        _, pattern, _, _, _ = line.split()
        data['Script'].append('请求头-' + str(index) + ' = type=http-request,engine=jsc,script-path=' +
                              BASE + 'scripts/http-header-' + str(index) + '.js,pattern=' + pattern + ',timeout=10')
    write('shadowrocket/shadowrocket.conf', profile(data, data))


def quantumultx(source, rules, sets):
    general = mapping(source['General'])
    spec = groups(source['Proxy Group'])
    builtin = lambda name: {'DIRECT': 'direct', 'REJECT': 'reject'}.get(name, name)
    policies = []
    for name, (kind, members, attrs) in spec.items():
        dynamic = attrs.get('include-other-group') or attrs.get('policy-regex-filter') or name == '机场合集'
        policy_kind = 'available' if kind == 'fallback' else 'static' if kind == 'select' else 'url-latency-benchmark'
        parts = [name] + [builtin(member) for member in members]
        if dynamic:
            parts += ['resource-tag-regex=.*', 'server-tag-regex=' + node_filter(name, spec)]
        if policy_kind == 'url-latency-benchmark':
            parts += ['check-interval=' + attrs.get('interval', '300'), 'tolerance=' + attrs.get('tolerance', '50')]
        icon = attrs.get('icon-url', '')
        if icon.startswith('https://'):
            parts.append('img-url=' + icon)
        policies.append(policy_kind + ' = ' + ', '.join(parts))
    types = {'DOMAIN': 'host', 'DOMAIN-SUFFIX': 'host-suffix', 'DOMAIN-KEYWORD': 'host-keyword',
             'DOMAIN-WILDCARD': 'host-wildcard', 'IP-CIDR': 'ip-cidr', 'IP-CIDR6': 'ip6-cidr',
             'IP-ASN': 'ip-asn', 'GEOIP': 'geoip', 'USER-AGENT': 'user-agent'}
    result, omitted, final = [], Counter(), None
    for kind, value, policy, no_resolve in expanded_rules(rules, sets):
        if kind == 'FINAL':
            final = 'final, ' + builtin(policy)
        elif kind in types:
            result.append(', '.join([types[kind], value, builtin(policy)]))
        else:
            omitted[kind] += 1
    write('quantumultx/routing.list', '\n'.join(result) + '\n')
    rewrites = []
    for line in source['URL Rewrite']:
        parts = re.findall(r'"[^\"]*"|\S+', line)
        pattern, replacement, action = [part.strip('"') for part in parts]
        rewrites.append(pattern + ' url ' + ('reject' if action == 'reject' else action + ' ' + replacement))
    for index, line in enumerate(source['Header Rewrite']):
        _, pattern, _, name, value = line.split()
        script = ('const headers = $request.headers;\n'
                  'const key = Object.keys(headers).find(key => key.toLowerCase() === ' + json.dumps(name.lower()) + ') || ' + json.dumps(name) + ';\n'
                  'headers[key] = ' + json.dumps(value) + ';\n'
                  '$done({ headers });\n')
        path = 'scripts/http-header-' + str(index) + '.js'
        write(path, script)
        rewrites.append(pattern + ' url script-request-header ' + BASE + path)
    data = {'general': ['network_check_url = ' + general['internet-test-url'],
                        'server_check_url = ' + general['proxy-test-url'],
                        'server_check_timeout = ' + str(int(general['test-timeout']) * 1000)],
            'dns': ['no-ipv6', 'no-system', 'server = 223.5.5.5',
                    'doh-server = ' + general['encrypted-dns-server']] +
                   [('server = /' + host + '/system' if value == 'server:system' else
                     'doh-server = /' + host + '/' + value.removeprefix('server:'))
                    for host, value in mapping(source['Host']).items()],
            'server_local': ['http = 127.0.0.1:9, tag=占位节点'],
            'server_remote': [';https://example.com/subscription, tag=机场合集, enabled=true'],
            'policy': policies, 'filter_remote': [BASE + 'quantumultx/routing.list, tag=Surge规则, enabled=true'],
            'filter_local': [final], 'rewrite_remote': [], 'rewrite_local': rewrites, 'task_local': [],
            'mitm': [';请在客户端内创建并信任自己的证书。',
                     next(line for line in source['MITM'] if line.startswith('hostname ='))]}
    write('quantumultx/quantumultx.conf', profile(data, data))
    return dict(omitted)


def split_top(text):
    parts, start, depth = [], 0, 0
    for index, char in enumerate(text):
        if char == '(':
            depth += 1
        elif char == ')':
            depth -= 1
        elif char == ',' and depth == 0:
            parts.append(text[start:index].strip())
            start = index + 1
    return parts + [text[start:].strip()]


EGERN_TYPES = {'DOMAIN': 'domain', 'DOMAIN-SUFFIX': 'domain_suffix', 'DOMAIN-KEYWORD': 'domain_keyword',
               'DOMAIN-WILDCARD': 'domain_wildcard', 'IP-CIDR': 'ip_cidr', 'IP-CIDR6': 'ip_cidr6',
               'IP-ASN': 'asn', 'GEOIP': 'geoip', 'URL-REGEX': 'url_regex', 'USER-AGENT': 'user_agent',
               'DEST-PORT': 'dest_port', 'RULE-SET': 'rule_set'}


def egern_condition(text):
    if text.startswith('(') and text.endswith(')'):
        text = text[1:-1]
    kind, value = split_top(text)[:2]
    if kind in {'AND', 'OR'}:
        value = [egern_condition(part) for part in split_top(value[1:-1])]
        return {kind.lower(): {'match': value}}
    return {EGERN_TYPES[kind]: {'match': value}}


def egern(source, rules, sets):
    general = mapping(source['General'])
    spec = groups(source['Proxy Group'])
    policy_groups = []
    for name, (kind, members, attrs) in spec.items():
        entry = {'name': name, 'policies': members.copy(), 'hidden': attrs.get('hidden') == '1'}
        includes = [part.strip() for part in attrs.get('include-other-group', '').split(',') if part.strip()]
        if includes:
            entry['policies'] += includes
            entry['flatten'] = True
            entry['filter'] = '(?:^REJECT$|^占位节点$|' + node_filter(name, spec) + ')'
        elif name == '机场合集':
            entry['policies'].append('占位节点')
        if kind == 'fallback':
            entry['interval'] = int(attrs.get('interval', '600'))
        if kind == 'smart' and attrs.get('policy-priority'):
            entry['priorities'] = dict((item.rsplit(':', 1)[0], float(item.rsplit(':', 1)[1]))
                                       for item in attrs['policy-priority'].split(';'))
        entry['latency_test_url'] = general['proxy-test-url']
        icon = attrs.get('icon-url', '')
        if icon.startswith('https://'):
            entry['icon'] = icon
        elif icon.startswith('EMOJI::'):
            entry['icon'] = 'globe'
        policy_groups.append({kind: entry})
    omitted = Counter()
    for slug, entries in sets.values():
        native = {'no_resolve': True}
        for line in entries:
            parts = fields(line)
            if parts[0] not in EGERN_TYPES:
                omitted[parts[0]] += 1
                continue
            native.setdefault(EGERN_TYPES[parts[0]] + '_set', []).append(parts[1])
        write('rules/egern/' + slug + '.yaml', yaml_text(native))
    native_rules = []
    for line in rules:
        parts = split_top(line)
        if parts[0] in {'AND', 'OR'}:
            entry = egern_condition(','.join(parts[:2]))
            entry[parts[0].lower()]['policy'] = parts[2]
        elif parts[0] == 'FINAL':
            entry = {'default': {'policy': parts[1]}}
        else:
            kind, value, policy = parts[:3]
            if kind == 'RULE-SET':
                value = value.replace('rules/source/', 'rules/egern/').removesuffix('.list') + '.yaml'
            settings = {'match': value, 'policy': policy}
            if 'no-resolve' in parts and kind in {'IP-CIDR', 'IP-CIDR6', 'IP-ASN', 'GEOIP'}:
                settings['no_resolve'] = True
            entry = {EGERN_TYPES[kind]: settings}
        native_rules.append(entry)
    forward = []
    for host, value in mapping(source['Host']).items():
        forward.append({'domain_wildcard': {'match': host, 'value': value.removeprefix('server:')}})
    forward.append({'domain_wildcard': {'match': '*', 'value': '默认DNS'}})
    rewrites = []
    for line in source['URL Rewrite']:
        pattern, location, status = [part.strip('"') for part in re.findall(r'"[^\"]*"|\S+', line)]
        entry = {'match': pattern, 'location': 'http://reject/' if status == 'reject' else location}
        if status != 'reject':
            entry['status_code'] = int(status)
        rewrites.append(entry)
    headers = []
    for line in source['Header Rewrite']:
        _, pattern, action, name, value = line.split()
        headers.append({'replace': {'match': pattern, 'name': name, 'value': value, 'type': 'request'}})
    mitm = mapping(source['MITM'])
    hosts = [host.strip() for host in mitm['hostname'].split(',')]
    config = {'ipv6': False, 'allow_external_connections': False, 'hijack_dns': ['*'],
              'geoip_db_url': general['geoip-maxmind-url'],
              'proxy_latency_test_url': general['proxy-test-url'],
              'direct_latency_test_url': general['internet-test-url'],
              'real_ip_domains': [item.strip() for item in general['always-real-ip'].split(',')],
              'dns': {'bootstrap': [item.strip() for item in general['dns-server'].split(',')],
                      'upstreams': {'默认DNS': [item.strip() for item in general['encrypted-dns-server'].split(',')]},
                      'forward': forward},
              'proxies': [{'http': {'name': '占位节点', 'server': '127.0.0.1', 'port': 9}}],
              'policy_groups': policy_groups, 'rules': native_rules,
              'url_rewrites': rewrites, 'header_rewrites': headers,
              'mitm': {'hostnames': {'includes': [host for host in hosts if not host.startswith('-')],
                                     'excludes': [host[1:] for host in hosts if host.startswith('-')]}}}
    write('egern/egern.yaml', yaml_text(config))
    return dict(omitted)


def import_loon(path):
    data = sections(path)
    data['Proxy'] = ['占位节点 = http, 127.0.0.1, 9']
    data['Remote Proxy'] = ['# 机场合集 = https://example.com/subscription, udp=true, enabled=true']
    for index, line in enumerate(data['Proxy Group']):
        if '= url-test,' in line:
            data['Proxy Group'][index] = line.replace('= url-test,', '= url-test,占位节点,', 1)
    data['Mitm'] = [line for line in data['Mitm']
                    if line.split('=', 1)[0].strip() not in {'ca-p12', 'ca-passphrase'}]
    data['Plugin'] = [line for line in data['Plugin'] if line.startswith('https://')]
    data['General'] = [line for line in data['General']
                       if line.split('=', 1)[0].strip() not in {'wifi-access-http-port', 'wifi-access-socks5-port'}]
    write('loon/loon.lcf', '# 基础配置参考 iKeLee / luestr/ProxyResource（CC BY-NC-SA 4.0）。\n' + profile(data, data))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', type=Path)
    parser.add_argument('--loon-source', type=Path)
    parser.add_argument('--refresh-rules', action='store_true')
    args = parser.parse_args()
    if args.source:
        import_surge(args.source.resolve())
    if args.loon_source:
        import_loon(args.loon_source.resolve())
    source = sections(ROOT / 'surge/Surge.conf')
    sets = source_sets(source, args.refresh_rules)
    rules = ordered_rules(source, sets)
    omitted = {'Mihomo': mihomo(source, rules, sets), 'Quantumult X': quantumultx(source, rules, sets),
               'Egern': egern(source, rules, sets)}
    shadowrocket(source, rules)
    for index, line in enumerate(source['Rule']):
        parts = fields(line)
        if parts[0] in {'RULE-SET', 'DOMAIN-SET'}:
            parts[0] = 'RULE-SET'
            parts[1] = BASE + 'rules/source/' + sets[parts[1]][0] + '.list'
            source['Rule'][index] = ','.join(parts)
    write('surge/Surge.conf', profile(source, source))
    write('rules/unsupported.json', json.dumps(omitted, ensure_ascii=False, indent=2) + '\n')
    print('Surge, Mihomo, Shadowrocket, Quantumult X, Egern configurations ready')


if __name__ == '__main__':
    main()
