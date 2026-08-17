export const INDEXNOW_SITE_ORIGIN = "https://www.meuddd.com.br";
export const INDEXNOW_HOST = "www.meuddd.com.br";
export const INDEXNOW_KEY = "282752bf-8a95-4e8f-8504-771d734634f1";
export const INDEXNOW_KEY_LOCATION = `${INDEXNOW_SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 10_000;

export type IndexNowPayload = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

export function createIndexNowPayload(urls: string[]): IndexNowPayload {
  const urlList = Array.from(
    new Set(urls.map(value => new URL(value).toString()))
  );

  if (urlList.length === 0)
    throw new Error("Informe pelo menos uma URL actualizada para o IndexNow.");
  if (urlList.length > MAX_URLS_PER_REQUEST)
    throw new Error(
      `O IndexNow aceita no máximo ${MAX_URLS_PER_REQUEST} URLs por pedido.`
    );
  if (urlList.some(value => new URL(value).host !== INDEXNOW_HOST)) {
    throw new Error(
      `Todas as URLs precisam de pertencer ao host canónico ${INDEXNOW_HOST}.`
    );
  }

  return {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  };
}

export async function submitIndexNowUrls(
  urls: string[],
  request: typeof fetch = fetch
) {
  const payload = createIndexNowPayload(urls);
  const response = await request(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  return {
    accepted: response.ok,
    status: response.status,
    submitted: payload.urlList.length,
  };
}
