const SITE_ORIGIN = "https://www.meuddd.com.br";
const HOST = "www.meuddd.com.br";
const KEY = "282752bf-8a95-4e8f-8504-771d734634f1";
const keyLocation = `${SITE_ORIGIN}/${KEY}.txt`;
const urlList = [
  ...new Set(process.argv.slice(2).map(value => new URL(value).toString())),
];

if (urlList.length === 0) {
  throw new Error(
    "Uso: pnpm indexnow:submit https://www.meuddd.com.br/url-atualizada"
  );
}
if (
  urlList.length > 10_000 ||
  urlList.some(url => new URL(url).host !== HOST)
) {
  throw new Error(`Envie entre 1 e 10.000 URLs do host ${HOST}.`);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation, urlList }),
});

console.log(
  JSON.stringify({
    accepted: response.ok,
    status: response.status,
    submitted: urlList.length,
  })
);
if (!response.ok) process.exitCode = 1;
