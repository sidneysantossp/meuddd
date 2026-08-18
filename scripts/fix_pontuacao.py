# -*- coding: utf-8 -*-
"""Identifica e remove fichas com pontuação quebrada nas marcas orais,
para que o engine as regenere com os templates corrigidos.
Uso: python3 scripts/fix_pontuacao.py --regen
"""
import json
import glob
import os
import re
import sys

sys.path.insert(0, "/home/ubuntu/ddd-brasil")
TABS = "/home/ubuntu/ddd-brasil/.generated/tabs"
# Marcas orais conhecidas (rtrimp de pontuação) — qualquer uma destas após ". " indica template antigo.
MARCAS = (
    "oxente", "tchê", "bah", "vixe", "uai", "ué", "bão", "é da hora", "se liga",
    "doido", "arretado", "é nóis", "trabalhando", "da hora", "meu rei", "tá",
    "tu não", "é bom demais", "se tu", "pode apostar", "oxe", "ué demais",
    "bicharada", "cumpadi", "mô", "sô", "parça", "véio", "véia", "bão",
    "tripa", "guai", "guaí", "uai sô", "uai uai", "uai véi", "trem", "uai",
)
PATTERN = re.compile(r"\.\s+(?:" + "|".join(re.escape(m) for m in MARCAS) + r")\b")


def main():
    regen = "--regen" in sys.argv
    removed = {}
    for f in sorted(glob.glob(os.path.join(TABS, "*.json"))):
        uf = os.path.basename(f)[:-5].upper()
        try:
            d = json.load(open(f, encoding="utf-8"))
        except json.JSONDecodeError:
            print("SKIP (inválido):", f)
            continue
        bad_keys = [k for k, ficha in d.items()
                    if isinstance(ficha, dict) and isinstance(ficha.get("tourism"), dict)
                    and PATTERN.search(ficha["tourism"].get("intro", "")) is not None]
        if bad_keys:
            removed[uf] = len(bad_keys)
            if regen:
                for k in bad_keys:
                    del d[k]
                with open(f, "w", encoding="utf-8") as fh:
                    json.dump(d, fh, ensure_ascii=False, indent=2)
                    fh.write("\n")
    for uf, n in sorted(removed.items()):
        print(f"[{uf.lower()}] {n} fichas a regenerar")
    print("TOTAL:", sum(removed.values()))


if __name__ == "__main__":
    main()
