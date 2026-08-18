# -*- coding: utf-8 -*-
"""Verifica se ainda existem fichas com pontuação quebrada após regeneração."""
import json
import glob
import os
import re

import sys

sys.path.insert(0, "/home/ubuntu/ddd-brasil")
TABS = "/home/ubuntu/ddd-brasil/.generated/tabs"
MARCAS = (
    "oxente", "tchê", "bah", "vixe", "uai", "ué", "bão", "é da hora", "se liga",
    "doido", "arretado", "é nóis", "trabalhando", "da hora", "meu rei", "tá",
    "tu não", "é bom demais", "se tu", "pode apostar", "oxe", "ué demais",
    "bicharada", "cumpadi", "mô", "sô", "parça", "véio", "véia",
    "tripa", "guai", "guaí", "uai sô", "uai uai", "uai véi", "trem", "uai",
)
PATTERN = re.compile(r"\.\s+(?:" + "|".join(re.escape(m) for m in MARCAS) + r")\b")

bad = total = 0
for f in sorted(glob.glob(os.path.join(TABS, "*.json"))):
    try:
        d = json.load(open(f, encoding="utf-8"))
    except json.JSONDecodeError:
        print("INVALID:", f)
        continue
    for k, ficha in d.items():
        total += 1
        if not isinstance(ficha, dict):
            continue
        t = ficha.get("tourism", {})
        if isinstance(t, dict) and PATTERN.search(t.get("intro", "")) is not None:
            bad += 1
            if bad <= 3:
                print(os.path.basename(f), k, "=>", t["intro"][:90])
print(f"\nBAD: {bad} de {total}")
