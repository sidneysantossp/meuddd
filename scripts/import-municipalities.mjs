import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(projectDir, ".env") });

const sourcePath = process.argv[2] ?? "/home/ubuntu/Downloads/ddd-brasil-data/municipios.csv";
const chunk = (items, size) => Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, index * size + size));
const slugify = value => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt-BR").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const states = [
  [11, "RO", "Rondônia", "Norte"], [12, "AC", "Acre", "Norte"], [13, "AM", "Amazonas", "Norte"], [14, "RR", "Roraima", "Norte"], [15, "PA", "Pará", "Norte"], [16, "AP", "Amapá", "Norte"], [17, "TO", "Tocantins", "Norte"],
  [21, "MA", "Maranhão", "Nordeste"], [22, "PI", "Piauí", "Nordeste"], [23, "CE", "Ceará", "Nordeste"], [24, "RN", "Rio Grande do Norte", "Nordeste"], [25, "PB", "Paraíba", "Nordeste"], [26, "PE", "Pernambuco", "Nordeste"], [27, "AL", "Alagoas", "Nordeste"], [28, "SE", "Sergipe", "Nordeste"], [29, "BA", "Bahia", "Nordeste"],
  [31, "MG", "Minas Gerais", "Sudeste"], [32, "ES", "Espírito Santo", "Sudeste"], [33, "RJ", "Rio de Janeiro", "Sudeste"], [35, "SP", "São Paulo", "Sudeste"],
  [41, "PR", "Paraná", "Sul"], [42, "SC", "Santa Catarina", "Sul"], [43, "RS", "Rio Grande do Sul", "Sul"],
  [50, "MS", "Mato Grosso do Sul", "Centro-Oeste"], [51, "MT", "Mato Grosso", "Centro-Oeste"], [52, "GO", "Goiás", "Centro-Oeste"], [53, "DF", "Distrito Federal", "Centro-Oeste"],
];

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL não está disponível para a importação.");
if (!fs.existsSync(sourcePath)) throw new Error(`Ficheiro de origem não encontrado: ${sourcePath}`);

const rows = fs.readFileSync(sourcePath, "utf8").trim().split(/\r?\n/).slice(1).map(line => {
  const [ibgeCode, name, latitude, longitude, capital, stateIbgeCode, , ddd, timezone] = line.split(",");
  return [Number(ibgeCode), name, slugify(name), Number(stateIbgeCode), String(ddd).padStart(2, "0"), latitude, longitude, timezone, capital === "1"];
});

const duplicatesBy = selector => {
  const seen = new Set();
  const duplicates = new Set();
  for (const row of rows) {
    const key = selector(row);
    if (seen.has(key)) duplicates.add(key);
    seen.add(key);
  }
  return [...duplicates];
};

const duplicateIbgeCodes = duplicatesBy(([ibgeCode]) => ibgeCode);
const duplicateMunicipalityNames = duplicatesBy(([, name, , stateIbgeCode]) => `${stateIbgeCode}:${name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt-BR")}`);
if (duplicateIbgeCodes.length || duplicateMunicipalityNames.length) {
  throw new Error(`Fonte contém duplicidades: ${duplicateIbgeCodes.length} código(s) IBGE e ${duplicateMunicipalityNames.length} nome(s) de município por UF.`);
}

const ddds = [...new Set(rows.map(([, , , , ddd]) => ddd))].sort((left, right) => Number(left) - Number(right));
const connection = await mysql.createConnection(process.env.DATABASE_URL);

try {
  await connection.beginTransaction();
  await connection.query(
    "INSERT INTO states (ibgeCode, uf, name, region) VALUES ? ON DUPLICATE KEY UPDATE uf = VALUES(uf), name = VALUES(name), region = VALUES(region)",
    [states],
  );
  await connection.query("INSERT INTO ddd_codes (code) VALUES ? ON DUPLICATE KEY UPDATE code = VALUES(code)", [ddds.map(code => [code])]);

  for (const batch of chunk(rows, 400)) {
    await connection.query(
      "INSERT INTO municipalities (ibgeCode, name, slug, stateIbgeCode, ddd, latitude, longitude, timezone, capital) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name), slug = VALUES(slug), stateIbgeCode = VALUES(stateIbgeCode), ddd = VALUES(ddd), latitude = VALUES(latitude), longitude = VALUES(longitude), timezone = VALUES(timezone), capital = VALUES(capital)",
      [batch],
    );
  }

  const [[coverage]] = await connection.query("SELECT COUNT(*) AS municipalities, COUNT(DISTINCT stateIbgeCode) AS states, COUNT(DISTINCT ddd) AS ddds FROM municipalities");
  await connection.commit();
  console.log(JSON.stringify({ sourcePath, imported: coverage, duplicates: { ibgeCode: 0, municipalityNameWithinState: 0 } }, null, 2));
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  await connection.end();
}

process.exit(0);
