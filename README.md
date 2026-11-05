# proxy-configs

我以 Surge 为主配置，按自己的分流习惯维护 Mihomo、Shadowrocket、Quantumult X 和 Egern 配置，同时保留一份独立的 Loon 配置。

这套配置把 AI 和国际基础服务交给按地区选择的账号出口，把普通代理、社媒、游戏和测速分别管理。国内服务与局域网默认直连。使用前需要添加自己的节点或订阅，并选择合适的账号地区。

## 配置下载

| 客户端 | 配置 | 使用方式 |
|---|---|---|
| Surge | [Surge.conf](https://raw.githubusercontent.com/junchan0412/proxy-configs/main/surge/Surge.conf) | 从 URL 下载配置 |
| Mihomo | [mihomo.yaml](https://raw.githubusercontent.com/junchan0412/proxy-configs/main/mihomo/mihomo.yaml) | 完整配置，补充节点订阅 |
| Mihomo YAML 覆写 | [mihomo-override.yaml](https://raw.githubusercontent.com/junchan0412/proxy-configs/main/mihomo/mihomo-override.yaml) | 用于支持 YAML 覆写的客户端 |
| Mihomo JavaScript 覆写 | [mihomo-override.js](https://raw.githubusercontent.com/junchan0412/proxy-configs/main/mihomo/mihomo-override.js) | 用于支持 `main(config)` 的客户端 |
| Shadowrocket | [shadowrocket.conf](https://raw.githubusercontent.com/junchan0412/proxy-configs/main/shadowrocket/shadowrocket.conf) | 配置 → 添加配置 → 下载并使用 |
| Quantumult X | [quantumultx.conf](https://raw.githubusercontent.com/junchan0412/proxy-configs/main/quantumultx/quantumultx.conf) | 下载配置，添加节点资源 |
| Egern | [egern.yaml](https://raw.githubusercontent.com/junchan0412/proxy-configs/main/egern/egern.yaml) | 导入 YAML 配置 |
| Loon | [loon.lcf](https://raw.githubusercontent.com/junchan0412/proxy-configs/main/loon/loon.lcf) | 导入配置，填写订阅 |

完整模板中的 `占位节点` 指向本机 `127.0.0.1:9`，用于保持自动策略组的结构完整。它无法提供代理服务。添加自己的订阅后，先更新资源、检查地区组，再开启连接。

## 添加订阅

### Surge

在 `[Proxy Group]` 的 `机场合集` 一行末尾添加：

```ini
policy-path=你的Surge订阅地址
```

也可以直接在 `[Proxy]` 添加节点。地区组按节点名称筛选，节点备注应包含对应地区，例如 `香港 HK-01`、`新加坡 SG-01`、`台湾 TW-01`、`美国 US-01`。

### Mihomo

把完整配置中的 `proxy-providers: {}` 替换为自己的订阅：

```yaml
proxy-providers:
  订阅:
    type: http
    url: https://example.com/your-mihomo-subscription
    path: ./proxies/subscription.yaml
    interval: 3600
    health-check:
      enable: true
      url: http://cp.cloudflare.com/generate_204
      interval: 600
```

策略组会读取配置中的节点和所有 provider，再按地区筛选。完整模板需要使用支持 `include-all` 和 DNS 规则模式的新版 Mihomo 内核。

已有订阅配置时，可以使用 JavaScript 覆写。它保留原配置的节点、provider、监听端口、控制器和 TUN 设置，替换 DNS、策略组、分流规则和 geodata 下载地址。YAML 覆写需要由客户端按这些顶层字段合并。

### Shadowrocket

在首页添加自己的订阅，再下载并启用本仓库配置。地区组通过 `policy-regex-filter` 从已导入节点中筛选，账号地区组直接筛选该地区的节点。

### Quantumult X

在 `[server_remote]` 取消订阅示例行的注释，替换成 Quantumult X 格式订阅地址。也可以在 `[server_local]` 添加节点。更新 `Surge规则` 资源后，再选择策略。

### Egern

在 `policy_groups` 中找到名称为 `机场合集` 的 `select`，添加 `urls`：

```yaml
- select:
    name: 机场合集
    policies:
      - REJECT
      - 占位节点
    urls:
      - https://example.com/your-egern-subscription
    update_interval: 3600
```

其他地区组会展开这个订阅池，并保留符合地区名称的节点。

### Loon

在 `[Remote Proxy]` 取消 `机场合集` 示例行的注释，替换成自己的 Loon 订阅。地区筛选使用 `[Remote Filter]`，代理入口为 `代理策略`。

Loon 保留独立的分流方案：默认使用 Cloudflare DoH，国内主要域名指定国内 DoH，并包含原有的 Emby、自定义业务规则和可选插件。使用加密 DNS 时，在 App 内关闭“加密 DNS 失败回落到普通 DNS”。

## 策略组

| 策略组 | 用途与默认选择 |
|---|---|
| `PROXY` | 普通代理入口，默认 `Auto` |
| `Auto` | 香港、台湾、新加坡、日本、美国、韩国节点的自动选择 |
| `兜底` | 未命中规则的流量，默认 `PROXY`，可手动切换为 `DIRECT` |
| `账号出口` | 手选新加坡、台湾或美国的账号池，默认新加坡 |
| `账号-新加坡` / `账号-台湾` / `账号-美国` | 只在选定地区的节点之间故障转移 |
| `AI` / `国际基础服务` | 默认使用 `账号出口` |
| `国际社媒` | 默认 `PROXY`，也可选择 `账号出口` |
| `Emby` | 从订阅节点中自动选线，供自定义规则使用 |
| `Game` | 可手选地区、自动策略、代理或直连 |
| `测速节点` / `SpeedTest` | 测速节点需手动选择；测速业务默认使用该组 |

韩国组和测速节点组默认选择 `REJECT`。订阅更新后需要手动选择成员。其他地区按节点名称筛选，名称需要符合配置中的正则表达式。

这张表适用于 Surge 及其四种适配配置。Loon 使用自己的策略组和默认选择。

## 分流顺序

Surge 的预匹配拦截优先执行，其余规则按配置顺序匹配：

1. 广告、指定解析器地址与已知应用 DoH 端点；
2. APNs、中国区 Apple、AI 和代码托管；
3. 局域网、邮件端口与授时；
4. 国内服务、PayPal、国内社媒、下载/CDN、国内游戏；
5. 游戏与测速；
6. Apple、OneDrive、中国区 Microsoft、国际基础服务；
7. 国际社媒与视频服务；
8. 开发、百科、网盘与工具；
9. 通用代理/国内域名、国内 ASN/IP、GeoIP 和最终兜底。

公共规则保存在 `rules/source/`；Mihomo 和 Egern 使用各自原生格式的规则文件。Quantumult X 使用一份带策略名称的 `routing.list`，保留规则之间的相对位置。规则来源记录在 [rules/sources.json](rules/sources.json)。

## 维护

公共分流源为 [surge/Surge.conf](surge/Surge.conf)。修改它后，在仓库根目录运行：

```sh
python3 scripts/generate.py
```

需要 Python 3.9+ 和 Ruby；脚本使用标准库。此命令更新四种客户端配置、Mihomo 覆写和原生规则文件。

刷新上游规则快照：

```sh
python3 scripts/generate.py --refresh-rules
```

本地按章节拆分的 Surge 配置和 Loon 配置可以这样导入：

```sh
python3 scripts/generate.py \
  --source '根配置/Surge/Surge.conf' \
  --loon-source '根配置/Loon/loon.lcf' \
  --refresh-rules
```

`根配置/` 和 `private-backup/` 保留本机配置，已加入 Git 忽略。公开配置中的订阅需要由使用者自行填写；本机节点密钥、控制接口和 MITM 证书不随模板发布。

## 已知差异

- Surge 的 Smart 会按站点和线路健康情况选线。Mihomo、Shadowrocket、Quantumult X 使用延迟测试策略；Egern 使用自己的 Smart 算法。各客户端的测试结果、优先系数和切换时机可能不同。
- Mihomo 的规则资源指定直连下载，geodata 使用 jsDelivr 地址，并为资源域名设置优先直连规则。
- 账号池限制的是节点名称所对应的地区。它不保证实际出口地区或永久固定 IP；节点恢复、订阅顺序改变和同地区容灾都可能改变 IP。
- Mihomo 不支持 Surge 的 URL、User-Agent 匹配与 HTTP 重写。目前规则快照中有 41 条 URL 和 74 条 User-Agent 规则不参与 Mihomo 分流；域名、IP、ASN、进程与逻辑规则仍保留。
- Quantumult X 没有移植两条邮件/授时逻辑规则、127 条进程规则和 41 条 URL 分流规则。它保留 User-Agent、域名、IP、ASN 和 GeoIP 规则，但使用自己的 DNS 与匹配机制，不能复制 Surge 的 `no-resolve`、`pre-matching`、`extended-matching` 和 `dns-failed` 语义。
- Egern 的规则快照不包含 127 条进程规则，端口与域名逻辑规则使用原生 `and` / `or` 表达。
- URL 重写在 Surge、Shadowrocket、Quantumult X 和 Egern 中提供；请求头重写在 Surge、Shadowrocket、Quantumult X 和 Egern 中提供。HTTPS 重写需要在客户端内创建、安装并信任自己的 MITM 证书。
- Surge 的国内 DoH、应用 DoH 拦截及 DNS 接管有具体适用范围。Loon 的 DNS 方案独立；这些模板都不能替代客户端运行日志和实际网络环境下的验证。
- Loon 的第三方插件按需启用。MITM、插件和节点协议的兼容性应以所用客户端版本为准。Snell 等专有协议需要由订阅端提供目标客户端支持的节点格式。

## 参考与许可

我参考了这些仓库的规则组织、客户端格式和订阅配置：

- [QuixoticHeart/rule-set](https://github.com/QuixoticHeart/rule-set)
- [dler-io/Rules](https://github.com/dler-io/Rules)
- [fmz200/wool_scripts](https://github.com/fmz200/wool_scripts)
- [ClashConnectRules/Self-Configuration](https://github.com/ClashConnectRules/Self-Configuration)

客户端格式说明：[Surge](https://manual.nssurge.com/)、[Mihomo](https://wiki.metacubex.one/)、[Loon](https://nsloon.app/docs/)、[Quantumult X 官方示例](https://github.com/crossutility/Quantumult-X/blob/master/sample.conf)、[Egern](https://egernapp.com/docs/configuration/example/)。Shadowrocket 配置格式同时参考 fmz200 的对应模板。

原创配置与脚本采用 [MIT](LICENSE)。上游规则和资源保留各自许可；QuixoticHeart 的规则适用 [GPL-3.0](rules/LICENSE.GPL-3.0)。Loon 基础配置保留 iKeLee / luestr/ProxyResource 的署名与 CC BY-NC-SA 4.0 许可。
