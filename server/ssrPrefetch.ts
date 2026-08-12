import * as db from "./db";

export function createSsrPrefetch() {
  return {
    states: () => db.listStateSummaries(),
    search: (input: { query?: string; uf?: string }) => db.searchDdds(input),
    byCode: ({ code }: { code: string }) => db.getDddDetails(code),
    byState: ({ uf }: { uf: string }) => db.getStateDetails(uf),
    byMunicipality: ({ uf, slug }: { slug: string; uf: string }) => db.getMunicipalityDetails(uf, slug),
    capitals: () => db.listCapitalSummaries(),
  };
}
