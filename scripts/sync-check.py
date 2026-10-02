#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""跨客户端同步断言：以 根配置/Surge源配置.conf 为基准，
检查各客户端公开配置（原生格式）的策略组成员、测试参数、规则覆盖与隐私脱敏。"""
import io, re, sys

SRC = '根配置/Surge源配置.conf'
errors = []

def fail(msg):
    errors.append(msg)

def read(p):
    return io.open(p, encoding='utf-8').read()

def section(text, name):
    m = re.search(r'^\[%s\]\s*\n(.*?)(?=^\[|\Z)' % re.escape(name), text, re.M | re.S)
    return m.group(1) if m else ''

# ---------- 源配置 ----------
src = read(SRC)
src_rule = section(src, 'Rule')
src_groups_txt = section(src, 'Proxy Group')
src_active = [l.strip() for l in src_rule.split('\n') if l.strip() and not l.strip().startswith('#')]

def src_members(name):
    m = re.search(r'^%s = (\w+), (.*?)(?:, [a-z0-9\-]+=|$)' % re.escape(name), src_groups_txt, re.M)
    if not m:
        return None
    raw = m.group(2)
    parts = [x.strip() for x in raw.split(',')]
    out = []
    for x in parts:
        if '=' in x or x.startswith('url=') or x in ('hidden',):
            break
        out.append(x)
    return [x for x in out if x != '机场合集']

BIZ = ['国际基础服务', 'AI', '国际社媒', 'Game', 'SpeedTest']
src_biz = {n: src_members(n) for n in BIZ}
for n, v in src_biz.items():
    if v is None:
        fail('source group missing: ' + n)
# 入口/兜底
src_proxy = src_members('PROXY')
src_final = src_members('FINAL')

# ---------- 工具：解析各客户端策略组成员 ----------
def mihomo_groups(path):
    groups = {}
    for line in read(path).split('\n'):
        m = re.match(r'^\s*- \{name: ([^,]+), .*proxies: \[([^\]]*)\]', line)
        if m:
            groups[m.group(1)] = [x.strip() for x in m.group(2).split(',')]
    return groups

def loon_groups(path):
    text = read(path)
    blk = section(text, 'Proxy Group')
    groups = {}
    for line in blk.split('\n'):
        if '=' not in line or line.startswith('#'):
            continue
        name, expr = line.split('=', 1)
        parts = [x.strip() for x in expr.split(',')]
        typ = parts[0]
        members = []
        for x in parts[1:]:
            if '=' in x:
                break
            members.append(x)
        groups[name.strip()] = members
    return groups

def qx_groups(path):
    text = read(path)
    groups = {}
    for m in re.finditer(r'^(?:static|available) = ([^,]+), (.*?)$', text, re.M):
        name = m.group(1).strip()
        rest = m.group(2)
        # 去掉参数（img-url / regex / force-policy ...）
        members = []
        for part in [x.strip() for x in rest.split(',')]:
            if '=' in part or part.startswith('resource-tag') or part.startswith('server-tag'):
                continue
            if part in ('img-url',):
                continue
            if part and '=' not in part and not part.startswith('http'):
                # img-url 内的逗号可能导致碎片，忽略 URL 片段
                if part.startswith('https') or part.endswith('.png'):
                    continue
                members.append(part)
        groups[name] = members
    return groups

def sr_groups(path):
    text = section(read(path), 'Proxy Group')
    groups = {}
    for line in text.split('\n'):
        if '=' not in line or line.startswith('#'):
            continue
        name, expr = line.split('=', 1)
        parts = [x.strip() for x in expr.split(',')]
        typ = parts[0]
        members = []
        for x in parts[1:]:
            if '=' in x or x.startswith('url'):
                break
            members.append(x)
        groups[name.strip()] = members
    return groups

def egern_groups(path):
    """返回 name -> policies 列表（仅 policy_groups 段）。"""
    groups = {}
    cur = None
    in_groups = False
    for line in read(path).split('\n'):
        if line.startswith('policy_groups:'):
            in_groups = True
            continue
        if in_groups and re.match(r'^(rules|mitm|dns|widgets|modules):', line):
            break
        if not in_groups:
            continue
        if re.match(r'^- (select|smart|auto_test|fallback|external):', line):
            cur = None
            continue
        m = re.match(r'^    name: (.+)$', line)
        if m:
            cur = m.group(1).strip()
            groups[cur] = []
            continue
        m = re.match(r'^    - (.+)$', line)
        if m and cur:
            groups[cur].append(m.group(1).strip())
    return groups

def norm(xs):
    return [x.upper() if x in ('direct', 'DIRECT', 'reject', 'REJECT') else x for x in xs]

def check_biz(label, actual, mapping=lambda x: x):
    for n in BIZ:
        want = src_biz[n]
        got = actual.get(mapping(n))
        if got is None:
            fail('%s: missing group %s' % (label, n))
            continue
        want_m = [mapping(x) for x in want]
        if norm(got) != norm(want_m):
            fail('%s: %s members %s != source %s' % (label, n, got, want_m))

def check_timing(label, text, pattern, what):
    if not re.search(pattern, text):
        fail('%s: missing %s (%s)' % (label, what, pattern))

# ---------- 1. Surge 公开配置 = 源配置脱敏 ----------
surge = read('surge/Surge.conf')
surge_rule = section(surge, 'Rule')
pub_active = [l.strip() for l in surge_rule.split('\n') if l.strip() and not l.strip().startswith('#')]
if len(src_active) != len(pub_active):
    fail('surge: rule count %d != source %d' % (len(pub_active), len(src_active)))
else:
    for a, b in zip(src_active, pub_active):
        aa = a.replace('RULE-SET,Rules/Pre-AI.txt,', 'RULE-SET,https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/rules/pre-ai-infra.list,')
        aa = aa.replace('RULE-SET,Rules/AI.txt,', 'RULE-SET,https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/rules/ai-major.list,')
        aa = aa.replace('RULE-SET,Rules/DIRECT.txt,', 'RULE-SET,https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/rules/direct-cn.list,')
        if aa != b:
            fail('surge rule drift: %r != %r' % (b, aa))
            break
sg = {}
for line in section(surge, 'Proxy Group').split('\n'):
    if '=' in line and not line.startswith('#'):
        name, expr = line.split('=', 1)
        parts = [x.strip() for x in expr.split(',')]
        members = []
        for x in parts[1:]:
            if '=' in x:
                break
            members.append(x)
        sg[name.strip()] = members
check_biz('surge', sg)
check_timing('surge', surge, r'interval=300, tolerance=50', 'interval=300/tolerance=50')

# ---------- 2. Egern 原生 YAML ----------
eg = read('egern/egern.yaml')
if re.search(r'^\[', eg, re.M) or 'RULE-SET,' in eg:
    fail('egern: not native YAML (Surge section/RULE-SET found)')
for key in ['policy_groups:', 'rules:', 'mitm:', 'dns:', 'real_ip_domains:']:
    if key not in eg:
        fail('egern: missing native key ' + key)
egg = egern_groups('egern/egern.yaml')
check_biz('egern', egg)
for n in ['PROXY', 'FINAL', 'Auto', 'Emby'] + ['香港','台湾','新加坡','日本','韩国','美国','英国']:
    if n not in egg:
        fail('egern: missing group ' + n)
# 源规则行 -> Egern 条目数：源 95 行中 2 行为端口逻辑（无原生等价），其余应有条目
rule_sets_needed = 0
for line in src_active:
    if line.startswith(('OR,', 'AND,')):
        continue
    rule_sets_needed += 1
eg_rules = len(re.findall(r'^- (rule_set|domain|domain_suffix|domain_keyword|geoip|ip_cidr|ip_asn|default):', eg, re.M))
if eg_rules < rule_sets_needed - 0:
    fail('egern: rule entries %d < expected %d' % (eg_rules, rule_sets_needed))
# 源 GEOIP 级联
for cc, pol in [('CN','DIRECT'),('SG','新加坡'),('TW','台湾'),('HK','香港'),('JP','日本'),('KR','韩国'),('US','美国')]:
    if not re.search(r'- geoip:\n    match: %s\n    policy: %s' % (cc, re.escape(pol)), eg):
        fail('egern: missing geoip %s->%s' % (cc, pol))

# ---------- 3. Mihomo ----------
mh = read('mihomo/mihomo.yaml')
mhg = mihomo_groups('mihomo/mihomo.yaml')
check_biz('mihomo', mhg)
if [x for x in mhg.get('PROXY', [])][:8] != src_proxy[:8]:
    fail('mihomo: PROXY order %s != source %s' % (mhg.get('PROXY'), src_proxy))
check_timing('mihomo', mh, r"url: 'http://cp.cloudflare.com/generate_204'", 'proxy test url')
if 'interval: 300' not in mh or 'tolerance: 50' not in mh:
    fail('mihomo: missing interval 300 / tolerance 50')

# ---------- 4. Loon ----------
lo = read('loon/loon.lcf')
lg = loon_groups('loon/loon.lcf')
lon_map = lambda x: '代理策略' if x == 'PROXY' else ('兜底策略' if x == 'FINAL' else x)
check_biz('loon', lg, lon_map)
if lg.get('代理策略') != [lon_map(x) for x in src_proxy] + ['DIRECT']:
    # Loon 入口组允许追加 DIRECT
    if lg.get('代理策略') != [lon_map(x) for x in src_proxy]:
        fail('loon: 代理策略 members %s != source %s' % (lg.get('代理策略'), src_proxy))
check_timing('loon', lo, r'interval=300,tolerance=50', 'interval=300/tolerance=50')
check_timing('loon', lo, r'proxy-test-url=http://cp\.cloudflare\.com/generate_204', 'proxy-test-url')

# ---------- 5. Quantumult X ----------
qx = read('quantumultx/quantumultx.conf')
qg = qx_groups('quantumultx/quantumultx.conf')
check_biz('qx', qg)
for n in ['PROXY', 'FINAL', 'Auto', 'Apple服务', 'Emby']:
    if n not in qg:
        fail('qx: missing group ' + n)
if 'force-policy=' not in qx:
    fail('qx: remote filters missing force-policy')
for cc, pol in [('cn','direct'),('sg','新加坡'),('tw','台湾'),('hk','香港'),('jp','日本'),('kr','韩国'),('us','美国')]:
    if not re.search(r'^geoip, %s, %s$' % (cc, re.escape(pol)), qx, re.M):
        fail('qx: missing geoip %s->%s' % (cc, pol))
if not re.search(r'^final, FINAL$', qx, re.M):
    fail('qx: final must be FINAL')

# ---------- 6. Shadowrocket ----------
sr = read('shadowrocket/shadowrocket.conf')
srg = sr_groups('shadowrocket/shadowrocket.conf')
check_biz('shadowrocket', srg)
check_timing('shadowrocket', sr, r'interval=300,tolerance=50', 'interval=300/tolerance=50')

# ---------- 7. 源规则概念覆盖（各客户端） ----------
CONCEPTS = {
 'surge': ['Provider/AdBlock.list','Provider/Special.list','Media/Apple%20Music.list','pre-ai-infra.list','ai-major.list','direct-cn.list','Lan/Lan.list','Media/Bilibili.list','Speedtest/Speedtest.list','Provider/Apple.list','Provider/Microsoft.list','Provider/Google%20FCM.list','Provider/AI%20Suite.list','Provider/Telegram.list','Media/Netflix.list','Media/Spotify.list','Provider/Domestic.list','ASN.China.list','telegramcidr','ChinaIPs','GEOIP,CN,DIRECT','FINAL,FINAL,dns-failed'],
 'shadowrocket': ['Provider/AdBlock.list','Provider/Special.list','Media/Apple%20Music.list','pre-ai-infra.list','ai-major.list','direct-cn.list','WeTV/WeTV.list','Speedtest/Speedtest.list','Provider/Apple.list','Provider/Microsoft.list','Provider/Google%20FCM.list','Provider/AI%20Suite.list','Media/Netflix.list','Media/Spotify.list','Provider/Proxy.list','Provider/Domestic.list','GEOIP,CN,DIRECT','FINAL,FINAL'],
 'loon': ['pre-ai-infra.list','ai-major.list','direct-cn.list','BiliBili/BiliBili.list','iQIYI/iQIYI.list','NetEaseMusic/NetEaseMusic.list','Steam/Steam.list','AppleTV/AppleTV.list','iCloud/iCloud.list','Microsoft/Microsoft.list','Telegram','Netflix','Spotify','Proxy/Proxy.list','REGION_SPLITTER','GEOIP,CN,DIRECT','FINAL,兜底策略'],
 'quantumultx': ['Filter/Special.list','Filter/AdBlock.list','AI%20Suite.list','Filter/Apple.list','Filter/Optional/Telegram.list','Filter/Optional/Netflix.list','Filter/Optional/Spotify.list','Filter/Optional/Microsoft.list','Filter/Outside.list','Filter/Mainland.list','Filter/LAN.list','geoip, cn, direct','final, FINAL'],
 'mihomo': ['Clash/Provider/AdBlock.yaml','Clash/Provider/Special.yaml','PreAIInfra','AIMajor','DirectCN','Clash/Provider/Apple.yaml','Clash/Provider/Microsoft.yaml','Clash/Provider/Google%20FCM.yaml','Clash/Provider/AI%20Suite.yaml','Clash/Provider/Telegram.yaml','Clash/Provider/Media/Netflix.yaml','Clash/Provider/Media/Spotify.yaml','Clash/Provider/Proxy.yaml','Clash/Provider/Domestic.yaml','RULE-SET,Speedtest,SpeedTest','MATCH,FINAL'],
}
texts = {'surge': surge, 'shadowrocket': sr, 'loon': lo, 'quantumultx': qx, 'mihomo': mh}
for client, frags in CONCEPTS.items():
    t = texts[client]
    for f in frags:
        if f not in t:
            fail('%s: missing concept %s' % (client, f))

# Egern 概念覆盖（rule_set match URL 片段）
EG_FRAGS = ['Provider/AdBlock.list','Provider/Special.list','Media/Apple%20Music.list','surge/rules/pre-ai-infra.list','surge/rules/ai-major.list','surge/rules/direct-cn.list','Lan/Lan.list','Media/Bilibili.list','Speedtest/Speedtest.list','Provider/Apple.list','Provider/Microsoft.list','Provider/Google%20FCM.list','Provider/AI%20Suite.list','Provider/Telegram.list','Media/Netflix.list','Media/Spotify.list','Provider/Domestic.list','ASN.China.list','telegramcidr','ChinaIPs']
for f in EG_FRAGS:
    if f not in eg:
        fail('egern: missing concept ' + f)

# ---------- 8. 隐私扫描（公开文件） ----------
PRIVACY = [
    'sub.store/download', 'http-api =', 'external-controller-access',
    '/Users/', 'iCloud~com~nssurge', 'Mobile Documents', 'policy-path=',
    'ca-p12 = ', 'ca_passphrase: A', 'yunbusiness.ccb.com', 'www.abchina.com.cn',
    'psbc.com', 'wxh.wo.cn', 'qmai.cn', 'pin-dao.cn', 'airport=',
    '6748ffde', 'bnmu1.com', 'qidewei2004@', 'password@127',
]
PUBLIC_FILES = [
    'README.md', 'surge/Surge.conf', 'egern/egern.yaml',
    'loon/loon.lcf', 'quantumultx/quantumultx.conf', 'shadowrocket/shadowrocket.conf',
    'mihomo/mihomo.yaml', 'mihomo/mihomo-override.yaml',
    'quantumultx/rewrite.snippet', 'shadowrocket/rewrite.snippet',
    'loon/plugin/redirect.plugin', 'loon/plugin/dns-mapping.plugin',
    'egern/module/google-redirect.sgmodule', 'egern/module/redirect-enhance.sgmodule',
    'surge/modules/Applications.sgmodule', 'surge/modules/google-redirect.sgmodule',
    'surge/modules/redirect-enhance.sgmodule', 'surge/modules/dns-mapping.sgmodule',
]
for path in PUBLIC_FILES:
    try:
        text = read(path)
    except IOError:
        fail('missing public file: ' + path)
        continue
    for pat in PRIVACY:
        if pat in text:
            fail('privacy: %s contains %r' % (path, pat))

# ca-p12 base64 长串（排除空占位）
for path in PUBLIC_FILES:
    try:
        text = read(path)
    except IOError:
        continue
    if re.search(r'ca-p12 = [A-Za-z0-9+/]{40,}', text) or re.search(r'ca_p12: [A-Za-z0-9+/]{40,}', text):
        fail('privacy: %s contains CA material' % path)

# ---------- 结果 ----------
if errors:
    print('SYNC-FAIL (%d):' % len(errors))
    for e in errors:
        print(' -', e)
    sys.exit(1)
print('sync-ok: source groups/rules/timing/privacy aligned across surge/egern/mihomo/loon/quantumultx/shadowrocket')
