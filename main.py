import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from groq import Groq
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(title="GOAT AI Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key) if api_key else None


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[Message] = []


@app.get("/")
def home():
    return {"message": "GOAT Backend is running!"}


@app.post("/chat")
def chat(request: ChatRequest):
    if not client:
        raise HTTPException(
            status_code=500,
            detail="GROQ_API_KEY is missing from .env"
        )

    messages = [
        {
            "role": "system",
            "content": (
                "You are GOAT, a helpful AI and Machine Learning assistant. "
                "Answer the user's actual question directly and clearly. "
                "Use simple explanations and examples when useful. "
                "Maintain the conversation context and interpret short replies "
                "such as '1' using the previous messages when possible."
            ),
        }
    ]

    for item in request.history[-20:]:
        if item.role in ("user", "assistant"):
            messages.append({
                "role": item.role,
                "content": item.content
            })

    messages.append({
        "role": "user",
        "content": request.message
    })

    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=messages,
        )

        return {"reply": response.choices[0].message.content}

    except Exception:
        raise HTTPException(
            status_code=502,
            detail="Could not get a response from the AI provider."
        )