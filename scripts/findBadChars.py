#!/usr/bin/env python3
"""Encontra caracteres unicode suspeitos (aspas tipográficas, hifens exoticos) em ficheiros TS."""
import sys, unicodedata, re

SUSPECT = set('‘’“”–—′\u2018\u2019\u201c\u201d\u2013\u2014\u2032\u00a0')

def check(path):
    s = open(path, encoding="utf-8").read()
    hits = []
    for i, line in enumerate(s.split("\n"), 1):
        for c in line:
            if c in SUSPECT:
                hits.append((i, repr(c), unicodedata.name(c, "?"), line[:80]))
                break
    if hits:
        print(f"== {path}")
        for h in hits:
            print(h)
    else:
        print(f"== {path}: clean")

for p in sys.argv[1:]:
    check(p)
