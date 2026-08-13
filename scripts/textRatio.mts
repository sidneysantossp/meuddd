// Mede a proporção texto/HTML do HTML renderizado no servidor (SSR) das rotas
// principais, excluindo <script> e <style>, para diagnosticar o aviso do
// Search Console sobre baixa proporção texto/HTML (5.238 páginas).
import { execSync } from "child_process";

const routes = [
  { name: "/", url: "http://localhost:3000/" },
  { name: "/ddd/11", url: "http://localhost:3000/ddd/11" },
  { name: "/estado/sp", url: "http://localhost:3000/estado/sp" },
  { name: "/cidade/sp/aruja", url: "http://localhost:3000/cidade/sp/aruja" },
  { name: "/gerador", url: "http://localhost:3000/gerador" },
  { name: "/guia/o-que-e-ddd", url: "http://localhost:3000/guia/o-que-e-ddd" },
];

function textRatio(html: string) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return { total: html.length, text: stripped.length, ratio: stripped.length / html.length };
}

for (const route of routes) {
  execSync(`curl -s -o /tmp/seo_html.txt "${route.url}"`);
  const html = await import("fs").then(fs => fs.readFileSync("/tmp/seo_html.txt", "utf-8"));
  const { total, text, ratio } = textRatio(html);
  console.log(`${route.name.padEnd(20)} total: ${(total / 1024).toFixed(0)} KB | text: ${(text / 1024).toFixed(1)} KB | ratio: ${(ratio * 100).toFixed(2)}%`);
}
