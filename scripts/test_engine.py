# -*- coding: utf-8 -*-
"""Teste rápido do motor editorial: gera fichas de amostra e valida formato + voz regional."""
import json
import sys

sys.path.insert(0, "/home/ubuntu/ddd-brasil")
from scripts.vozes import engine

# 1. Clima factual por coordenada
for city, lat, lng, expect_desc in [
    ("Recife", -8.05, -34.9, "litoral"),
    ("Belo Horizonte", -19.91, -43.93, "altitude"),
    ("Porto Alegre", -30.03, -51.22, "subtropical"),
    ("Petrolina", -9.40, -40.5, "semiárido"),
    ("Manaus", -3.10, -60.02, "equatorial"),
]:
    klass, desc, *_ = engine.koppen_zone(lat, lng)
    ok = expect_desc in desc
    print(f"[clima] {city}: {klass} — {desc[:40]} {'OK' if ok else '!!'}")

# 2. Gerar ficha de um município novo (sem ficha prévia) — testar dedup e voz
row = {
    "stateUf": "PE",
    "slug": "caruaru",
    "name": "Caruaru",
    "stateName": "Pernambuco",
    "region": "Nordeste",
    "ddd": "81",
    "populationEstimated": 370000,
    "latitude": -8.28,
    "longitude": -35.97,
}
key, ficha = engine.generate_ficha(row, {})
print("\n[ficha]", key)
print("tourism.intro:", ficha["tourism"]["intro"][:180])
print("tourism.items:", len(ficha["tourism"]["items"]), "| dining:", len(ficha["dining"]["items"]), "| transport:", len(ficha["transport"]["items"]))
print("climate.intro:", ficha["climate"]["intro"][:160])
print("climate.details:", ficha["climate"]["details"][0])
print("ddd:", ficha["ddd"], "| pop:", ficha["population"], "| reviewedOn:", ficha["reviewedOn"])

# 3. Variação estrutural: duas cidades vizinhas não podem ter texto idêntico
row2 = dict(row, slug="campina-grande", name="Campina Grande", stateUf="PB", stateName="Paraíba")
_, ficha2 = engine.generate_ficha(row2, {})
assert ficha["tourism"]["intro"] != ficha2["tourism"]["intro"], "aberturas devem variar"
# mesmas UF, slugs diferentes → voz idêntica de estado, mas cadência diferente
row3 = dict(row, slug="olinda", name="Olinda")
_, ficha3 = engine.generate_ficha(row3, {})
assert ficha["tourism"]["intro"] != ficha3["tourism"]["intro"], "mesma UF deve ter intros diferentes"
print("\n[variação] cidades diferentes => textos diferentes: OK")

# 4. Links Google Maps válidos e sem espaços não-escapados
item = ficha["tourism"]["items"][0]
assert "maps/search" in item["mapHref"], "mapHref deve apontar Google Maps"
assert " " not in item["mapHref"], "mapHref não pode conter espaços"
print("[links] mapHref OK:", item["mapHref"][:100])

# 5. Campos obrigatórios do schema MunicipalityTabs
for required in ("tourism", "dining", "transport", "climate", "city", "uf", "stateName", "region", "ddd", "population", "reviewedOn"):
    assert required in ficha, f"campo faltando: {required}"
for sec in ("tourism", "dining", "transport"):
    for it in ficha[sec]["items"]:
        assert "name" in it and "description" in it and "mapHref" in it
print("[schema] todos os campos obrigatórios presentes: OK")

# 6. Densidade de texto (evitar ficha rasa)
total_chars = sum(len(it["description"]) for sec in ("tourism", "dining", "transport") for it in ficha[sec]["items"])
total_chars += len(ficha["tourism"]["intro"]) + len(ficha["tourism"]["closing"]) + len(ficha["climate"]["intro"]) + len(ficha["climate"]["body"])
print(f"[densidade] ~{total_chars} caracteres editoriais por ficha")
assert total_chars > 1500, "ficha está rasa"

print("\nTODOS OS TESTES PASSARAM")
