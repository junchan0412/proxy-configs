# surge-modules

自用的 Surge 功能增强模块(`.sgmodule`)合集。每个模块都是独立可开关的配置包，通过 `%APPEND%` / `%INSERT%` 与主配置安全合并，**不覆盖**你已有的规则。

聚焦"小而稳"的功能增强与重定向：不易随 App 更新失效，不涉及去广告等高维护成本内容。

## 模块列表

| 模块 | 作用 |
|---|---|
| `google-redirect.sgmodule` | Google CN 全套重定向至国际版（搜索 / 地图 / 学术 / 翻译 / 书籍） |
| `redirect-enhance.sgmodule` | Bing 国内版跳国际版、维基百科移动版跳桌面版、知乎/微博/简书外链直跳 |
| `dns-mapping.sgmodule` | 为阿里系 / 腾讯系核心域名指定对应厂商的加密 DNS（DoH） |

## 安装

在 Surge 中：**Modules → 安装新模块 → 从 URL 安装**，填入对应模块的 jsdelivr 地址：

```
https://fastly.jsdelivr.net/gh/qidewei2004/surge-modules@main/modules/google-redirect.sgmodule
https://fastly.jsdelivr.net/gh/qidewei2004/surge-modules@main/modules/redirect-enhance.sgmodule
https://fastly.jsdelivr.net/gh/qidewei2004/surge-modules@main/modules/dns-mapping.sgmodule
```

> 走 jsdelivr CDN 而非 raw.githubusercontent.com，国内访问更稳定。

## 设计说明

- **合并而非覆盖**：模块用 `%APPEND%`（追加到列表）/ `%INSERT%`（插入到列表头部）与主配置合并。例如 `google-redirect` 的 MITM hostname 用 `%INSERT%`，只新增 Google 相关主机，不动你已有的 hostname 列表。
- **MITM 自包含**：凡需要解密 HTTPS 才能生效的重写，模块自带对应的 `[MITM] hostname` 声明，开箱即用。
- **可被校验**：本仓库所有模块均通过 [surge-doctor](https://github.com/qidewei2004/surge-doctor) 校验（`#!name` 元数据完整、重写源主机均已在 MITM 声明）。

## 校验

用 surge-doctor 体检任一模块：

```bash
surge-doctor check modules/google-redirect.sgmodule
```

## License

MIT
