/* Acesso síncrono e fiável ao catálogo de tabs editorial por município.
   Usa apenas imports estáticos, o que funciona de forma idêntica em todos os
   runtimes (processo tRPC via tsx, SSR via vite e testes via vitest). */
import { catalog as AC } from "./ac";
import { catalog as AL } from "./al";
import { catalog as AM } from "./am";
import { catalog as AP } from "./ap";
import { catalog as BA } from "./ba";
import { catalog as CE } from "./ce";
import { catalog as DF } from "./df";
import { catalog as ES } from "./es";
import { catalog as GO } from "./go";
import { catalog as MA } from "./ma";
import { catalog as MG } from "./mg";
import { catalog as MS } from "./ms";
import { catalog as MT } from "./mt";
import { catalog as PA } from "./pa";
import { catalog as PB } from "./pb";
import { catalog as PE } from "./pe";
import { catalog as PI } from "./pi";
import { catalog as PR } from "./pr";
import { catalog as RJ } from "./rj";
import { catalog as RN } from "./rn";
import { catalog as RO } from "./ro";
import { catalog as RR } from "./rr";
import { catalog as RS } from "./rs";
import { catalog as SC } from "./sc";
import { catalog as SE } from "./se";
import { catalog as SP } from "./sp";
import { catalog as TO } from "./to";
import type { LocalityTabsCatalog, MunicipalityTabs } from "./types";

const ufs: Record<string, LocalityTabsCatalog | undefined> = {
  ac: AC, al: AL, am: AM, ap: AP, ba: BA, ce: CE, df: DF, es: ES, go: GO,
  ma: MA, mg: MG, ms: MS, mt: MT, pa: PA, pb: PB, pe: PE, pi: PI, pr: PR,
  rj: RJ, rn: RN, ro: RO, rr: RR, rs: RS, sc: SC, se: SE, sp: SP, to: TO,
};

/** Obter as tabs editoriais de um município (síncrono, sem runtime dinâmico). */
export function getMunicipalityTabsByUf(uf: string, slug: string): MunicipalityTabs | undefined {
  const key = slug.toLowerCase();
  return ufs[uf.toLowerCase()]?.[key];
}

export function getMunicipalityTabsUfCatalog(uf: string): LocalityTabsCatalog {
  return ufs[uf.toLowerCase()] ?? {};
}
