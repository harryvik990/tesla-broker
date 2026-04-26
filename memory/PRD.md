# Tesla Mining Investments — PRD

## Original Problem Statement
> Unzip file and build app and deploy with dns free domain

User uploaded `OKComputer_Untitled_Chat.zip` containing a Vite + React 19 + TypeScript
landing page (Tesla Mining Investments theme). User-confirmed requirements:
- Multi-page React Router routes with **"Next"** buttons that trigger backend API calls
- Backend with **MongoDB Atlas** (using local MongoDB for the Emergent preview)
- **Telegram contact redirect** to `@TMBsupport_X` instead of an on-page contact form
- **Netlify** as the production deployment target

## Architecture
- **Frontend:** Vite 7 + React 19 + TypeScript + Tailwind 3 + React Router v7
  - Runs on port 3000 (`yarn start` → `vite`)
- **Backend (preview):** FastAPI on port 8001, MongoDB local
- **Backend (production / Netlify):** Single Netlify Function (`/app/netlify/functions/api.js`)
  routing all `/api/*` calls, MongoDB Atlas
- **Routing redirects:** `netlify.toml` rewrites `/api/*` → function, SPA fallback for client routes

## Pages (React Router)
| Route | Component | Purpose |
| ----- | --------- | ------- |
| `/` | Home | Hero + live stats |
| `/how-it-works` | HowItWorks | 4-step timeline |
| `/plans` | Plans | 3 mining contract cards |
| `/testimonials` | Testimonials | 4 investor reviews |
| `/faq` | Faq | 6-item accordion |
| `/get-started` | GetStarted | Telegram CTA → `https://t.me/TMBsupport_X` |
| `*` | NotFound | 404 |

## Backend Endpoints (mirrored in FastAPI + Netlify Function)
- `GET  /api/` — health
- `GET  /api/plans` — investment plans
- `GET  /api/stats` — hero stats
- `GET  /api/testimonials` — investor stories
- `GET  /api/faqs` — FAQ list
- `GET  /api/steps` — how-it-works steps
- `POST /api/visits` `{page}` — log a page visit (called by every "Next" button)
- `POST /api/cta` `{action, page}` — log a CTA click
- `GET  /api/visits/summary` — aggregate counts (admin/analytics)

## Implemented (Jan 2026)
- ✅ Replaced default CRA scaffold with the uploaded Vite app
- ✅ Vite config set to host `0.0.0.0:3000` with `envPrefix: ['VITE_', 'REACT_APP_']`
- ✅ 6 React Router pages + Layout (shared nav + footer) + 404
- ✅ `NextButton` component fires `POST /api/visits` then navigates
- ✅ FastAPI backend with all 9 endpoints, MongoDB-backed analytics
- ✅ Telegram redirect everywhere (Get Started CTA + footer link + nav optional)
- ✅ Netlify Function mirror of all endpoints (`/app/netlify/functions/api.js`)
- ✅ `netlify.toml` with build, function, and SPA-redirect config
- ✅ `DEPLOY.md` step-by-step Netlify deployment guide
- ✅ Production build verified (`yarn build` succeeds, 295 kB JS)
- ✅ Testing agent: 100% backend (10/10), 100% frontend (10/10 flows)

## Backlog / Future
- **P1** Move static `PLANS / STATS / TESTIMONIALS / FAQS / STEPS` lists into MongoDB
  collections + add a `seed.py` script so non-developers can edit content via Atlas UI.
- **P1** Migrate FastAPI from deprecated `@app.on_event('shutdown')` to the lifespan
  context-manager API.
- **P2** Add input-length validation on `POST /api/visits` and `POST /api/cta`.
- **P2** Admin dashboard route (`/admin`) showing visit/CTA analytics behind a token.
- **P2** Newsletter signup + Telegram bot webhook for instant lead notifications.

## Next Tasks (if user continues the session)
1. User pushes to GitHub (Save to GitHub button) and follows `DEPLOY.md`
2. User provides MongoDB Atlas URI to wire production analytics
3. (Optional) User asks for an admin analytics view of `/api/visits/summary`
