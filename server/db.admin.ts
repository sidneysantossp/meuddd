import fs from "node:fs";
import path from "node:path";
import { sql } from "drizzle-orm";
import { getDb } from "./db";

export interface AdminDashboardKpis {
  unmatched: {
    total: number;
    last7d: number;
    last30d: number;
    topTerms: { id: number; query: string; volume: number }[];
  };
  suggestions: {
    total: number;
    pending: number;
    reviewed: number;
    approved: number;
    dismissed: number;
    recent: {
      id: number;
      municipalityIbgeCode: number;
      topic: string;
      note: string;
      status: string;
      createdAt: string;
    }[];
  };
  coverage: {
    totalMunicipalities: number;
    municipalitiesWithTabs: number;
    completionPercent: number;
  };
}

async function queryNumber(
  db: NonNullable<Awaited<ReturnType<typeof getDb>>>,
  statement: ReturnType<typeof sql>
): Promise<number> {
  const rows = await db.execute(statement);
  const value = (rows as unknown as [{ c?: number }[]])?.[0]?.[0]?.c;
  return Number(value ?? 0);
}

export async function countIntegratedTabs(): Promise<number> {
  const tabsDir = path.resolve(import.meta.dirname, "../.generated/tabs");
  if (!fs.existsSync(tabsDir)) return 0;
  let total = 0;
  for (const file of fs.readdirSync(tabsDir)) {
    if (!file.endsWith(".json")) continue;
    try {
      const catalog = JSON.parse(
        fs.readFileSync(path.join(tabsDir, file), "utf-8")
      ) as Record<string, { tourism?: { items?: unknown[] } }>;
      for (const entry of Object.values(catalog)) {
        if (
          Array.isArray(entry?.tourism?.items) &&
          entry.tourism.items.length > 0
        ) {
          total += 1;
        }
      }
    } catch {
      // ficheiro inválido é ignorado na contagem
    }
  }
  return total;
}

function requireDb(
  db: Awaited<ReturnType<typeof getDb>>
): NonNullable<Awaited<ReturnType<typeof getDb>>> {
  if (!db) throw new Error("A base de dados não está disponível.");
  return db;
}

export async function getAdminDashboard(): Promise<AdminDashboardKpis> {
  const db = requireDb(await getDb());

  const totalUnmatched = await queryNumber(
    db,
    sql`SELECT COUNT(*) AS c FROM unmatched_searches`
  );
  const last7d = await queryNumber(
    db,
    sql`SELECT COUNT(*) AS c FROM unmatched_searches WHERE lastSeenAt >= DATE_SUB(NOW(), INTERVAL 7 DAY)`
  );
  const last30d = await queryNumber(
    db,
    sql`SELECT COUNT(*) AS c FROM unmatched_searches WHERE lastSeenAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)`
  );

  const topRows = await db.execute(sql`
    SELECT id, latestQuery, searchCount
    FROM unmatched_searches
    ORDER BY searchCount DESC
    LIMIT 10
  `);
  const topTerms = (
    topRows as unknown as {
      id: number;
      latestQuery: string;
      searchCount: number;
    }[]
  ).map(t => ({
    id: t.id,
    query: t.latestQuery,
    volume: Number(t.searchCount ?? 0),
  }));

  const suggestionsRows = await db.execute(sql`
    SELECT COUNT(*) AS c, status FROM locality_suggestions GROUP BY status
  `);
  const byStatus: Record<string, number> = {};
  let suggestionsTotal = 0;
  for (const row of suggestionsRows as unknown as {
    c: number | bigint;
    status: string;
  }[]) {
    const n = Number(row.c);
    byStatus[row.status] = n;
    suggestionsTotal += n;
  }

  const recentRows = await db.execute(sql`
    SELECT id, municipalityIbgeCode, topic, note, status, createdAt
    FROM locality_suggestions
    ORDER BY createdAt DESC
    LIMIT 8
  `);
  const recent = (
    recentRows as unknown as {
      id: number;
      municipalityIbgeCode: number;
      topic: string;
      note: string;
      status: string;
      createdAt: Date;
    }[]
  ).map(r => ({ ...r, createdAt: r.createdAt.toISOString() }));

  const totalMunicipalities = await queryNumber(
    db,
    sql`SELECT COUNT(*) AS c FROM municipalities`
  );

  let municipalitiesWithTabs = 0;
  try {
    municipalitiesWithTabs = await countIntegratedTabs();
  } catch {
    municipalitiesWithTabs = 0;
  }

  return {
    unmatched: { total: totalUnmatched, last7d, last30d, topTerms },
    suggestions: {
      total: suggestionsTotal,
      pending: byStatus["pending"] ?? 0,
      reviewed: byStatus["reviewed"] ?? 0,
      approved: byStatus["approved"] ?? 0,
      dismissed: byStatus["dismissed"] ?? 0,
      recent,
    },
    coverage: {
      totalMunicipalities,
      municipalitiesWithTabs,
      completionPercent:
        totalMunicipalities > 0
          ? Math.round((municipalitiesWithTabs / totalMunicipalities) * 10000) /
            100
          : 0,
    },
  };
}
