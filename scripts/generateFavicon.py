# -*- coding: utf-8 -*-
"""Gera o favicon Meu DDD via PIL/Pillow.

Ícone: pin de geolocalização (coral) com círculo interior marfim sobre
fundo circular verde floresta, com anel exterior marfim.

Saídas em client/public/:
  - favicon.ico   (16, 32, 48 px)
  - icon-180.png  (apple-touch-icon)
  - icon-512.png  (PWA maskable-friendly)
  - icon-32.png / icon-48.png / icon-192.png
"""
import os

from PIL import Image, ImageDraw

GREEN = (0x14, 0x3D, 0x36)
IVORY = (0xFA, 0xF3, 0xE5)
CORAL = (0xE0, 0x60, 0x4A)

OUT = os.path.join(os.path.dirname(__file__), "..", "client", "public")


def draw_icon(size):
    """Desenha o ícone numa canvas quadrada."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    m = 0.06 * size  # margem do anel externo
    d.ellipse([m, m, size - m, size - m], fill=GREEN)
    # anel interno
    ring = 0.055 * size
    d.ellipse([m + ring, m + ring, size - m - ring, size - m - ring],
              outline=IVORY, width=max(2, int(0.018 * size)))
    # pin de geolocalização (centrado, 62% da largura)
    pw, ph = 0.52 * size, 0.62 * size
    px0 = (size - pw) / 2
    py0 = size * 0.13
    # cabeça do pin (círculo) + cauda (triângulo)
    head_r = pw * 0.34
    cx, cy = size / 2, py0 + head_r
    d.ellipse([cx - head_r, cy - head_r, cx + head_r, cy + head_r], fill=CORAL)
    d.polygon([(cx - pw * 0.30, cy + head_r * 0.55),
               (cx + pw * 0.30, cy + head_r * 0.55),
               (cx, py0 + ph)], fill=CORAL)
    # círculo interno marfim
    d.ellipse([cx - head_r * 0.42, cy - head_r * 0.42,
               cx + head_r * 0.42, cy + head_r * 0.42], fill=IVORY)
    return img


def main():
    os.makedirs(OUT, exist_ok=True)
    pngs = {16: "icon-16.png", 32: "icon-32.png", 48: "icon-48.png",
            180: "icon-180.png", 192: "icon-192.png", 512: "icon-512.png"}
    icons = {}
    for s, name in pngs.items():
        icons[s] = draw_icon(s)
        icons[s].save(os.path.join(OUT, name))
        print(f"OK  {name}")
    # favicon.ico com 16/32/48
    [icons[16], icons[32], icons[48]][0].save(
        os.path.join(OUT, "favicon.ico"),
        sizes=[(16, 16), (32, 32), (48, 48)])
    print("OK  favicon.ico (16/32/48)")


if __name__ == "__main__":
    main()
