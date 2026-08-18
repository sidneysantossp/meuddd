// Gerar JSON por UF a partir dos módulos TS (fonte única de verdade).
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const dir = "/home/ubuntu/ddd-brasil/shared/localityTabs";
const files = readdirSync(dir).filter(
  (f) => /^[a-z]{2}\.ts$/.test(f) && f !== "index.ts"
);

for (const f of files) {
  const raw = readFileSync(path.join(dir, f), "utf-8");
  // Extrair o export const catalog = {...}; entre chaves (conteúdo é JSON válido).
  // O fim do ficheiro varia: "...} as Record<string, MunicipalityTabs>;" —
  // capturar o bloco de chaves balanceado após "export const catalog".
  const startIdx = raw.indexOf("export const catalog");
  if (startIdx === -1) {
    console.log("NO START", f);
    continue;
  }
  let firstBrace = raw.indexOf("{", startIdx);
  let depth = 0;
  let endIdx = -1;
  for (let i = firstBrace; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }
  if (endIdx === -1) {
    console.log("NO END", f);
    continue;
  }
  let json = raw.slice(firstBrace, endIdx + 1);
  // Os textos editoriais contêm newlines literais (strings multiline do TS).
  // Escapá-los para JSON válido.
  // Escapar newlines literais que aparecem dentro de strings (TS aceita;
  // JSON não). Percorrer caractere a caractere dentro de strings.
  let out = "";
  let inStr = false;
  let escaped = false;
  for (let i = 0; i < json.length; i++) {
    const ch = json[i];
    if (inStr) {
      if (escaped) {
        out += ch;
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        out += ch;
        escaped = true;
        continue;
      }
      if (ch === '"') {
        inStr = false;
        out += ch;
        continue;
      }
      if (ch === "\n") {
        out += "\\n";
        continue;
      }
      if (ch === "\r") continue;
      out += ch;
    } else {
      if (ch === '"') inStr = true;
      out += ch;
    }
  }
  json = out;
  // TS permite trailing commas; JSON não. Remover vírgulas antes de } ou ].
  json = json.replace(/,\s*([\]}])/g, "$1");
  const parsed = JSON.parse(json);
  writeFileSync(
    path.join(dir, f.replace(".ts", ".json")),
    JSON.stringify(parsed, null, 2)
  );
  console.log("ok", f, Object.keys(parsed).length, "municípios");
}
