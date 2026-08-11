import * as db from "./db";

export const createSsrPrefetch = () => ({
  states: () => db.listStateSummaries(),
  search: (input: { query?: string; uf?: string }) => db.searchDdds(input),
  byCode: ({ code }: { code: string }) => db.getDddDetails(code),
  byState: ({ uf }: { uf: string }) => db.getStateDetails(uf),
  byMunicipality: ({ uf, slug }: { uf: string; slug: string }) => db.getMunicipalityDetails(uf, slug),
});
