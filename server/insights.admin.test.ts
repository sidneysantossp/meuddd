import { describe, expect, it, vi } from "vitest";
import * as db from "./db";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("insights administrativos", () => {
  it("encaminha os filtros de período e volume para a telemetria agregada", async () => {
    const list = vi.spyOn(db, "listUnmatchedSearches").mockResolvedValue([]);
    const caller = appRouter.createCaller(createAdminContext());

    await expect(caller.insights.unmatchedSearches({ limit: 50, minVolume: 5, periodDays: 30 })).resolves.toEqual([]);
    expect(list).toHaveBeenCalledWith({ limit: 50, minVolume: 5, periodDays: 30 });
  });

  it("permite à equipa administradora aprovar uma sugestão moderável", async () => {
    const review = vi.spyOn(db, "reviewLocalitySuggestion").mockResolvedValue({ updated: true });
    const caller = appRouter.createCaller(createAdminContext());

    await expect(caller.insights.reviewLocalitySuggestion({ id: 42, status: "approved" })).resolves.toEqual({ updated: true });
    expect(review).toHaveBeenCalledWith({ id: 42, status: "approved" });
  });
});
