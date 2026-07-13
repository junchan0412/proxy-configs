# proxy-configs

自用的代理客户端配置合集，覆盖 **Surge**、**Shadowrocket**、**Quantumult X** 与 **Mihomo / Clash** 生态。所有内容都以「叠加 / 增强」为原则，与你已有的主配置或订阅安全合并，**不替你做节点与订阅管理**。

聚焦"小而稳"：公开版均不含节点、订阅链接、本机端口、外部控制器、证书材料、本地 iCloud 路径等隐私信息。

## 目录结构

| 目录 | 内容 |
|---|---|
| `surge/` | Surge 可复用干净配置、公开规则集与功能增强模块 |
| `shadowrocket/` | Shadowrocket 可复用干净配置 |
| `quantumultx/` | Quantumult X 可复用干净配置模版 |
| `mihomo/` | Mihomo / Clash 公有完整配置与覆写模板（`.yaml`） |
| `Rules/Surge/` | Surge 专用规则集归档 |
| `surge/modules/` | Surge 功能增强模块（`.sgmodule`），独立可开关，通过 `%APPEND%` / `%INSERT%` 与主配置合并 |

## 可复用配置模板

| 客户端 | 配置 URL |
|---|---|
| Surge | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/Surge.clean.conf` |
| Shadowrocket | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/shadowrocket/shadowrocket.conf` |
| Quantumult X | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/quantumultx/quantumultx.conf` |
| Mihomo / Clash 完整模板 | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo.yaml` |
| Mihomo / Clash 覆写模板 | `https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo-override.yaml` |

公开模板使用仓库内规则集：

| 规则集 | 作用 |
|---|---|
| `surge/rules/ai-major.list` | 官方或大规模 AI 服务，避免把普通小站或共享基础设施塞进 AI 策略 |
| `surge/rules/pre-ai-infra.list` | Stripe、Cloudflare Challenge、Google 通用后台等共享基础设施，放在 AI 前匹配 |
| `surge/rules/direct-cn.list` | 高频中国大陆网站和 CDN 直连兜底 |

> 模板不包含任何真实节点或订阅链接。请在客户端内添加自己的节点/订阅后，再使用策略组进行筛选或选择。
> 私有 Emby/Jellyfin 服务器、元数据与字幕规则建议放在本地模块或私有规则集中，不放入公开仓库。

## Surge 模块

| 模块 | 作用 |
|---|---|
| `surge/modules/google-redirect.sgmodule` | Google CN 全套重定向至国际版（搜索 / 地图 / 学术 / 翻译 / 书籍） |
| `surge/modules/redirect-enhance.sgmodule` | Bing 国内版跳国际版、维基百科移动版跳桌面版、知乎/微博/简书外链直跳 |
| `surge/modules/dns-mapping.sgmodule` | 为阿里系 / 腾讯系核心域名指定对应厂商的加密 DNS（DoH） |

### 安装

在 Surge 中：**Modules → 安装新模块 → 从 URL 安装**，填入对应模块的 jsdelivr 地址：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/modules/google-redirect.sgmodule
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/modules/redirect-enhance.sgmodule
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/surge/modules/dns-mapping.sgmodule
```

> 走 jsdelivr CDN 而非 raw.githubusercontent.com，国内访问更稳定。

#### 设计说明

- **合并而非覆盖**：模块用 `%APPEND%`（追加到列表）/ `%INSERT%`（插入到列表头部）与主配置合并。例如 `google-redirect` 的 MITM hostname 用 `%INSERT%`，只新增 Google 相关主机，不动你已有的 hostname 列表。
- **MITM 自包含**：凡需要解密 HTTPS 才能生效的重写，模块自带对应的 `[MITM] hostname` 声明，开箱即用。
- **可被校验**：本仓库所有 Surge 模块均通过 [surge-doctor](https://github.com/junchan0412/surge-doctor) 校验（`#!name` 元数据完整、重写源主机均已在 MITM 声明）。

校验任一模块：

```bash
surge-doctor check surge/modules/google-redirect.sgmodule
```

## Mihomo / Clash 配置

`mihomo/mihomo.yaml` 是一份公有完整模板：包含 DNS（fake-ip + 分流 nameserver-policy）、sniffer、tun、地区节点筛选锚点、策略组与按场景分流的 `rule-providers` / `rules`。

模板内置 `NodeParam` 节点订阅参数锚点，并提供 `机场一` / `机场二` / `机场三` 三个 provider 示例。用户只需要替换对应的 `url` 即可直接使用；策略组已启用 `include-all-providers`，会自动读取订阅内节点，并通过 `additional-prefix` 区分不同机场来源。

App Store 与 Apple 媒体相关域名会先进入 `Apple服务` 策略组，默认直连以保证 ClashMac / macOS 原生商店加载稳定；需要外区商店时，可在客户端中把 `Apple服务` 手动切换到 `国际基础服务`、`PROXY` 或指定地区节点。

Windows Microsoft Store 的目录、授权、购买、图片和下载端点会在宽泛的 `Microsoft` 规则前直连，避免 Store 请求被代理节点的地区、DNS 或风控状态阻断；其余 Microsoft 服务仍按原有策略分流。

Mihomo 模板中的上游规则集和 geodata 默认使用 jsDelivr 地址，减少首次导入时因 `raw.githubusercontent.com` 连接不稳定导致的规则下载失败。

IP 类兜底规则使用 `no-resolve` 是有意设计：Mihomo 原生支持该参数，它会让 `GEOIP` / `IP-CIDR` 只检查连接中已经存在的目标 IP，避免规则走到末尾时为了匹配 IP 再额外解析域名。域名流量优先由前面的 `DOMAIN` / `GEOSITE` / `RULE-SET` 处理。

完整模板可直接作为基础配置导入，再补充自己的节点或订阅：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo.yaml
```

`mihomo/mihomo-override.yaml` 是与完整模板对应的覆写版本。

作为 **override / 覆写规则** 在客户端中叠加到你的订阅配置之上即可使用：

```text
https://fastly.jsdelivr.net/gh/junchan0412/proxy-configs@main/mihomo/mihomo-override.yaml
```

> 公开版不含节点、订阅链接、本机端口和外部控制器配置，请在客户端侧自行补充。

## Quantumult X 配置

`quantumultx/quantumultx.conf` 是一份公有模板：包含基础网络设置、DNS、节点示范、策略组、分流规则、URL Rewrite 与 MITM 占位。

它沿用与当前 Surge / Mihomo 版本相近的分流意图：先处理本地与国内常用服务，再分流 AI、国际社区、流媒体与游戏，最后落到 `FINAL`。

## License

MIT
