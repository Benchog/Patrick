# Patrick Benchog — Portfolio

React + Vite single-page portfolio with galleries, project modals, theme controls, and an optional AI assistant (OpenAI via Vercel serverless).

## Scripts

| Command        | Description                                      |
|----------------|--------------------------------------------------|
| `npm install`  | Install dependencies                             |
| `npm run dev`  | Local dev server (Vite; `/api/chat` not proxied) |
| `npm run build`| Production build into `dist/`                    |
| `npm run preview` | Preview the production build locally          |

## Deploy to production

Step-by-step instructions (GitHub + Vercel, environment variables, and optional local API testing) are in **[DEPLOY.md](./DEPLOY.md)**.

## AI assistant

On Vercel, set **`OPENAI_API_KEY`** in the project environment variables. See **DEPLOY.md** for details. Without it, the assistant still works using built-in fallback replies.
