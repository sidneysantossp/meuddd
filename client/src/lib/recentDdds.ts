const RECENT_DDDS_KEY = "meu-ddd:recent-ddds:v1";
const MAX_RECENT_DDDS = 5;

type LocalStorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function addRecentDdd(current: string[], code: string) {
  if (!/^\d{2}$/.test(code)) return current;
  return [code, ...current.filter(item => item !== code)].slice(0, MAX_RECENT_DDDS);
}

export function readRecentDdds(storage: LocalStorageLike) {
  try {
    const raw = storage.getItem(RECENT_DDDS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((code): code is string => typeof code === "string" && /^\d{2}$/.test(code)).slice(0, MAX_RECENT_DDDS) : [];
  } catch {
    return [];
  }
}

export function saveRecentDdds(storage: LocalStorageLike, codes: string[]) {
  try {
    if (codes.length) storage.setItem(RECENT_DDDS_KEY, JSON.stringify(codes));
    else storage.removeItem(RECENT_DDDS_KEY);
  } catch {
    // O histórico é opcional; a busca não deve falhar se o armazenamento estiver indisponível.
  }
}
