# AI Chatbot

An open-source AI chatbot built with Next.js and the AI SDK.

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://ai-sdk.dev/docs/introduction)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports GLM and other OpenAI-compatible model providers
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - PostgreSQL for saving chat history and user data
  - Local file storage for uploads
- [Auth.js](https://authjs.dev)
  - Simple and secure authentication

## Model Providers

This template uses GLM models via Z.AI Coding Plan API. You can also switch to other LLM providers like [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), or any OpenAI-compatible API with just a few lines of code.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run the chatbot.

1. Copy `.env.example` to `.env.local` and fill in the required values
2. Start PostgreSQL and Redis (optional, for resumable streams)
3. Install dependencies and run migrations:

```bash
bun install
bun db:migrate
bun dev
```

Your app should now be running on [localhost:3000](http://localhost:3000).

## Environment Variables

- `AUTH_SECRET` - Secret for authentication (generate with `openssl rand -base64 32`)
- `ZHIPU_API_KEY` - API key from Z.AI for GLM models
- `POSTGRES_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string (optional, for resumable streams)
