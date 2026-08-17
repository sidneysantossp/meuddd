import json
from openai import OpenAI

client = OpenAI()


def probe(model: str, strict: bool, extra: dict) -> None:
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": "Responda com o JSON: {\"ok\": true}"}],
        "max_tokens": 50,
        **extra,
    }
    if strict:
        payload["response_format"] = {
            "type": "json_schema",
            "json_schema": {
                "name": "probe",
                "strict": True,
                "schema": {
                    "type": "object",
                    "properties": {"ok": {"type": "boolean"}},
                    "required": ["ok"],
                    "additionalProperties": False,
                },
            },
        }
    try:
        res = client.chat.completions.create(**payload)
        c = res.choices[0].message
        print(
            f"{model} strict={strict}: content={repr(c.content)[:80]} "
            f"finish={c.finish_reason} refusal={getattr(c, 'refusal', None)}"
        )
    except Exception as e:  # noqa: BLE001
        print(f"{model} strict={strict}: ERRO {str(e)[:100]}")


for m in ["gpt-4o-mini", "gpt-4.1-mini", "gpt-5-nano", "gpt-5-mini"]:
    probe(m, False, {})
    probe(m, True, {})
