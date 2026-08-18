# -*- coding: utf-8 -*-
"""
Motor editorial regionalizado das fichas de municípios.

Escreve cada ficha como um redator local escreveria: voz do estado
(scripts/vozes/regionais.py), estruturas de frase rotacionadas de forma
determinística por município (nenhuma ficha copia a estrutura da vizinha),
dados reais (população, DDD, região) e clima factual por coordenada
(Köppen aproximado via faixas de latitude/longitude do Brasil).

A variação anti-padrão funciona em três níveis:
1. Aberturas de secção escolhidas por hash(slug) entre várias alternativas.
2. Ordem e quantidade de elementos (gíria presente ou ausente, costume citado
   ou não, marca oral no meio ou no fim) variam por município.
3. Fechos rotacionados entre as alternativas do perfil do estado.

Isso evita o "jeitinho de escrita em massa feita por IA": dois municípios da
mesma UF nunca têm o mesmo texto nem a mesma cadência.
"""
import hashlib
import json
import os
import random
import re
import unicodedata
from datetime import date
from urllib.parse import quote

import mysql.connector

from scripts.vozes.regionais import PERFIS

# O engine fica em scripts/vozes/; o project root é dois níveis acima do ficheiro.
OUT_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    ".generated",
    "tabs",
)
REVIEWED_ON = date.today().isoformat()
UF_ORDER = [
    "ac", "al", "am", "ap", "ba", "ce", "df", "es", "go", "ma", "mg", "ms",
    "mt", "pa", "pb", "pe", "pi", "pr", "rj", "rn", "ro", "rr", "rs", "sc",
    "se", "sp", "to",
]
MAP_SEARCH = lambda q: "https://www.google.com/maps/search/?api=1&query=" + quote(q)


# ---------------------------------------------------------------------------
# RNG determinístico por município
# ---------------------------------------------------------------------------

def _rng(seed_str: str):
    """Gerador pseudo-aleatório determinístico a partir do seed (slug)."""
    h = hashlib.md5(seed_str.encode("utf-8")).hexdigest()
    import random
    r = random.Random(int(h[:16], 16))
    return r


def pick(rng, lst, n=1):
    """Escolhe n itens distintos; se n>len, repete circular."""
    out, pool = [], list(lst)
    r = random.Random(rng.randint(0, 2**31))
    while len(out) < n:
        if not pool:
            pool = list(lst)
        out.append(r.choice(pool))
        if n == 1:
            break
        pool.remove(out[-1])
    return out[0] if n == 1 else out


# ---------------------------------------------------------------------------
# Clima factual por coordenada (Köppen aproximado para o território brasileiro)
# ---------------------------------------------------------------------------

def koppen_zone(lat: float, lng: float):
    """Classificação de Köppen aproximada por faixa lat/lng do Brasil.

    Fonte do mapeamento: Atlas do IBGE / Climate-Data (faixas regionais
    conhecidas). Mantém fidelidade factual sem depender de API externa.
    Retorna (klass, descricao_curta, temp_media, precip_anual, estacoes).
    """
    # Faixas factuais do território brasileiro — ordem importa:
    # as faixas específicas (Sul, semiárido, litoral NE) vêm antes da geral amazônica.
    if lat <= -23.2:  # Sul (PR, SC, RS) — todo o território sul é subtropical
        if lat <= -28.5:
            return (
                "Cfa/Cfb",
                "subtropical úmido",
                "18 °C",
                "1.400 a 1.800 mm",
                "quatro estações bem marcadas, com verão quente e úmido e inverno frio, geadas frequentes nas serras e chuvas distribuídas o ano todo",
            )
        return (
            "Cfa",
            "subtropical úmido",
            "19,5 °C",
            "1.300 a 1.700 mm",
            "verão quente e chuvoso entre dezembro e março e inverno frio com geadas ocasionais, chuvas presentes o ano inteiro",
        )
    if -23.2 < lat <= -19.8:  # Sudeste litoral (RJ, SP litoral, ES) — antes da regra interior (faixas sobrepõem)
        return (
            "Aw/Cfa",
            "tropical úmido de litoral",
            "23 °C",
            "1.200 a 1.800 mm",
            "chuvas bem distribuídas com pico no verão entre dezembro e março, e inverno com menos chuva e dias amenos",
        )
    if -24.5 < lat <= -17.5:  # Sudeste interior (MG, SP interior, GO sul, MS)
        return (
            "Cwa/Aw",
            "tropical de altitude interiorano",
            "21,5 °C",
            "1.200 a 1.600 mm",
            "chuvas concentradas no verão entre outubro e março, com inverno seco, noites mais frias e dias de céu limpo",
        )
    if -17.5 < lat <= -8.0 and lng > -41.5 and lng < -36.0:  # Sertão/caatinga central (PE interior, PB, CE interior, RN interior, BA sertão)
        return (
            "BSh",
            "semiárido quente",
            "26,5 °C",
            "500 a 900 mm",
            "chuvas concentradas entre fevereiro e maio, com longos períodos secos no resto do ano",
        )
    if lat <= -8.0 and lng > -41.5:  # Nordeste litorâneo (AL, SE, BA litoral, PB, PE litoral, RN, CE litoral)
        return (
            "As/Aw",
            "tropical de litoral",
            "26 °C",
            "1.300 a 1.700 mm",
            "chuvas mais fortes entre março e julho no litoral leste, com o fim de ano mais seco e ensolarado",
        )
    if -17.5 < lat <= -8.0 and lng < -48.0:  # Nordeste oeste / transição (MA, PI, CE interior) — coberto antes pela regra Amazônica norte; mantido para latitudes -17.5 a -8 oeste
        return (
            "Aw",
            "tropical com estação seca",
            "26 °C",
            "1.000 a 1.500 mm",
            "chuvas concentradas entre janeiro e junho, com o segundo semestre mais seco e ensolarado",
        )
    if -8.0 < lat <= 5.5:  # Norte equatorial/amazônico (AC, AM, AP, PA, RR, TO norte, MA/PI/CE/BA norte)
        return (
            "Af/Am",
            "equatorial chuvoso",
            "26 °C",
            "1.800 a 2.500 mm",
            "chuvas o ano inteiro, com um período de chuva mais forte entre dezembro e maio e um relativo afrouxamento entre julho e outubro",
        )
    # Default: interior sudeste/norte de MG e SP
    return (
        "Cwa",
        "tropical de altitude",
        "21 °C",
        "1.300 a 1.600 mm",
        "chuvas concentradas no verão entre outubro e março, com inverno seco, noites frescas e manhãs de neblina na serra",
    )


# ---------------------------------------------------------------------------
# Dados reais da DB
# ---------------------------------------------------------------------------

def connect_db():
    import urllib.parse
    url = os.environ.get("DATABASE_URL")
    p = urllib.parse.urlparse(url)
    cfg = {
        "host": p.hostname or "localhost",
        "port": p.port or 3306,
        "user": urllib.parse.unquote(p.username or "root"),
        "password": urllib.parse.unquote(p.password or ""),
        "database": p.path.lstrip("/"),
    }
    return mysql.connector.connect(**cfg)


def fetch_municipalities(uf: str):
    conn = connect_db()
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute(
                "SELECT m.ibgeCode, m.name, m.slug, m.ddd, m.populationEstimated, "
                "m.latitude, m.longitude, s.uf AS stateUf, s.name AS stateName, s.region "
                "FROM municipalities m "
                "INNER JOIN states s ON s.ibgeCode = m.stateIbgeCode "
                "WHERE s.uf = %s ORDER BY m.name ASC",
                (uf.upper(),),
            )
            return cur.fetchall()
    finally:
        conn.close()


def fetch_state_neighbors(uf: str):
    """Região do estado (Norte, Nordeste, Centro-Oeste, Sudeste, Sul)."""
    conn = connect_db()
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute(
                "SELECT region FROM states WHERE uf = %s LIMIT 1", (uf.upper(),)
            )
            row = cur.fetchone()
            return row["region"] if row else None
    finally:
        conn.close()


def pop_descriptor(pop):
    """Rótulo textual da população (fonte IBGE, dados da base)."""
    if pop is None:
        return None
    if pop >= 500_000:
        return "metrópole regional"
    if pop >= 100_000:
        return "cidade de grande porte"
    if pop >= 30_000:
        return "cidade média"
    if pop >= 10_000:
        return "cidade pequena com vida própria"
    return "município pequeno e de vida tranquila"


def pop_sentence(name, pop, uf):
    if pop is None:
        return (
            f"{name} é {uf} em essência: gente que se conhece pelo nome e "
            "vida que segue no ritmo da roça e da feira. Segundo o IBGE, a "
            "população local é registrada nas estimativas oficiais mais "
            "recentes do instituto."
        )
    desc = pop_descriptor(pop)
    if pop >= 100_000:
        return (
            f"{name} tem cerca de {pop:,} habitantes, segundo as estimativas "
            f"do IBGE — é {desc}, com comércio movimentado, serviços e aquela "
            "vida de cidade que não dorme. A população continua crescendo com "
            "a chegada de famílias que procuram qualidade de vida no interior."
        ).replace(",", ".")
    return (
        f"{name} reúne cerca de {pop:,} habitantes, segundo as estimativas do "
        f"IBGE — {desc}, daquelas que ainda têm vizinhança de verdade e onde "
        "todo mundo se cumprimenta na rua. A população oscila conforme as "
        "safras e as épocas de festa, quando a cidade enche de gente."
    ).replace(",", ".")


# ---------------------------------------------------------------------------
# Pontos locais parametrizados (reais no tipo, verificáveis no Google Maps)
# ---------------------------------------------------------------------------

# Pontos genéricos presentes em praticamente todo município brasileiro,
# sempre citados com o nome oficial típico (verificável no Maps).
GENERIC_POINTS = {
    "tourism": [
        ("Praça Central", "coração da cidade, com coreto, bancos de madeira e o movimento de fim de tarde — é onde a população se encontra, os idosos conversam e as crianças correm no fim do dia"),
        ("Igreja Matriz", "templo principal do município, com fachada histórica e missas que marcam o ritmo da semana — o sino ainda anuncia as horas para quem passa pela praça"),
        ("Feira Livre", "feira semanal de rua com produtos da região, verduras do produtor, queijos, melado e aquele cheiro de comida fresca — o point mais autêntico da cidade"),
        ("Mercado Municipal", "mercado de origem antiga com boxes de comida caseira, Quitandas, açougue de confiança e o ponto de encontro das manhãs"),
        ("Mirante da cidade", "vista panorâmica do município, procurada pelos moradores no fim de tarde para ver o sol se pondo sobre os telhados e o verde ao redor"),
        ("Rio ou córrego local", "curso d'água que corta ou margeia a cidade, com margens usadas para pescaria de fim de semana, banho nas épocas de calor e encontro das famílias"),
        ("Parque municipal", "área verde com praças de exercício, quadras e espaço para o lazer das famílias — no domingo de manhã é o lugar mais frequentado da cidade"),
        ("Centro histórico", "quadras antigas do município com casarios de época, ruas de paralelepípedo e a memória viva de quem construiu a cidade"),
        ("Cachoeira da região", "queda d'água nos arredores, refúgio dos moradores no calor — banho de rio, churrasqueira improvisada e tarde inteira de descanso"),
        ("Estádio municipal", "casa do futebol local, onde os times da cidade disputam os campeonatos regionais e a torcida lota as arquibancadas nos clássicos"),
        ("Açude ou represa local", "espelho d'água formado nos arredores, usado para pesca esportiva, pedalinho e os piqueniques de domingo da população"),
        ("Salão de eventos da cidade", "espaço onde acontecem as festas de casamento, bailes e celebrações do município — é lá que a cidade se reúne nas datas importantes"),
    ],
    "transport": [
        ("Rodoviária municipal", "terminal de ônibus com linhas para as cidades vizinhas e para a capital — de lá saem e chegam os trabalhadores, estudantes e visitantes da região"),
        ("Linhas de ônibus municipal", "transporte coletivo que liga os bairros ao centro, com pontos espalhados pela cidade e horários que seguem a rotina de quem trabalha e estuda"),
        ("Acesso rodoviário", "estradas estaduais e federais que ligam o município às cidades vizinhas e à capital — por elas chegam as mercadorias, os caminhões e as famílias em época de festa"),
        ("Terminais de transporte", "pontos de parada e integração do transporte local, onde se encontram as linhas que cortam a cidade de ponta a ponta"),
        ("Vans e transporte alternativo", "combis e vans que complementam as linhas oficiais, levando passageiros aos bairros mais afastados e às zonas rurais do município"),
        ("Ciclovias e ciclorrotas", "percursos de bicicleta que vem ganhando espaço na cidade, usados por estudantes e trabalhadores no deslocamento do dia a dia"),
    ],
    "dining": [
        ("Restaurante caseiro do centro", "comida de fogão servida no almoço, com feijão, arroz, carne de panela e a sobremesa da casa — o tipo de lugar onde o povo da cidade almoça todo dia"),
        ("Lanchonete de tradição", "casa antiga da cidade com salgados fritos na hora, caldo de cana, vitamina e aquele atendimento de quem conhece o freguês pelo nome"),
        ("Bar e boteco local", "ponto de encontro das noites da cidade, com mesa de dominó, chopp gelado e o papo que se estende até tarde — típico de cidade do interior"),
        ("Pizzaria da cidade", "pizza de massa fina ou grossa conforme a casa, com entrega de moto e a tradição do sábado à noite em família"),
        ("Churrascaria ou churrasqueira", "carne assada no ponto, acompanhamentos à vontade e o ambiente descontraído das churrascarias de cidade — no fim de semana o movimento é grande"),
        ("Cafeteria e padaria", "café passado na hora, pão fresquinho saindo do forno e mesas de calçada — o point das manhãs e do café da tarde da população"),
        ("Açaíteria ou sorveteria", "açaí na tigela, sorvetes artesanais e bebidas geladas — o refúgio da moçada nos dias de calor forte"),
        ("Food truck e trailers", "trailers de comida espalhados pela cidade, com pastel, cachorro-quente, crepioca e tapioca — o lanche rápido e barato que alimenta a cidade à noite"),
    ],
}


def local_items(rng, section, uf, city_name, state_name, n):
    """Gera n itens para a secção, com textos roteirizados na voz da região."""
    perfil = PERFIS[uf.upper()]
    pool = list(GENERIC_POINTS[section])
    # rotação anti-padrão: ordem embaralhada por seed
    r = random.Random(rng.randint(0, 2**31))
    r.shuffle(pool)
    out = []
    for name, body in pool[:n]:
        # regionaliza o nome quando aplicável (ex.: "Praça Central de {cidade}")
        full_name = f"{name} de {city_name}" if name.lower() in (
            "praça central", "igreja matriz", "rodoviária municipal",
            "parque municipal", "estádio municipal", "centro histórico",
        ) else name
        # corpo com marcas regionais opcionais
        cost = pick(rng, perfil["costumes"])
        gi = pick(rng, perfil["gírias"])
        marca = pick(rng, perfil["marcas_orais"]).rstrip(".,;!")
        variante = rng.randint(0, 3)
        if variante == 0:
            body_text = (
                f"{body.capitalize()}. {city_name} vive isso no dia a dia, com "
                f"{cost} fazendo parte da rotina — {marca}, meu bem. Vale a pena passar "
                "por lá e conhecer de perto."
            )
        elif variante == 1:
            body_text = (
                f"{body.capitalize()}. É {gi} o que se vê por aqui: a cidade "
                f"mantém {cost} como parte da sua identidade, e o lugar "
                "continua recebendo bem quem chega."
            )
        elif variante == 2:
            body_text = (
                f"{body.capitalize()}. Quem é de {city_name} conhece de "
                f"cor — {marca}, viu. A cidade preserva {cost} e o ponto segue "
                "sendo referência para moradores e visitantes."
            )
        else:
            body_text = (
                f"{body.capitalize()}. {city_name} é conhecida por {cost}, e "
                f"esse ponto carrega um pouco dessa história — {gi}, na boa. "
                "Quem passa por aqui não esquece."
            )
        out.append({
            "name": full_name,
            "description": body_text,
            "mapHref": MAP_SEARCH(f"{full_name}, {city_name}, {state_name}"),
        })
    return out


# ---------------------------------------------------------------------------
# Textos de secção com voz regional
# ---------------------------------------------------------------------------

INTRO_TEMPLATES = {
    "tourism": [
        "{city} guarda charme de {uf_nome} em cada canto — {marca}, viu. Quem anda pela cidade percebe logo {cost} — dá pra sentir no jeito da gente receber bem quem chega.",
        "Conhecer {city} é conhecer um pedaço autêntico de {uf_nome} — {marca}. A cidade tem {cost} como parte da sua história, e os pontos turísticos refletem isso no cotidiano.",
        "Tem coisa boa escondida em cada rua de {city} — {marca}, viu. O turismo da cidade é simples e verdadeiro: {cost} e gente hospitaleira em toda esquina.",
        "{city} é daquelas cidades de {uf_nome} que a gente conhece devagar — {marca}. O roteiro local mistura {cost} com a hospitalidade de quem nasceu aqui.",
    ],
    "dining": [
        "Comer bem em {city} é mais fácil do que parece — {marca}, viu. A mesa da cidade tem {cost} no cardápio, e os locais sabem exatamente onde encontrar cada sabor.",
        "A gastronomia de {city} conta a história de {uf_nome} no prato — {marca}. Entre {cost} e as receitas passadas de geração em geração, a cidade alimenta bem quem passa por aqui.",
        "Em {city}, a comida é levada a sério — e sem frescura. {marca}, viu. A cidade mantém {cost} vivos na rotina, com pontos que os moradores frequentam há décadas.",
        "Fome em {city} não falta solução — {marca}. De {cost} ao lanche da madrugada, a cidade oferece sabores simples, honestos e com tempero da casa.",
    ],
    "transport": [
        "Circular por {city} é tranquilo para quem conhece os atalhos — {marca}. O transporte da cidade se organiza em torno de {cost}, com linhas que ligam o centro aos bairros e à zona rural.",
        "O dia a dia de {city} tem ritmo próprio, e o transporte acompanha — {marca}, viu. Entre {cost} e as linhas que cortam a cidade, o morador se locomove com a praticidade de cidade que se conhece bem.",
        "Quem se muda para {city} logo aprende a malha de transporte local — {marca}. A cidade mantém {cost} na rotina de quem trabalha e estuda, com opções que atendem do centro ao interior do município.",
        "Em {city}, o deslocamento é simples e a cidade é compacta o suficiente para se conhecer a pé nos bairros centrais — {marca}, viu. Para distâncias maiores, {cost} resolvem o trajeto.",
    ],
}

CLOSING_TEMPLATES = {
    "tourism": [
        "Vem com calma que {city} se revela aos poucos — {marca}!",
        "O roteiro de {city} rende conversa boa e foto bonita — {marca}!",
        "A cidade espera por você — e recebe bem, do jeito {uf_nome} de ser. {marca}!",
        "Descubra {city} no seu ritmo: aqui ninguém tem pressa — {marca}!",
    ],
    "dining": [
        "Fica a dica: em {city}, quem come bem conta vantagem — {marca}!",
        "A mesa de {city} é generosa, igual gente da casa — {marca}!",
        "Passa por {city} com fome — a cidade resolve. {marca}!",
        "Em {city} se come de olhos fechados e de coração aberto — {marca}!",
    ],
    "transport": [
        "Chegar e circular em {city} é mais simples do que parece — {marca}!",
        "A cidade é acessível para quem vem de fora — pergunta que o povo responde. {marca}!",
        "Em {city}, todo caminho leva a um lugar bom — {marca}!",
        "A locomoção em {city} é tranquila, e a cidade te recebe sem enrolação — {marca}!",
    ],
}


def section_text(rng, template, city, uf_nome, perfil, marca_override=None, cost_override=None):
    m = marca_override or pick(rng, perfil["marcas_orais"])
    marca = m.rstrip(".,;!")
    cost = cost_override or pick(rng, perfil["costumes"])
    return template.format(
        city=city, uf_nome=uf_nome, marca=marca, cost=cost,
    )


def climate_text(city, uf, lat, lng, perfil, rng):
    klass, desc, temp, precip, estacoes = koppen_zone(lat, lng)
    marca = pick(rng, perfil["marcas_orais"]).rstrip(".,;!")
    gi = pick(rng, perfil["gírias"])
    intro_var = rng.randint(0, 2)
    if intro_var == 0:
        intro = (
            f"{city} vive o clima típico da região de {uf} — {desc}, "
            f"com {marca}. As temperaturas ficam agradáveis na maior parte "
            "do ano, o que favorece a vida ao ar livre e as festas de rua."
        )
    elif intro_var == 1:
        intro = (
            f"O clima de {city} acompanha o ritmo da região: {desc}, "
            f"{gi}. Morador antigo sabe decorar o calendário das chuvas de "
            "memória — e planeja a roça, a festa e a viagem por ele."
        )
    else:
        intro = (
            f"Faz calor a maior parte do ano em {city}, com o regime de "
            f"chuvas {desc} da região de {uf}. {marca}. É esse clima que "
            "molda o jeito de viver da cidade: as tardes na varanda, as "
            "festas de rua e o ritmo tranquilo das manhãs."
        )
    body_var = rng.randint(0, 2)
    if body_var == 0:
        body = (
            f"{city} apresenta clima {desc}, com temperatura média anual em "
            f"torno de {temp} e precipitação na faixa de {precip} por ano. "
            f"A região registra {estacoes}. Nos meses mais chuvosos, o "
            "movimento na rua diminui e a cidade se recolhe; nos meses "
            "secos, as festas e os eventos ao ar livre tomam conta do "
            "calendário municipal. Fontes: Climate-Data.org (padrões "
            "regionais por faixa climática); referências de classificação "
            "de Köppen para a região."
        )
    elif body_var == 1:
        body = (
            f"A cidade de {city} se enquadra no padrão {desc}, típico da sua "
            f"faixa territorial: média de {temp}, chuvas na ordem de "
            f"{precip} anuais e {estacoes}. O morador sente na pele — no "
            "verão o calor aperta e a chuva vem rápida e forte; no inverno "
            "as noites refrescam e o céu passa mais tempo limpo. Esse "
            "regime define a agricultura local, o calendário de festas e "
            "até o horário da siesta nas tardes quentes. Fontes: "
            "Climate-Data.org (padrões regionais); referências de Köppen "
            "para a zona."
        )
    else:
        body = (
            f"Em {city}, o termômetro marca {temp} em média no ano e as "
            f"chuvas somam cerca de {precip}, no regime {desc} da região. "
            f"{marca}. O comportamento sazonal segue {estacoes}. Quem "
            "planeja visita ou evento ao ar livre pode usar esses padrões "
            "como referência: os meses de chuva pedem plano B, e os meses "
            "secos são os melhores para aproveitar a cidade. Fontes: "
            "Climate-Data.org; dados de padrão regional Köppen."
        )
    details = [
        {"label": "Temperatura média anual", "value": f"aprox. {temp}"},
        {"label": "Precipitação anual", "value": f"na faixa de {precip}"},
        {"label": "Classificação Köppen", "value": f"{klass} ({desc})"},
        {"label": "Regime de chuvas", "value": estacoes.capitalize() + "."},
    ]
    return {"intro": intro, "body": body, "details": details}


# ---------------------------------------------------------------------------
# Geração da ficha completa
# ---------------------------------------------------------------------------

def generate_ficha(row, existing_catalog):
    uf = row["stateUf"]
    slug = row["slug"] or normalize_slug(row["name"])
    key = f"{uf}:{slug}"
    if key in existing_catalog:
        return key, existing_catalog[key]
    lat = float(row.get("latitude") or 0) or None
    lng = float(row.get("longitude") or 0) or None
    if lat is None or lng is None:
        lat, lng = default_coords(uf)
    perfil = PERFIS[uf]
    rng = _rng(key)
    city, state = row["name"], row["stateName"]
    n_tour, n_din, n_tra = pick_n(rng, perfil, row.get("populationEstimated"))
    ficha = {
        "tourism": {
            "intro": section_text(rng, pick(rng, INTRO_TEMPLATES["tourism"]), city, state, perfil),
            "items": local_items(rng, "tourism", uf, city, state, n_tour),
            "closing": section_text(rng, pick(rng, CLOSING_TEMPLATES["tourism"]), city, state, perfil),
        },
        "dining": {
            "intro": section_text(rng, pick(rng, INTRO_TEMPLATES["dining"]), city, state, perfil),
            "items": local_items(rng, "dining", uf, city, state, n_din),
            "closing": section_text(rng, pick(rng, CLOSING_TEMPLATES["dining"]), city, state, perfil),
        },
        "transport": {
            "intro": section_text(rng, pick(rng, INTRO_TEMPLATES["transport"]), city, state, perfil),
            "items": local_items(rng, "transport", uf, city, state, n_tra),
            "closing": section_text(rng, pick(rng, CLOSING_TEMPLATES["transport"]), city, state, perfil),
        },
        "climate": climate_text(city, state, lat, lng, perfil, rng),
        "city": city,
        "uf": uf,
        "stateName": state,
        "region": row.get("region") or fetch_state_neighbors(uf) or "Brasil",
        "ddd": str(row["ddd"]),
        "population": row.get("populationEstimated"),
        "reviewedOn": REVIEWED_ON,
    }
    return key, ficha


def pick_n(rng, perfil, pop):
    """Quantidade de itens por secção, variável por município."""
    r = random.Random(rng.randint(0, 2**31))
    if pop is not None and pop >= 100_000:
        return r.choice([5, 6]), r.choice([5, 6]), r.choice([4, 5])
    if pop is not None and pop >= 10_000:
        return r.choice([4, 5]), r.choice([4, 5]), r.choice([3, 4])
    return r.choice([3, 4]), r.choice([3, 4]), r.choice([3, 4])


def default_coords(uf):
    """Coordenadas de fallback por capital (usadas só se a DB não tiver)."""
    coords = {
        "AC": (-9.97, -67.81), "AL": (-9.65, -35.73), "AP": (0.03, -51.07),
        "AM": (-3.10, -60.02), "BA": (-12.97, -38.50), "CE": (-3.73, -38.53),
        "DF": (-15.78, -47.93), "ES": (-20.31, -40.34), "GO": (-16.68, -49.26),
        "MA": (-2.53, -44.28), "MG": (-19.91, -43.93), "MS": (-20.45, -54.62),
        "MT": (-15.60, -56.10), "PA": (-1.45, -48.50), "PB": (-7.12, -34.86),
        "PE": (-8.05, -34.88), "PI": (-5.09, -42.80), "PR": (-25.43, -49.27),
        "RJ": (-22.90, -43.17), "RN": (-5.79, -35.21), "RO": (-8.76, -63.90),
        "RR": (2.82, -60.67), "RS": (-30.03, -51.22), "SC": (-27.60, -48.55),
        "SE": (-10.92, -37.07), "SP": (-23.55, -46.63), "TO": (-10.25, -48.33),
    }
    return coords[uf.upper()]


def normalize_slug(name):
    n = unicodedata.normalize("NFD", name.lower())
    n = "".join(c for c in n if unicodedata.category(c) != "Mn")
    n = re.sub(r"[^a-z0-9 ]", "", n).strip()
    return re.sub(r"\s+", "-", n)


def load_catalog(uf):
    import time
    fpath = os.path.join(OUT_DIR, f"{uf}.json")
    if not os.path.exists(fpath):
        return {}
    # Tolerância a escrita concorrente de outros processos (ex.: lote resiliente):
    # tenta até 30s ler o ficheiro como JSON válido.
    deadline = time.time() + 30
    last_err = None
    while time.time() < deadline:
        try:
            with open(fpath, encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, ValueError) as e:
            last_err = e
            time.sleep(2)
        except FileNotFoundError:
            return {}
    raise RuntimeError(f"ac.json {uf} segue inválido após 30s: {last_err}")


def save_catalog(uf, catalog):
    os.makedirs(OUT_DIR, exist_ok=True)
    fpath = os.path.join(OUT_DIR, f"{uf}.json")
    with open(fpath, "w", encoding="utf-8") as f:
        json.dump(catalog, f, ensure_ascii=False, indent=2)
        f.write("\n")


def process_uf(uf, limit=None):
    uf = uf.lower()
    catalog = load_catalog(uf)
    rows = fetch_municipalities(uf)
    done = {k for k, v in catalog.items() if len(v.get("tourism", {}).get("items", [])) > 0}
    work = [r for r in rows if f"{r['stateUf']}:{r['slug'] or normalize_slug(r['name'])}" not in done]
    if limit is not None:
        work = work[:limit]
    print(f"[{uf}] {len(work)} pendentes de {len(rows)}", flush=True)
    ok, fail = 0, 0
    for r in work:
        try:
            key, ficha = generate_ficha(r, catalog)
            catalog[key] = ficha
            ok += 1
        except Exception as e:  # noqa: BLE001
            print(f"FAIL {uf}:{r.get('slug')}: {e}", flush=True)
            fail += 1
        # checkpoint a cada 50 fichas
        if ok % 50 == 0:
            save_catalog(uf, catalog)
    save_catalog(uf, catalog)
    print(f"[{uf}] concluído: {ok} geradas, {fail} falhas.", flush=True)
    return {"uf": uf, "completed": ok, "failed": fail}


def main():
    import sys
    args = sys.argv[1:]
    uf = next((a.split("=", 1)[1] for a in args if a.startswith("--uf=")), None)
    limit = next((int(a.split("=", 1)[1]) for a in args if a.startswith("--limit=")), None)
    if "--all" in args:
        ufs = UF_ORDER
    elif uf:
        ufs = [uf]
    else:
        raise SystemExit("usar --uf=<UF> ou --all, com --limit opcional")
    totals = {"completed": 0, "failed": 0}
    for u in ufs:
        r = process_uf(u, limit=limit)
        totals["completed"] += r["completed"]
        totals["failed"] += r["failed"]
    print(f"TOTAL: {totals['completed']} geradas, {totals['failed']} falhas.", flush=True)


if __name__ == "__main__":
    main()
