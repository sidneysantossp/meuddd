import { and, asc, desc, eq, gte, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, localitySuggestions, municipalities, states, unmatchedSearches, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import { editorialGuides } from "../shared/editorialGuides";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

type MunicipalityRecord = {
  ibgeCode: number;
  name: string;
  slug: string | null;
  ddd: string;
  latitude: string;
  longitude: string;
  capital: boolean;
  timezone: string;
  populationEstimated: number | null;
  populationReferenceYear: number | null;
  stateName: string;
  uf: string;
  region: string;
  statePopulationEstimated: number | null;
  statePopulationReferenceYear: number | null;
};

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function levenshteinDistance(left: string, right: string) {
  if (left === right) return 0;
  if (!left.length) return right.length;
  if (!right.length) return left.length;
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      );
    }
    previous = current;
  }
  return previous[right.length];
}

function permittedTypos(length: number) {
  if (length <= 4) return 1;
  if (length <= 9) return 2;
  return 3;
}

function fuzzyScore(row: MunicipalityRecord, rawQuery: string) {
  const query = normalizeSearch(rawQuery);
  if (!query) return 0;
  const city = normalizeSearch(row.name);
  const state = normalizeSearch(row.stateName);
  const region = normalizeSearch(row.region);
  const candidates = [
    { value: city, boost: 1_200 },
    { value: state, boost: 900 },
    { value: region, boost: 700 },
    { value: normalizeSearch(row.uf), boost: 850 },
    { value: row.ddd, boost: 1_000 },
  ];
  for (const candidate of candidates) {
    if (candidate.value === query) return candidate.boost;
    if (candidate.value.includes(query)) return candidate.boost - 80 - candidate.value.indexOf(query);
  }
  if (query.length < 3 || /^\d+$/.test(query)) return 0;
  return candidates.reduce((best, candidate) => {
    const distance = levenshteinDistance(query, candidate.value);
    if (distance > permittedTypos(query.length)) return best;
    return Math.max(best, candidate.boost / 5 + 30 - distance);
  }, 0);
}

function fuzzyFilterMunicipalities(rows: MunicipalityRecord[], query: string) {
  const scored = rows
    .map(row => ({ row, score: fuzzyScore(row, query) }))
    .filter((entry): entry is { row: MunicipalityRecord; score: number } => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.row.name.localeCompare(right.row.name, "pt-BR"));
  const threshold = Math.max((scored[0]?.score ?? 0) - 50, 1);
  return scored
    .filter(entry => entry.score >= threshold)
    .map(entry => entry.row);
}

export type DddSummary = {
  code: string;
  states: { name: string; uf: string; region: string }[];
  cityCount: number;
  sampleCities: string[];
};

export type StateSummary = {
  name: string;
  uf: string;
  region: string;
  cityCount: number;
  dddCount: number;
  populationEstimated: number | null;
  populationReferenceYear: number | null;
};

function groupDddRows(rows: MunicipalityRecord[]): DddSummary[] {
  const groups = new Map<string, MunicipalityRecord[]>();
  for (const row of rows) groups.set(row.ddd, [...(groups.get(row.ddd) ?? []), row]);

  return Array.from(groups.entries())
    .map(([code, group]) => {
      const stateMap = new Map(group.map(row => [row.uf, { name: row.stateName, uf: row.uf, region: row.region }]));
      return {
        code,
        states: Array.from(stateMap.values()).sort((left, right) => left.name.localeCompare(right.name, "pt-BR")),
        cityCount: group.length,
        sampleCities: group.slice(0, 6).map(row => row.name),
      };
    })
    .sort((left, right) => Number(left.code) - Number(right.code));
}

async function selectMunicipalities({ query, uf, ddd, slug }: { query?: string; uf?: string; ddd?: string; slug?: string }) {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível.");

  const normalizedQuery = query?.trim();
  const terms = [];
  if (uf) terms.push(eq(states.uf, uf.toUpperCase()));
  if (ddd) terms.push(eq(municipalities.ddd, ddd));
  if (slug) terms.push(eq(municipalities.slug, slug));
  if (normalizedQuery) {
    const wildcard = `%${normalizedQuery}%`;
    const normalizedDdd = normalizedQuery.replace(/\D/g, "");
    terms.push(or(
      like(municipalities.name, wildcard),
      like(states.name, wildcard),
      like(states.uf, wildcard.toUpperCase()),
      like(states.region, wildcard),
      normalizedDdd ? like(municipalities.ddd, `${normalizedDdd}%`) : undefined,
    ));
  }

  return db
    .select({
      ibgeCode: municipalities.ibgeCode,
      name: municipalities.name,
      slug: municipalities.slug,
      ddd: municipalities.ddd,
      latitude: municipalities.latitude,
      longitude: municipalities.longitude,
      capital: municipalities.capital,
      timezone: municipalities.timezone,
      populationEstimated: municipalities.populationEstimated,
      populationReferenceYear: municipalities.populationReferenceYear,
      stateName: states.name,
      uf: states.uf,
      region: states.region,
      statePopulationEstimated: states.populationEstimated,
      statePopulationReferenceYear: states.populationReferenceYear,
    })
    .from(municipalities)
    .innerJoin(states, eq(municipalities.stateIbgeCode, states.ibgeCode))
    .where(and(...terms))
    .orderBy(asc(municipalities.ddd), asc(municipalities.name));
}

export async function searchDdds(input: { query?: string; uf?: string }) {
  const query = input.query?.trim();
  if (!query || /^\d+$/.test(query.replace(/\D/g, ""))) return groupDddRows(await selectMunicipalities(input));
  return groupDddRows(fuzzyFilterMunicipalities(await selectMunicipalities({ uf: input.uf }), query));
}

export function prepareUnmatchedSearch(input: { query: string; uf?: string }) {
  const latestQuery = input.query.trim().replace(/\s+/g, " ").slice(0, 120);
  const normalizedQuery = normalizeSearch(latestQuery).slice(0, 120);
  const selectedUf = input.uf?.trim().toUpperCase();
  if (normalizedQuery.length < 2 || /^\d{1,2}$/.test(normalizedQuery) || (selectedUf && !/^[A-Z]{2}$/.test(selectedUf))) return null;
  return { normalizedQuery, latestQuery, selectedUf: selectedUf || null };
}

export async function recordUnmatchedSearch(input: { query: string; uf?: string }) {
  const payload = prepareUnmatchedSearch(input);
  if (!payload) return { recorded: false } as const;
  const db = await getDb();
  if (!db) return { recorded: false } as const;
  await db.insert(unmatchedSearches).values(payload).onDuplicateKeyUpdate({
    set: {
      latestQuery: payload.latestQuery,
      selectedUf: payload.selectedUf,
      searchCount: sql`${unmatchedSearches.searchCount} + 1`,
      lastSeenAt: sql`CURRENT_TIMESTAMP`,
    },
  });
  return { recorded: true } as const;
}

export type UnmatchedSearchFilters = { limit?: number; minVolume?: number; periodDays?: number };

export async function listUnmatchedSearches(input: UnmatchedSearchFilters = {}) {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível.");
  const safeLimit = Math.max(1, Math.min(input.limit ?? 50, 100));
  const safeMinVolume = Math.max(1, Math.min(input.minVolume ?? 1, 10_000));
  const safePeriodDays = input.periodDays ? Math.max(1, Math.min(input.periodDays, 365)) : undefined;
  const conditions = [gte(unmatchedSearches.searchCount, safeMinVolume)];
  if (safePeriodDays) {
    const from = new Date();
    from.setDate(from.getDate() - safePeriodDays);
    conditions.push(gte(unmatchedSearches.lastSeenAt, from));
  }
  return db
    .select({
      normalizedQuery: unmatchedSearches.normalizedQuery,
      latestQuery: unmatchedSearches.latestQuery,
      selectedUf: unmatchedSearches.selectedUf,
      searchCount: unmatchedSearches.searchCount,
      firstSeenAt: unmatchedSearches.firstSeenAt,
      lastSeenAt: unmatchedSearches.lastSeenAt,
    })
    .from(unmatchedSearches)
    .where(and(...conditions))
    .orderBy(desc(unmatchedSearches.searchCount), desc(unmatchedSearches.lastSeenAt))
    .limit(safeLimit);
}

export function prepareLocalitySuggestion(input: { municipalityIbgeCode: number; topic: "mobility" | "useful_phone" | "other"; note: string }) {
  const municipalityIbgeCode = Number(input.municipalityIbgeCode);
  const note = input.note.trim().replace(/\s+/g, " ").slice(0, 600);
  if (!Number.isInteger(municipalityIbgeCode) || municipalityIbgeCode <= 0 || note.length < 12) return null;
  return { municipalityIbgeCode, topic: input.topic, note };
}

export async function createLocalitySuggestion(input: { municipalityIbgeCode: number; topic: "mobility" | "useful_phone" | "other"; note: string }) {
  const payload = prepareLocalitySuggestion(input);
  if (!payload) throw new Error("A sugestão precisa identificar a localidade e descrever a alteração em pelo menos 12 caracteres.");
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível.");
  await db.insert(localitySuggestions).values(payload);
  return { accepted: true } as const;
}

export type LocalitySuggestionFilters = {
  status?: "pending" | "reviewed" | "approved" | "dismissed";
  uf?: string;
  topic?: "mobility" | "useful_phone" | "other";
  limit?: number;
};

export async function listLocalitySuggestions(input: LocalitySuggestionFilters = {}) {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível.");
  const safeLimit = Math.max(1, Math.min(input.limit ?? 100, 100));
  const safeUf = input.uf?.trim().toUpperCase();
  const ufCondition = safeUf && /^[A-Z]{2}$/.test(safeUf) ? eq(states.uf, safeUf) : undefined;
  return db
    .select({
      id: localitySuggestions.id,
      municipalityIbgeCode: localitySuggestions.municipalityIbgeCode,
      municipalityName: municipalities.name,
      uf: states.uf,
      topic: localitySuggestions.topic,
      note: localitySuggestions.note,
      status: localitySuggestions.status,
      createdAt: localitySuggestions.createdAt,
      reviewedAt: localitySuggestions.reviewedAt,
    })
    .from(localitySuggestions)
    .leftJoin(municipalities, eq(localitySuggestions.municipalityIbgeCode, municipalities.ibgeCode))
    .leftJoin(states, eq(municipalities.stateIbgeCode, states.ibgeCode))
    .where(and(
      input.status ? eq(localitySuggestions.status, input.status) : undefined,
      ufCondition,
      input.topic ? eq(localitySuggestions.topic, input.topic) : undefined,
    ))
    .orderBy(asc(localitySuggestions.status), desc(localitySuggestions.createdAt))
    .limit(safeLimit);
}

export async function reviewLocalitySuggestion(input: { id: number; status: "reviewed" | "approved" | "dismissed" }) {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível.");
  await db
    .update(localitySuggestions)
    .set({ status: input.status, reviewedAt: new Date() })
    .where(eq(localitySuggestions.id, input.id));
  return { updated: true } as const;
}

export async function getDddDetails(code: string) {
  const municipalitiesForDdd = await selectMunicipalities({ ddd: code });
  if (!municipalitiesForDdd.length) return null;

  const [summary] = groupDddRows(municipalitiesForDdd);
  return {
    ...summary,
    municipalities: municipalitiesForDdd,
  };
}

export async function getStateDetails(uf: string) {
  const municipalitiesForState = await selectMunicipalities({ uf });
  if (!municipalitiesForState.length) return null;

  const first = municipalitiesForState[0];
  return {
    state: {
      name: first.stateName,
      uf: first.uf,
      region: first.region,
      populationEstimated: first.statePopulationEstimated,
      populationReferenceYear: first.statePopulationReferenceYear,
    },
    cityCount: municipalitiesForState.length,
    ddds: groupDddRows(municipalitiesForState),
    municipalities: municipalitiesForState,
  };
}

export async function getMunicipalityDetails(uf: string, slug: string) {
  const [municipality] = await selectMunicipalities({ uf, slug });
  if (!municipality) return null;

  const municipalitiesForDdd = await selectMunicipalities({ ddd: municipality.ddd });
  const [ddd] = groupDddRows(municipalitiesForDdd);
  return {
    municipality,
    state: {
      name: municipality.stateName,
      uf: municipality.uf,
      region: municipality.region,
      populationEstimated: municipality.statePopulationEstimated,
      populationReferenceYear: municipality.statePopulationReferenceYear,
    },
    ddd,
    relatedMunicipalities: municipalitiesForDdd
      .filter(item => item.uf === municipality.uf && item.ibgeCode !== municipality.ibgeCode)
      .slice(0, 12),
  };
}

export async function listStateSummaries(): Promise<StateSummary[]> {
  const rows = await selectMunicipalities({});
  const groups = new Map<string, MunicipalityRecord[]>();
  for (const row of rows) groups.set(row.uf, [...(groups.get(row.uf) ?? []), row]);

  return Array.from(groups.values())
    .map(group => ({
      name: group[0].stateName,
      uf: group[0].uf,
      region: group[0].region,
      cityCount: group.length,
      dddCount: new Set(group.map(row => row.ddd)).size,
      populationEstimated: group[0].statePopulationEstimated,
      populationReferenceYear: group[0].statePopulationReferenceYear,
    }))
    .sort((left, right) => left.name.localeCompare(right.name, "pt-BR"));
}

export type SitemapInventory = {
  states: string[];
  ddds: string[];
  citiesByUf: Record<string, string[]>;
  guides: string[];
};

export async function listSitemapInventory(): Promise<SitemapInventory> {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível.");
  const municipalitiesForSitemap = await db
    .select({ uf: states.uf, slug: municipalities.slug })
    .from(municipalities)
    .innerJoin(states, eq(municipalities.stateIbgeCode, states.ibgeCode))
    .where(and());
  const stateRows = await db.select({ uf: states.uf }).from(states);
  const dddRows = await db.selectDistinct({ code: municipalities.ddd }).from(municipalities).orderBy(asc(municipalities.ddd));
  const citiesByUf: Record<string, string[]> = {};
  for (const item of municipalitiesForSitemap) {
    if (!item.slug) continue;
    const uf = item.uf.toLowerCase();
    citiesByUf[uf] = [...(citiesByUf[uf] ?? []), `/cidade/${uf}/${item.slug}`];
  }
  return [
    {
      states: stateRows.map(state => `/estado/${state.uf.toLowerCase()}`),
      ddds: dddRows.map(item => `/ddd/${item.code}`),
      citiesByUf,
      guides: ["/", "/guias", ...editorialGuides.map(guide => `/guia/${guide.slug}`)],
    },
  ][0];
}

export async function listSitemapPaths() {
  const inventory = await listSitemapInventory();
  return [
    ...inventory.guides,
    ...inventory.states,
    ...inventory.ddds,
    ...Object.values(inventory.citiesByUf).flat(),
  ];
}

export const __testables = { groupDddRows, normalizeSearch, levenshteinDistance, fuzzyFilterMunicipalities, prepareUnmatchedSearch, prepareLocalitySuggestion };
