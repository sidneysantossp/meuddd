import json
import os
import urllib.error
import urllib.request


def main() -> int:
    base = os.environ["OPENAI_API_BASE"].rstrip("/")
    body = json.dumps(
        {
            "model": "gpt-5-nano",
            "messages": [{"role": "user", "content": "ok"}],
            "max_tokens": 5,
        }
    ).encode()
    req = urllib.request.Request(
        f"{base}/chat/completions",
        data=body,
        headers={
            "Authorization": f'Bearer {os.environ["OPENAI_API_KEY"]}',
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            resp = json.loads(r.read().decode())
        # O proxy pode devolver HTTP 200 com corpo de erro (créditos esgotados).
        if resp.get("error") or "available_credits" in str(resp.get("details", "")):
            detail = resp.get("details", {}).get("message", resp.get("error", ""))
            print(f"QUOTA_EXHAUSTED ({detail[:60]})")
            return 1
        if resp.get("choices"):
            print("QUOTA_OK")
            return 0
        print(f"QUOTA_EXHAUSTED (resposta sem choices: {str(resp)[:80]})")
        return 1
    except urllib.error.HTTPError as e:
        print(f"QUOTA_EXHAUSTED (HTTP {e.code})")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
