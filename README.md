# Medical AI Platform

A comprehensive platform for AI-driven medical guidelines, blogs, and knowledge sharing. Built with the latest web technologies to provide a fast, accessible, and premium user experience.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: 
  - **Local**: SQLite (`dev.db`)
  - **Production**: Vercel Postgres
- **ORM**: [Prisma](https://www.prisma.io/)
- **Editor**: [Tiptap](https://tiptap.dev/) (Headless WYSIWYG)
- **AI Integration**: Google Generative AI (Gemini) & OpenAI
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📂 Project Structure

- **`src/app`**: Main application routes (Next.js App Router).
  - `/blog`: Blog listing and individual posts.
  - `/guidelines`: Medical guidelines wiki.
  - `/admin`: Dashboard for managing content (protected).
  - `/topics`: Topic-based content filtering.
  - `/context`: Global state providers.
- **`src/components`**: Reusable UI components.
  - `MarkdownEditor.tsx` / `TiptapEditor.tsx`: Rich text editing.
  - `BlogCard.tsx`, `GuidelineCard.tsx`: Content display cards.
- **`src/lib`**: Utility functions and database clients (`prisma.ts`).
- **`src/actions`**: Server actions for data mutations.

## 🛠️ Getting Started (Local Development)

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd medical-ai
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory (copy `.env.example` if available) and add necessary keys:
    ```env
    DATABASE_URL="file:./dev.db"
    GOOGLE_API_KEY="..."
    OPENAI_API_KEY="..."
    # Add other keys as needed
    ```

4.  **Initialize Database**:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🌍 Deployment

This project is optimized for deployment on **Vercel**.

**Quick Deployment Steps:**
1.  Push your code to a Git repository (GitHub/GitLab).
2.  Import the project in Vercel.
3.  Add a **Vercel Postgres** database during setup.
4.  Configure Environment Variables in Vercel.

**Detailed Guide:**
Please refer to [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step instructions on:
- Setting up the production database.
- Migrating from SQLite to Postgres.
- Configuring your custom domain (Strato).

## 📝 Scripts

- `npm run dev`: Start development server.
- `npm run build`: Build for production (includes Prisma generation).
- `npm start`: Start production server.
- `npm run lint`: Run ESLint.
