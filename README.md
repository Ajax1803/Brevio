# Brevio

**AI-powered PDF notes and question answering for faster document understanding.**

Brevio helps students, researchers, and professionals upload PDFs, extract key content, ask context-aware questions, generate AI-assisted notes, and manage access through a freemium upgrade flow.

## Highlights

- Upload and store PDF files with Convex storage.
- Extract PDF text with LangChain's `WebPDFLoader`.
- Split extracted text into searchable chunks.
- Generate Gemini embeddings for document chunks.
- Store vectors in Convex using a 768-dimensional vector index.
- Ask questions against uploaded PDFs using similarity search.
- Generate answers with Google Gemini and insert them into a TipTap notes editor.
- Save notes per PDF in Convex.
- Authenticate users with Clerk.
- Support a free upload limit and PayPal-powered upgrade UI.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| UI | React 18, Tailwind CSS, Radix UI, Lucide React |
| Authentication | Clerk |
| Backend / Database | Convex |
| File Storage | Convex Storage |
| PDF Processing | LangChain `WebPDFLoader` |
| Text Chunking | LangChain `RecursiveCharacterTextSplitter` |
| Vector Search | Convex Vector Store |
| Embeddings | Google Gemini embeddings through LangChain |
| Answer Generation | Google Gemini |
| Notes Editor | TipTap |
| Payments | PayPal React SDK |

## How Brevio Works

```text
User signs in
  -> uploads a PDF
  -> PDF is stored in Convex storage
  -> PDF metadata is saved in Convex
  -> PDF text is extracted through a Next.js API route
  -> text is split into chunks
  -> chunks are embedded with Gemini embeddings
  -> vectors are stored in Convex
  -> user asks a question in the workspace
  -> question is embedded
  -> Convex similarity search finds relevant PDF chunks
  -> Gemini generates an answer from the question and retrieved context
  -> answer is inserted into the notes editor
  -> notes are saved in Convex
```

## Core Routes

| Route | Purpose | Main File |
|---|---|---|
| `/` | Landing page and login redirect flow | `app/page.js` |
| `/sign-in` | Clerk sign-in page | `app/(auth)/sign-in/[[...sign-in]]/page.jsx` |
| `/sign-up` | Clerk sign-up page | `app/(auth)/sign-up/[[...sign-up]]/page.jsx` |
| `/dashboard` | User workspace dashboard with uploaded PDFs | `app/dashboard/page.js` |
| `/dashboard/upgrade` | PayPal upgrade page | `app/dashboard/upgrade/page.js` |
| `/workspace/[fileId]` | PDF viewer, notes editor, and AI Q&A | `app/workspace/[fileId]/page.js` |
| `/api/pdf-loader` | PDF text extraction and chunking API | `app/api/pdf-loader/route.js` |

## Important Project Files

| File | Responsibility |
|---|---|
| `app/layout.js` | Global app layout and Clerk provider. |
| `app/provider.js` | Convex and PayPal providers. |
| `middleware.js` | Protects dashboard routes with Clerk. |
| `app/dashboard/_components/UploadPDFDialog.js` | Handles PDF upload and ingestion trigger. |
| `app/api/pdf-loader/route.js` | Fetches PDF, extracts text, and splits chunks. |
| `app/workspace/_components/EditorExtensions.js` | Handles AI question answering and note saving. |
| `configs/AIModel.js` | Configures Gemini chat generation. |
| `convex/schema.js` | Defines Convex tables and vector index. |
| `convex/fileStorage.js` | Convex file upload and PDF metadata functions. |
| `convex/myActions.js` | Embedding ingestion and vector similarity search. |
| `convex/notes.js` | Saves and loads notes. |
| `convex/user.js` | User creation and upgrade status. |

## Data Model

| Table | Purpose |
|---|---|
| `users` | Stores user profile data and `upgrade` status. |
| `pdfFiles` | Stores uploaded PDF metadata and file URLs. |
| `documents` | Stores PDF text chunks, embeddings, and metadata. |
| `notes` | Stores user notes for each PDF. |

## Architecture Docs

- [Route Guidebook](docs/BREVIO_ROUTE_GUIDEBOOK.md)
- [Interview Prep Notes](docs/BREVIO_INTERVIEW_PREP.md)
- [High-Level Architecture Diagram](docs/BREVIO_HIGH_LEVEL_ARCHITECTURE.svg)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

## Environment Variables

The code references these environment variables:

```env
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
NEXT_PUBLIC_GEMINI_API_KEY=
```

Do not commit actual secret values. Use local environment files or your deployment platform's secret management.

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Builds the app for production. |
| `npm run start` | Starts the production server after build. |
| `npm run lint` | Runs the configured lint command. |

## Notes for Reviewers

- LangChain is used as an orchestration layer for PDF loading, text splitting, Gemini embeddings, and Convex vector store integration.
- Gemini generates the actual embedding vectors and final AI answers.
- Convex stores app data, file metadata, notes, and document vectors.
- PayPal approval currently updates the user's upgrade status from the client-side approval flow.
- Server-side PayPal verification, webhook handling, and subscription lifecycle management are not clearly visible in the current code.

