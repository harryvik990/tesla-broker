# Tesla Mining — Netlify deployment guide

This app is **already running locally** on the Emergent preview URL. To deploy it
to a free Netlify domain (e.g. `https://your-site.netlify.app`) follow the
steps below — no code changes required.

## 1. Push the code to GitHub

Use the **"Save to GitHub"** button at the top of the Emergent chat.

## 2. Set up MongoDB Atlas (free)

1. Sign up at https://cloud.mongodb.com (free M0 cluster).
2. Create a database user (username + password).
3. Network Access → Add IP `0.0.0.0/0` (allow Netlify Functions).
4. Click **"Connect"** → **"Drivers"** → copy the connection string. It looks like:
   ```
   mongodb+srv://USER:PASS@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority
   ```

## 3. Create the Netlify site

1. Go to https://app.netlify.com → **"Add new site"** → **"Import from Git"**.
2. Pick the GitHub repo you just pushed.
3. Build settings — Netlify will auto-detect from `/app/netlify.toml`, but verify:
   - **Base directory:** `frontend`
   - **Build command:** `yarn install && yarn build`
   - **Publish directory:** `frontend/dist`
   - **Functions directory:** `netlify/functions`

## 4. Add environment variables

In the Netlify site → **Site settings → Environment variables** add:

| Key                     | Value                                                 |
| ----------------------- | ----------------------------------------------------- |
| `MONGO_URL`             | your Atlas connection string from step 2              |
| `DB_NAME`               | `tesla_mining`                                        |
| `REACT_APP_BACKEND_URL` | leave empty (frontend will call `/api` on same host)  |

> **Important:** Once `REACT_APP_BACKEND_URL` is empty, the frontend will hit
> `/api/*` on the same Netlify domain — Netlify rewrites those calls into the
> serverless function automatically (see `netlify.toml`).

## 5. Deploy

Click **"Deploy site"**. After ~2 minutes you get a free URL like
`https://tesla-mining-xyz.netlify.app`. You can rename it under
**Site settings → Site information → Change site name**.

## 6. Verify

- Open the URL → home page should load.
- Click **"Start Mining Today"** → How It Works should load (this is a backend
  call to `/api/visits` — confirms Netlify Functions + MongoDB are wired up).
- Final **"Message @TMBsupport_X on Telegram"** button should open
  `https://t.me/TMBsupport_X`.

## File map

```
/app
├── frontend/                # Vite + React + TypeScript SPA
│   ├── src/pages/           # Home, HowItWorks, Plans, Testimonials, Faq, GetStarted
│   ├── src/components/      # Navigation, Footer, NextButton, PageHeader
│   └── src/lib/api.ts       # API client (axios)
├── netlify/
│   └── functions/api.js     # All /api/* endpoints (MongoDB-backed)
├── netlify.toml             # Build + redirect config
└── backend/                 # FastAPI (used only in the Emergent preview)
    └── server.py
```

The Emergent preview uses the **FastAPI** backend (`/app/backend/server.py`).
The Netlify deployment uses the **Netlify Function** in `/app/netlify/functions/api.js`.
Both expose the **same routes** so the frontend works identically in either env.
