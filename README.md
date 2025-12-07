# HyprChat

A cutting-edge AI chatbot built with modern web technologies and advanced AI capabilities.

## Tech Stack

### 🎯 **Core Framework**
- **Next.js 16.0.5** - Full-stack React framework with App Router
- **React 19 RC** - Latest React with concurrent features
- **TypeScript 5.9.3** - Type-safe development
- **Tailwind CSS 4.1.17** - Modern utility-first CSS framework

### 🎨 **Frontend & UI**
- **shadcn/ui** - High-quality component library built on Radix UI
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **Geist Font** - Modern font family by Vercel
- **Catppuccin Theme** - Soothing dark/light color schemes
- **React Resizable Panels** - Flexible layout components
- **Embla Carousel** - Smooth carousel components

### 🧠 **AI & Machine Learning**
- **AI SDK 5.0.26** (Vercel) - Unified AI integration framework
- **Google AI SDK** - Gemini model integration with reasoning capabilities
- **OpenAI Compatible SDK** - Support for custom AI providers
- **Z.AI Coding Plan API** - GLM model integration
- **Streamdown** - Real-time streaming markdown renderer

### 💾 **Backend & Database**
- **PostgreSQL** - Primary database with full-text search
- **Drizzle ORM 0.34.1** - Modern SQL toolkit with type safety
- **Redis** - Caching and session storage
- **Better Auth 1.4.5** - Modern authentication system

### 📝 **Rich Text & Code**
- **ProseMirror** - Advanced rich text editor framework
- **CodeMirror 6** - Professional code editor with syntax highlighting
- **React Syntax Highlighter** - Beautiful code block rendering
- **KaTeX** - Mathematical expression typesetting
- **Shiki** - Syntax highlighting engine

### 🔧 **Developer Experience**
- **Package Manager:** pnpm 9.12.3
- **Runtime:** Bun for lightning-fast development
- **Code Quality:** Biome 2.2.2 + Ultracite 5.3.9
- **Testing:** Playwright for E2E testing
- **Hot Reload:** Next.js Turbo mode

## Features

### 🤖 **AI Capabilities**
- **Multi-Model Support** - GLM, Gemini, and OpenAI-compatible models
- **Streaming Responses** - Real-time AI response streaming
- **Chat History** - Persistent conversation storage with search
- **Document Management** - AI-assisted document creation and editing
- **File Upload** - Multi-file handling with various formats
- **Code Artifacts** - Interactive code snippets with execution

### 🎯 **User Experience**
- **Dark/Light Modes** - Beautiful Catppuccin themes
- **Responsive Design** - Mobile-first approach
- **Sidebar Navigation** - Collapsible chat history sidebar
- **Real-time Updates** - SWR for instant data synchronization
- **Auto-scroll** - Messages stick to bottom during streaming
- **Math Rendering** - Beautiful mathematical expressions

### 🔒 **Security & Performance**
- **JWT Authentication** - Secure session management
- **CSRF Protection** - Built-in Next.js security headers
- **SQL Injection Prevention** - Drizzle ORM parameterized queries
- **Component Caching** - Optimized React rendering
- **Standalone Builds** - Docker-ready deployment optimization

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
