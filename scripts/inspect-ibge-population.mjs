import XLSX from "xlsx";

const source =
  process.argv[2] ??
  "/home/ubuntu/Downloads/ddd-brasil-data/POP2025_20260113.xls";
const workbook = XLSX.readFile(source, { codepage: 1252 });

console.log(JSON.stringify({ sheets: workbook.SheetNames }, null, 2));
for (const name of workbook.SheetNames) {
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[name], {
    header: 1,
    defval: null,
    raw: false,
  });
  console.log(`\n# ${name}`);
  console.log(JSON.stringify(rows.slice(0, 12), null, 2));
}
