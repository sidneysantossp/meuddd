import { describe, expect, it } from "vitest";
import { createSsrPrefetch } from "./ssrPrefetch";

describe("createSsrPrefetch", () => {
  it("está disponível como factory SSR e expõe as consultas territoriais", () => {
    const prefetch = createSsrPrefetch();

    expect(prefetch).toEqual(expect.objectContaining({
      states: expect.any(Function),
      search: expect.any(Function),
      byCode: expect.any(Function),
      byState: expect.any(Function),
      byMunicipality: expect.any(Function),
    }));
  });
});
