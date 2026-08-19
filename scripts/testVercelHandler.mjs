// Teste local do handler Vercel bundlado (dist/vercel/handler.js) para
// reproduzir o ERR_MODULE_NOT_FOUND de produção. Uso:
//   node scripts/testVercelHandler.mjs /cidade/sp/paraguacu-paulista
import { IncomingMessage } from "node:http";
import { Duplex } from "node:stream";

process.env.NODE_ENV = "production";

const fn = (await import("../dist/vercel/handler.js")).default;

const url = process.argv[2] || "/cidade/sp/paraguacu-paulista";
const socket = new Duplex({
  read() {},
  write(_chunk, _enc, cb) {
    cb();
  },
});
socket.remoteAddress = "127.0.0.1";
const req = new IncomingMessage(socket);
req.method = "GET";
req.url = url;
req.headers = { host: "localhost" };
socket.push(null);
socket.resume();

const chunks = [];
const res = {
  statusCode: null,
  setHeader() {},
  getHeader() {
    return null;
  },
  removeHeader() {},
  writeHead(code, headers) {
    this.statusCode = code;
  },
  write(chunk) {
    chunks.push(chunk);
    return true;
  },
  end(chunk) {
    if (chunk) chunks.push(chunk);
    const body = Buffer.concat(chunks.map((c) => (typeof c === "string" ? Buffer.from(c) : c))).toString();
    console.log("STATUS:", this.statusCode);
    console.log("BODY_HEAD:", body.slice(0, 150).replace(/\n/g, " "));
  },
};

fn(req, res);
setTimeout(() => {
  if (res.statusCode === null) console.log("TIMEOUT / sem resposta em 60s");
  process.exit(0);
}, 60_000);
