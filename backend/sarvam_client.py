"""
Shared Sarvam AI client — OpenAI-compatible endpoint.
All agents import `sarvam_chat` and call it with a list of messages.
"""
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

_client = OpenAI(
    api_key=os.getenv("SARVAM_API_KEY", "sk_3xo3kqnr_5JemjOdp15xNGcItdRBoGQKr"),
    base_url=os.getenv("SARVAM_BASE_URL", "https://api.sarvam.ai/v1"),
)
MODEL = os.getenv("SARVAM_MODEL", "sarvam-m")


def sarvam_chat(messages: list, *, temperature: float = 0.3) -> str:
    """
    Send a chat-completion request to Sarvam AI and return the reply text.
    `messages` follows the OpenAI format: [{"role": "system"|"user"|"assistant", "content": "..."}]
    """
    response = _client.chat.completions.create(
        model=MODEL,
        messages=messages,
        temperature=temperature,
    )
    return response.choices[0].message.content.strip()
