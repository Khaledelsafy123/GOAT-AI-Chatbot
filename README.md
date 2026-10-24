# GOAT AI Chatbot

An AI-powered chatbot built with **Next.js, React, and FastAPI**, featuring an interactive chat interface, persistent conversation history, Markdown support, and LaTeX rendering for mathematical expressions.

**Author:** [Khaled Elsafy](https://github.com/Khaledelsafy123)

**Repository:** [Khaledelsafy123/GOAT](https://github.com/Khaledelsafy123/GOAT)

---

## Overview

GOAT is a full-stack AI chatbot project that combines a modern web interface with a Python backend connected to the Groq API.

The project focuses on building an end-to-end AI application, integrating frontend development, backend API design, AI model access, conversation management, and mathematical content rendering.

## Features

- **AI-Powered Chat:** Send messages and receive AI-generated responses.
- **Conversation History:** Preserve conversations in the browser.
- **Markdown Rendering:** Display structured text, lists, tables, and formatted responses.
- **LaTeX Support:** Render mathematical equations and expressions using KaTeX.
- **REST API:** Handle chat requests through a FastAPI backend.
- **Modern User Interface:** Built with Next.js and React.
- **Git Version Control:** Source code managed and published on GitHub.

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend development |
| FastAPI | REST API |
| Groq API | AI model access |
| Next.js | Frontend framework |
| React | User interface |
| TypeScript | Frontend type safety |
| Tailwind CSS | Styling |
| React Markdown | Markdown rendering |
| KaTeX | Mathematical equation rendering |
| Git & GitHub | Version control and hosting |

## Architecture

```text
User
  |
  v
Next.js + React Frontend
  |
  | HTTP POST /chat
  v
FastAPI Backend
  |
  v
Groq API
  |
  v
AI-Generated Response
  |
  v
Frontend Rendering
(Markdown + LaTeX)
```

## Project Structure

```text
GOAT/
├── frontend/          # Next.js application
│   ├── app/           # Application routes
│   ├── components/    # UI components
│   ├── hooks/         # Custom React hooks
│   └── package.json
├── main.py            # FastAPI application
├── requirements.txt   # Python dependencies
├── .gitignore
└── README.md
```

*Note: The structure above highlights the main project areas; individual folders may vary.*

## Getting Started

### Prerequisites

- Python
- Node.js
- Corepack and pnpm
- A Groq API key

### 1. Clone the Repository

```bash
git clone https://github.com/Khaledelsafy123/GOAT.git
cd GOAT
```

### 2. Set Up the Backend

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
```

Start the backend:

```bash
uvicorn main:app --reload
```

The backend will run at `http://127.0.0.1:8000` by default.

### 3. Set Up the Frontend

Open a separate terminal:

```bash
cd frontend
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:3000` in your browser.

**Note:** The frontend must point to a reachable backend API. Configure the API URL in the frontend source if you want to use your local backend instead of the deployed endpoint.

## Environment Variables

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | API key used by the backend to access Groq |

Keep API keys and other secrets private. Never commit your `.env` file to GitHub.

## What I Learned

- Building a full-stack application with Next.js and FastAPI.
- Integrating an external AI API into a web application.
- Managing chat requests and conversation history.
- Rendering Markdown and mathematical expressions with LaTeX.
- Using Git and GitHub to manage and publish a software project.

## Author

**Khaled Elsafy**

- GitHub: [@Khaledelsafy123](https://github.com/Khaledelsafy123)
- Project: [GOAT AI Chatbot](https://github.com/Khaledelsafy123/GOAT)

---

*Built as a hands-on project exploring AI application development and full-stack integration.*
