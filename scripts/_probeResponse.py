import os
import json
import urllib.error
import urllib.request

base = os.environ["OPENAI_API_BASE"].rstrip("/")
req = urllib.request.Request(
    f"{base}/chat/completions",
    data=json.dumps(
        {
            "model": "gpt-5-mini",
            "messages": [{"role": "user", "content": "ok"}],
            "max_tokens": 10,
        }
    ).encode(),
    headers={
        "Authorization": f'Bearer {os.environ["OPENAI_API_KEY"]}',
        "Content-Type": "application/json",
    },
)
try:
    r = urllib.request.urlopen(req, timeout=60)
    body = json.loads(r.read().decode())
    print(json.dumps(body, ensure_ascii=False)[:1500])
except urllib.error.HTTPError as e:
    print("HTTP", e.code, e.read().decode()[:500])
