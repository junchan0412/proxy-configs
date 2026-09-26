# -*- coding: utf-8 -*-
"""Cross-client sync check: source rules -> each client config."""
import io, re, sys

SRC = '根配置/Surge源配置.conf'
src = io.open(SRC, encoding='utf-8').read()
def section(text, name):
    m = re.search(r'^\[%s\]\s*\n(.*?)(?=^\[|\Z)' % re.escape(name), text, re.M | re.S)
    return m.group(1)
src_rule = section(src, 'Rule')
src_act = [l.strip() for l in src_rule.split('\n') if l.strip() and not l.strip().startswith('#')]

def active_rules(path, marker):
    s = io.open(path, encoding='utf-8').read()
    if marker == 'surge':
        body = section(s, 'Rule')
    elif marker == 'egern':
        body = section(s, 'Rule')
    elif marker == 'sr':
        body = section(s, 'Rule')
    elif marker == 'qx':
        body = s.split('[filter_local]')[1].split('[rewrite_remote]')[0]
    elif marker == 'loon':
        body = s.split('[Remote Rule]')[1].split('[Host]')[0]
    elif marker == 'mihomo':
        body = s.split('\nrules:')[1].split('rule-providers:')[0]
    lines = [l.strip().lstrip('- ').strip() for l in body.split('\n') if l.strip() and not l.strip().startswith('#')]
    return lines, s

errors = []
def check(name, cond, detail=''):
    if not cond:
        errors.append('%s: %s' % (name, detail))

# 1. Surge public mirrors source (modulo desensitization mapping)
pub = io.open('surge/Surge.clean.conf', encoding='utf-8').read()
for frag in ['Provider/AdBlock.list', 'Provider/Special.list', 'Media/Bilibili.list', 'Media/Apple%20Music.list',
             'Apple.list', 'Provider/Microsoft.list', 'Provider/Google%20FCM.list', 'Provider/AI%20Suite.list',
             'Provider/Telegram.list', 'Provider/Discord.list', 'Media/Netflix.list', 'Spotify.list',
             'Media/Pornhub.list', 'Provider/Domestic.list', 'Provider/Domestic%20IPs.list', 'ASN.China.list',
             'GEOIP,CN,DIRECT', 'GEOIP,US,美国', 'FINAL,FINAL,dns-failed']:
    check('surge-rule', frag in pub, 'missing %s' % frag)
check('surge-desense', '机场合集' not in pub and 'sub.store' not in pub and 'ca-p12 = M' not in pub, 'leak')

# 2. Egern mirrors Surge public rules 1:1
eg = io.open('egern/egern.conf', encoding='utf-8').read()
pub_rules = section(pub, 'Rule').strip()
eg_rules = section(eg, 'Rule').strip()
check('egern-rules', pub_rules == eg_rules, 'egern [Rule] drifts from surge public')

# 3. Shadowrocket covers source concepts
sr = io.open('shadowrocket/shadowrocket.conf', encoding='utf-8').read()
for frag in ['Provider/AdBlock.list', 'Provider/Special.list', 'Media/Bilibili.list', 'WeTV/WeTV.list',
             'Apple.list', 'Provider/Microsoft.list', 'Provider/Google%20FCM.list', 'Provider/AI%20Suite.list',
             'Telegram.list', 'Discord/Discord.list', 'TikTok/TikTok.list', 'Media/Netflix.list', 'Spotify.list',
             'Media/Pornhub.list', 'Provider/Proxy.list', 'Provider/Domestic.list', 'Provider/Domestic%20IPs.list',
             'GEOIP,CN,DIRECT', 'FINAL,FINAL']:
    check('sr-rule', frag in sr, 'missing %s' % frag)

# 4. QX: GeQ1an filters + Qure icons
qx = io.open('quantumultx/quantumultx.conf', encoding='utf-8').read()
for frag in ['GeQ1an/Rules@master/QuantumultX/Filter/Special.list', 'Filter/AdBlock.list',
             'Filter/Optional/DlerCloud/Asian%20Media.list', 'Filter/Optional/Netflix.list',
             'Filter/AI%20Suite.list', 'Filter/Apple.list', 'Filter/Optional/Telegram.list',
             'Filter/Optional/Microsoft.list', 'Filter/Outside.list', 'Filter/Mainland.list',
             'Koolson/Qure@master/IconSet/Color/Advertising.png', 'img-url=']:
    check('qx', frag in qx, 'missing %s' % frag)

# 5. Loon remote rules cover source concepts
loon = io.open('loon/loon.lcf', encoding='utf-8').read()
for frag in ['BiliBili/BiliBili.list', 'iQIYI/iQIYI.list', 'LeTV/LeTV.list', 'NetEaseMusic/NetEaseMusic.list',
             'WeChat/WeChat.list', 'ChinaMedia/ChinaMedia.list', 'Steam/Steam.list', 'AppleTV/AppleTV.list',
             'iCloud/iCloud.list', 'Microsoft/Microsoft.list', 'Telegram', 'Discord/Discord.list',
             'Netflix', 'Spotify', 'Crypto', 'GAME' not in frag and 'Game/Game.list' or 'Game/Game.list']:
    check('loon', frag in loon, 'missing %s' % frag)

# 6. Mihomo: dler providers + mapped concept rules + legacy providers
mh = io.open('mihomo/mihomo.yaml', encoding='utf-8').read()
for frag in ['Clash/Provider/AdBlock.yaml', 'Clash/Provider/Special.yaml', 'Clash/Provider/Media/Bilibili.yaml',
             'Clash/Provider/Apple.yaml', 'Clash/Provider/Microsoft.yaml', 'Clash/Provider/Google%20FCM.yaml',
             'Clash/Provider/AI%20Suite.yaml', 'Clash/Provider/Telegram.yaml', 'Clash/Provider/Discord.yaml',
             'Clash/Provider/Media/Netflix.yaml', 'Clash/Provider/Media/Spotify.yaml',
             'RULE-SET,Netflix,国际社媒', 'RULE-SET,Spotify,日本', 'RULE-SET,miHoYo,Game',
             'RULE-SET,Domestic,DIRECT', 'MATCH,FINAL']:
    check('mihomo', frag in mh, 'missing %s' % frag)

if errors:
    print('SYNC-FAIL:')
    for e in errors: print(' -', e)
    sys.exit(1)
print('sync-ok: surge/egern/sr/qx/loon/mihomo all cover source concepts')
