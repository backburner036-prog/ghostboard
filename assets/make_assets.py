#!/usr/bin/env python3
"""GHOSTBOARD — submission visual assets (Gusdur, design prep 19 Nov 2026).

Palette copied 1:1 from ghostboard/css/style.css — do not invent new colours.
- bg #070a07, panel #0b120b, green #33ff66, green-dim #1d9e40,
  pumpkin #ff7a1a, purple #b388ff, grey #8a9a8a, amber #ffcc00, border #1e3a22.
- Thumbnail v2 reuses a REAL crop of the v1 hero screenshot (logo + menu,
  no price number) so nothing on it is invented or stale.
- No URLs, no usernames, no price numbers are drawn on these assets:
  the live URL / repo URL are still TODO for IDR.
Outputs: assets/thumbnail-v2-1280x720.png, assets/poster-devpost-1600x900.png,
          assets/og-card-1200x630.png
"""
from PIL import Image, ImageDraw, ImageFont
import os

BASE = "/home/hatch/workspace/cari-cuan/gas-semua/kiroween"
OUT = os.path.join(BASE, "assets")
os.makedirs(OUT, exist_ok=True)

BG = (7, 10, 7); PANEL = (11, 18, 11); GREEN = (51, 255, 102)
GREENDIM = (29, 158, 64); PUMPKIN = (255, 122, 26); PURPLE = (179, 136, 255)
GREY = (138, 154, 138); AMBER = (255, 204, 0); WHITE = (235, 245, 235)
BORDER = (30, 58, 34)

F_SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
F_SANSB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
F_MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
F_MONOB = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"


def font(path, sz):
    return ImageFont.truetype(path, sz)


def scanlines(img, step=4, alpha=16):
    """CRT scanline overlay, same language as the app's .crt layer."""
    ov = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    for y in range(0, img.size[1], step):
        d.line([(0, y), (img.size[0], y)], fill=(0, 0, 0, alpha))
    img.paste(Image.alpha_composite(img.convert("RGBA"), ov).convert("RGB"), (0, 0))
    return img


def frame(d, W, H, inset=24, width=4, color=GREEN):
    d.rectangle([inset, inset, W - inset, H - inset], outline=color, width=width)


def chip(d, x, y, text, f, color, pad_x=14, pad_y=8):
    w = int(d.textlength(text, font=f)) + pad_x * 2
    h = f.size + pad_y * 2
    d.rounded_rectangle([x, y, x + w, y + h], radius=6, outline=color, width=2)
    d.text((x + pad_x, y + pad_y - 1), text, font=f, fill=color)
    return x + w


def app_crop():
    """Real screenshot crop (logo + statusline + menu) from the v1 thumbnail."""
    src = Image.open(os.path.join(BASE, "produksi-v1/thumbnail-1280x720.png"))
    return src.crop((270, 8, 1010, 265)).convert("RGB")


CROP = app_crop()


def inset_terminal(img, box, border_color=GREEN):
    """Paste the real app crop, framed, into box (x0, y0, x1, y1)."""
    x0, y0, x1, y1 = box
    w, h = x1 - x0, y1 - y0
    thumb = CROP.copy()
    thumb.thumbnail((w - 12, h - 12), Image.LANCZOS)
    px = x0 + (w - thumb.width) // 2
    py = y0 + (h - thumb.height) // 2
    img.paste(thumb, (px, py))
    d = ImageDraw.Draw(img)
    d.rectangle([px - 4, py - 4, px + thumb.width + 4, py + thumb.height + 4],
                outline=border_color, width=3)
    return img


# ---------------------------------------------------------------- thumbnail v2
W, H = 1280, 720
img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)
frame(d, W, H)
d.text((70, 58), "KIROWEEN 2026  ·  RESURRECTION", font=font(F_MONOB, 30), fill=AMBER)
d.text((70, 118), "GHOSTBOARD", font=font(F_SANSB, 100), fill=GREEN)
d.text((72, 240), "The BBS That Refuses to Die", font=font(F_SANSB, 44), fill=WHITE)
d.text((72, 306), "Live XAU/USD trading terminal", font=font(F_SANS, 32), fill=GREY)
d.text((72, 350), "Dial in. Get your MT5 plan.",
       font=font(F_SANS, 30), fill=GREY)
x = 72
for label, color in [("LIVE PRICE", GREEN), ("MT5-READY PLAN", PUMPKIN),
                     ("NO LOGIN", PURPLE)]:
    x = chip(d, x, 440, label, font(F_MONOB, 26), color) + 18
d.text((72, 520), "> press 1-6 or type a command", font=font(F_MONO, 30), fill=GREEN)
d.text((72, 566), "BUILT WITH KIRO  ·  spec-first  ·  .kiro/ in repo",
       font=font(F_MONOB, 28), fill=PUMPKIN)
# real app, right column (below the title zone so nothing overlaps)
inset_terminal(img, (700, 300, 1210, 560))
scanlines(img)
img.save(os.path.join(OUT, "thumbnail-v2-1280x720.png"))
print("thumbnail v2 ok")

# ---------------------------------------------------------------- poster (Devpost gallery cover, 16:9)
W, H = 1600, 900
img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)
frame(d, W, H)
d.text((80, 64), "KIROWEEN 2026  ·  CATEGORY: RESURRECTION",
       font=font(F_MONOB, 34), fill=AMBER)
d.text((80, 128), "GHOSTBOARD", font=font(F_SANSB, 148), fill=GREEN)
d.text((82, 292), "The BBS That Refuses to Die", font=font(F_SANSB, 58), fill=WHITE)
d.text((82, 366), "A Bulletin Board System, dead for 25 years, resurrected",
       font=font(F_SANS, 36), fill=GREY)
d.text((82, 412), "as a live XAU/USD trading terminal.",
       font=font(F_SANS, 36), fill=GREY)
rows = [
    ("[1]", "MARKET BOARD", "live XAU/USD spot, refreshed every 60 s", GREEN),
    ("[2]", "ANALYSIS BOARD", "4-layer entry validator — DXY, EMA50 4h, 24h gate", PUMPKIN),
    ("[3]", "TRADE PLAN BOARD", "MT5-ready plan: entry / SL / TP / RR — or honest WAIT", PURPLE),
]
y = 500
for num, head, sub, color in rows:
    d.text((82, y), num, font=font(F_MONOB, 34), fill=color)
    d.text((150, y), head, font=font(F_MONOB, 34), fill=color)
    d.text((82, y + 44), sub, font=font(F_SANS, 30), fill=GREY)
    y += 104
d.text((82, 812), "BUILT WITH KIRO  ·  spec-first  ·  static, no login, no backend  ·  MIT",
       font=font(F_MONOB, 28), fill=AMBER)
inset_terminal(img, (1000, 470, 1520, 780))
scanlines(img)
img.save(os.path.join(OUT, "poster-devpost-1600x900.png"))
print("poster ok")

# ---------------------------------------------------------------- OG / social card
W, H = 1200, 630
img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)
frame(d, W, H, inset=20, width=4)
d.text((64, 56), "KIROWEEN 2026", font=font(F_MONOB, 30), fill=AMBER)
d.text((64, 108), "GHOSTBOARD", font=font(F_SANSB, 88), fill=GREEN)
d.text((66, 224), "The BBS That Refuses to Die", font=font(F_SANSB, 40), fill=WHITE)
d.text((66, 284), "Live XAU/USD terminal  ·  MT5-ready plan",
       font=font(F_SANS, 30), fill=GREY)
d.text((66, 330), "Static web app — it just works.",
       font=font(F_SANS, 30), fill=GREY)
x = 66
for label, color in [("LIVE PRICE", GREEN), ("NO LOGIN", PURPLE)]:
    x = chip(d, x, 420, label, font(F_MONOB, 26), color) + 18
d.text((66, 500), "BUILT WITH KIRO  ·  RESURRECTION", font=font(F_MONOB, 28), fill=PUMPKIN)
d.text((66, 544), "> dial in at the link below", font=font(F_MONO, 26), fill=GREEN)
inset_terminal(img, (770, 330, 1136, 560))
scanlines(img)
img.save(os.path.join(OUT, "og-card-1200x630.png"))
print("og card ok")
