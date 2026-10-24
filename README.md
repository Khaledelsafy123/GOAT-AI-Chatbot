# GOAT AI Chatbot

GOAT is an AI-powered chatbot built with Next.js and FastAPI. It provides a chat interface for interacting with an AI model, with support for conversation history and mathematical notation.

## Features

- AI-powered conversations through a chat interface.
- Backend API built with FastAPI.
- Frontend built with Next.js and React.
- Conversation history persistence in the browser.
- Markdown rendering for structured responses.
- LaTeX rendering for mathematical equations using KaTeX.
- Responsive chat interface.

## Tech Stack

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS
- React Markdown
- KaTeX

**Backend**
- Python
- FastAPI
- Pydantic
- Groq API

## Project Structure

```text
goat-backend/
├── frontend/       # Next.js frontend
├── main.py         # FastAPI backend
├── requirements.txt
├── .gitignore
└── README.md
```

## Requirements

- Python
- Node.js
- pnpm
- A Groq API key

## Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd goat-backend
```

Replace `YOUR_REPOSITORY_URL` with your GitHub repository URL.

### 2. Configure the backend

Create a `.env` file in the project root and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
uvicorn main:app --reload
```

The backend will normally be available at `http://127.0.0.1:8000`.

### 3. Configure the frontend

Open a separate terminal:

```bash
cd frontend
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:3000` in your browser.

## Environment Variables

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | API key used by the backend to access Groq |

Never commit your `.env` file or expose your API key publicly.

## Deployment

The backend and frontend can be deployed separately. Configure the frontend to use the deployed backend API URL, and store API keys as environment variables in the deployment platform.

## License

No license has been specified yet.