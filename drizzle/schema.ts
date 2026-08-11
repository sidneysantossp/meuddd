import { boolean, decimal, index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** Unidade federativa, identificada pelo código IBGE de dois dígitos. */
export const states = mysqlTable(
  "states",
  {
    ibgeCode: int("ibgeCode").primaryKey(),
    uf: varchar("uf", { length: 2 }).notNull().unique(),
    name: varchar("name", { length: 64 }).notNull(),
    region: varchar("region", { length: 20 }).notNull(),
    populationEstimated: int("populationEstimated"),
    populationReferenceYear: int("populationReferenceYear"),
  },
  table => [index("states_region_idx").on(table.region)],
);

/** Catálogo dos 67 códigos nacionais de discagem direta à distância. */
export const dddCodes = mysqlTable("ddd_codes", {
  code: varchar("code", { length: 2 }).primaryKey(),
});

/** Município brasileiro e respetiva área de numeração. */
export const municipalities = mysqlTable(
  "municipalities",
  {
    ibgeCode: int("ibgeCode").primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    slug: varchar("slug", { length: 160 }),
    stateIbgeCode: int("stateIbgeCode").notNull(),
    ddd: varchar("ddd", { length: 2 }).notNull(),
    latitude: decimal("latitude", { precision: 9, scale: 6 }).notNull(),
    longitude: decimal("longitude", { precision: 9, scale: 6 }).notNull(),
    timezone: varchar("timezone", { length: 64 }).notNull(),
    capital: boolean("capital").notNull().default(false),
    populationEstimated: int("populationEstimated"),
    populationReferenceYear: int("populationReferenceYear"),
  },
  table => [
    index("municipalities_state_idx").on(table.stateIbgeCode),
    index("municipalities_ddd_idx").on(table.ddd),
    index("municipalities_name_idx").on(table.name),
    index("municipalities_state_slug_idx").on(table.stateIbgeCode, table.slug),
  ],
);

/** Consultas que não encontraram correspondência, agregadas sem identificador pessoal. */
export const unmatchedSearches = mysqlTable(
  "unmatched_searches",
  {
    id: int("id").autoincrement().primaryKey(),
    normalizedQuery: varchar("normalizedQuery", { length: 120 }).notNull().unique(),
    latestQuery: varchar("latestQuery", { length: 120 }).notNull(),
    selectedUf: varchar("selectedUf", { length: 2 }),
    searchCount: int("searchCount").notNull().default(1),
    firstSeenAt: timestamp("firstSeenAt").defaultNow().notNull(),
    lastSeenAt: timestamp("lastSeenAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [index("unmatched_searches_last_seen_idx").on(table.lastSeenAt)],
);

/** Sugestões públicas de actualização, sem IP, contacto ou dados de perfil. */
export const localitySuggestions = mysqlTable(
  "locality_suggestions",
  {
    id: int("id").autoincrement().primaryKey(),
    municipalityIbgeCode: int("municipalityIbgeCode").notNull(),
    topic: mysqlEnum("topic", ["mobility", "useful_phone", "other"]).notNull(),
    note: varchar("note", { length: 600 }).notNull(),
    status: mysqlEnum("status", ["pending", "reviewed", "dismissed"]).notNull().default("pending"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    reviewedAt: timestamp("reviewedAt"),
  },
  table => [
    index("locality_suggestions_municipality_idx").on(table.municipalityIbgeCode),
    index("locality_suggestions_status_created_idx").on(table.status, table.createdAt),
  ],
);

export type State = typeof states.$inferSelect;
export type Municipality = typeof municipalities.$inferSelect;
export type UnmatchedSearch = typeof unmatchedSearches.$inferSelect;
export type LocalitySuggestion = typeof localitySuggestions.$inferSelect;
