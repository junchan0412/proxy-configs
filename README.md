# proxy-configs

多客户端代理配置与模块入门仓库：以 Surge 根配置为分流基准，覆盖 **Surge、Mihomo / Clash、Loon、Egern、Quantumult X、Shadowrocket**。所有内容都以「叠加 / 增强」为原则，与你已有的主配置或订阅安全合并，**不替你做节点与订阅管理**。

聚焦「小而稳」：公开版均不含节点、订阅链接、本机端口、外部控制器、证书材料、本地 iCloud 路径等隐私信息。

## 分流基准（源配置意图）

- 先拦截（`reject.txt`）与局域网，再处理 iCloud 网关与自有规则；
- `pre-ai-infra.list`（共享基础设施）→ `ai-major.list`（官方/大规模 AI）→ `direct-cn.list`（大陆直连兜底）；
- 再按国内服务 → 游戏/测速 → Apple/Microsoft/国际基础服务 → 国际社媒 → 流媒体 → 开发工具 → 通用海外兜底（`gfw.txt` + `Proxy_All_No_Resolve`）→ IP/GeoIP → `FINAL` 的顺序分流。

## 目录结构

| 目录 | 内容 |
|---|---|
| `surge/` | Surge 可复用干净配置、公开规则集与功能增强模块 |
| `surge/rules/` | 三份公开规则集（Pre-AI 基础设施 / AI 主流服务 / 大陆直连） |
| `surge/modules/` | Surge 功能增强模块（`.sgmodule`），独立可开关，通过 `%APPEND%` / `%INSERT%` 与主配置合并 |
| `mihomo/` | Mihomo / Clash 公有完整配置与覆写模板（`.yaml` + 自动生成的 `.js`） |
| `loon/` | Loon 可复用干净配置模板（`.lcf`）与插件（`plugin/`） |
| `egern/` | Egern 可复用干净配置（Surge 兼容语法）与模块（`module/`，与 Surge 模块同源） |
| `quantumultx/` | Quantumult X 可复用干净配置模版与远端重写片段（`rewrite.snippet`） |
| `shadowrocket/` | Shadowrocket 可复用干净配置与远端重写片段（`rewrite.snippet`） |
| `Rules/Surge/` | Surge 专用规则集归档（`AI.txt` / `Pre-AI.txt`，与 `surge/rules/` 同源） |

## 可复用配置模板

| 客户端 | 配置 URL |
|---|---|
| Surge | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/Surge.clean.conf` |
| Mihomo / Clash 完整模板 | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo.yaml` |
| Mihomo / Clash 覆写模板 | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo-override.yaml` |
| Mihomo / Clash JavaScript 覆写 | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo-override.js` |
| Loon | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/loon/loon.lcf` |
| Egern | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/egern/egern.conf` |
| Quantumult X | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/quantumultx/quantumultx.conf` |
| Shadowrocket | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/shadowrocket/shadowrocket.conf` |

公开模板使用仓库内规则集：

| 规则集 | 作用 |
|---|---|
| `surge/rules/ai-major.list` | 官方或大规模 AI 服务，避免把普通小站或共享基础设施塞进 AI 策略 |
| `surge/rules/pre-ai-infra.list` | Stripe、Cloudflare Challenge、Google 通用后台等共享基础设施，放在 AI 前匹配 |
| `surge/rules/direct-cn.list` | 高频中国大陆网站和 CDN 直连兜底 |

> 模板不包含任何真实节点或订阅链接。请在客户端内添加自己的节点/订阅后，再使用策略组进行筛选或选择。

## 图标说明

| 客户端 | 图标方案 | 备注 |
|---|---|---|
| Surge | 内置 `B1::` / `EMOJI::` 图标 + `lige47/QuanX-icon-rule`、`fmz200/wool_scripts` 远端图标 | 原生支持，随配置下发 |
| Mihomo / Clash | `Koolson/Qure` IconSet（`proxy-groups[].icon`，走 jsDelivr） | 完整模板与覆写模板共用同一套 |
| Loon | `Orz-3/mini`（`Color/` + `Alpha/download.png`，经可用性校验） | `Proxy.png` / `ChatGPT.png` / `Download.png` 在该仓库不存在，已分别替换为 `Static.png` / `OpenAI.png` / `Alpha/download.png` |
| Egern | 与 Surge 相同（Surge 兼容语法） | 无需额外图标配置 |
| Quantumult X / Shadowrocket | 暂不内置策略组图标（客户端不支持随配置下发的统一图标方案） | 策略组命名与 Surge 对齐，导入后可在客户端内手动配图 |

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

`loon/plugin/` 下有两个与 Surge 模块同意图的插件，按需在 `[Plugin]` 中引用：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/loon/plugin/redirect.plugin
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/loon/plugin/dns-mapping.plugin
```

## Egern 配置

`egern/egern.conf` 与 Surge 语法兼容，可直接导入 Egern；`egern/module/` 下四个模块与 `surge/modules/` 同源（Google 重定向 / 重定向增强 / DNS 映射 / Applications 进程分流），在 Egern 内按模块方式安装即可。

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/egern/egern.conf
```

## Quantumult X 配置

`quantumultx/quantumultx.conf` 是一份公有模板：包含基础网络设置、DNS、节点示范、策略组、分流规则、URL Rewrite 与 MITM 占位。

它沿用与当前 Surge / Mihomo 版本相近的分流意图：先处理本地与国内常用服务，再分流 AI、国际社媒、流媒体与游戏，最后落到 `FINAL`。策略组支持 `img-url`（见官方 `sample.conf`），本模板暂未内置以保持入门简洁；如需配图，可按 `static = 策略名, 候选..., img-url=https://example.com/icon.png` 自行追加。

`quantumultx/rewrite.snippet` 是与 Surge 重定向模块同意图的远端重写片段，已在配置的 `[rewrite_remote]` 中默认注释引用：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/quantumultx/rewrite.snippet
```

## Shadowrocket 配置

`shadowrocket/shadowrocket.conf` 是一份公有模板：包含基础网络设置、DNS、策略组、分流规则、URL Rewrite 与 MITM 占位，分流顺序与 Surge 源配置对齐（拦截 → iCloud/自有规则 → AI → 国内服务 → 游戏/国际基础服务/社媒/流媒体 → 通用兜底 → `FINAL`）。

`shadowrocket/rewrite.snippet` 是与 Surge 重定向模块同意图的远端重写片段（`[URL Rewrite]` + `[MITM]`），按需引用：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/shadowrocket/rewrite.snippet
```

`shadowrocket/module/iTunes.module` 为已有的 iTunes 解锁示例模块，保持不变。

## 校验

```bash
ruby -e 'require "yaml"; YAML.load_file("mihomo/mihomo.yaml"); YAML.load_file("mihomo/mihomo-override.yaml")'
ruby scripts/generate-mihomo-js-override.rb mihomo/mihomo-override.yaml /tmp/check.js && cmp /tmp/check.js mihomo/mihomo-override.js
ruby scripts/validate-loon.rb loon/loon.lcf
```

CI（`.github/workflows/validate.yml`）在每次 push / PR 时运行同样的 YAML 解析、JS 同步、Loon 校验与公开敏感信息扫描。

## License

MIT
