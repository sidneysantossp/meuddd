import { writeFile } from "node:fs/promises";
import mysql from "mysql2/promise";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL é necessária para exportar a reserva territorial.");
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const [rows] = await connection.query(`
  SELECT
    m.ibgeCode AS ibgeCode,
    m.name AS name,
    m.slug AS slug,
    m.ddd AS ddd,
    m.latitude AS latitude,
    m.longitude AS longitude,
    m.capital AS capital,
    m.timezone AS timezone,
    m.populationEstimated AS populationEstimated,
    m.populationReferenceYear AS populationReferenceYear,
    s.name AS stateName,
    s.uf AS uf,
    s.region AS region,
    s.populationEstimated AS statePopulationEstimated,
    s.populationReferenceYear AS statePopulationReferenceYear
  FROM municipalities AS m
  INNER JOIN states AS s ON s.ibgeCode = m.stateIbgeCode
  ORDER BY m.ddd ASC, m.name ASC
`);
await connection.end();

const municipalities = rows.map(row => ({
  ...row,
  capital: Boolean(row.capital),
  latitude: String(row.latitude),
  longitude: String(row.longitude),
}));

const source = `/* Este ficheiro é gerado por scripts/export-territorial-fallback.mjs. */
export type StaticMunicipalityRecord = {
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

export const staticTerritory: StaticMunicipalityRecord[] = ${JSON.stringify(municipalities)};
`;

await writeFile(new URL("../server/territoryFallback.ts", import.meta.url), source, "utf8");
process.stdout.write(`Reserva territorial exportada: ${municipalities.length} municípios.\n`);
