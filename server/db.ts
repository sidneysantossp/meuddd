import { and, asc, eq, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, municipalities, states, users } from "../drizzle/schema";
import { ENV } from './_core/env';

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
  ddd: string;
  latitude: string;
  longitude: string;
  capital: boolean;
  timezone: string;
  stateName: string;
  uf: string;
  region: string;
};

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

async function selectMunicipalities({ query, uf, ddd }: { query?: string; uf?: string; ddd?: string }) {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível.");

  const normalizedQuery = query?.trim();
  const terms = [];
  if (uf) terms.push(eq(states.uf, uf.toUpperCase()));
  if (ddd) terms.push(eq(municipalities.ddd, ddd));
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
      ddd: municipalities.ddd,
      latitude: municipalities.latitude,
      longitude: municipalities.longitude,
      capital: municipalities.capital,
      timezone: municipalities.timezone,
      stateName: states.name,
      uf: states.uf,
      region: states.region,
    })
    .from(municipalities)
    .innerJoin(states, eq(municipalities.stateIbgeCode, states.ibgeCode))
    .where(and(...terms))
    .orderBy(asc(municipalities.ddd), asc(municipalities.name));
}

export async function searchDdds(input: { query?: string; uf?: string }) {
  return groupDddRows(await selectMunicipalities(input));
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
    state: { name: first.stateName, uf: first.uf, region: first.region },
    cityCount: municipalitiesForState.length,
    ddds: groupDddRows(municipalitiesForState),
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
    }))
    .sort((left, right) => left.name.localeCompare(right.name, "pt-BR"));
}

export const __testables = { groupDddRows };
