import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import * as db from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  ddd: router({
    search: publicProcedure
      .input(z.object({ query: z.string().max(120).optional(), uf: z.string().length(2).optional() }).optional())
      .query(({ input }) => db.searchDdds(input ?? {})),
    recordUnmatchedSearch: publicProcedure
      .input(z.object({ query: z.string().min(1).max(120), uf: z.string().length(2).optional() }))
      .mutation(({ input }) => db.recordUnmatchedSearch(input)),
    byCode: publicProcedure
      .input(z.object({ code: z.string().regex(/^\d{2}$/) }))
      .query(({ input }) => db.getDddDetails(input.code)),
    byState: publicProcedure
      .input(z.object({ uf: z.string().length(2) }))
      .query(({ input }) => db.getStateDetails(input.uf)),
    byMunicipality: publicProcedure
      .input(z.object({ uf: z.string().length(2), slug: z.string().min(1).max(160) }))
      .query(({ input }) => db.getMunicipalityDetails(input.uf, input.slug)),
    states: publicProcedure.query(() => db.listStateSummaries()),
  }),
  local: router({
    suggestUpdate: publicProcedure
      .input(z.object({
        municipalityIbgeCode: z.number().int().positive(),
        topic: z.enum(["mobility", "useful_phone", "other"]),
        note: z.string().min(12).max(600),
      }))
      .mutation(({ input }) => db.createLocalitySuggestion(input)),
  }),
  insights: router({
    unmatchedSearches: adminProcedure
      .input(z.object({ limit: z.number().int().min(1).max(100).optional() }).optional())
      .query(({ input }) => db.listUnmatchedSearches(input?.limit ?? 50)),
  }),
});

export type AppRouter = typeof appRouter;
