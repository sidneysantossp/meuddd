import { readFileSync } from "fs";

export function csvToArray(file) {
  const text = readFileSync(file, "utf-8").replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/);
  return lines
    .map(line => {
      const out = [];
      let cur = "";
      let inQ = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
          else inQ = !inQ;
        } else if (ch === "," && !inQ) {
          out.push(cur); cur = "";
        } else cur += ch;
      }
      out.push(cur);
      return out;
    })
    .filter(arr => arr.some(c => c.trim() !== ""));
}
