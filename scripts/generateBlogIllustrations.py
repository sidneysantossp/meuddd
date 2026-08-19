# -*- coding: utf-8 -*-
"""Gerador de ilustrações editoriais do blog Meu DDD (PIL/Pillow).

Gera imagens 1200x630 (proporção OG 1.9:1) com a identidade visual da
plataforma: verde floresta #143d36, marfim #faf3e5 e coral #e0604a.

Uso:
    python3 scripts/generateBlogIllustrations.py

Saída: client/public/assets/guia-<slug>.jpg
"""
import hashlib
import math
import os
import random

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
GREEN = (0x14, 0x3D, 0x36)
GREEN_DARK = (0x0C, 0x26, 0x21)
GREEN_LIGHT = (0x1F, 0x5A, 0x4E)
IVORY = (0xFA, 0xF3, 0xE5)
CORAL = (0xE0, 0x60, 0x4A)
CORAL_SOFT = (0xE8, 0x92, 0x80)

OUT = os.path.join(os.path.dirname(__file__), "..", "client", "public", "assets")
FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]


def font(size, bold=True):
    path = FONT_PATHS[0 if bold else 2]
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


def rounded_phone(d, cx, cy, w, h, r, fill, stroke=None, width=3):
    """Desenha um "smartphone" retangular arredondado em (cx, cy)."""
    x0, y0 = cx - w / 2, cy - h / 2
    x1, y1 = cx + w / 2, cy + h / 2
    d.rounded_rectangle([x0, y0, x1, y1], radius=r, fill=fill,
                        outline=stroke or GREEN_LIGHT, width=width)


def signal_bars(d, cx, cy, n, bar_w, step, height_max, fill):
    """Pulso de sinal: barras crescentes à direita de (cx, cy)."""
    for i in range(n):
        hh = int(height_max * (i + 1) / n)
        x0 = cx + i * step
        d.rounded_rectangle([x0, cy - hh, x0 + bar_w, cy], radius=3, fill=fill)


def dot(d, x, y, r, fill):
    d.ellipse([x - r, y - r, x + r, y + r], fill=fill)


def brazil_outline(d, ox=0, oy=0, scale=1.0):
    """Silhueta simplificada do Brasil em traço coral sobre o painel."""
    cx_ref, cy_ref = 470.0, 280.0  # centro da silhueta original
    pts = [
        (60, 150), (130, 105), (220, 90), (320, 95), (430, 85), (540, 100),
        (640, 120), (720, 105), (790, 125), (820, 160), (830, 230), (815, 300),
        (790, 360), (740, 420), (680, 450), (600, 470), (500, 480), (400, 460),
        (310, 430), (230, 380), (160, 330), (110, 270), (85, 210),
    ]
    pts = [(int((x - cx_ref) * scale) + ox, int((y - cy_ref) * scale) + oy)
           for x, y in pts]
    d.line(pts + [pts[0]], fill=CORAL_SOFT, width=3, joint="curve")


def grid(d, seed):
    """Grelha decorativa fina no fundo."""
    rnd = random.Random(seed)
    d.line([(0, 0), (W, 0), (W, H), (0, H)], fill=GREEN_DARK, width=8)
    step = 80
    for x in range(0, W, step):
        d.line([(x, 0), (x, H)], fill=(0x1B, 0x4A, 0x41), width=1)
    for y in range(0, H, step):
        d.line([(0, y), (W, y)], fill=(0x1B, 0x4A, 0x41), width=1)
    for _ in range(26):
        x, y = rnd.randint(20, W - 20), rnd.randint(20, H - 20)
        dot(d, x, y, 3, (0x23, 0x57, 0x4C))


def footer_badge(d):
    """Selo 'Meu DDD' no canto inferior esquerdo."""
    d.rectangle([0, H - 64, 230, H], fill=CORAL)
    d.text((24, H - 50), "MEU DDD", font=font(26), fill=IVORY)
    d.text((170, H - 46), "·", font=font(26), fill=IVORY)
    d.text((182, H - 46), "BRASIL", font=font(22), fill=IVORY)


def tag(d, text):
    d.rectangle([0, 0, 300, 56], fill=GREEN_LIGHT)
    d.text((24, 16), text.upper(), font=font(24), fill=IVORY)


def headline(d, lines, y0=250, color=IVORY, max_w=900):
    """Título editorial em até 3 linhas."""
    f = font(64)
    y = y0
    for line in lines:
        d.text((70, y), line, font=f, fill=color)
        y += 92


def accent_bar(d):
    d.rectangle([70, 180, 140, 188], fill=CORAL)


# ---------------------------------------------------------------- ilustrações

def illust_ddd_base(name, subtitle_lines, icon_fn):
    img = Image.new("RGB", (W, H), GREEN)
    d = ImageDraw.Draw(img)
    grid(d, hash(name))
    tag(d, "Guia de Telefonia")
    accent_bar(d)
    headline(d, subtitle_lines)
    icon_fn(d)
    footer_badge(d)
    return img


def phone_icon(d):
    rounded_phone(d, 930, 330, 190, 330, 36, IVORY)
    d.rounded_rectangle([900, 360, 960, 384], radius=8, fill=GREEN_LIGHT)
    d.rounded_rectangle([900, 420, 960, 444], radius=8, fill=GREEN_LIGHT)
    d.rounded_rectangle([900, 480, 960, 504], radius=8, fill=GREEN_LIGHT)
    signal_bars(d, 1005, 560, 4, 16, 28, 70, CORAL)


def map_icon(d):
    brazil_outline(d, ox=930, oy=310, scale=0.72)
    marks = [(752, 180), (1010, 110), (890, 260), (1050, 290), (700, 330)]
    for cx, cy in marks:
        dot(d, cx, cy, 8, CORAL)
        dot(d, cx, cy, 15, (0xE0, 0x60, 0x4A, 90))
    # ondas de ligação a partir do centro
    for r in (55, 95, 135):
        d.ellipse([890 - r, 260 - r, 890 + r, 260 + r],
                  outline=CORAL_SOFT, width=2)


def ddi_icon(d):
    brazil_outline(d, ox=890, oy=310, scale=0.62)
    dot(d, 780, 265, 11, CORAL)
    # arco intercontinental (origem BR -> destino exterior)
    d.arc([420, 80, 1180, 580], start=195, end=345, fill=IVORY, width=3)
    d.arc([540, -30, 1300, 470], start=215, end=325, fill=CORAL_SOFT, width=3)
    dot(d, 1010, 130, 10, IVORY)


def operator_icon(d):
    rounded_phone(d, 800, 330, 170, 300, 30, IVORY)
    # ondas entre torres
    d.line([(640, 200), (700, 140), (760, 200)], fill=CORAL, width=5)
    d.rectangle([690, 200, 710, 330], fill=CORAL)
    dot(d, 700, 188, 10, CORAL)


def fixo_icon(d):
    # telefone fixo retro
    d.rounded_rectangle([860, 420, 1020, 480], radius=14, fill=IVORY)
    d.arc([880, 300, 1000, 430], start=0, end=180, fill=IVORY, width=14)
    d.line([(880, 420), 1020, 420], fill=IVORY, width=14)


def bloqueio_icon(d):
    brazil_outline(d, ox=930, oy=310, scale=0.72)
    cx, cy = 790, 260
    dot(d, cx, cy, 28, CORAL)
    d.rounded_rectangle([cx - 30, cy - 100, cx + 30, cy - 40], radius=12,
                        outline=IVORY, width=8)
    d.arc([cx - 30, cy - 140, cx + 30, cy - 70], start=180, end=0,
          fill=IVORY, width=8)
    d.line([(cx, cy), cx + 90, cy - 90], fill=IVORY, width=10)
    d.line([(cx + 90, cy - 90), cx + 110, cy - 68], fill=IVORY, width=10)
    d.line([(cx + 90, cy - 90), cx + 68, cy - 68], fill=IVORY, width=10)


def cobro_icon(d):
    rounded_phone(d, 830, 330, 150, 260, 26, IVORY)
    rounded_phone(d, 1010, 330, 150, 260, 26, (0x23, 0x57, 0x4C))
    d.arc([830, 200, 1010, 460], start=270, end=90, fill=CORAL, width=6)
    signal_bars(d, 880, 520, 4, 14, 24, 60, CORAL)


def digits_icon(d, nine=True):
    digits = ["9", "9", "8", "7", "6", "5", "4", "3", "2"] if nine \
        else ["3", "0", "1", "1", "5", "5", "5", "5"]
    x = 800
    for i, ch in enumerate(digits):
        c = CORAL if i < 2 else IVORY
        d.rounded_rectangle([x, 250, x + 66, 340], radius=12,
                            fill=(0x0C, 0x26, 0x21), outline=c, width=3)
        d.text((x + 33 - 22, 264), ch, font=font(44), fill=c)
        x += 78


def emerg_icon(d):
    # sirene/radar
    for r in (50, 100, 150):
        d.ellipse([930 - r, 330 - r, 930 + r, 330 + r], outline=CORAL_SOFT,
                  width=3)
    d.rounded_polygon if False else None
    d.polygon([(930, 240), (975, 400), (885, 400)], fill=IVORY)


# ---------------------------------------------------------------- catálogo

CATALOG = {
    # slug -> (subtítulo em linhas, ícone)
    "guia-como-bloquear-chamadas-indesejadas":
        (["Como bloquear", "chamadas indesejadas"], bloqueio_icon),
    "guia-numero-fixo-tem-quantos-digitos":
        (["Número fixo tem", "quantos dígitos?"], fixo_icon),
    "guia-numero-de-celular-tem-quantos-digitos":
        (["Número de celular tem", "quantos dígitos?"], lambda d: digits_icon(d, nine=True)),
    "guia-como-ligar-a-cobrar":
        (["Como ligar", "a cobrar"], cobro_icon),
    "guia-ddd-de-capitais-do-brasil":
        (["DDD de todas as", "capitais do Brasil"], map_icon),
    "guia-como-telefonar-para-sao-paulo":
        (["Como telefonar", "para São Paulo"], phone_icon),
    "guia-como-telefonar-para-rio-de-janeiro":
        (["Como telefonar", "para o Rio de Janeiro"], phone_icon),
    "guia-como-telefonar-para-brasilia":
        (["Como telefonar", "para Brasília"], phone_icon),
}


def render(slug, lines, icon_fn):
    img = illust_ddd_base(slug, lines, icon_fn)
    img.save(os.path.join(OUT, slug + ".jpg"), quality=88)
    print(f"OK  {slug}.jpg")


def main():
    os.makedirs(OUT, exist_ok=True)
    for slug, (lines, icon_fn) in CATALOG.items():
        render(slug, lines, icon_fn)


if __name__ == "__main__":
    main()
