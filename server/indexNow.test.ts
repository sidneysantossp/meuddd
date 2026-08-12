import { describe, expect, it, vi } from "vitest";
import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_KEY_LOCATION,
  createIndexNowPayload,
  submitIndexNowUrls,
} from "./indexNow";

describe("submissão controlada IndexNow", () => {
  it("deduplica URLs canónicas e inclui a localização pública da chave", () => {
    const payload = createIndexNowPayload([
      "https://www.meuddd.com.br/ddd/11",
      "https://www.meuddd.com.br/ddd/11",
      "https://www.meuddd.com.br/estado/sp",
    ]);

    expect(payload.host).toBe("www.meuddd.com.br");
    expect(payload.keyLocation).toBe(INDEXNOW_KEY_LOCATION);
    expect(payload.urlList).toEqual(["https://www.meuddd.com.br/ddd/11", "https://www.meuddd.com.br/estado/sp"]);
  });

  it("rejeita URLs externas para evitar notificações indevidas", () => {
    expect(() => createIndexNowPayload(["https://example.org/pagina"])).toThrow("host canónico");
  });

  it("envia um único POST JSON ao endpoint global", async () => {
    const request = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));

    await expect(submitIndexNowUrls(["https://www.meuddd.com.br/"], request)).resolves.toEqual({ accepted: true, status: 202, submitted: 1 });
    expect(request).toHaveBeenCalledWith(INDEXNOW_ENDPOINT, expect.objectContaining({ method: "POST" }));
  });
});
