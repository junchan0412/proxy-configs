# proxy-configs

多客户端代理配置与模块入门仓库：以 Surge 根配置为分流基准，覆盖 **Surge、Mihomo / Clash、Loon、Egern、Quantumult X、Shadowrocket**。所有内容都以「叠加 / 增强」为原则，与你已有的主配置或订阅安全合并，**不替你做节点与订阅管理**。

聚焦「小而稳」：公开版均不含节点、订阅链接、本机端口、外部控制器、证书材料、本地 iCloud 路径等隐私信息。

## 分流基准（源配置：`根配置/Surge源配置.conf`，其余目录为各客户端参考实现）

源配置 `[Rule]` 的分流顺序（公开模板完整保留，仅做脱敏与本地路径改写）：

1. `AdBlock.list` 拦截 → iCloud 网关直连 → `Apple Music` 直连 → `surge/rules/pre-ai-infra.list`（国际基础服务）→ `surge/rules/ai-major.list`（AI）→ `surge/rules/direct-cn.list`（直连）；
2. 局域网/邮件端口/授时直连 → 大陆服务（`Special` + Bilibili/IQIYI/Letv/网易云/腾讯视频/Youku/WeTV + 微信/抖音/小红书/微博/PayPal/Oracle/ChinaMedia/ChinaMax）；
3. 游戏/测速（Speedtest → EA/Epic/Gog/Origin/PlayStation/Steam/steamcontent/Xbox）；
4. Apple（AppleTV/iCloud/AppleID/Apple）直连 → Microsoft/Google FCM/Google（国际基础服务）→ Cloudflare → `AI Suite`（AI）→ GitHub/GitLab；
5. 海外通信与国际社媒（Telegram + ASN 62014 → Facebook/Instagram/Threads/Whatsapp/Twitter/Snap/Reddit/Discord）；
6. 海外流媒体（Netflix/Disney+/Spotify→日本/TikTok/Max/YouTube/YouTube Music/Amazon/Pornhub → 国际社媒）；
7. 开发工具（Notion/Scholar→国际基础服务，Wikipedia→新加坡，Dropbox → 国际基础服务，Crypto→PROXY，AOL/Protonmail → 国际基础服务）；
8. 通用兜底（`gfw.txt` → `Proxy` → `Domestic` → `Domestic IPs` → `ASN.China`）→ IP 层（Telegram CIDR/ChinaIPs/cncidr/skk reject+stream）→ GeoIP（CN 直连，SG/TW/HK/JP/KR/US 分流）→ `FINAL`。

各客户端映射关系：

| 源概念 | Surge/Egern | Mihomo | Loon | Quantumult X | Shadowrocket |
|---|---|---|---|---|---|
| AdBlock 拦截 | `AdBlock.list` → REJECT | `AdvertisingLite` + dler `AdBlock` → REJECT | Advertising → REJECT | `AdBlock.list`（`force-policy=reject`） | AdBlock + Advertising → REJECT |
| Pre-AI/AI/DIRECT | 仓库 `surge/rules/*.list` | `PreAIInfra`/`AIMajor`/`DirectCN`（同源） | 同源三规则集 | 本地 host 兜底（`filter_local` §1-3） | 同源三规则集 |
| 大陆服务 | dler Special/媒体 + blackmatrix | dler Clash Provider（同名） | Loon 原生 list（BiliBili/iQIYI/LeTV/NetEaseMusic/WeChat/DouYin/ChinaMedia/ChinaMax） | GeQ1an China Media + Mainland/Domestic | dler Special/媒体 + blackmatrix SR/QX |
| 游戏/测速 | Speedtest/Game 各平台 | `Speedtest`/`Steam` 等 Clash Provider | Game/SpeedtestIntl + Steam/Xbox/PlayStation | Speedtest filter | SR Game/Speedtest |
| Apple/Microsoft/AI | Apple/Microsoft/GoogleFCM/AISuite | 同名 Clash Provider | Apple 系列 + Microsoft/Google lsr | Apple/AI Suite/Microsoft filter | 同名 SR 规则 |
| 社媒/流媒体 | Telegram/Discord/Netflix 等 | 同名 Clash Provider（策略见映射表） | Telegram/TikTok/Twitter…/Netflix/Disney/Spotify | Telegram/Crypto/Discord/Netflix/YouTube… | 同名 SR 规则 |
| 兜底 | gfw/Proxy/Domestic/DomesticIPs/ASN.China + GeoIP + FINAL | `Proxy`/`Global`/`GEOSITE:geolocation-!cn` + GEOIP + MATCH | Global Proxy + CN REGION + GeoIP + FINAL | `Outside→PROXY`、`Mainland/ASN/LAN→direct`、GeoIP 级联 + `final, FINAL` | gfw/Global/Proxy + GEOIP + FINAL |
| 策略组命名差异 | 与源一致 | 同左（另有 Apple服务） | `代理策略`≡PROXY、`兜底策略`≡FINAL，另有 Apple服务/国际流媒体/国内下载/国际下载 | 与源一致（另有 Apple服务、Emby）；远端清单内嵌英文策略由 `force-policy` 重映射 | 同 Surge（另有 Apple服务） |

## 目录结构

| 目录 | 内容 |
|---|---|
| `surge/` | Surge 公开配置 `Surge.conf`（由源配置脱敏生成）、公开规则集与功能增强模块 |
| `surge/rules/` | 三份公开规则集（Pre-AI 基础设施 / AI 主流服务 / 大陆直连） |
| `surge/modules/` | Surge 功能增强模块（`.sgmodule`），独立可开关，通过 `%APPEND%` / `%INSERT%` 与主配置合并 |
| `mihomo/` | Mihomo / Clash 公有完整配置与覆写模板（`.yaml` + 自动生成的 `.js`） |
| `loon/` | Loon 可复用干净配置模板（`.lcf`）与插件（`plugin/`） |
| `egern/` | Egern **原生 YAML** 配置 `egern.yaml`（`policy_groups` / `rules` / `dns` / `mitm`）与重写模块 `module/` |
| `quantumultx/` | Quantumult X 可复用干净配置模版与远端重写片段（`rewrite.snippet`） |
| `shadowrocket/` | Shadowrocket 可复用干净配置与远端重写片段（`rewrite.snippet`） |

## 可复用配置模板

| 客户端 | 配置 URL |
|---|---|
| Surge | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/Surge.conf` |
| Mihomo / Clash 完整模板 | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo.yaml` |
| Mihomo / Clash 覆写模板 | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo-override.yaml` |
| Mihomo / Clash JavaScript 覆写 | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo-override.js` |
| Loon | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/loon/loon.lcf` |
| Egern（原生 YAML） | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/egern/egern.yaml` |
| Quantumult X | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/quantumultx/quantumultx.conf` |
| Shadowrocket | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/shadowrocket/shadowrocket.conf` |

公开模板使用仓库内规则集：

| 规则集 | 作用 |
|---|---|
| `surge/rules/ai-major.list` | 官方或大规模 AI 服务，避免把普通小站或共享基础设施塞进 AI 策略 |
| `surge/rules/pre-ai-infra.list` | Stripe、Cloudflare Challenge、Google 通用后台等共享基础设施，放在 AI 前匹配 |
| `surge/rules/direct-cn.list` | 高频中国大陆网站和 CDN 直连兜底 |

> 模板不包含任何真实节点或订阅链接。请在客户端内添加自己的节点/订阅后，再使用策略组进行筛选或选择。

## 图标说明（均为各客户端原生图标字段）

| 客户端 | 图标字段 | 方案 |
|---|---|---|
| Surge | `icon-url=` | 内置 `B1::` / `EMOJI::` + `lige47/QuanX-icon-rule`、`fmz200/wool_scripts` 远端图标 |
| Egern | `icon:`（策略组内） | Qure（地区/入口）+ `lige47`（AI/Emby/SpeedTest）+ `fmz200`（国际社媒/Game），URL 随配置下发 |
| Mihomo / Clash | `proxy-groups[].icon` | `Koolson/Qure` IconSet（jsDelivr） |
| Loon | `img-url=` | `Orz-3/mini`（`Color/` + `Alpha/download.png`；`Proxy/ChatGPT/Download.png` 不存在，已替换为 `Static/OpenAI/Alpha-download`） |
| Quantumult X | `img-url=` | `Koolson/Qure` IconSet（jsDelivr），全部策略组内置 |
| Shadowrocket | —（客户端不支持随配置下发组图标） | 导入后可在客户端内手动配图 |


## 原生格式对照（不照搬 Surge）

| 客户端 | 文件 | 原生格式 | 与源配置的差异处理 |
|---|---|---|---|
| Surge | `surge/Surge.conf` | `[General]/[Proxy Group]/[Rule]/[Host]/[URL Rewrite]/[MITM]/[Script]` | 逐节脱敏（去订阅池、控制接口、CA、个人定时任务、个人银行 host） |
| Egern | `egern/egern.yaml` | YAML：`dns` / `policy_groups`（`external`/`smart`/`select`）/ `rules`（`rule_set`/`domain_suffix`/`geoip`/`ip_cidr`/`default`）/ `mitm.hostnames` | 源规则逐行映射；端口组合逻辑（`OR/AND DEST-PORT`）与 URL/Header 重写、cron 无原生等价项，已在文件内注释说明 |
| Mihomo | `mihomo/*.yaml` | Clash YAML：`proxy-groups` / `rule-providers` / `rules` / `dns.nameserver-policy` | `Rules/*.txt` → 仓库规则集；`[Host]` → `nameserver-policy`（含 `system://` 路由器域名）；URL 重写与 cron 无原生支持 |
| Loon | `loon/loon.lcf` | `[Remote Filter]/[Proxy Group]/[Rule]/[Remote Rule]/[Host]/[Rewrite]/[Script]/[Plugin]/[Mitm]` | 组内不使用 Surge 的 `url=`/`policy-regex-filter`（Loon 用 `[General]` 全局测速地址 + `Remote Filter`） |
| Quantumult X | `quantumultx/quantumultx.conf` | `[policy]`（`static`/`available` + `img-url`）/ `[filter_remote]`（`force-policy`）/ `[filter_local]` / `[rewrite_local]`（`url 302`/`url reject`/`request-header`）/ `[task_local]` | 远端清单内嵌英文策略由 `force-policy` 统一覆盖到源策略组；cron → `task_local` |
| Shadowrocket | `shadowrocket/shadowrocket.conf` | `[General]/[Proxy Group]/[Rule]/[URL Rewrite]/[MITM]` | 重写用 SR 原生 302 语法；无定时任务能力 |

## Surge 模块

| 模块 | 作用 |
|---|---|
| `surge/modules/Applications.sgmodule` | macOS 常见应用按进程分流（引用公开策略组名；个人设备条目已移除） |
| `surge/modules/google-redirect.sgmodule` | Google CN 全套重定向至国际版（搜索 / 地图 / 学术 / 翻译 / 书籍） |
| `surge/modules/redirect-enhance.sgmodule` | Bing 国内版跳国际版、维基百科移动版跳桌面版、知乎/微博/简书外链直跳 |
| `surge/modules/dns-mapping.sgmodule` | 为阿里系 / 腾讯系核心域名指定对应厂商的加密 DNS（DoH） |

### 安装

在 Surge 中：**Modules → 安装新模块 → 从 URL 安装**，填入对应模块的 jsdelivr 地址：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/modules/Applications.sgmodule
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/modules/google-redirect.sgmodule
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/modules/redirect-enhance.sgmodule
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/modules/dns-mapping.sgmodule
```

> 走 jsdelivr CDN 而非 raw.githubusercontent.com，国内访问更稳定。

#### 设计说明

- **合并而非覆盖**：模块用 `%APPEND%`（追加到列表）/ `%INSERT%`（插入到列表头部）与主配置合并。例如 `google-redirect` 的 MITM hostname 用 `%INSERT%`，只新增 Google 相关主机，不动你已有的 hostname 列表。
- **MITM 自包含**：凡需要解密 HTTPS 才能生效的重写，模块自带对应的 `[MITM] hostname` 声明，开箱即用。

## Mihomo / Clash 配置

`mihomo/mihomo.yaml` 是一份公有完整模板：包含 DNS（fake-ip + 分流 nameserver-policy）、sniffer、tun、地区节点筛选锚点、策略组与按场景分流的 `rule-providers` / `rules`。

模板内置 `NodeParam` 节点订阅参数锚点，并提供 `机场一` / `机场二` / `机场三` 三个 provider 示例。用户只需要替换对应的 `url` 即可直接使用；策略组已启用 `include-all-providers`，会自动读取订阅内节点，并通过 `additional-prefix` 区分不同机场来源。

App Store 与 Apple 媒体相关域名会先进入 `Apple服务` 策略组，默认直连以保证 ClashMac / macOS 原生商店加载稳定；需要外区商店时，可在客户端中把 `Apple服务` 手动切换到 `国际基础服务`、`PROXY` 或指定地区节点。

Mihomo 模板中的上游规则集和 geodata 默认使用 jsDelivr 地址，减少首次导入时因 `raw.githubusercontent.com` 连接不稳定导致的规则下载失败。

**与源配置的同步点**：业务策略组成员与源一致（`国际基础服务=新加坡,美国,PROXY`、`AI=台湾,美国,新加坡,PROXY`、`国际社媒=新加坡,美国,台湾,PROXY`、`Game=香港,日本,美国,台湾,PROXY,DIRECT`、`SpeedTest=香港,新加坡,美国,DIRECT`）；时延优选统一 `interval: 300 / tolerance: 50`、测速地址 `http://cp.cloudflare.com/generate_204`；源 `[Host]` 逐域名映射到 `dns.nameserver-policy`（阿里系 → alidns DoH、腾讯系 → doh.pub、TestFlight → Cloudflare DoH、路由器域名 → `system://`）。App Store / Microsoft Store 定向直连插在宽泛 `Apple`/`Microsoft` 规则之前，`ChinaMaxNoIP` + `GEOSITE,cn` 兜底位于 GeoIP 之前。URL 重写与定时任务 Mihomo 无原生支持，未移植。

完整模板可直接作为基础配置导入，再补充自己的节点或订阅：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo.yaml
```

`mihomo/mihomo-override.yaml` 是与完整模板对应的覆写版本。

作为 **override / 覆写规则** 在客户端中叠加到你的订阅配置之上即可使用：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo-override.yaml
```

支持 `main(config)` 脚本覆写的客户端（如 Clash Verge Rev、Mihomo Party）也可以使用 JavaScript 版本：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo-override.js
```

JavaScript 覆写会保留订阅中的 `proxies`、`proxy-providers`、监听端口和控制器设置，只替换与 YAML override 相同的 DNS、TUN、策略组和分流配置。该文件由 `scripts/generate-mihomo-js-override.rb` 从 YAML 自动生成，避免两个版本出现规则差异。

> 公开版不含节点、订阅链接、本机端口和外部控制器配置，请在客户端侧自行补充。

## Loon 配置

`loon/loon.lcf` 使用 Loon 配置模板常用的 `.lcf` 后缀，section、`Remote Filter`、`Remote Rule`、策略组和 `Mitm` 写法参考 [ProxyResource 的 Loon Lcf 模板](https://github.com/luestr/ProxyResource/tree/main/Tool/Loon/Lcf/zh-CN)。配置按高优先级例外、拦截/LAN、AI/Apple、国内直连、游戏/社媒/流媒体、开发与国际基础服务、通用海外、GeoIP 和 `FINAL` 的顺序分流，并使用 Loon 原生 `.lsr` / `.list` 远程规则。模板不包含真实节点或订阅，导入后需在 Loon 中添加自己的节点。

**与源配置的同步点**：业务策略组成员与源一致（`国际基础服务/AI/国际社媒/Game/SpeedTest`，`PROXY`→`代理策略`、`FINAL`→`兜底策略`）；所有 url-test 组 `interval=300,tolerance=50`，`[General]` 测速地址同步为源的 `internet-test-url` / `proxy-test-url`；`[Remote Rule]` 62 条覆盖源 §0–§11 概念（含 Loon 原生 list 补齐 BiliBili/iQIYI/LeTV/NetEaseMusic/WeChat/Steam/Xbox/AppleTV/iCloud 等）。Loon 组内不写 `url=`（组级 `url` 非 Loon 原生选项，测速地址统一走 `[General]`）。`[Rewrite]` 与源 §URL Rewrite 一致（Google 重定向 + 国内站点规范化），`[Script]` 提供默认注释的 cron 示例。

`loon/plugin/` 下有两个与 Surge 模块同意图的插件，按需在 `[Plugin]` 中引用：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/loon/plugin/redirect.plugin
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/loon/plugin/dns-mapping.plugin
```

## Egern 配置（原生 YAML）

`egern/egern.yaml` 是按 Egern **原生 YAML 语法**生成的完整配置（不是 Surge conf 的复制）：

- 顶层：`ipv6` / `http_port` / `socks_port` / `hijack_dns`（源 `hijack-dns`）/ `geoip_db_url` / `vif_excluded_routes`（源 `skip-proxy` 网段）/ `real_ip_domains`（源 `always-real-ip`）；
- `dns`：`bootstrap` + `upstreams`（Alibaba / Tencent / Cloudflare / China / Global）+ `forward`（源 `[Host]` 逐域名 → 对应 DoH；仓库三规则集 → 国内/跨境；兜底 → China）+ `proxy_nameservers`；
- `policy_groups`：`external`（订阅池占位）→ `smart` 区域组（`flatten + filter` 对应源 `include-other-group + policy-regex-filter`）→ `select` 业务组（成员与源一致）→ `smart Auto`（只在区域组上优选）；
- `rules`：源 §0–§11 逐行映射为 `rule_set` / `domain_suffix` / `domain` / `geoip(no_resolve)` / `ip_cidr` / `ip_asn` / `default`，`REJECT-DROP` 归一为 `REJECT`；
- `mitm.hostnames`：仅含 Google 系重写所需主机，`excludes` 对应源 `hostname-disabled`，不含任何证书材料。

源配置中 Egern 无原生等价项的部分已在文件内注释标注：端口组合逻辑（`OR/AND DEST-PORT`）、URL/Header 重写、cron 定时任务（Egern 的 `scriptings` 是面板脚本，非 cron）。

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/egern/egern.yaml
```

`egern/module/` 下两枚重写模块（Google 重定向 / 重定向增强）以 Egern 支持的模块 section 编写，按模块方式安装：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/egern/module/google-redirect.sgmodule
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/egern/module/redirect-enhance.sgmodule
```
## Quantumult X 配置（原生格式）

`quantumultx/quantumultx.conf` 使用 QX 原生语法，与源配置逐节对应：

- `[policy]`：源策略组 → QX 原生 `static`（选择组）与 `available`（按节点名正则自动归类，对应源 `policy-regex-filter`），全部策略组带 Qure `img-url` 图标；
- `[filter_remote]`：GeQ1an Stick Rules 22 条远端清单，逐条 `force-policy=` 覆盖到源策略组（清单内嵌的英文策略被统一重映射：Netflix/Disney/YouTube 系 → `国际社媒`、Spotify → `日本`、Microsoft → `国际基础服务`、Outside → `PROXY`、Mainland/Apple/PayPal/Special → `direct` 等）；
- `[filter_local]`：本机/局域网、iCloud 网关、仓库三规则集展开（QX 为 `host-suffix` 原生行）、App Store → `Apple服务`、AI → `AI`；
- GeoIP 级联与源一致（`cn→direct`，`sg/tw/hk/jp/kr/us` → 对应地区组），末尾 `final, FINAL`；
- `[rewrite_local]`：源 §URL Rewrite / §Header Rewrite 的 QX 原生写法（`url 302` / `url reject` / `url request-header`）；
- `[task_local]`：源 §Script 定时任务的 QX 原生写法（默认注释）。

`quantumultx/rewrite.snippet` 是同一套重写的远端片段，已在 `[rewrite_remote]` 中默认注释引用：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/quantumultx/rewrite.snippet
```
## Shadowrocket 配置

`shadowrocket/shadowrocket.conf` 为 SR 原生格式（`[General]/[Proxy Group]/[Rule]/[URL Rewrite]/[MITM]`）：

- 策略组成员与源一致（`国际基础服务/AI/国际社媒/Game/SpeedTest`，另保留 SR 常用的 `Apple服务` 与 `Emby`），url-test 组统一 `interval=300,tolerance=50` + 源测速地址；
- `[Rule]` 使用 SR 原生 `RULE-SET` 写法：dler Special/媒体/Apple/Microsoft/Google FCM/AI Suite/Telegram/社媒/流媒体 + blackmatrix SR/QX 清单 + `gfw.txt` / `Domestic` / GeoIP / `FINAL`，顺序与源 §0–§11 一致；
- `[URL Rewrite]` 与源 §URL Rewrite 一致（SR 原生 302 语法），`[MITM]` 仅保留重写所需主机；SR 不支持定时任务。

`shadowrocket/rewrite.snippet` 是同一套重写的远端片段（`[URL Rewrite]` + `[MITM]`），按需引用：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/shadowrocket/rewrite.snippet
```

`shadowrocket/module/iTunes.module` 为已有的 iTunes 示例模块，保持不变。
## 校验

```bash
ruby -e 'require "yaml"; YAML.load_file("mihomo/mihomo.yaml"); YAML.load_file("mihomo/mihomo-override.yaml")'
ruby scripts/generate-mihomo-js-override.rb mihomo/mihomo-override.yaml /tmp/check.js && cmp /tmp/check.js mihomo/mihomo-override.js
ruby scripts/validate-loon.rb loon/loon.lcf
ruby -ryaml -e 'YAML.load_file("egern/egern.yaml")'
python3 scripts/sync-check.py
```

- `scripts/sync-check.py`：以 `根配置/Surge源配置.conf` 为基准，断言六个客户端公开配置的业务策略组成员、测速参数（`interval=300/tolerance=50`）、规则概念覆盖（源 §0–§11）与隐私脱敏（订阅池/控制接口/CA/个人主机）。
- `scripts/preflight-public.sh`：本机全量校验（Surge 语法、Mihomo 策略与规则不变量、Loon 结构、Egern YAML、同步断言、公开文件清单）。
- CI（`.github/workflows/validate.yml`）在 push / PR 时运行：Mihomo YAML 解析与 JS 覆写同步、Loon 校验、Egern YAML 解析、跨客户端同步断言、公开敏感信息扫描。

### 同步口径

| 项 | 处理 |
|---|---|
| 业务策略组成员（国际基础服务/AI/国际社媒/Game/SpeedTest） | 六端与源逐项一致（断言强制） |
| 时延优选参数、测速地址 | 统一为源的 `interval=300 / tolerance=50` 与 `cp.cloudflare.com/generate_204` |
| 规则顺序与概念 | 逐端按其原生语法映射源 §0–§11（远端清单按概念归位） |
| `[Host]` 域名级 DoH | Surge/Mihomo/Egern/Loon 原生支持已同步；QX、Shadowrocket 无对应能力，使用全局 DNS 设置 |
| URL / Header 重写 | Surge/Egern 模块/QX/Loon/Shadowrocket 已按原生语法同步；Mihomo 无原生重写 |
| cron 定时任务 | Surge/QX/Loon 提供默认注释的原生写法；Mihomo、Egern、Shadowrocket 无 cron 能力 |
| 端口组合逻辑（`OR/AND DEST-PORT`） | Egern 无原生等价项，文件内注释标注；其余端均保留或由等价清单覆盖 |
| 订阅池（源 `机场合集`） | 含 `sub.store` 地址，公开版移除；Egern/Mihomo 以占位 URL 的 `external` / `proxy-providers` 呈现 |


## License

MIT
