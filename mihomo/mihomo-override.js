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
      "name": "国际社媒",
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
      "filter": "^(?=.*((?i)🇯🇵|日本|东京|大阪|埼玉|(\\b(JP|JPN|Japan)(\\d+)?\\b)))(?!.*((?i)回国|校园|游戏|🎮|(\\b(GAME)\\b))).*$",
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
  "rules": [
    "RULE-SET,AdvertisingLite,REJECT",
    "RULE-SET,iCloud,DIRECT",
    "RULE-SET,PreAIInfra,国际基础服务",
    "RULE-SET,AIMajor,AI",
    "RULE-SET,DirectCN,DIRECT",
    "RULE-SET,AppleMedia,DIRECT",
    "RULE-SET,Lan,DIRECT",
    "GEOSITE,private,DIRECT",
    "RULE-SET,AdBlock,REJECT",
    "RULE-SET,Special,DIRECT",
    "RULE-SET,Netflix,国际社媒",
    "RULE-SET,Disney Plus,国际社媒",
    "RULE-SET,YouTube,国际社媒",
    "RULE-SET,Max,国际社媒",
    "RULE-SET,Spotify,日本",
    "RULE-SET,Abema TV,国际社媒",
    "RULE-SET,Bahamut,国际社媒",
    "RULE-SET,DMM,国际社媒",
    "RULE-SET,Fox+,国际社媒",
    "RULE-SET,Hulu Japan,国际社媒",
    "RULE-SET,IQ,国际社媒",
    "RULE-SET,Japonx,国际社媒",
    "RULE-SET,JOOX,国际社媒",
    "RULE-SET,KKBOX,国际社媒",
    "RULE-SET,KKTV,国际社媒",
    "RULE-SET,Line TV,国际社媒",
    "RULE-SET,myTV SUPER,国际社媒",
    "RULE-SET,Niconico,国际社媒",
    "RULE-SET,ViuTV,国际社媒",
    "RULE-SET,ABC,PROXY",
    "RULE-SET,Amazon,PROXY",
    "RULE-SET,BBC iPlayer,PROXY",
    "RULE-SET,DAZN,PROXY",
    "RULE-SET,Discovery Plus,PROXY",
    "RULE-SET,encoreTVB,PROXY",
    "RULE-SET,F1 TV,PROXY",
    "RULE-SET,Fox Now,PROXY",
    "RULE-SET,Hulu,PROXY",
    "RULE-SET,Pandora,PROXY",
    "RULE-SET,PBS,PROXY",
    "RULE-SET,Pornhub,PROXY",
    "RULE-SET,Soundcloud,PROXY",
    "RULE-SET,Bilibili,DIRECT",
    "RULE-SET,IQIYI,DIRECT",
    "RULE-SET,Letv,DIRECT",
    "RULE-SET,Netease Music,DIRECT",
    "RULE-SET,Tencent Video,DIRECT",
    "RULE-SET,WeTV,DIRECT",
    "RULE-SET,Youku,DIRECT",
    "RULE-SET,Telegram,国际社媒",
    "RULE-SET,Crypto,PROXY",
    "RULE-SET,Discord,国际社媒",
    "RULE-SET,Google FCM,国际基础服务",
    "RULE-SET,Microsoft,国际基础服务",
    "RULE-SET,AI Suite,AI",
    "RULE-SET,PayPal,DIRECT",
    "RULE-SET,Scholar,国际基础服务",
    "RULE-SET,Speedtest,SpeedTest",
    "RULE-SET,Steam,Game",
    "RULE-SET,TikTok,国际社媒",
    "RULE-SET,Apple Music,Apple服务",
    "RULE-SET,Apple News,Apple服务",
    "RULE-SET,Apple TV,Apple服务",
    "RULE-SET,Apple Push,Apple服务",
    "RULE-SET,Apple,Apple服务",
    "RULE-SET,miHoYo,Game",
    "RULE-SET,PROXY,PROXY",
    "RULE-SET,Domestic,DIRECT",
    "RULE-SET,Domestic IPs,DIRECT",
    "RULE-SET,LAN,DIRECT",
    "DOMAIN-SUFFIX,apps.apple.com,Apple服务",
    "DOMAIN-SUFFIX,apps-marketplace.apple.com,Apple服务",
    "DOMAIN-SUFFIX,appstore.com,Apple服务",
    "DOMAIN-SUFFIX,itunes.apple.com,Apple服务",
    "DOMAIN-SUFFIX,mzstatic.com,Apple服务",
    "DOMAIN-SUFFIX,aaplimg.com,Apple服务",
    "DOMAIN,ppq.apple.com,Apple服务",
    "RULE-SET,AppleProxy,Apple服务",
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
      "interval": 86400,
      "format": "text",
      "path": "./rules/DirectCN.list",
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/rules/direct-cn.list"
    },
    "PreAIInfra": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "text",
      "path": "./rules/PreAIInfra.list",
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/rules/pre-ai-infra.list"
    },
    "AIMajor": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "text",
      "path": "./rules/AIMajor.list",
      "url": "https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/rules/ai-major.list"
    },
    "Lan": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Lan.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Lan/Lan.yaml"
    },
    "iCloud": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/iCloud.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/iCloud/iCloud.yaml"
    },
    "AppleProxy": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/AppleProxy.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/AppleProxy/AppleProxy.yaml"
    },
    "AppleMedia": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/AppleMedia.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/AppleMedia/AppleMedia.yaml"
    },
    "Proxy": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Proxy.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Proxy/Proxy.yaml"
    },
    "Global": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Global.yaml",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Global/Global.yaml"
    },
    "AdBlock": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/AdBlock.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/AdBlock.yaml"
    },
    "Special": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Special.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Special.yaml"
    },
    "PROXY": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/PROXY.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Proxy.yaml"
    },
    "Domestic": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Domestic.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Domestic.yaml"
    },
    "Domestic IPs": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Domestic_IPs.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Domestic%20IPs.yaml"
    },
    "LAN": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/LAN.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/LAN.yaml"
    },
    "Netflix": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Netflix.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Netflix.yaml"
    },
    "Spotify": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Spotify.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Spotify.yaml"
    },
    "YouTube": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/YouTube.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/YouTube.yaml"
    },
    "Max": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Max.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Max.yaml"
    },
    "Bilibili": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Bilibili.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Bilibili.yaml"
    },
    "IQ": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/IQ.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/IQ.yaml"
    },
    "IQIYI": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/IQIYI.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/IQIYI.yaml"
    },
    "Letv": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Letv.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Letv.yaml"
    },
    "Netease Music": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Netease_Music.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Netease%20Music.yaml"
    },
    "Tencent Video": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Tencent_Video.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Tencent%20Video.yaml"
    },
    "Youku": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Youku.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Youku.yaml"
    },
    "WeTV": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/WeTV.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/WeTV.yaml"
    },
    "ABC": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/ABC.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/ABC.yaml"
    },
    "Abema TV": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Abema_TV.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Abema%20TV.yaml"
    },
    "Amazon": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Amazon.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Amazon.yaml"
    },
    "Apple Music": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Apple_Music.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Apple%20Music.yaml"
    },
    "Apple News": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Apple_News.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Apple%20News.yaml"
    },
    "Apple TV": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Apple_TV.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Apple%20TV.yaml"
    },
    "Bahamut": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Bahamut.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Bahamut.yaml"
    },
    "BBC iPlayer": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/BBC_iPlayer.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/BBC%20iPlayer.yaml"
    },
    "DAZN": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/DAZN.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/DAZN.yaml"
    },
    "Discovery Plus": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Discovery_Plus.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Discovery%20Plus.yaml"
    },
    "Disney Plus": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Disney_Plus.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Disney%20Plus.yaml"
    },
    "DMM": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/DMM.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/DMM.yaml"
    },
    "encoreTVB": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/encoreTVB.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/encoreTVB.yaml"
    },
    "F1 TV": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/F1_TV.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/F1%20TV.yaml"
    },
    "Fox Now": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Fox_Now.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Fox%20Now.yaml"
    },
    "Fox+": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/FoxPlus.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Fox%2B.yaml"
    },
    "Hulu Japan": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Hulu_Japan.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Hulu%20Japan.yaml"
    },
    "Hulu": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Hulu.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Hulu.yaml"
    },
    "Japonx": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Japonx.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Japonx.yaml"
    },
    "JOOX": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/JOOX.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/JOOX.yaml"
    },
    "KKBOX": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/KKBOX.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/KKBOX.yaml"
    },
    "KKTV": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/KKTV.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/KKTV.yaml"
    },
    "Line TV": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Line_TV.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Line%20TV.yaml"
    },
    "myTV SUPER": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/myTV_SUPER.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/myTV%20SUPER.yaml"
    },
    "Niconico": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Niconico.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Niconico.yaml"
    },
    "Pandora": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Pandora.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Pandora.yaml"
    },
    "PBS": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/PBS.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/PBS.yaml"
    },
    "Pornhub": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Pornhub.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Pornhub.yaml"
    },
    "Soundcloud": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Soundcloud.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Soundcloud.yaml"
    },
    "ViuTV": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/ViuTV.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/ViuTV.yaml"
    },
    "Telegram": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Telegram.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Telegram.yaml"
    },
    "Crypto": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Crypto.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Crypto.yaml"
    },
    "Discord": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Discord.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Discord.yaml"
    },
    "Steam": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Steam.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Steam.yaml"
    },
    "TikTok": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/TikTok.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/TikTok.yaml"
    },
    "Speedtest": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Speedtest.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Speedtest.yaml"
    },
    "PayPal": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/PayPal.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/PayPal.yaml"
    },
    "Microsoft": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Microsoft.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Microsoft.yaml"
    },
    "AI Suite": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/AI_Suite.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/AI%20Suite.yaml"
    },
    "Apple": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Apple.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Apple.yaml"
    },
    "Apple Push": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Apple_Push.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Apple%20Push.yaml"
    },
    "Google FCM": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Google_FCM.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Google%20FCM.yaml"
    },
    "Scholar": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/Scholar.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Scholar.yaml"
    },
    "miHoYo": {
      "type": "http",
      "behavior": "classical",
      "interval": 86400,
      "format": "yaml",
      "path": "./rules/miHoYo.yaml",
      "url": "https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/miHoYo.yaml"
    }
  }
};

  Object.assign(config, override);
  return config;
}
