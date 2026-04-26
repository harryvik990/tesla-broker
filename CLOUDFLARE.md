# Publish the site on Cloudflare (free) — step-by-step

You have **two paths** with Cloudflare. Pick whichever matches what you want:

| Goal | Path |
| ---- | ---- |
| Free hosting + free `*.pages.dev` domain (replaces Netlify) | **Path A — Cloudflare Pages** |
| Keep Netlify hosting but add your own domain (e.g. `teslamining.com`) | **Path B — Cloudflare DNS only** |
| Both: Cloudflare hosts the site AND fronts a custom domain | Do Path A, then Path B's "custom domain" step |

---

## Path A — Deploy on Cloudflare Pages (free, no credit card)

You get a URL like `https://tesla-mining.pages.dev`. The repo is already
configured: `/app/functions/api/[[path]].js` is the Pages Function that handles
every `/api/*` call, and `/app/frontend/public/_redirects` makes React Router work.

### A.1. Push to GitHub
Click **"Save to GitHub"** in the Emergent chat. Make a note of the repo URL.

### A.2. Set up MongoDB Atlas + Data API (Cloudflare Workers can't use the regular driver)
1. Sign up at https://cloud.mongodb.com (free M0 cluster).
2. Create a database user (username + password).
3. **Network Access** → Add IP `0.0.0.0/0` (allow Cloudflare IPs).
4. **Data API** → click **Enable** for your cluster, copy the **URL Endpoint**
   (looks like `https://us-east-1.aws.data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1`).
5. **App Services → API Keys** → create a key → copy it.

### A.3. Create the Cloudflare Pages project
1. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create**
   → **Pages** → **Connect to Git**.
2. Authorize GitHub, pick your repo.
3. Build settings:
   | Field | Value |
   | ----- | ----- |
   | Framework preset | **Vite** |
   | Build command | `cd frontend && yarn install && yarn build` |
   | Build output directory | `frontend/dist` |
   | Root directory | `/` |

### A.4. Add environment variables
Click **"Add variable"** → set these (Production scope):

| Variable | Value |
| -------- | ----- |
| `ATLAS_DATA_API_URL` | the URL from A.2 step 4 |
| `ATLAS_DATA_API_KEY` | the API key from A.2 step 5 |
| `ATLAS_CLUSTER` | `Cluster0` (or your cluster name) |
| `DB_NAME` | `tesla_mining` |
| `REACT_APP_BACKEND_URL` | leave **empty** (frontend will hit `/api` on same host) |
| `NODE_VERSION` | `20` |

### A.5. Deploy
Click **"Save and Deploy"**. After ~2 minutes you get
`https://YOUR-PROJECT.pages.dev`. Open it — every page should work and the
**"Message @TMBsupport_X on Telegram"** button should open Telegram with the
plan name pre-filled.

### A.6. (Optional) Use a custom domain on Pages
On the Pages project: **Custom domains → Set up a custom domain** → enter
`teslamining.com` → Cloudflare auto-creates the DNS record (the domain must
already be in Cloudflare — see Path B step 1 if it's not yet).

---

## Path B — Use Cloudflare DNS to put a custom domain on top of any host

This is what you do if you bought a domain (e.g. on GoDaddy/Namecheap) and want
to point it at the live site (Netlify or Cloudflare Pages).

### B.1. Add the domain to Cloudflare (free plan)
1. https://dash.cloudflare.com → **Add a site** → enter your domain
   (e.g. `teslamining.com`).
2. Pick the **Free** plan.
3. Cloudflare will scan existing DNS — review and click **Continue**.
4. Cloudflare gives you **2 nameservers** (e.g. `lana.ns.cloudflare.com`).
   Go to your domain registrar and replace the nameservers with the two
   Cloudflare ones. Propagation takes a few minutes to a few hours.

### B.2. Point the domain at your hosting
Once Cloudflare confirms the nameservers are active, in Cloudflare DNS settings:

#### If hosting on Netlify
| Type | Name | Content | Proxy |
| ---- | ---- | ------- | ----- |
| `CNAME` | `@` (or `www`) | `your-site.netlify.app` | Proxied (orange cloud) |

Then in Netlify → **Domain management → Add custom domain** → enter
`teslamining.com`. Netlify automatically provisions a free SSL cert.

#### If hosting on Cloudflare Pages
Use the **"Custom domains"** tab in the Pages project (see step A.6) — it auto-
creates the right CNAME for you.

### B.3. Force HTTPS
In Cloudflare → **SSL/TLS → Edge Certificates**:
- Always Use HTTPS → **On**
- SSL/TLS encryption mode → **Full** (or **Full (strict)** if your origin has a valid cert — Netlify and Pages both do).

Done. Your site is live on your own domain over HTTPS.

---

## File map for Cloudflare Pages

```
/app
├── frontend/                # Vite + React SPA
│   ├── public/_redirects    # SPA fallback for client-side routing
│   └── src/                 # pages, components, api client
├── functions/
│   └── api/[[path]].js      # Pages Function — handles all /api/* calls
└── backend/                 # FastAPI — preview only, NOT used on Cloudflare
```

## Troubleshooting

- **`/api/*` returns 404 on Pages** → Confirm `/app/functions/api/[[path]].js`
  exists in the repo and Cloudflare's build log shows
  `Found Pages Functions in functions/`.
- **Atlas Data API errors** → Check Network Access allows `0.0.0.0/0` and the
  API key isn't paused. Tail the function logs in **Pages → Logs (real-time)**.
- **Page reloads show 404** → Make sure `frontend/public/_redirects` exists
  with `/* /index.html 200`.
- **Long-term:** the Atlas Data API will be deprecated in late 2025. After
  that, switch to a connection-pooled driver via Cloudflare's **Hyperdrive**
  or move the backend to a Worker that uses MongoDB's `mongodb` driver from
  Workers' new Node compatibility layer.
