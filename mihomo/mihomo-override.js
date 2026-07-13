// Generated from mihomo-override.yaml by scripts/generate-mihomo-js-override.rb.
// Keep subscription proxies, proxy-providers, ports and controller settings intact.
function main(config) {
  const override = {
  "unified-delay": true,
  "geodata-mode": false,
  "geodata-loader": "standard",
  "geo-auto-update": true,
  "geo-update-interval": 24,
  "tcp-concurrent": true,
  "find-process-mode": "strict",
  "allow-lan": true,
  "mode": "rule",
  "log-level": "info",
  "ipv6": false,
  "geox-url": {
    "geoip": "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat",
    "geosite": "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat",
    "mmdb": "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb",
    "asn": "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb"
  },
  "profile": {
    "store-selected": true,
    "store-fake-ip": true
  },
  "sniffer": {
    "enable": true,
    "force-dns-mapping": true,
    "parse-pure-ip": true,
    "override-destination": true,
    "sniff": {
      "HTTP": {
        "ports": [
          80,
          "8080-8880"
        ],
        "override-destination": true
      },
      "TLS": {
        "ports": [
          443,
          8443
        ]
      },
      "QUIC": {
        "ports": [
          443,
          8443
        ]
      }
    },
    "force-domain": [
      "+.v2ex.com"
    ],
    "skip-domain": [
      "Mijia Cloud"
    ]
  },
  "tun": {
    "enable": true,
    "stack": "system",
    "dns-hijack": [
      "any:53"
    ],
    "auto-route": true,
    "auto-detect-interface": true
  },
  "dns": {
    "enable": true,
    "prefer-h3": false,
    "respect-rules": true,
    "listen": "0.0.0.0:1053",
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": [
      "+.lan",
      "+.local",
      "+.localdomain",
      "localhost",
      "*.localhost",
      "*.local",
      "*.localdomain",
      "+.home.arpa",
      "+.msftconnecttest.com",
      "+.msftncsi.com",
      "+.srv.nintendo.net",
      "+.stun.playstation.net",
      "+.stun.stunprotocol.org",
      "+.stun.voip.blackberry.com",
      "+.xboxlive.com",
      "time.*.com",
      "time.*.gov",
      "time.*.edu.cn",
      "time.*.apple.com",
      "time1.*.com",
      "time2.*.com",
      "time3.*.com",
      "time4.*.com",
      "time5.*.com",
      "time6.*.com",
      "time7.*.com",
      "+.apps.apple.com",
      "+.itunes.apple.com",
      "+.mzstatic.com",
      "+.cdn-apple.com",
      "+.aaplimg.com",
      "+.ntp.org.cn",
      "+.pool.ntp.org"
    ],
    "default-nameserver": [
      "223.5.5.5",
      "223.6.6.6",
      "119.29.29.29"
    ],
    "proxy-server-nameserver": [
      "https://223.5.5.5/dns-query",
      "https://doh.pub/dns-query"
    ],
    "direct-nameserver": [
      "https://223.5.5.5/dns-query",
      "https://doh.pub/dns-query"
    ],
    "direct-nameserver-follow-policy": false,
    "nameserver": [
      "https://223.5.5.5/dns-query",
      "https://doh.pub/dns-query"
    ],
    "fallback": [
      "https://1.1.1.1/dns-query",
      "https://8.8.8.8/dns-query",
      "tls://1.0.0.1:853"
    ],
    "fallback-filter": {
      "geoip": true,
      "geoip-code": "CN",
      "ipcidr": [
        "240.0.0.0/4"
      ]
    },
    "nameserver-policy": {
      "geosite:cn,private": [
        "https://223.5.5.5/dns-query",
        "https://doh.pub/dns-query"
      ],
      "geosite:geolocation-!cn": [
        "https://1.1.1.1/dns-query",
        "https://8.8.8.8/dns-query"
      ]
    }
  },
  "proxy-groups": [
    {
      "name": "PROXY",
      "type": "select",
      "include-all": true,
      "filter": "^(?=.*(.))(?!.*((?i)群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|超时|收藏|福利|邀请|好友|失联|(\\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author|Traffic)(\\d+)?\\b|(\\d{4}-\\d{2}-\\d{2}|\\dG)))).*$",
      "proxies": [
        "Auto",
        "香港",
        "新加坡",
        "台湾",
        "日本",
        "韩国",
        "美国",
        "英国",
        "DIRECT"
      ],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png"
    },
    {
      "name": "Auto",
      "type": "url-test",
      "interval": 300,
      "tolerance": 50,
      "lazy": true,
      "url": "https://www.gstatic.com/generate_204",
      "disable-udp": false,
      "timeout": 5000,
      "max-failed-times": 3,
      "hidden": false,
      "include-all": true,
      "filter": "^(?=.*(.))(?!.*((?i)群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|超时|收藏|福利|邀请|好友|失联|(\\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author|Traffic)(\\d+)?\\b|(\\d{4}-\\d{2}-\\d{2}|\\dG)))).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Auto.png"
    },
    {
      "name": "FINAL",
      "type": "select",
      "proxies": [
        "PROXY",
        "DIRECT"
      ],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/World_Map.png"
    },
    {
      "name": "国际基础服务",
      "type": "select",
      "proxies": [
        "新加坡",
        "美国",
        "香港",
        "PROXY",
        "DIRECT"
      ],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png"
    },
    {
      "name": "Apple服务",
      "type": "select",
      "proxies": [
        "DIRECT",
        "国际基础服务",
        "PROXY",
        "新加坡",
        "美国"
      ],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Apple.png"
    },
    {
      "name": "AI",
      "type": "select",
      "proxies": [
        "美国",
        "新加坡",
        "台湾",
        "日本",
        "PROXY"
      ],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ChatGPT.png"
    },
    {
      "name": "国际社区",
      "type": "select",
      "proxies": [
        "香港",
        "新加坡",
        "台湾",
        "日本",
        "美国",
        "PROXY"
      ],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Telegram.png"
    },
    {
      "name": "Emby",
      "type": "url-test",
      "interval": 300,
      "tolerance": 50,
      "lazy": true,
      "url": "https://www.gstatic.com/generate_204",
      "disable-udp": false,
      "timeout": 5000,
      "max-failed-times": 3,
      "hidden": false,
      "include-all": true,
      "filter": "^(?=.*((?i)🇭🇰|香港|港|Hong|HK|🇸🇬|新加坡|SG|Singapore|🇰🇷|韩国|韩|KR|Korea|🇹🇼|台湾|台|TW|Tai))(?!.*((?i)回国|校园|游戏|🎮|(\\b(GAME)\\b))).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Streaming.png"
    },
    {
      "name": "Game",
      "type": "select",
      "proxies": [
        "香港",
        "日本",
        "新加坡",
        "台湾",
        "韩国",
        "美国",
        "PROXY",
        "DIRECT"
      ],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Game.png"
    },
    {
      "name": "SpeedTest",
      "type": "select",
      "proxies": [
        "PROXY",
        "Auto",
        "香港",
        "新加坡",
        "台湾",
        "日本",
        "韩国",
        "美国",
        "英国",
        "DIRECT"
      ],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Speedtest.png"
    },
    {
      "name": "香港",
      "type": "url-test",
      "interval": 300,
      "tolerance": 50,
      "lazy": true,
      "url": "https://www.gstatic.com/generate_204",
      "disable-udp": false,
      "timeout": 5000,
      "max-failed-times": 3,
      "hidden": true,
      "include-all": true,
      "filter": "^(?=.*((?i)🇭🇰|香港|(\\b(HK|HKG|Hong)(\\d+)?\\b)))(?!.*((?i)回国|校园|游戏|🎮|(\\b(GAME)\\b))).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/HK.png"
    },
    {
      "name": "台湾",
      "type": "url-test",
      "interval": 300,
      "tolerance": 50,
      "lazy": true,
      "url": "https://www.gstatic.com/generate_204",
      "disable-udp": false,
      "timeout": 5000,
      "max-failed-times": 3,
      "hidden": true,
      "include-all": true,
      "filter": "^(?=.*((?i)🇹🇼|台湾|(\\b(TW|TWN|Tai|Taiwan)(\\d+)?\\b)))(?!.*((?i)回国|校园|游戏|🎮|(\\b(GAME)\\b))).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/TW.png"
    },
    {
      "name": "新加坡",
      "type": "url-test",
      "interval": 300,
      "tolerance": 50,
      "lazy": true,
      "url": "https://www.gstatic.com/generate_204",
      "disable-udp": false,
      "timeout": 5000,
      "max-failed-times": 3,
      "hidden": true,
      "include-all": true,
      "filter": "^(?=.*((?i)🇸🇬|新加坡|狮|(\\b(SG|SGP|Singapore)(\\d+)?\\b)))(?!.*((?i)回国|校园|游戏|🎮|(\\b(GAME)\\b))).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/SG.png"
    },
    {
      "name": "日本",
      "type": "url-test",
      "interval": 300,
      "tolerance": 50,
      "lazy": true,
      "url": "https://www.gstatic.com/generate_204",
      "disable-udp": false,
      "timeout": 5000,
      "max-failed-times": 3,
      "hidden": true,
      "include-all": true,
      "filter": "^(?=.*((?i)🇯🇵|日本|川日|东京|大阪|泉日|埼玉|(\\b(JP|JPN|Japan)(\\d+)?\\b)))(?!.*((?i)回国|校园|游戏|🎮|(\\b(GAME)\\b))).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/JP.png"
    },
    {
      "name": "韩国",
      "type": "url-test",
      "interval": 300,
      "tolerance": 50,
      "lazy": true,
      "url": "https://www.gstatic.com/generate_204",
      "disable-udp": false,
      "timeout": 5000,
      "max-failed-times": 3,
      "hidden": true,
      "include-all": true,
      "filter": "^(?=.*((?i)🇰🇷|韩国|韓|首尔|(\\b(KR|KOR|Korea)(\\d+)?\\b)))(?!.*((?i)回国|校园|游戏|🎮|(\\b(GAME)\\b))).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/KR.png"
    },
    {
      "name": "美国",
      "type": "url-test",
      "interval": 300,
      "tolerance": 50,
      "lazy": true,
      "url": "https://www.gstatic.com/generate_204",
      "disable-udp": false,
      "timeout": 5000,
      "max-failed-times": 3,
      "hidden": true,
      "include-all": true,
      "filter": "^(?=.*((?i)🇺🇸|美国|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|(\\b(US|USA|United States)(\\d+)?\\b)))(?!.*((?i)回国|校园|游戏|🎮|(\\b(GAME)\\b))).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/US.png"
    },
    {
      "name": "英国",
      "type": "url-test",
      "interval": 300,
      "tolerance": 50,
      "lazy": true,
      "url": "https://www.gstatic.com/generate_204",
      "disable-udp": false,
      "timeout": 5000,
      "max-failed-times": 3,
      "hidden": true,
      "include-all": true,
      "filter": "^(?=.*((?i)🇬🇧|英国|英格兰|GBR|United Kingdom|UK|England|Britain|British))(?!.*((?i)回国|校园|游戏|🎮|(\\b(GAME)\\b))).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/UK.png"
    }
  ],
  "rule-providers": {
    "AdvertisingLite": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/AdvertisingLite.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/AdvertisingLite/AdvertisingLite.yaml"
    },
    "DirectCN": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "text",
      "path": "./rules/DirectCN.list",
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/rules/direct-cn.list"
    },
    "PreAIInfra": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "text",
      "path": "./rules/PreAIInfra.list",
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/rules/pre-ai-infra.list"
    },
    "AIMajor": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "text",
      "path": "./rules/AIMajor.list",
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/rules/ai-major.list"
    },
    "OpenAI": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/OpenAI.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml"
    },
    "Claude": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Claude.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Claude/Claude.yaml"
    },
    "Anthropic": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Anthropic.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Anthropic/Anthropic.yaml"
    },
    "Gemini": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Gemini.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Gemini/Gemini.yaml"
    },
    "Copilot": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Copilot.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Copilot/Copilot.yaml"
    },
    "BardAI": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/BardAI.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/BardAI/BardAI.yaml"
    },
    "Lan": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Lan.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Lan/Lan.yaml"
    },
    "Direct": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Direct.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Direct/Direct.yaml"
    },
    "ChinaMaxNoIP": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/ChinaMaxNoIP.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/ChinaMaxNoIP/ChinaMaxNoIP.yaml"
    },
    "ChinaNoMedia": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/ChinaNoMedia.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/ChinaNoMedia/ChinaNoMedia.yaml"
    },
    "WeChat": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/WeChat.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/WeChat/WeChat.yaml"
    },
    "BiliBili": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/BiliBili.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/BiliBili/BiliBili.yaml"
    },
    "DouYin": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/DouYin.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/DouYin/DouYin.yaml"
    },
    "XiaoHongShu": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/XiaoHongShu.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/XiaoHongShu/XiaoHongShu.yaml"
    },
    "Weibo": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Weibo.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Weibo/Weibo.yaml"
    },
    "ChinaMedia": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/ChinaMedia.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/ChinaMedia/ChinaMedia.yaml"
    },
    "PayPal": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/PayPal.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/PayPal/PayPal.yaml"
    },
    "Oracle": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Oracle.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Oracle/Oracle.yaml"
    },
    "China": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/China.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/China/China.yaml"
    },
    "Alibaba": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Alibaba.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Alibaba/Alibaba.yaml"
    },
    "AliPay": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/AliPay.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/AliPay/AliPay.yaml"
    },
    "Baidu": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Baidu.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Baidu/Baidu.yaml"
    },
    "Tencent": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Tencent.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Tencent/Tencent.yaml"
    },
    "JingDong": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/JingDong.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/JingDong/JingDong.yaml"
    },
    "MeiTuan": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/MeiTuan.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/MeiTuan/MeiTuan.yaml"
    },
    "Eleme": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Eleme.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Eleme/Eleme.yaml"
    },
    "GaoDe": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/GaoDe.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/GaoDe/GaoDe.yaml"
    },
    "DiDi": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/DiDi.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/DiDi/DiDi.yaml"
    },
    "Pinduoduo": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Pinduoduo.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Pinduoduo/Pinduoduo.yaml"
    },
    "ByteDance": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/ByteDance.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/ByteDance/ByteDance.yaml"
    },
    "NetEase": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/NetEase.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/NetEase/NetEase.yaml"
    },
    "NetEaseMusic": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/NetEaseMusic.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/NetEaseMusic/NetEaseMusic.yaml"
    },
    "Zhihu": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Zhihu.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Zhihu/Zhihu.yaml"
    },
    "Gitee": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Gitee.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Gitee/Gitee.yaml"
    },
    "CSDN": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/CSDN.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/CSDN/CSDN.yaml"
    },
    "JueJin": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/JueJin.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/JueJin/JueJin.yaml"
    },
    "DouBan": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/DouBan.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/DouBan/DouBan.yaml"
    },
    "SMZDM": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/SMZDM.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/SMZDM/SMZDM.yaml"
    },
    "12306": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/12306.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/12306/12306.yaml"
    },
    "Huawei": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Huawei.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Huawei/Huawei.yaml"
    },
    "UnionPay": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/UnionPay.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/UnionPay/UnionPay.yaml"
    },
    "Sina": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Sina.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Sina/Sina.yaml"
    },
    "Sohu": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Sohu.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Sohu/Sohu.yaml"
    },
    "TencentVideo": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/TencentVideo.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/TencentVideo/TencentVideo.yaml"
    },
    "iQIYI": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/iQIYI.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/iQIYI/iQIYI.yaml"
    },
    "Youku": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Youku.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Youku/Youku.yaml"
    },
    "Migu": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Migu.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Migu/Migu.yaml"
    },
    "Apple": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Apple.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Apple/Apple.yaml"
    },
    "iCloud": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/iCloud.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/iCloud/iCloud.yaml"
    },
    "AppleID": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/AppleID.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/AppleID/AppleID.yaml"
    },
    "AppleProxy": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/AppleProxy.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/AppleProxy/AppleProxy.yaml"
    },
    "AppleMedia": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/AppleMedia.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/AppleMedia/AppleMedia.yaml"
    },
    "Microsoft": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Microsoft.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml"
    },
    "OneDrive": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/OneDrive.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OneDrive/OneDrive.yaml"
    },
    "Bing": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Bing.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Bing/Bing.yaml"
    },
    "Google": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Google.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Google/Google.yaml"
    },
    "Telegram": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Telegram.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Telegram/Telegram.yaml"
    },
    "Facebook": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Facebook.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Facebook/Facebook.yaml"
    },
    "Instagram": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Instagram.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Instagram/Instagram.yaml"
    },
    "Threads": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Threads.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Threads/Threads.yaml"
    },
    "Whatsapp": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Whatsapp.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Whatsapp/Whatsapp.yaml"
    },
    "Twitter": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Twitter.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Twitter/Twitter.yaml"
    },
    "Snap": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Snap.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Snap/Snap.yaml"
    },
    "Reddit": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Reddit.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Reddit/Reddit.yaml"
    },
    "Discord": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Discord.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Discord/Discord.yaml"
    },
    "Netflix": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Netflix.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Netflix/Netflix.yaml"
    },
    "YouTube": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/YouTube.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/YouTube/YouTube.yaml"
    },
    "Spotify": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Spotify.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Spotify/Spotify.yaml"
    },
    "TikTok": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/TikTok.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/TikTok/TikTok.yaml"
    },
    "Disney": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Disney.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Disney/Disney.yaml"
    },
    "HBO": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/HBO.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/HBO/HBO.yaml"
    },
    "Bahamut": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Bahamut.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Bahamut/Bahamut.yaml"
    },
    "GitHub": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/GitHub.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/GitHub/GitHub.yaml"
    },
    "GitLab": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/GitLab.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/GitLab/GitLab.yaml"
    },
    "Developer": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Developer.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Developer/Developer.yaml"
    },
    "Docker": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Docker.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Docker/Docker.yaml"
    },
    "Figma": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Figma.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Figma/Figma.yaml"
    },
    "DigitalOcean": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/DigitalOcean.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/DigitalOcean/DigitalOcean.yaml"
    },
    "Amazon": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Amazon.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Amazon/Amazon.yaml"
    },
    "Scholar": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Scholar.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Scholar/Scholar.yaml"
    },
    "GlobalScholar": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/GlobalScholar.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/GlobalScholar/GlobalScholar.yaml"
    },
    "Notion": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Notion.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Notion/Notion.yaml"
    },
    "Wikipedia": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Wikipedia.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Wikipedia/Wikipedia.yaml"
    },
    "Dropbox": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Dropbox.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Dropbox/Dropbox.yaml"
    },
    "Cloudflare": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Cloudflare.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Cloudflare/Cloudflare.yaml"
    },
    "AOL": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/AOL.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/AOL/AOL.yaml"
    },
    "Protonmail": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Protonmail.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Protonmail/Protonmail.yaml"
    },
    "Speedtest": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Speedtest.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Speedtest/Speedtest.yaml"
    },
    "EA": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/EA.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/EA/EA.yaml"
    },
    "Epic": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Epic.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Epic/Epic.yaml"
    },
    "Gog": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Gog.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Gog/Gog.yaml"
    },
    "Origin": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Origin.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Origin/Origin.yaml"
    },
    "PlayStation": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/PlayStation.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/PlayStation/PlayStation.yaml"
    },
    "Steam": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Steam.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Steam/Steam.yaml"
    },
    "Xbox": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Xbox.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Xbox/Xbox.yaml"
    },
    "Blizzard": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Blizzard.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Blizzard/Blizzard.yaml"
    },
    "Nintendo": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Nintendo.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Nintendo/Nintendo.yaml"
    },
    "Game": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Game.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Game/Game.yaml"
    },
    "Download": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Download.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Download/Download.yaml"
    },
    "PrivateTracker": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/PrivateTracker.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/PrivateTracker/PrivateTracker.yaml"
    },
    "GlobalMedia": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/GlobalMedia.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/GlobalMedia/GlobalMedia.yaml"
    },
    "Proxy": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Proxy.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Proxy/Proxy.yaml"
    },
    "Global": {
      "type": "http",
      "behavior": "classical",
      "interval": 3600,
      "format": "yaml",
      "path": "./rules/Global.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Global/Global.yaml"
    }
  },
  "rules": [
    "IP-CIDR,0.0.0.0/32,REJECT,no-resolve",
    "RULE-SET,AdvertisingLite,REJECT",
    "RULE-SET,PreAIInfra,国际基础服务",
    "DOMAIN-SUFFIX,fonts.gstatic.com,国际基础服务",
    "DOMAIN-SUFFIX,ssl.gstatic.com,国际基础服务",
    "DOMAIN-SUFFIX,maps.gstatic.com,国际基础服务",
    "RULE-SET,AIMajor,AI",
    "RULE-SET,OpenAI,AI",
    "RULE-SET,Claude,AI",
    "RULE-SET,Anthropic,AI",
    "RULE-SET,Gemini,AI",
    "RULE-SET,Copilot,AI",
    "RULE-SET,BardAI,AI",
    "RULE-SET,Lan,DIRECT",
    "GEOSITE,private,DIRECT",
    "RULE-SET,Download,PROXY",
    "RULE-SET,PrivateTracker,PROXY",
    "RULE-SET,iCloud,DIRECT",
    "RULE-SET,AppleID,DIRECT",
    "DOMAIN-SUFFIX,apps.apple.com,Apple服务",
    "DOMAIN-SUFFIX,apps-marketplace.apple.com,Apple服务",
    "DOMAIN-SUFFIX,appstore.com,Apple服务",
    "DOMAIN-SUFFIX,appsto.re,Apple服务",
    "DOMAIN-SUFFIX,itunes.apple.com,Apple服务",
    "DOMAIN-SUFFIX,itunes.com,Apple服务",
    "DOMAIN-SUFFIX,mzstatic.com,Apple服务",
    "DOMAIN-SUFFIX,aaplimg.com,Apple服务",
    "DOMAIN-SUFFIX,cdn-apple.com,Apple服务",
    "DOMAIN,amp-api.apps.apple.com,Apple服务",
    "DOMAIN,bag.itunes.apple.com,Apple服务",
    "DOMAIN,buy.itunes.apple.com,Apple服务",
    "DOMAIN,init.itunes.apple.com,Apple服务",
    "DOMAIN,iosapps.itunes.apple.com,Apple服务",
    "DOMAIN,lookup-api.apple.com,Apple服务",
    "DOMAIN,osxapps.itunes.apple.com,Apple服务",
    "DOMAIN,phobos.apple.com,Apple服务",
    "DOMAIN,ppq.apple.com,Apple服务",
    "DOMAIN,uts-api.itunes.apple.com,Apple服务",
    "RULE-SET,AppleProxy,Apple服务",
    "RULE-SET,AppleMedia,Apple服务",
    "RULE-SET,Apple,DIRECT",
    "PROCESS-NAME,WinStore.App.exe,DIRECT",
    "PROCESS-NAME,StoreExperienceHost.exe,DIRECT",
    "DOMAIN-SUFFIX,mp.microsoft.com,DIRECT",
    "DOMAIN-SUFFIX,s-microsoft.com,DIRECT",
    "DOMAIN-SUFFIX,microsoftstore.com,DIRECT",
    "DOMAIN-SUFFIX,onestore.ms,DIRECT",
    "DOMAIN-SUFFIX,windowsmarketplace.com,DIRECT",
    "DOMAIN,storeedge.microsoft.com,DIRECT",
    "DOMAIN,storecorefulfillment.download.prss.microsoft.com,DIRECT",
    "GEOSITE,microsoft@cn,DIRECT",
    "DOMAIN-SUFFIX,msftconnecttest.com,DIRECT",
    "DOMAIN-SUFFIX,msftncsi.com,DIRECT",
    "DOMAIN-SUFFIX,windowsupdate.com,DIRECT",
    "DOMAIN-SUFFIX,windowsupdate.microsoft.com,DIRECT",
    "DOMAIN-SUFFIX,update.microsoft.com,DIRECT",
    "DOMAIN-SUFFIX,download.microsoft.com,DIRECT",
    "DOMAIN-SUFFIX,download.windowsupdate.com,DIRECT",
    "DOMAIN-SUFFIX,officecdn.microsoft.com,DIRECT",
    "DOMAIN-SUFFIX,officecdn.microsoft.com.edgesuite.net,DIRECT",
    "DOMAIN-SUFFIX,officecdn.microsoft.com.edgekey.net,DIRECT",
    "DOMAIN-SUFFIX,microsoft.com.cn,DIRECT",
    "DOMAIN-SUFFIX,microsoftstore.com.cn,DIRECT",
    "DOMAIN-SUFFIX,msauth.cn,DIRECT",
    "DOMAIN-SUFFIX,msftauth.cn,DIRECT",
    "DOMAIN-SUFFIX,msftauthimages.cn,DIRECT",
    "DOMAIN-SUFFIX,azure.cn,DIRECT",
    "DOMAIN-SUFFIX,azure-api.cn,DIRECT",
    "DOMAIN-SUFFIX,chinacloudapi.cn,DIRECT",
    "DOMAIN-SUFFIX,chinacloudapp.cn,DIRECT",
    "DOMAIN-SUFFIX,chinacloudsites.cn,DIRECT",
    "DOMAIN-SUFFIX,microsoftonline.cn,DIRECT",
    "DOMAIN-SUFFIX,partner.microsoftonline.cn,DIRECT",
    "DOMAIN-SUFFIX,sharepoint.cn,DIRECT",
    "DOMAIN-SUFFIX,21vbc.com,DIRECT",
    "DOMAIN-SUFFIX,21vbluecloud.com,DIRECT",
    "DOMAIN-SUFFIX,21vbluecloud.net,DIRECT",
    "RULE-SET,Bing,国际基础服务",
    "RULE-SET,OneDrive,国际基础服务",
    "RULE-SET,Microsoft,国际基础服务",
    "RULE-SET,Google,国际基础服务",
    "RULE-SET,PayPal,DIRECT",
    "RULE-SET,Oracle,DIRECT",
    "RULE-SET,Amazon,国际基础服务",
    "RULE-SET,Cloudflare,PROXY",
    "RULE-SET,DirectCN,DIRECT",
    "RULE-SET,Direct,DIRECT",
    "RULE-SET,WeChat,DIRECT",
    "RULE-SET,Alibaba,DIRECT",
    "RULE-SET,AliPay,DIRECT",
    "RULE-SET,Baidu,DIRECT",
    "RULE-SET,Tencent,DIRECT",
    "RULE-SET,JingDong,DIRECT",
    "RULE-SET,MeiTuan,DIRECT",
    "RULE-SET,Eleme,DIRECT",
    "RULE-SET,GaoDe,DIRECT",
    "RULE-SET,DiDi,DIRECT",
    "RULE-SET,Pinduoduo,DIRECT",
    "RULE-SET,ByteDance,DIRECT",
    "RULE-SET,DouYin,DIRECT",
    "RULE-SET,XiaoHongShu,DIRECT",
    "RULE-SET,Weibo,DIRECT",
    "RULE-SET,Sina,DIRECT",
    "RULE-SET,Sohu,DIRECT",
    "RULE-SET,Zhihu,DIRECT",
    "RULE-SET,DouBan,DIRECT",
    "RULE-SET,SMZDM,DIRECT",
    "RULE-SET,CSDN,DIRECT",
    "RULE-SET,JueJin,DIRECT",
    "RULE-SET,Gitee,DIRECT",
    "RULE-SET,NetEase,DIRECT",
    "RULE-SET,NetEaseMusic,DIRECT",
    "RULE-SET,Huawei,DIRECT",
    "RULE-SET,UnionPay,DIRECT",
    "RULE-SET,12306,DIRECT",
    "RULE-SET,BiliBili,DIRECT",
    "RULE-SET,TencentVideo,DIRECT",
    "RULE-SET,iQIYI,DIRECT",
    "RULE-SET,Youku,DIRECT",
    "RULE-SET,Migu,DIRECT",
    "RULE-SET,ChinaMedia,DIRECT",
    "DOMAIN-SUFFIX,uy5.net,DIRECT",
    "DOMAIN-SUFFIX,crxsoso.com,DIRECT",
    "RULE-SET,ChinaNoMedia,DIRECT",
    "RULE-SET,ChinaMaxNoIP,DIRECT",
    "RULE-SET,China,DIRECT",
    "GEOSITE,cn,DIRECT",
    "RULE-SET,Telegram,国际社区",
    "RULE-SET,Facebook,国际社区",
    "RULE-SET,Instagram,国际社区",
    "RULE-SET,Threads,国际社区",
    "RULE-SET,Whatsapp,国际社区",
    "RULE-SET,Twitter,国际社区",
    "RULE-SET,Snap,国际社区",
    "RULE-SET,Reddit,国际社区",
    "RULE-SET,Discord,国际社区",
    "RULE-SET,Netflix,PROXY",
    "RULE-SET,YouTube,国际社区",
    "RULE-SET,Spotify,日本",
    "RULE-SET,TikTok,国际社区",
    "RULE-SET,Disney,PROXY",
    "RULE-SET,HBO,PROXY",
    "RULE-SET,Bahamut,国际社区",
    "RULE-SET,GlobalMedia,PROXY",
    "RULE-SET,GitHub,国际基础服务",
    "RULE-SET,GitLab,国际基础服务",
    "RULE-SET,Developer,国际社区",
    "RULE-SET,Docker,国际社区",
    "RULE-SET,Figma,国际社区",
    "RULE-SET,DigitalOcean,国际社区",
    "RULE-SET,Notion,国际基础服务",
    "RULE-SET,Wikipedia,新加坡",
    "RULE-SET,Scholar,国际基础服务",
    "RULE-SET,GlobalScholar,国际社区",
    "RULE-SET,Dropbox,国际基础服务",
    "RULE-SET,AOL,国际基础服务",
    "RULE-SET,Protonmail,国际基础服务",
    "DOMAIN-SUFFIX,githubusercontent.com,国际社区",
    "DOMAIN-SUFFIX,githubassets.com,国际社区",
    "DOMAIN-SUFFIX,github.io,国际社区",
    "DOMAIN-SUFFIX,npmjs.com,国际社区",
    "DOMAIN-SUFFIX,registry.npmjs.org,国际社区",
    "DOMAIN-SUFFIX,pypi.org,国际社区",
    "DOMAIN-SUFFIX,pythonhosted.org,国际社区",
    "DOMAIN-SUFFIX,rust-lang.org,国际社区",
    "DOMAIN-SUFFIX,crates.io,国际社区",
    "DOMAIN-SUFFIX,docker.com,国际社区",
    "DOMAIN-SUFFIX,docker.io,国际社区",
    "DOMAIN-SUFFIX,ghcr.io,国际社区",
    "DOMAIN-SUFFIX,vercel.app,PROXY",
    "DOMAIN-SUFFIX,parallels.com,PROXY",
    "DOMAIN-SUFFIX,nssurge.com,PROXY",
    "DOMAIN,plugins.jetbrains.com,PROXY",
    "DOMAIN,jike.teracloud.jp,日本",
    "DOMAIN-SUFFIX,infini-cloud.net,日本",
    "DOMAIN-SUFFIX,giffgaff.com,英国",
    "DOMAIN-SUFFIX,yahoo.com,国际基础服务",
    "RULE-SET,EA,Game",
    "RULE-SET,Epic,Game",
    "RULE-SET,Gog,Game",
    "RULE-SET,Origin,Game",
    "RULE-SET,PlayStation,Game",
    "RULE-SET,Steam,Game",
    "RULE-SET,Xbox,Game",
    "RULE-SET,Blizzard,Game",
    "RULE-SET,Nintendo,Game",
    "RULE-SET,Game,Game",
    "RULE-SET,Speedtest,SpeedTest",
    "RULE-SET,Proxy,PROXY",
    "RULE-SET,Global,PROXY",
    "GEOSITE,geolocation-!cn,PROXY",
    "GEOIP,CN,DIRECT,no-resolve",
    "GEOIP,SG,新加坡,no-resolve",
    "GEOIP,TW,台湾,no-resolve",
    "GEOIP,HK,香港,no-resolve",
    "GEOIP,JP,日本,no-resolve",
    "GEOIP,KR,韩国,no-resolve",
    "GEOIP,US,美国,no-resolve",
    "MATCH,FINAL"
  ]
};

  Object.assign(config, override);
  return config;
}
