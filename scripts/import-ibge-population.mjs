import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import XLSX from "xlsx";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(projectDir, ".env") });

const sourcePath = process.argv[2] ?? "/home/ubuntu/Downloads/ddd-brasil-data/POP2025_20260113.xls";
const referenceYear = 2025;
const stateSheet = "BRASIL E UFs";
const municipalitySheet = "Municípios";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL não está disponível para a importação.");

const normalize = value => String(value ?? "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt-BR").trim();
const toPopulation = value => Number(String(value ?? "").replace(/[^0-9]/g, ""));
const workbook = XLSX.readFile(sourcePath, { codepage: 1252 });
if (!workbook.Sheets[stateSheet] || !workbook.Sheets[municipalitySheet]) throw new Error("A planilha não contém as abas esperadas do IBGE.");

const stateRows = XLSX.utils.sheet_to_json(workbook.Sheets[stateSheet], { header: 1, defval: null, raw: false });
const municipalRows = XLSX.utils.sheet_to_json(workbook.Sheets[municipalitySheet], { header: 1, defval: null, raw: false });
const statePopulationByName = new Map(stateRows.slice(2).map(row => [normalize(row[0]), toPopulation(row[1])]).filter(([, population]) => Number.isInteger(population) && population > 0));
const municipalityPopulation = municipalRows.slice(2).map(row => {
  const stateCode = String(row[1] ?? "").padStart(2, "0");
  const municipalityCode = String(row[2] ?? "").padStart(5, "0");
  const population = toPopulation(row[4]);
  return { ibgeCode: Number(`${stateCode}${municipalityCode}`), population };
}).filter(row => Number.isInteger(row.ibgeCode) && Number.isInteger(row.population) && row.population > 0);

if (municipalityPopulation.length !== 5571) throw new Error(`Cobertura municipal inesperada: ${municipalityPopulation.length} registos.`);
if (new Set(municipalityPopulation.map(row => row.ibgeCode)).size !== municipalityPopulation.length) throw new Error("A fonte de população contém códigos IBGE municipais duplicados.");

const connection = await mysql.createConnection(process.env.DATABASE_URL);
try {
  const [states] = await connection.query("SELECT ibgeCode, name FROM states");
  const unknownStates = states.filter(state => !statePopulationByName.has(normalize(state.name)));
  if (unknownStates.length) throw new Error(`Sem população para: ${unknownStates.map(state => state.name).join(", ")}`);

  await connection.beginTransaction();
  for (const state of states) {
    await connection.query("UPDATE states SET populationEstimated = ?, populationReferenceYear = ? WHERE ibgeCode = ?", [statePopulationByName.get(normalize(state.name)), referenceYear, state.ibgeCode]);
  }
  for (let start = 0; start < municipalityPopulation.length; start += 400) {
    const batch = municipalityPopulation.slice(start, start + 400);
    const cases = batch.map(() => "WHEN ? THEN ?").join(" ");
    const ids = batch.flatMap(row => [row.ibgeCode, row.population]);
    const inList = batch.map(() => "?").join(",");
    await connection.query(`UPDATE municipalities SET populationEstimated = CASE ibgeCode ${cases} END, populationReferenceYear = ? WHERE ibgeCode IN (${inList})`, [...ids, referenceYear, ...batch.map(row => row.ibgeCode)]);
  }
  const [[coverage]] = await connection.query("SELECT COUNT(*) AS municipalities, SUM(populationEstimated IS NOT NULL) AS withPopulation, COUNT(DISTINCT populationReferenceYear) AS years FROM municipalities");
  await connection.commit();
  console.log(JSON.stringify({ sourcePath, referenceYear, imported: coverage }, null, 2));
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  await connection.end();
}

process.exit(0);
