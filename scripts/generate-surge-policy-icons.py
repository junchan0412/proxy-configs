#!/usr/bin/env python3
from __future__ import annotations

import html
import shutil
import subprocess
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "icons" / "surge-policy-groups"
SIZE = 512
PREVIEW_SIZE = 1600
ICON_URL_BASE = "https://fastly.jsdelivr.net/gh/qidewei2004/proxy-configs@main/icons/surge-policy-groups"


@dataclass(frozen=True)
class Icon:
    slug: str
    title: str
    aliases: tuple[str, ...]
    glyph: str


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def shell_quote(path: Path) -> str:
    return str(path)


def icon_svg(icon: Icon) -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{SIZE}" height="{SIZE}" viewBox="0 0 {SIZE} {SIZE}" role="img" aria-label="{esc(icon.title)}">
  <defs>
    <linearGradient id="bg" x1="94" y1="50" x2="420" y2="468" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1b1c1f"/>
      <stop offset=".58" stop-color="#090a0c"/>
      <stop offset="1" stop-color="#000000"/>
    </linearGradient>
    <radialGradient id="sheen" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(164 104) rotate(42) scale(326)">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".17"/>
      <stop offset=".44" stop-color="#ffffff" stop-opacity=".055"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="markShadow" x="-18%" y="-18%" width="136%" height="148%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity=".38"/>
    </filter>
  </defs>
  <rect x="24" y="24" width="464" height="464" rx="118" fill="url(#bg)"/>
  <rect x="25.5" y="25.5" width="461" height="461" rx="116.5" fill="none" stroke="#f8f3e8" stroke-width="3" stroke-opacity=".13"/>
  <rect x="51" y="51" width="410" height="410" rx="96" fill="none" stroke="#f8f3e8" stroke-width="1.5" stroke-opacity=".07"/>
  <circle cx="154" cy="105" r="214" fill="url(#sheen)"/>
  <path d="M104 392c48 24 100 36 156 36 54 0 104-10 150-31" fill="none" stroke="#f8f3e8" stroke-width="10" stroke-linecap="round" stroke-opacity=".045"/>
  <g filter="url(#markShadow)">
{icon.glyph}
  </g>
</svg>
"""


def g(content: str, *, stroke: str = "#f8fafc", width: int = 24, fill: str = "none", opacity: str | None = None) -> str:
    op = f' opacity="{opacity}"' if opacity else ""
    return f'    <g fill="{fill}" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"{op}>\n{content}\n    </g>'


def line(x1: int, y1: int, x2: int, y2: int) -> str:
    return f'      <path d="M{x1} {y1}L{x2} {y2}"/>'


def glyphs() -> dict[str, str]:
    white = "#f6f1e8"
    soft = "#aaa39a"
    red = "#a91d2d"
    blue = "#173a72"
    deep_blue = "#102a5f"
    return {
        "proxy": f"""
    <path d="M256 166v79M256 278l-95 76M256 278l95 76M161 354h190" fill="none" stroke="{white}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="256" cy="144" r="34" fill="none" stroke="{white}" stroke-width="17"/>
    <circle cx="256" cy="267" r="25" fill="#090a0c" stroke="{white}" stroke-width="15"/>
    <circle cx="142" cy="369" r="32" fill="none" stroke="{white}" stroke-width="17"/>
    <circle cx="370" cy="369" r="32" fill="none" stroke="{white}" stroke-width="17"/>
    <path d="M193 213c19-15 40-23 63-23s44 8 63 23" fill="none" stroke="{soft}" stroke-width="11" stroke-linecap="round" opacity=".72"/>
""",
        "auto": f"""
    <circle cx="256" cy="256" r="121" fill="none" stroke="{white}" stroke-width="16"/>
    <circle cx="256" cy="256" r="72" fill="none" stroke="{soft}" stroke-width="8" opacity=".68"/>
    <path d="M302 170l-36 103-100 39 103-102z" fill="{white}"/>
    <path d="M230 287l-64 25 66-65z" fill="#090a0c" opacity=".88"/>
    <path d="M256 116v-28M256 424v-28M116 256H88M424 256h-28" fill="none" stroke="{white}" stroke-width="13" stroke-linecap="round"/>
    <path d="M348 139l9 22 23 9-23 9-9 22-9-22-23-9 23-9z" fill="{white}"/>
""",
        "final": f"""
    <path d="M172 137v247" fill="none" stroke="{white}" stroke-width="17" stroke-linecap="round"/>
    <path d="M172 151h202l-34 55 34 55H172z" fill="none" stroke="{white}" stroke-width="17" stroke-linejoin="round"/>
    <path d="M173 151h67v55h-67M306 151v55M240 206v55M306 206h67" fill="none" stroke="{soft}" stroke-width="12" stroke-linecap="round" opacity=".82"/>
    <path d="M139 395h235" fill="none" stroke="{white}" stroke-width="18" stroke-linecap="round"/>
""",
        "intl-services": f"""
    <circle cx="256" cy="252" r="118" fill="none" stroke="{white}" stroke-width="16"/>
    <path d="M138 252h236M256 134c42 47 63 86 63 118s-21 71-63 118M256 134c-42 47-63 86-63 118s21 71 63 118" fill="none" stroke="{white}" stroke-width="13" stroke-linecap="round"/>
    <path d="M171 176c31 22 64 33 99 33 28 0 56-7 83-22M171 324c31-22 64-33 99-33 28 0 56 7 83 22" fill="none" stroke="{soft}" stroke-width="10" stroke-linecap="round" opacity=".78"/>
    <path d="M118 309c50 40 103 60 159 60 43 0 82-10 117-29" fill="none" stroke="{white}" stroke-width="10" stroke-linecap="round" opacity=".72"/>
    <circle cx="394" cy="340" r="16" fill="{white}"/>
""",
        "ai": f"""
    <rect x="157" y="157" width="198" height="198" rx="50" fill="none" stroke="{white}" stroke-width="16"/>
    <path d="M132 204h-33M132 256H99M132 308H99M380 204h33M380 256h33M380 308h33M204 132V99M256 132V99M308 132V99M204 380v33M256 380v33M308 380v33" fill="none" stroke="{white}" stroke-width="12" stroke-linecap="round"/>
    <path d="M219 229l67-35M219 229l62 82M286 194l-5 117" fill="none" stroke="{soft}" stroke-width="10" stroke-linecap="round"/>
    <circle cx="219" cy="229" r="21" fill="#090a0c" stroke="{white}" stroke-width="13"/>
    <circle cx="286" cy="194" r="21" fill="#090a0c" stroke="{white}" stroke-width="13"/>
    <circle cx="281" cy="311" r="23" fill="{white}"/>
""",
        "global-community": f"""
    <path d="M151 173h187c30 0 54 24 54 54v59c0 30-24 54-54 54h-83l-65 48v-48h-39c-30 0-54-24-54-54v-59c0-30 24-54 54-54z" fill="none" stroke="{white}" stroke-width="16" stroke-linejoin="round"/>
    <path d="M172 235h167M172 283h112" fill="none" stroke="{white}" stroke-width="14" stroke-linecap="round"/>
    <circle cx="376" cy="174" r="26" fill="#090a0c" stroke="{soft}" stroke-width="12"/>
    <circle cx="118" cy="344" r="21" fill="#090a0c" stroke="{soft}" stroke-width="11"/>
""",
        "chinese-content": f"""
    <rect x="151" y="133" width="214" height="282" rx="45" fill="none" stroke="{white}" stroke-width="16"/>
    <path d="M206 202h111M257 202v150M197 280h119" fill="none" stroke="{white}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M174 371h136" fill="none" stroke="{soft}" stroke-width="11" stroke-linecap="round" opacity=".75"/>
    <path d="M340 348h39v39h-39z" fill="none" stroke="{white}" stroke-width="11" stroke-linejoin="round"/>
""",
        "emby": f"""
    <rect x="128" y="160" width="256" height="173" rx="42" fill="none" stroke="{white}" stroke-width="16"/>
    <path d="M235 209l82 47-82 47z" fill="none" stroke="{white}" stroke-width="16" stroke-linejoin="round"/>
    <path d="M168 372h188M205 410h114" fill="none" stroke="{white}" stroke-width="16" stroke-linecap="round"/>
    <circle cx="378" cy="158" r="18" fill="{white}"/>
""",
        "game": f"""
    <path d="M166 219c-39 0-64 40-73 102-7 49 13 78 45 78 25 0 44-23 58-48h120c14 25 33 48 58 48 32 0 52-29 45-78-9-62-34-102-73-102-28 0-45 10-60 25h-91c-15-15-32-25-59-25z" fill="none" stroke="{white}" stroke-width="16" stroke-linejoin="round"/>
    <path d="M158 287h68M192 253v68" fill="none" stroke="{white}" stroke-width="15" stroke-linecap="round"/>
    <circle cx="328" cy="282" r="15" fill="{white}"/>
    <circle cx="372" cy="321" r="15" fill="{white}"/>
""",
        "speedtest": f"""
    <path d="M134 335a122 122 0 0 1 244 0" fill="none" stroke="{white}" stroke-width="16" stroke-linecap="round"/>
    <path d="M158 335h-34M412 335h-34M179 258l-25-25M333 258l25-25M256 216v-35" fill="none" stroke="{soft}" stroke-width="11" stroke-linecap="round"/>
    <path d="M256 335l81-91" fill="none" stroke="{white}" stroke-width="17" stroke-linecap="round"/>
    <circle cx="256" cy="335" r="24" fill="#090a0c" stroke="{white}" stroke-width="14"/>
    <path d="M177 388h181" fill="none" stroke="{white}" stroke-width="15" stroke-linecap="round"/>
""",
        "airport-collection": f"""
    <path d="M256 117v274" fill="none" stroke="{white}" stroke-width="15" stroke-linecap="round"/>
    <path d="M128 265l128-53 128 53M205 362l51-38 51 38" fill="none" stroke="{white}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="128" cy="184" r="25" fill="#090a0c" stroke="{white}" stroke-width="14"/>
    <circle cx="384" cy="184" r="25" fill="#090a0c" stroke="{white}" stroke-width="14"/>
    <circle cx="256" cy="408" r="24" fill="#090a0c" stroke="{white}" stroke-width="14"/>
    <path d="M128 184h256M128 184l128 224M384 184L256 408" fill="none" stroke="{soft}" stroke-width="8" stroke-linecap="round" opacity=".62"/>
""",
        "singapore": f"""
    <clipPath id="flagClip"><rect x="120" y="166" width="272" height="181" rx="26"/></clipPath>
    <rect x="120" y="166" width="272" height="181" rx="26" fill="{white}" opacity=".96"/>
    <g clip-path="url(#flagClip)">
      <rect x="120" y="166" width="272" height="91" fill="{red}"/>
      <rect x="120" y="257" width="272" height="90" fill="{white}"/>
    </g>
    <rect x="120" y="166" width="272" height="181" rx="26" fill="none" stroke="{white}" stroke-width="14"/>
    <circle cx="176" cy="211" r="31" fill="{white}"/>
    <circle cx="189" cy="211" r="31" fill="{red}"/>
    <path d="M233 189l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2zM263 205l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2zM233 230l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" fill="{white}"/>
    <path d="M151 383h210" fill="none" stroke="{white}" stroke-width="14" stroke-linecap="round"/>
""",
        "japan": f"""
    <rect x="123" y="166" width="266" height="181" rx="27" fill="{white}" opacity=".96"/>
    <rect x="123" y="166" width="266" height="181" rx="27" fill="none" stroke="{white}" stroke-width="14"/>
    <circle cx="256" cy="256" r="54" fill="{red}"/>
    <path d="M151 383h210" fill="none" stroke="{white}" stroke-width="14" stroke-linecap="round"/>
""",
        "hong-kong": f"""
    <clipPath id="flagClip"><rect x="120" y="166" width="272" height="181" rx="26"/></clipPath>
    <rect x="120" y="166" width="272" height="181" rx="26" fill="{red}"/>
    <g transform="translate(256 256)">
      <path d="M0-78c20 29 17 54-8 75 38-5 61 9 70 42 11-36 33-51 68-44-27-25-30-50-8-77-34 14-59 7-76-22-4 36-21 56-59 61 33 14 46 34 40 62-27-24-31-48-27-97z" fill="{white}"/>
      <circle cx="32" cy="-8" r="10" fill="{red}"/>
    </g>
    <rect x="120" y="166" width="272" height="181" rx="26" fill="none" stroke="{white}" stroke-width="14"/>
    <path d="M151 383h210" fill="none" stroke="{white}" stroke-width="14" stroke-linecap="round"/>
""",
        "taiwan": f"""
    <clipPath id="flagClip"><rect x="120" y="166" width="272" height="181" rx="26"/></clipPath>
    <rect x="120" y="166" width="272" height="181" rx="26" fill="{red}"/>
    <g clip-path="url(#flagClip)">
      <rect x="120" y="166" width="136" height="91" fill="{blue}"/>
    </g>
    <g transform="translate(188 211)">
      <circle r="23" fill="{white}"/>
      <path d="M0-54v18M0 36v18M-54 0h18M36 0h18M-38-38l13 13M25 25l13 13M38-38L25-25M-25 25l-13 13M-50-21l17 7M33 14l17 7M50-21l-17 7M-33 14l-17 7M-21-50l7 17M14 33l7 17M21-50l-7 17M-14 33l-7 17" stroke="{white}" stroke-width="8" stroke-linecap="round"/>
    </g>
    <rect x="120" y="166" width="272" height="181" rx="26" fill="none" stroke="{white}" stroke-width="14"/>
    <path d="M151 383h210" fill="none" stroke="{white}" stroke-width="14" stroke-linecap="round"/>
""",
        "korea": f"""
    <rect x="123" y="166" width="266" height="181" rx="27" fill="{white}" opacity=".96"/>
    <rect x="123" y="166" width="266" height="181" rx="27" fill="none" stroke="{white}" stroke-width="14"/>
    <circle cx="256" cy="256" r="50" fill="{blue}"/>
    <path d="M206 256a50 50 0 0 1 100 0c-17-15-34-15-50 0s-33 15-50 0z" fill="{red}"/>
    <path d="M206 256a50 50 0 0 0 100 0c-17-15-34-15-50 0s-33 15-50 0z" fill="{blue}"/>
    <path d="M157 199l34-34M181 213l34-34M334 165l34 34M315 179l34 34M157 313l34 34M181 299l34 34M334 347l34-34M315 333l34-34" stroke="#121316" stroke-width="8" stroke-linecap="round"/>
    <path d="M151 383h210" fill="none" stroke="{white}" stroke-width="14" stroke-linecap="round"/>
""",
        "united-states": f"""
    <clipPath id="flagClip"><rect x="120" y="166" width="272" height="181" rx="26"/></clipPath>
    <rect x="120" y="166" width="272" height="181" rx="26" fill="{white}"/>
    <g clip-path="url(#flagClip)">
      <path d="M120 185h272M120 223h272M120 261h272M120 299h272M120 337h272" stroke="{red}" stroke-width="19"/>
      <rect x="120" y="166" width="123" height="101" fill="{blue}"/>
    </g>
    <path d="M181 189l9 18 20 3-14 14 3 20-18-9-18 9 3-20-14-14 20-3z" fill="{white}"/>
    <rect x="120" y="166" width="272" height="181" rx="26" fill="none" stroke="{white}" stroke-width="14"/>
    <path d="M151 383h210" fill="none" stroke="{white}" stroke-width="14" stroke-linecap="round"/>
""",
        "united-kingdom": f"""
    <clipPath id="flagClip"><rect x="120" y="166" width="272" height="181" rx="26"/></clipPath>
    <rect x="120" y="166" width="272" height="181" rx="26" fill="{deep_blue}"/>
    <g clip-path="url(#flagClip)">
      <path d="M120 166l272 181M392 166L120 347" stroke="{white}" stroke-width="39"/>
      <path d="M120 166l272 181M392 166L120 347" stroke="{red}" stroke-width="18"/>
      <path d="M256 166v181M120 256h272" stroke="{white}" stroke-width="52"/>
      <path d="M256 166v181M120 256h272" stroke="{red}" stroke-width="26"/>
    </g>
    <rect x="120" y="166" width="272" height="181" rx="26" fill="none" stroke="{white}" stroke-width="14"/>
    <path d="M151 383h210" fill="none" stroke="{white}" stroke-width="14" stroke-linecap="round"/>
""",
        "stream": f"""
    <rect x="128" y="160" width="256" height="173" rx="42" fill="none" stroke="{white}" stroke-width="16"/>
    <path d="M235 209l82 47-82 47z" fill="none" stroke="{white}" stroke-width="16" stroke-linejoin="round"/>
    <path d="M168 372h188M205 410h114M400 187c23 18 35 42 35 71s-12 52-35 70" fill="none" stroke="{white}" stroke-width="14" stroke-linecap="round"/>
""",
        "tiktok": f"""
    <path d="M280 136v185c0 49-37 86-88 86-44 0-78-30-78-70 0-42 33-72 78-72 13 0 24 2 35 7" fill="none" stroke="{white}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M280 136c17 50 49 79 95 88" fill="none" stroke="{white}" stroke-width="18" stroke-linecap="round"/>
    <path d="M242 320c0 24-18 42-44 42-20 0-36-12-36-29 0-19 16-31 38-31" fill="none" stroke="{soft}" stroke-width="11" stroke-linecap="round"/>
""",
    }


def icons() -> list[Icon]:
    glyph = glyphs()
    return [
        Icon("proxy", "PROXY", ("PROXY",), glyph["proxy"]),
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
        Icon("singapore", "新加坡 / SG", ("新加坡", "SG"), glyph["singapore"]),
        Icon("japan", "日本 / JP", ("日本", "JP"), glyph["japan"]),
        Icon("hong-kong", "香港 / HK", ("香港", "HK"), glyph["hong-kong"]),
        Icon("taiwan", "台湾 / TW", ("台湾", "TW"), glyph["taiwan"]),
        Icon("korea", "韩国 / KR", ("韩国", "KR"), glyph["korea"]),
        Icon("united-states", "美国 / US", ("美国", "US"), glyph["united-states"]),
        Icon("united-kingdom", "英国 / UK", ("英国", "UK"), glyph["united-kingdom"]),
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


def contact_sheet_svg(items: list[Icon]) -> str:
    cols = 5
    tile_w = 188
    tile_h = 226
    margin = 36
    label_h = 36
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
    <rect x="0" y="0" width="164" height="204" rx="30" fill="#ffffff" opacity=".07" stroke="#ffffff" stroke-opacity=".12"/>
    <image href="{esc(icon.slug)}.svg" x="26" y="18" width="112" height="112"/>
    <text x="82" y="164" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="17" font-weight="700" fill="#f8fafc">{esc(label)}</text>
    <text x="82" y="188" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" fill="#94a3b8">{esc(icon.slug)}.png</text>
  </g>""")
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
  <rect width="{width}" height="{height}" fill="#0f172a"/>
  <text x="{margin}" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="18" font-weight="800" fill="#f8fafc">Surge Policy Group Icons</text>
{''.join(cells)}
</svg>
"""


def readme(items: list[Icon]) -> str:
    rows = []
    for icon in items:
        aliases = " / ".join(icon.aliases)
        rows.append(f"| `{aliases}` | `{icon.slug}.png` | `{ICON_URL_BASE}/{icon.slug}.png` |")
    return """# Surge Policy Group Icons

统一风格的 Surge 策略组图标资产。每个图标提供 SVG 母版和 512 x 512 PNG，用于 `icon-url`。

设计约束：

- 统一圆角底板、统一描边粗细，适合 Surge 策略组小尺寸列表展示。
- 非区域策略组以墨黑、象牙白和灰阶为主，减少廉价彩色堆叠。
- 区域策略组以国旗核心元素重绘，只保留低饱和红、蓝等小面积识别色。
- 每个策略组保留独立语义：入口、智能、兜底、AI、社区、中文内容、影音、游戏、测速、节点合集和区域选择都有不同符号。
- `小一` 和 `Baby` 保持原有外部头像图标，不在本套图标中替换。

| 策略组 | PNG | icon-url |
|---|---|---|
""" + "\n".join(rows) + "\n"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    items = icons()

    for icon in items:
        svg_path = OUT / f"{icon.slug}.svg"
        png_path = OUT / f"{icon.slug}.png"
        svg_path.write_text(icon_svg(icon), encoding="utf-8")
        convert_svg_to_png(svg_path, png_path)

    sheet_svg = OUT / "preview.svg"
    sheet_png = OUT / "preview.png"
    sheet_svg.write_text(contact_sheet_svg(items), encoding="utf-8")
    convert_svg_to_png(sheet_svg, sheet_png, size=PREVIEW_SIZE)
    (OUT / "README.md").write_text(readme(items), encoding="utf-8")

    print(f"Generated {len(items)} icons in {OUT}")


if __name__ == "__main__":
    main()
