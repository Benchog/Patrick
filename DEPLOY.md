# Deploy Patrick’s portfolio (GitHub + Vercel)

Follow these steps on your Windows machine to push code to GitHub and go live on Vercel.

---

## What you need

- **Node.js** (LTS): [https://nodejs.org](https://nodejs.org)
- **Git** for Windows: [https://git-scm.com](https://git-scm.com)
- A **GitHub** account and a repository for this project (empty or existing `main` branch)
- A **Vercel** account: [https://vercel.com](https://vercel.com) (sign in with GitHub)

---

## 1. Install dependencies and verify the build

Open **PowerShell** in your project folder (the one that contains `package.json`):

```powershell
cd "C:\Users\PATRICK\Downloads\My Portfolio Website"
npm install
npm run build
```

You should see `dist/` created and no errors. If `npm install` fails on Windows, close other programs using the folder, delete the `node_modules` folder, and run `npm install` again.

---

## 2. Configure Git (once per machine, if you have not already)

```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Use the same email you use on GitHub if you want commits linked to your account.

---

## 3. Connect this folder to your GitHub repository

If this project is **not** linked to a remote yet, add yours (replace with your repo URL):

```powershell
cd "C:\Users\PATRICK\Downloads\My Portfolio Website"
git remote remove origin 2>$null
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
```

If `origin` already exists and is correct, skip the `remove` / `add` lines.

---

## 4. Commit and push to GitHub

```powershell
cd "C:\Users\PATRICK\Downloads\My Portfolio Website"
git status
git add .
git commit -m "Portfolio update: deploy-ready build"
git push -u origin main
```

If `git push` is **rejected** because the remote has commits you do not have locally:

```powershell
git fetch origin
git pull --rebase origin main
```

Resolve any conflicts, then:

```powershell
git add .
git rebase --continue
git push -u origin main
```

---

## 5. Deploy on Vercel

1. Log in at [vercel.com](https://vercel.com) and click **Add New…** → **Project**.
2. **Import** the GitHub repository that holds this portfolio.
3. Vercel should detect **Vite**. Confirm:
   - **Framework Preset:** Vite  
   - **Build Command:** `npm run build`  
   - **Output Directory:** `dist`  
   - **Install Command:** `npm install`  
4. Click **Deploy**.

The first deployment may take a few minutes. When it finishes, Vercel shows a **`.vercel.app`** URL — that is your live site.

---

## 6. Enable the AI assistant (OpenAI)

The assistant calls **`/api/chat`**, implemented as **`api/chat.js`** (Vercel serverless).

1. In Vercel: open your project → **Settings** → **Environment Variables**.
2. Add:
   - **Name:** `OPENAI_API_KEY`  
   - **Value:** your secret key from [OpenAI API keys](https://platform.openai.com/api-keys)  
   - **Environment:** Production (and Preview if you want previews to use AI)
3. Optional: **`OPENAI_MODEL`** — e.g. `gpt-4o-mini` (default in code if unset).
4. **Redeploy** the latest deployment (Deployments → … → Redeploy) so the new variables apply.

Never commit API keys into the repository. The app only reads the key on the server (Vercel), not in the browser.

---

## 7. Optional: test API + frontend together locally

Plain `npm run dev` serves Vite only; **`/api/chat` will not exist** unless you run Vercel’s dev server.

From the project root:

```powershell
npx vercel dev
```

Follow the prompts to link the folder to your Vercel project. This runs Vite and the **`api/`** routes together. Set `OPENAI_API_KEY` in `.env.local` for local testing if Vercel CLI loads it, or rely on Vercel project env when linked.

---

## 8. Optional: custom domain

In Vercel: **Project** → **Settings** → **Domains** → add your domain and follow DNS instructions from Vercel.

---

## 9. After every future change

```powershell
cd "C:\Users\PATRICK\Downloads\My Portfolio Website"
git add .
git commit -m "Describe your change in one short sentence"
git push origin main
```

Vercel will **automatically rebuild and deploy** from `main` if the Git integration is connected.

---

## Quick checklist

| Step | Action |
|------|--------|
| 1 | `npm install` and `npm run build` succeed |
| 2 | Code committed and pushed to `main` on GitHub |
| 3 | Vercel project imports that repo with **Output:** `dist`, **Build:** `npm run build` |
| 4 | `OPENAI_API_KEY` set in Vercel and project redeployed (for full AI) |

If something fails, copy the **exact error message** from the terminal or Vercel’s build log — that pinpoints the fix.
