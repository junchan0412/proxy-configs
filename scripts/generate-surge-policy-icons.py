#!/usr/bin/env python3
from __future__ import annotations

import html
import json
import shutil
import subprocess
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "icons" / "surge-policy-groups"
SIZE = 144
PREVIEW_SIZE = 1600
ICON_SET = "policy-icons.json"
ICON_URL_BASE = "https://fastly.jsdelivr.net/gh/qidewei2004/proxy-configs@main/icons/surge-policy-groups"

INK = "#8f9bb3"
INK_SOFT = "#b7c0d3"
INK_DARK = "#59657d"
WHITE = "#f8fafc"
RED = "#d21f45"
BLUE = "#23477d"
YELLOW = "#f6d365"


@dataclass(frozen=True)
class Icon:
    slug: str
    title: str
    aliases: tuple[str, ...]
    body: str
    is_flag: bool = False


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def shell_quote(path: Path) -> str:
    return str(path)


def svg_icon(icon: Icon) -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{SIZE}" height="{SIZE}" viewBox="0 0 144 144" role="img" aria-label="{esc(icon.title)}">
  <defs>
    <filter id="shadow" x="-25%" y="-25%" width="150%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity=".18"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
{icon.body}
  </g>
</svg>
"""


def p(d: str, *, stroke: str = INK, width: float = 9, fill: str = "none", opacity: str | None = None) -> str:
    op = f' opacity="{opacity}"' if opacity else ""
    return f'    <path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"{op}/>'


def circle(cx: float, cy: float, r: float, *, stroke: str = INK, width: float = 8, fill: str = "none") -> str:
    return f'    <circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{width}"/>'


def rect(x: float, y: float, w: float, h: float, rx: float, *, stroke: str = INK, width: float = 8, fill: str = "none") -> str:
    return f'    <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{width}"/>'


def mini_glyphs() -> dict[str, str]:
    return {
        "proxy": "\n".join(
            [
                circle(72, 72, 46, width=8),
                p("M52 49l20 23-20 23", width=10),
                p("M78 49l20 23-20 23", width=10),
            ]
        ),
        "auto": "\n".join(
            [
                circle(72, 72, 45, width=8),
                p("M90 39l-17 45-45 17 45-45z", fill=INK, width=0),
                p("M72 19v11M72 114v11M19 72h11M114 72h11", stroke=INK_SOFT, width=7),
                p("M101 26l4 8 8 4-8 4-4 8-4-8-8-4 8-4z", fill=INK, width=0),
            ]
        ),
        "final": "\n".join(
            [
                p("M42 23v97", width=8),
                p("M42 28h71l-14 22 14 22H42z", width=8),
                p("M42 28h24v22H42M82 28v22M66 50v22M82 50h31", stroke=INK_SOFT, width=5),
                p("M28 120h88", width=8),
            ]
        ),
        "intl-services": "\n".join(
            [
                circle(72, 68, 44, width=8),
                p("M28 68h88M72 24c17 18 25 33 25 44s-8 26-25 44M72 24c-17 18-25 33-25 44s8 26 25 44", width=6),
                p("M38 43c12 9 25 13 39 13 11 0 22-3 32-9M38 93c12-9 25-13 39-13 11 0 22 3 32 9", stroke=INK_SOFT, width=5),
                p("M26 108c21 14 42 21 64 21 12 0 23-2 33-7", stroke=INK_SOFT, width=5),
            ]
        ),
        "ai": "\n".join(
            [
                rect(31, 31, 82, 82, 18, width=8),
                p("M19 53h12M19 72h12M19 91h12M113 53h12M113 72h12M113 91h12M53 19v12M72 19v12M91 19v12M53 113v12M72 113v12M91 113v12", stroke=INK_SOFT, width=5),
                p("M48 95l14-44 14 44M53 80h23", width=8),
                p("M92 52v43", width=8),
                p("M45 109h64", stroke=INK_SOFT, width=5),
            ]
        ),
        "global-community": "\n".join(
            [
                p("M35 43h67c12 0 22 10 22 22v23c0 12-10 22-22 22H72l-25 19v-19H35c-12 0-22-10-22-22V65c0-12 10-22 22-22z", width=8),
                p("M43 67h57M43 86h38", stroke=INK_SOFT, width=7),
                circle(116, 42, 9, stroke=INK_SOFT, width=5),
                circle(20, 111, 7, stroke=INK_SOFT, width=5),
            ]
        ),
        "chinese-content": "\n".join(
            [
                rect(28, 24, 88, 102, 15, width=8),
                p("M46 47h52M72 47v50M48 72h48", width=8),
                p("M52 103h40M52 113h32", stroke=INK_SOFT, width=5),
                p("M98 26v22c0 6 5 11 11 11h14", stroke=INK_SOFT, width=5),
            ]
        ),
        "emby": "\n".join(
            [
                rect(22, 38, 100, 68, 18, width=8),
                p("M64 57l31 18-31 18z", width=8),
                p("M38 121h68M53 133h38", stroke=INK_SOFT, width=7),
            ]
        ),
        "game": "\n".join(
            [
                p("M37 59c-16 0-26 17-30 42-3 20 5 32 18 32 10 0 18-9 24-20h46c6 11 14 20 24 20 13 0 21-12 18-32-4-25-14-42-30-42-11 0-18 4-24 10H61c-6-6-13-10-24-10z", width=8),
                p("M30 87h28M44 73v28", width=7),
                f'    <circle cx="101" cy="84" r="6.5" fill="{INK}"/>',
                f'    <circle cx="118" cy="101" r="6.5" fill="{INK}"/>',
            ]
        ),
        "speedtest": "\n".join(
            [
                p("M25 103a47 47 0 0 1 94 0", width=8),
                p("M34 103H19M125 103h-15M42 75L31 64M102 75l11-11M72 62V47", stroke=INK_SOFT, width=5),
                p("M72 103l31-36", width=8),
                circle(72, 103, 9, width=6),
                p("M43 124h58", stroke=INK_SOFT, width=6),
            ]
        ),
        "airport-collection": "\n".join(
            [
                p("M72 18v108", width=8),
                p("M22 77l50-22 50 22M52 117l20-16 20 16", width=8),
                circle(22, 45, 9, width=6),
                circle(122, 45, 9, width=6),
                circle(72, 130, 9, width=6),
                p("M22 45h100M22 45l50 85M122 45L72 130", stroke=INK_SOFT, width=4, opacity=".8"),
            ]
        ),
        "stream": "\n".join(
            [
                rect(22, 36, 98, 66, 18, width=8),
                p("M63 55l31 18-31 18z", width=8),
                p("M38 117h68M53 130h38", stroke=INK_SOFT, width=7),
                p("M126 47c9 8 14 17 14 28s-5 20-14 28", stroke=INK_SOFT, width=6),
            ]
        ),
        "tiktok": "\n".join(
            [
                p("M80 26v69c0 18-14 33-34 33-16 0-29-12-29-27 0-16 13-28 30-28 5 0 9 1 13 3", width=9),
                p("M80 26c7 20 20 31 39 34", width=9),
                p("M63 96c0 9-7 16-17 16-7 0-13-5-13-11 0-7 6-12 14-12", stroke=INK_SOFT, width=5),
            ]
        ),
    }


def flag_frame(inner: str) -> str:
    return f"""    <clipPath id="flag"><rect x="13" y="28" width="118" height="88" rx="9"/></clipPath>
    <rect x="13" y="28" width="118" height="88" rx="9" fill="{WHITE}"/>
    <g clip-path="url(#flag)">
{inner}
    </g>
    <rect x="13" y="28" width="118" height="88" rx="9" fill="none" stroke="#ffffff" stroke-width="2" stroke-opacity=".85"/>"""


def flag_glyphs() -> dict[str, str]:
    return {
        "singapore": flag_frame(
            f"""      <rect x="13" y="28" width="118" height="44" fill="{RED}"/>
      <rect x="13" y="72" width="118" height="44" fill="{WHITE}"/>
      <circle cx="40" cy="50" r="16" fill="{WHITE}"/>
      <circle cx="47" cy="50" r="16" fill="{RED}"/>
      <path d="M67 39l2.8 5.5 6.1.9-4.4 4.3 1 6-5.5-2.9-5.4 2.9 1-6-4.5-4.3 6.2-.9zM85 49l2.8 5.5 6.1.9-4.4 4.3 1 6-5.5-2.9-5.4 2.9 1-6-4.5-4.3 6.2-.9zM67 63l2.8 5.5 6.1.9-4.4 4.3 1 6-5.5-2.9-5.4 2.9 1-6-4.5-4.3 6.2-.9z" fill="{WHITE}"/>"""
        ),
        "japan": flag_frame(
            f"""      <rect x="13" y="28" width="118" height="88" fill="{WHITE}"/>
      <circle cx="72" cy="72" r="26" fill="{RED}"/>"""
        ),
        "hong-kong": flag_frame(
            f"""      <rect x="13" y="28" width="118" height="88" fill="{RED}"/>
      <g transform="translate(72 72)">
        <path d="M0-36c10 13 9 25-3 35 18-2 29 4 34 19 5-17 16-24 32-21-13-12-14-24-4-36-16 6-28 3-36-10-2 17-10 26-28 29 16 6 22 16 19 30-13-11-15-22-14-46z" fill="{WHITE}"/>
        <circle cx="15" cy="-4" r="4.5" fill="{RED}"/>
      </g>"""
        ),
        "taiwan": flag_frame(
            f"""      <rect x="13" y="28" width="118" height="88" fill="{RED}"/>
      <rect x="13" y="28" width="59" height="44" fill="{BLUE}"/>
      <g transform="translate(42.5 50)">
        <circle r="11" fill="{WHITE}"/>
        <path d="M0-25v8M0 17v8M-25 0h8M17 0h8M-18-18l6 6M12 12l6 6M18-18l-6 6M-12 12l-6 6M-23-10l8 3M15 7l8 3M23-10l-8 3M-15 7l-8 3M-10-23l3 8M7 15l3 8M10-23l-3 8M-7 15l-3 8" stroke="{WHITE}" stroke-width="3.5" stroke-linecap="round"/>
      </g>"""
        ),
        "korea": flag_frame(
            f"""      <rect x="13" y="28" width="118" height="88" fill="{WHITE}"/>
      <circle cx="72" cy="72" r="23" fill="{BLUE}"/>
      <path d="M49 72a23 23 0 0 1 46 0c-8-7-15-7-23 0s-15 7-23 0z" fill="{RED}"/>
      <path d="M49 72a23 23 0 0 0 46 0c-8-7-15-7-23 0s-15 7-23 0z" fill="{BLUE}"/>
      <path d="M28 47l15-15M39 52l15-15M100 32l15 15M91 37l15 15M28 97l15 15M39 92l15 15M100 112l15-15M91 107l15-15" stroke="#111827" stroke-width="3.6" stroke-linecap="round"/>"""
        ),
        "united-states": flag_frame(
            f"""      <rect x="13" y="28" width="118" height="88" fill="{WHITE}"/>
      <path d="M13 36h118M13 52h118M13 68h118M13 84h118M13 100h118" stroke="{RED}" stroke-width="8"/>
      <rect x="13" y="28" width="54" height="49" fill="{BLUE}"/>
      <path d="M39 38l4 8 9 1.3-6.5 6.3 1.5 9-8-4.2-8 4.2 1.5-9-6.5-6.3 9-1.3z" fill="{WHITE}"/>"""
        ),
        "united-kingdom": flag_frame(
            f"""      <rect x="13" y="28" width="118" height="88" fill="{BLUE}"/>
      <path d="M13 28l118 88M131 28L13 116" stroke="{WHITE}" stroke-width="18"/>
      <path d="M13 28l118 88M131 28L13 116" stroke="{RED}" stroke-width="8"/>
      <path d="M72 28v88M13 72h118" stroke="{WHITE}" stroke-width="25"/>
      <path d="M72 28v88M13 72h118" stroke="{RED}" stroke-width="12"/>"""
        ),
    }


def icons() -> list[Icon]:
    glyph = mini_glyphs()
    flags = flag_glyphs()
    return [
        Icon("proxy", "PROXY", ("PROXY", "Proxy"), glyph["proxy"]),
        Icon("auto", "Auto / AUTO", ("Auto", "AUTO"), glyph["auto"]),
        Icon("final", "FINAL", ("FINAL",), glyph["final"]),
        Icon("intl-services", "国际基础服务 / INTL", ("国际基础服务", "INTL"), glyph["intl-services"]),
        Icon("ai", "AI", ("AI",), glyph["ai"]),
        Icon("global-community", "国际社区 / SOCIAL", ("国际社区", "SOCIAL"), glyph["global-community"]),
        Icon("chinese-content", "中文内容 / CN", ("中文内容", "CN"), glyph["chinese-content"]),
        Icon("emby", "Emby / EMBY", ("Emby", "EMBY"), glyph["emby"]),
        Icon("game", "Game / GAME", ("Game", "GAME"), glyph["game"]),
        Icon("speedtest", "SpeedTest / SPEEDTEST", ("SpeedTest", "SPEEDTEST"), glyph["speedtest"]),
        Icon("airport-collection", "机场合集", ("机场合集",), glyph["airport-collection"]),
        Icon("singapore", "新加坡 / SG", ("新加坡", "SG"), flags["singapore"], True),
        Icon("japan", "日本 / JP", ("日本", "JP"), flags["japan"], True),
        Icon("hong-kong", "香港 / HK", ("香港", "HK"), flags["hong-kong"], True),
        Icon("taiwan", "台湾 / TW", ("台湾", "TW"), flags["taiwan"], True),
        Icon("korea", "韩国 / KR", ("韩国", "KR"), flags["korea"], True),
        Icon("united-states", "美国 / US", ("美国", "US"), flags["united-states"], True),
        Icon("united-kingdom", "英国 / UK", ("英国", "UK"), flags["united-kingdom"], True),
        Icon("stream", "STREAM", ("STREAM",), glyph["stream"]),
        Icon("tiktok", "TIKTOK", ("TIKTOK",), glyph["tiktok"]),
    ]


def convert_svg_to_png(svg_path: Path, png_path: Path, size: int = SIZE) -> None:
    if not shutil.which("qlmanage"):
        raise RuntimeError("qlmanage is required to render SVG thumbnails on this machine")

    tmp_out = svg_path.parent / ".rendered"
    tmp_out.mkdir(exist_ok=True)
    generated = tmp_out / f"{svg_path.name}.png"
    if generated.exists():
        generated.unlink()

    subprocess.run(
        ["qlmanage", "-t", "-s", str(size), "-o", shell_quote(tmp_out), shell_quote(svg_path)],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    if not generated.exists():
        raise RuntimeError(f"qlmanage did not create {generated}")
    png_path.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(generated), png_path)
    try:
        tmp_out.rmdir()
    except OSError:
        pass


def icon_set_json(items: list[Icon]) -> str:
    entries = []
    seen: set[str] = set()
    for icon in items:
        for alias in icon.aliases:
            if alias in seen:
                continue
            seen.add(alias)
            entries.append({"name": alias, "url": f"{ICON_URL_BASE}/{icon.slug}.png"})
    payload = {
        "name": "Qidewei Policy Icons",
        "description": "Transparent mini policy-group icons for Surge, inspired by Qure mini and ColorfulStaticFlag.",
        "icons": entries,
    }
    return json.dumps(payload, ensure_ascii=False, indent=2) + "\n"


def contact_sheet_svg(items: list[Icon]) -> str:
    cols = 5
    tile_w = 168
    tile_h = 194
    margin = 36
    rows = (len(items) + cols - 1) // cols
    width = margin * 2 + cols * tile_w
    height = margin * 2 + rows * tile_h
    cells: list[str] = []
    for i, icon in enumerate(items):
        col = i % cols
        row = i // cols
        x = margin + col * tile_w
        y = margin + row * tile_h
        label = icon.aliases[0]
        cells.append(f"""
  <g transform="translate({x} {y})">
    <rect x="0" y="0" width="136" height="162" rx="16" fill="#111827"/>
    <rect x="0.5" y="0.5" width="135" height="161" rx="15.5" fill="none" stroke="#ffffff" stroke-opacity=".08"/>
    <image href="{esc(icon.slug)}.svg" x="16" y="12" width="104" height="104"/>
    <text x="68" y="134" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="700" fill="#f8fafc">{esc(label)}</text>
    <text x="68" y="151" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="9" fill="#94a3b8">{esc(icon.slug)}.png</text>
  </g>""")
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
  <rect width="{width}" height="{height}" fill="#020617"/>
  <text x="{margin}" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="18" font-weight="800" fill="#f8fafc">Qidewei Policy Icons</text>
{''.join(cells)}
</svg>
"""


def readme(items: list[Icon]) -> str:
    rows = []
    for icon in items:
        aliases = " / ".join(icon.aliases)
        rows.append(f"| `{aliases}` | `{icon.slug}.png` | `{ICON_URL_BASE}/{icon.slug}.png` |")
    return f"""# Surge Policy Group Icons

透明小尺寸 Surge 策略组图标资产。每个图标提供 SVG 母版和 {SIZE} x {SIZE} PNG，可直接作为 `icon-url` 使用，也可通过图标集 JSON 导入 Surge：

```text
{ICON_URL_BASE}/{ICON_SET}
```

设计参考：

- Qure mini：透明背景、单色粗线、小尺寸优先。
- Qure Light：透明 PNG 图标集结构。
- ColorfulStaticFlag：地区策略组使用圆角旗帜，而不是再包一层深色底板。

| 策略组 | PNG | icon-url |
|---|---|---|
""" + "\n".join(rows) + "\n"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    items = icons()

    for stale in OUT.glob("*.png"):
        stale.unlink()
    for stale in OUT.glob("*.svg"):
        stale.unlink()

    for icon in items:
        svg_path = OUT / f"{icon.slug}.svg"
        png_path = OUT / f"{icon.slug}.png"
        svg_path.write_text(svg_icon(icon), encoding="utf-8")
        convert_svg_to_png(svg_path, png_path)

    sheet_svg = OUT / "preview.svg"
    sheet_png = OUT / "preview.png"
    sheet_svg.write_text(contact_sheet_svg(items), encoding="utf-8")
    convert_svg_to_png(sheet_svg, sheet_png, size=PREVIEW_SIZE)
    (OUT / ICON_SET).write_text(icon_set_json(items), encoding="utf-8")
    (OUT / "README.md").write_text(readme(items), encoding="utf-8")

    print(f"Generated {len(items)} transparent icons and {ICON_SET} in {OUT}")


if __name__ == "__main__":
    main()
