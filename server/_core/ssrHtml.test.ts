import { describe, expect, it } from "vitest";
import { composeSsrHtml } from "./ssrHtml";

describe("composeSsrHtml", () => {
  it("injeta título, canonical, robots e JSON-LD específicos da rota", () => {
    const html = composeSsrHtml(
      "<html><head><!--app-head--></head><body><div id=\"root\"><!--app-html--></div></body></html>",
      "<main>DDD 11</main>",
      { queries: [] },
      {
        title: "DDD 11 | DDD Brasil",
        description: "Cidades do DDD 11.",
        canonicalPath: "/ddd/11",
        noindex: true,
        jsonLd: [{ "@context": "https://schema.org", "@type": "DefinedTerm", "@id": "/ddd/11", name: "DDD 11" }],
      },
      "https://dddbrasil.example"
    );

    expect(html).toContain("<title>DDD 11 | DDD Brasil</title>");
    expect(html).toContain('rel="canonical" href="https://dddbrasil.example/ddd/11"');
    expect(html).toContain('name="robots" content="noindex,follow"');
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('"@id":"https://dddbrasil.example/ddd/11"');
    expect(html).toContain("<main>DDD 11</main>");
    expect(html).not.toContain("<!--app-head-->");
  });
});
