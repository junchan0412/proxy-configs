function main(config) {
  return Object.assign(config, {
  "dns": {
    "enable": true,
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "default-nameserver": [
      "223.5.5.5",
      "119.29.29.29"
    ],
    "nameserver": [
      "https://223.5.5.5/dns-query",
      "https://1.12.12.12/dns-query",
      "https://120.53.53.53/dns-query"
    ],
    "nameserver-policy": {
      "*.taobao.com": "https://223.5.5.5/dns-query",
      "*.tmall.com": "https://223.5.5.5/dns-query",
      "*.tbcache.com": "https://223.5.5.5/dns-query",
      "tb.cn": "https://223.5.5.5/dns-query",
      "*.alipay.com": "https://223.5.5.5/dns-query",
      "*.alipay.com.cn": "https://223.5.5.5/dns-query",
      "*.alipaydns.com": "https://223.5.5.5/dns-query",
      "*.qq.com": "https://1.12.12.12/dns-query",
      "*.weixin.com": "https://1.12.12.12/dns-query",
      "*.wechat.com": "https://1.12.12.12/dns-query",
      "*.servicewechat.com": "https://1.12.12.12/dns-query",
      "url.cn": "https://1.12.12.12/dns-query",
      "*.alicdn.com": "https://223.5.5.5/dns-query",
      "*.aliyun.com": "https://223.5.5.5/dns-query",
      "*.jd.com": "https://1.12.12.12/dns-query",
      "*.tencent.com": "https://1.12.12.12/dns-query",
      "*.bilibili.com": "https://1.12.12.12/dns-query",
      "hdslb.com": "https://1.12.12.12/dns-query",
      "*.163.com": "https://1.12.12.12/dns-query",
      "*.126.com": "https://1.12.12.12/dns-query",
      "*.126.net": "https://1.12.12.12/dns-query",
      "*.127.net": "https://1.12.12.12/dns-query",
      "*.netease.com": "https://1.12.12.12/dns-query",
      "*.mi.com": "https://1.12.12.12/dns-query",
      "*.xiaomi.com": "https://1.12.12.12/dns-query",
      "dl.google.com": "https://1.12.12.12/dns-query",
      "dl.l.google.com": "https://1.12.12.12/dns-query",
      "update.googleapis.com": "https://1.12.12.12/dns-query",
      "amplifi.lan": "system://",
      "router.synology.com": "system://",
      "sila.razer.com": "system://",
      "router.asus.com": "system://",
      "routerlogin.net": "system://",
      "orbilogin.com": "system://",
      "www.LinksysSmartWiFi.com": "system://",
      "LinksysSmartWiFi.com": "system://",
      "myrouter.local": "system://",
      "www.miwifi.com": "system://",
      "miwifi.com": "system://",
      "mediarouter.home": "system://",
      "tplogin.cn": "system://",
      "tplinklogin.net": "system://",
      "melogin.cn": "system://",
      "falogin.cn": "system://"
    },
    "fake-ip-filter-mode": "rule",
    "fake-ip-filter": [
      "DOMAIN-REGEX,^.*\\.msftncsi\\.com$,real-ip",
      "DOMAIN-REGEX,^.*\\.msftconnecttest\\.com$,real-ip",
      "DOMAIN-REGEX,^dns\\.msftncsi\\.com$,real-ip",
      "DOMAIN-REGEX,^.*\\.stun\\.playstation\\.net$,real-ip",
      "DOMAIN-REGEX,^xbox\\..*\\.microsoft\\.com$,real-ip",
      "DOMAIN-REGEX,^.*\\.xboxlive\\.com$,real-ip",
      "DOMAIN-REGEX,^.*\\.srv\\.nintendo\\.net$,real-ip",
      "DOMAIN-REGEX,^.*\\.stun\\.twilio\\.com$,real-ip",
      "DOMAIN-REGEX,^.*\\.turn\\.twilio\\.com$,real-ip",
      "DOMAIN-REGEX,^time\\..*\\.com$,real-ip",
      "DOMAIN-REGEX,^time\\..*\\.gov$,real-ip",
      "DOMAIN-REGEX,^time\\..*\\.edu\\.cn$,real-ip",
      "DOMAIN-REGEX,^time\\..*\\.apple\\.com$,real-ip",
      "DOMAIN-REGEX,^time.\\..*\\.com$,real-ip",
      "DOMAIN-REGEX,^ntp\\..*\\.com$,real-ip",
      "DOMAIN-REGEX,^ntp.\\..*\\.com$,real-ip",
      "DOMAIN-REGEX,^.*\\.time\\.edu\\.cn$,real-ip",
      "DOMAIN-REGEX,^.*\\.ntp\\.org\\.cn$,real-ip",
      "DOMAIN-REGEX,^.*\\.pool\\.ntp\\.org$,real-ip",
      "DOMAIN-REGEX,^time.*\\.cloud\\.tencent\\.com$,real-ip",
      "DOMAIN-REGEX,^ntp.\\.aliyun\\.com$,real-ip",
      "DOMAIN-SUFFIX,local,real-ip",
      "DOMAIN-SUFFIX,lan,real-ip",
      "DOMAIN,localhost,real-ip",
      "MATCH,fake-ip"
    ]
  },
  "proxy-groups": [
    {
      "name": "PROXY",
      "type": "select",
      "proxies": [
        "Auto",
        "香港",
        "台湾",
        "新加坡",
        "日本",
        "美国",
        "韩国",
        "英国"
      ],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Proxy.png",
      "hidden": false
    },
    {
      "name": "Auto",
      "type": "url-test",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "(?:^(?=.*(?:(🇭🇰|香港|港|虚通|HKG|\\bHK\\b|Hong Kong|HongKong)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*|^(?=.*(?:(🇹🇼|台湾|臺灣|台北|台中|高雄|\\bTW\\b|Taipei|Taiwan)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*|^(?=.*(?:(🇸🇬|新加坡|Singapore|\\bSG\\b|SGP)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*|^(?=.*(?:(🇯🇵|日本|东京|大阪|埼玉|JP|Japan)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*|^(?=.*(?:(🇺🇸|美国|美國|美西|美东|美南|美北|洛杉矶|旧金山|圣何塞|西雅图|芝加哥|达拉斯|亚特兰大|硅谷|拉斯维加斯|波特兰|俄勒冈|凤凰城|费利蒙|圣克拉拉|United States|\\bUSA\\b|\\bUS[-_ ])))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*|^(?=.*(?:(🇰🇷|韩国|韓國|首尔|首爾|\\bKR\\b|Korea)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*)",
      "url": "http://cp.cloudflare.com/generate_204",
      "interval": 300,
      "lazy": true,
      "tolerance": 50,
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Auto.png",
      "hidden": false
    },
    {
      "name": "兜底",
      "type": "select",
      "proxies": [
        "PROXY",
        "DIRECT"
      ],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png",
      "hidden": false
    },
    {
      "name": "国际基础服务",
      "type": "select",
      "proxies": [
        "账号出口",
        "REJECT"
      ],
      "hidden": false
    },
    {
      "name": "AI",
      "type": "select",
      "proxies": [
        "账号出口",
        "REJECT"
      ],
      "icon": "https://raw.githubusercontent.com/lige47/QuanX-icon-rule/main/icon/04ProxySoft/chatgpt4.0.png",
      "hidden": false
    },
    {
      "name": "国际社媒",
      "type": "select",
      "proxies": [
        "PROXY",
        "账号出口",
        "REJECT"
      ],
      "icon": "https://raw.githubusercontent.com/fmz200/wool_scripts/main/icons/apps/meta.png",
      "hidden": false
    },
    {
      "name": "Emby",
      "type": "url-test",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)",
      "url": "http://cp.cloudflare.com/generate_204",
      "interval": 300,
      "lazy": true,
      "tolerance": 50,
      "icon": "https://raw.githubusercontent.com/lige47/QuanX-icon-rule/main/icon/04ProxySoft/emby.png",
      "hidden": false
    },
    {
      "name": "Game",
      "type": "select",
      "proxies": [
        "香港",
        "日本",
        "美国",
        "台湾",
        "Auto",
        "PROXY",
        "DIRECT"
      ],
      "icon": "https://raw.githubusercontent.com/fmz200/wool_scripts/main/icons/apps/Apple_GameCenter.png",
      "hidden": false
    },
    {
      "name": "SpeedTest",
      "type": "select",
      "proxies": [
        "测速节点",
        "DIRECT"
      ],
      "icon": "https://raw.githubusercontent.com/lige47/QuanX-icon-rule/main/icon/03CNSoft/speedtest(3).png",
      "hidden": false
    },
    {
      "name": "机场合集",
      "type": "select",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*",
      "hidden": true
    },
    {
      "name": "新加坡",
      "type": "url-test",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "^(?=.*(?:(🇸🇬|新加坡|Singapore|\\bSG\\b|SGP)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*",
      "url": "http://cp.cloudflare.com/generate_204",
      "interval": 300,
      "lazy": true,
      "tolerance": 50,
      "hidden": true
    },
    {
      "name": "日本",
      "type": "url-test",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "^(?=.*(?:(🇯🇵|日本|东京|大阪|埼玉|JP|Japan)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*",
      "url": "http://cp.cloudflare.com/generate_204",
      "interval": 300,
      "lazy": true,
      "tolerance": 50,
      "hidden": true
    },
    {
      "name": "香港",
      "type": "url-test",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "^(?=.*(?:(🇭🇰|香港|港|虚通|HKG|\\bHK\\b|Hong Kong|HongKong)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*",
      "url": "http://cp.cloudflare.com/generate_204",
      "interval": 300,
      "lazy": true,
      "tolerance": 50,
      "hidden": true
    },
    {
      "name": "台湾",
      "type": "url-test",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "^(?=.*(?:(🇹🇼|台湾|臺灣|台北|台中|高雄|\\bTW\\b|Taipei|Taiwan)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*",
      "url": "http://cp.cloudflare.com/generate_204",
      "interval": 300,
      "lazy": true,
      "tolerance": 50,
      "hidden": true
    },
    {
      "name": "韩国",
      "type": "select",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "^(?=.*(?:(🇰🇷|韩国|韓國|首尔|首爾|\\bKR\\b|Korea)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*",
      "hidden": true
    },
    {
      "name": "美国",
      "type": "url-test",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "^(?=.*(?:(🇺🇸|美国|美國|美西|美东|美南|美北|洛杉矶|旧金山|圣何塞|西雅图|芝加哥|达拉斯|亚特兰大|硅谷|拉斯维加斯|波特兰|俄勒冈|凤凰城|费利蒙|圣克拉拉|United States|\\bUSA\\b|\\bUS[-_ ])))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*",
      "url": "http://cp.cloudflare.com/generate_204",
      "interval": 300,
      "lazy": true,
      "tolerance": 50,
      "hidden": true
    },
    {
      "name": "英国",
      "type": "url-test",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "^(?=.*(?:(🇬🇧|英国|英國|英格兰|英格蘭|London|United Kingdom|\\bUK\\b|\\bGB\\b|Britain|British)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*",
      "url": "http://cp.cloudflare.com/generate_204",
      "interval": 300,
      "lazy": true,
      "tolerance": 50,
      "hidden": true
    },
    {
      "name": "账号-新加坡",
      "type": "fallback",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "(?:^(?=.*(?:(🇸🇬|新加坡|Singapore|\\bSG\\b|SGP)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*)",
      "url": "http://cp.cloudflare.com/generate_204",
      "interval": 600,
      "lazy": true,
      "icon": "https://gitlab.com/lodepuly/iconlibrary/-/raw/main/Flag_icon/120px/SG.png",
      "hidden": true
    },
    {
      "name": "账号-台湾",
      "type": "fallback",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "(?:^(?=.*(?:(🇹🇼|台湾|臺灣|台北|台中|高雄|\\bTW\\b|Taipei|Taiwan)))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*)",
      "url": "http://cp.cloudflare.com/generate_204",
      "interval": 600,
      "lazy": true,
      "icon": "https://raw.githubusercontent.com/fmz200/wool_scripts/main/icons/flag/TW_01.png",
      "hidden": true
    },
    {
      "name": "账号-美国",
      "type": "fallback",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "(?:^(?=.*(?:(🇺🇸|美国|美國|美西|美东|美南|美北|洛杉矶|旧金山|圣何塞|西雅图|芝加哥|达拉斯|亚特兰大|硅谷|拉斯维加斯|波特兰|俄勒冈|凤凰城|费利蒙|圣克拉拉|United States|\\bUSA\\b|\\bUS[-_ ])))(?=(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)).*)",
      "url": "http://cp.cloudflare.com/generate_204",
      "interval": 600,
      "lazy": true,
      "icon": "https://gitlab.com/lodepuly/iconlibrary/-/raw/main/Flag_icon/120px/US.png",
      "hidden": true
    },
    {
      "name": "账号出口",
      "type": "select",
      "proxies": [
        "账号-新加坡",
        "账号-台湾",
        "账号-美国",
        "REJECT"
      ],
      "icon": "https://raw.githubusercontent.com/fmz200/wool_scripts/main/icons/apps/Apple_Safari.png",
      "hidden": false
    },
    {
      "name": "测速节点",
      "type": "select",
      "proxies": [
        "REJECT"
      ],
      "include-all": true,
      "filter": "(?:^(?!.*(官网|套餐|重置|剩余|导航|通知|更新|刷新|付费解锁|免费用户|防失联|电报|文档|签到|白嫖网|维护|用户|https:|com|org|net|top|co)).*)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Speedtest.png",
      "hidden": false
    }
  ],
  "rule-providers": {
    "adblock": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/adblock.list",
      "path": "./rules/adblock.list",
      "proxy": "DIRECT"
    },
    "apns": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/apns.list",
      "path": "./rules/apns.list",
      "proxy": "DIRECT"
    },
    "apple-cn": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/apple-cn.list",
      "path": "./rules/apple-cn.list",
      "proxy": "DIRECT"
    },
    "ai-suite": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/ai-suite.list",
      "path": "./rules/ai-suite.list",
      "proxy": "DIRECT"
    },
    "ai": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/ai.list",
      "path": "./rules/ai.list",
      "proxy": "DIRECT"
    },
    "gits": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/gits.list",
      "path": "./rules/gits.list",
      "proxy": "DIRECT"
    },
    "private": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/private.list",
      "path": "./rules/private.list",
      "proxy": "DIRECT"
    },
    "chinamax_all_no_resolve": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/chinamax_all_no_resolve.list",
      "path": "./rules/chinamax_all_no_resolve.list",
      "proxy": "DIRECT"
    },
    "oracle": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/oracle.list",
      "path": "./rules/oracle.list",
      "proxy": "DIRECT"
    },
    "douyin": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/douyin.list",
      "path": "./rules/douyin.list",
      "proxy": "DIRECT"
    },
    "paypal": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/paypal.list",
      "path": "./rules/paypal.list",
      "proxy": "DIRECT"
    },
    "socialmedia-cn": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/socialmedia-cn.list",
      "path": "./rules/socialmedia-cn.list",
      "proxy": "DIRECT"
    },
    "dmca": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/dmca.list",
      "path": "./rules/dmca.list",
      "proxy": "DIRECT"
    },
    "cdn": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/cdn.list",
      "path": "./rules/cdn.list",
      "proxy": "DIRECT"
    },
    "games-cn": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/games-cn.list",
      "path": "./rules/games-cn.list",
      "proxy": "DIRECT"
    },
    "games": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/games.list",
      "path": "./rules/games.list",
      "proxy": "DIRECT"
    },
    "speedtest": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/speedtest.list",
      "path": "./rules/speedtest.list",
      "proxy": "DIRECT"
    },
    "apple-tv": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/apple-tv.list",
      "path": "./rules/apple-tv.list",
      "proxy": "DIRECT"
    },
    "apple": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/apple.list",
      "path": "./rules/apple.list",
      "proxy": "DIRECT"
    },
    "onedrive": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/onedrive.list",
      "path": "./rules/onedrive.list",
      "proxy": "DIRECT"
    },
    "microsoft-cn": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/microsoft-cn.list",
      "path": "./rules/microsoft-cn.list",
      "proxy": "DIRECT"
    },
    "microsoft": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/microsoft.list",
      "path": "./rules/microsoft.list",
      "proxy": "DIRECT"
    },
    "google-fcm": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/google-fcm.list",
      "path": "./rules/google-fcm.list",
      "proxy": "DIRECT"
    },
    "google": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/google.list",
      "path": "./rules/google.list",
      "proxy": "DIRECT"
    },
    "cloudflare": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/cloudflare.list",
      "path": "./rules/cloudflare.list",
      "proxy": "DIRECT"
    },
    "telegram": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/telegram.list",
      "path": "./rules/telegram.list",
      "proxy": "DIRECT"
    },
    "socialmedia": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/socialmedia.list",
      "path": "./rules/socialmedia.list",
      "proxy": "DIRECT"
    },
    "forum": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/forum.list",
      "path": "./rules/forum.list",
      "proxy": "DIRECT"
    },
    "youtube": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/youtube.list",
      "path": "./rules/youtube.list",
      "proxy": "DIRECT"
    },
    "pornhub": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/pornhub.list",
      "path": "./rules/pornhub.list",
      "proxy": "DIRECT"
    },
    "notion": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/notion.list",
      "path": "./rules/notion.list",
      "proxy": "DIRECT"
    },
    "wikipedia": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/wikipedia.list",
      "path": "./rules/wikipedia.list",
      "proxy": "DIRECT"
    },
    "dropbox": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/dropbox.list",
      "path": "./rules/dropbox.list",
      "proxy": "DIRECT"
    },
    "aol": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/aol.list",
      "path": "./rules/aol.list",
      "proxy": "DIRECT"
    },
    "gfw": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/gfw.list",
      "path": "./rules/gfw.list",
      "proxy": "DIRECT"
    },
    "proxy": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/proxy.list",
      "path": "./rules/proxy.list",
      "proxy": "DIRECT"
    },
    "domestic": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/domestic.list",
      "path": "./rules/domestic.list",
      "proxy": "DIRECT"
    },
    "asn.china": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/asn.china.list",
      "path": "./rules/asn.china.list",
      "proxy": "DIRECT"
    },
    "lan": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/lan.list",
      "path": "./rules/lan.list",
      "proxy": "DIRECT"
    },
    "cncidr-resolve": {
      "type": "http",
      "behavior": "classical",
      "format": "text",
      "interval": 43200,
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/rules/mihomo/cncidr-resolve.list",
      "path": "./rules/cncidr-resolve.list",
      "proxy": "DIRECT"
    }
  },
  "rules": [
    "DOMAIN,fastly.jsdelivr.net,DIRECT",
    "RULE-SET,adblock,REJECT,no-resolve",
    "DOMAIN,dns.google,REJECT",
    "DOMAIN-SUFFIX,dns.google.com,REJECT",
    "DOMAIN-SUFFIX,mozilla.cloudflare-dns.com,REJECT",
    "DOMAIN-SUFFIX,doh.opendns.com,REJECT",
    "DOMAIN,dns.quad9.net,REJECT",
    "DOMAIN-SUFFIX,dns.adguard.com,REJECT",
    "DOMAIN-SUFFIX,dns.nextdns.io,REJECT",
    "IP-CIDR,95.161.76.100/31,REJECT,no-resolve",
    "IP-CIDR,223.5.5.5/32,DIRECT,no-resolve",
    "IP-CIDR,119.29.29.29/32,DIRECT,no-resolve",
    "IP-CIDR,1.12.12.12/32,DIRECT,no-resolve",
    "IP-CIDR,120.53.53.53/32,DIRECT,no-resolve",
    "RULE-SET,apns,DIRECT,no-resolve",
    "RULE-SET,apple-cn,DIRECT,no-resolve",
    "RULE-SET,ai-suite,AI,no-resolve",
    "RULE-SET,ai,AI,no-resolve",
    "RULE-SET,gits,国际基础服务,no-resolve",
    "RULE-SET,private,DIRECT,no-resolve",
    "OR,((DST-PORT,25),(DST-PORT,110),(DST-PORT,143),(DST-PORT,465),(DST-PORT,587)),DIRECT",
    "AND,((OR,((DOMAIN,time-ios.apple.com),(DOMAIN,time.apple.com),(DOMAIN-SUFFIX,pool.ntp.org))),(DST-PORT,123)),DIRECT",
    "RULE-SET,chinamax_all_no_resolve,DIRECT,no-resolve",
    "RULE-SET,oracle,DIRECT,no-resolve",
    "RULE-SET,douyin,DIRECT,no-resolve",
    "RULE-SET,paypal,DIRECT,no-resolve",
    "RULE-SET,socialmedia-cn,DIRECT,no-resolve",
    "RULE-SET,dmca,DIRECT,no-resolve",
    "RULE-SET,cdn,DIRECT,no-resolve",
    "RULE-SET,games-cn,DIRECT,no-resolve",
    "RULE-SET,games,Game,no-resolve",
    "RULE-SET,speedtest,SpeedTest,no-resolve",
    "RULE-SET,apple-tv,DIRECT,no-resolve",
    "RULE-SET,apple,DIRECT,no-resolve",
    "RULE-SET,onedrive,DIRECT,no-resolve",
    "RULE-SET,microsoft-cn,DIRECT,no-resolve",
    "RULE-SET,microsoft,国际基础服务,no-resolve",
    "RULE-SET,google-fcm,国际基础服务,no-resolve",
    "RULE-SET,google,国际基础服务,no-resolve",
    "RULE-SET,cloudflare,国际基础服务,no-resolve",
    "RULE-SET,telegram,国际社媒,no-resolve",
    "RULE-SET,socialmedia,国际社媒,no-resolve",
    "RULE-SET,forum,国际社媒,no-resolve",
    "RULE-SET,youtube,国际社媒,no-resolve",
    "RULE-SET,pornhub,国际社媒,no-resolve",
    "RULE-SET,notion,国际基础服务,no-resolve",
    "RULE-SET,wikipedia,国际基础服务,no-resolve",
    "RULE-SET,dropbox,国际基础服务,no-resolve",
    "RULE-SET,aol,国际基础服务,no-resolve",
    "RULE-SET,gfw,PROXY",
    "RULE-SET,proxy,PROXY,no-resolve",
    "RULE-SET,domestic,DIRECT,no-resolve",
    "RULE-SET,asn.china,DIRECT,no-resolve",
    "RULE-SET,lan,DIRECT,no-resolve",
    "RULE-SET,cncidr-resolve,DIRECT,no-resolve",
    "GEOIP,CN,DIRECT,no-resolve",
    "MATCH,兜底"
  ],
  "geox-url": {
    "mmdb": "https://fastly.jsdelivr.net/gh/Loyalsoldier/geoip@release/Country.mmdb",
    "asn": "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb"
  }
});
}
