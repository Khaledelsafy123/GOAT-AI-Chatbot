# GOAT AI Chatbot

An AI-powered chatbot built with **Next.js, React, FastAPI, and the Groq API**. It features an interactive chat interface, persistent conversation history, Markdown rendering, and LaTeX support for mathematical expressions.

**Author:** [Khaled Elsafy](https://github.com/Khaledelsafy123)

**Repository:** [Khaledelsafy123/GOAT](https://github.com/Khaledelsafy123/GOAT)

**Live Demo:** [Try GOAT AI Chatbot](https://frontend-puce-gamma-62.vercel.app/)

---

## Overview

GOAT is a full-stack AI chatbot that combines a modern web interface with a Python backend connected to the Groq API.

The project demonstrates end-to-end AI application development, including frontend development, backend API integration, AI-generated responses, conversation management, and mathematical content rendering.

## Features

- **AI-Powered Chat:** Send messages and receive AI-generated responses.
- **Conversation History:** Maintain conversations in the browser using local storage.
- **Markdown Rendering:** Display formatted text, lists, tables, and code blocks.
- **LaTeX Support:** Render mathematical equations and expressions using KaTeX.
- **REST API:** Process chat requests through a FastAPI backend.
- **Modern User Interface:** Built with Next.js, React, and TypeScript.
- **Responsive Chat Experience:** Interact with the chatbot through a modern web interface.
- **Version Control:** Manage and track source code changes using Git and GitHub.

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend development |
| FastAPI | Backend REST API |
| Groq API | AI model access |
| Next.js | Frontend framework |
| React | User interface |
| TypeScript | Type safety |
| Tailwind CSS | Interface styling |
| React Markdown | Markdown rendering |
| KaTeX | Mathematical equation rendering |
| Git & GitHub | Version control and source code hosting |
| Vercel | Deployment and hosting |

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
  |
  v
User
```

## Project Structure

```text
GOAT/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── package.json
├── main.py
├── requirements.txt
├── .gitignore
└── README.md
```

*Note: The structure above provides a simplified overview of the main project files and directories.*

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

Create a `.env` file in the project root and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key
```

Start the backend:

```bash
uvicorn main:app --reload
```

By default, the backend runs at:

```text
http://127.0.0.1:8000
```

### 3. Set Up the Frontend

Open a separate terminal and run:

```bash
cd frontend
corepack pnpm install
corepack pnpm dev
```

Open the application at:

```text
http://localhost:3000
```

**Note:** Ensure the frontend's API URL points to a reachable backend. Update the API URL in the frontend source if you want to use your local backend instead of the deployed API.

## Environment Variables

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | API key used by the backend to access the Groq API |

**Security:** Never commit your `.env` file or expose API keys in your source code or public repositories.

## What I Learned

- Building a full-stack application using Next.js, React, and FastAPI.
- Integrating an external AI API into a web application.
- Designing and handling backend API requests.
- Managing conversation history using browser local storage.
- Rendering Markdown and mathematical expressions with LaTeX.
- Using Git and GitHub for version control and collaboration.
- Deploying a web application and connecting its frontend to a backend API.

## Author

**Khaled Elsafy**

- GitHub: [@Khaledelsafy123](https://github.com/Khaledelsafy123)
- Project Repository: [GOAT AI Chatbot](https://github.com/Khaledelsafy123/GOAT)

---

*Built as a hands-on project exploring AI application development and full-stack integration.*
