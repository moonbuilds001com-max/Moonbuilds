# MOONBUILDS — WE BUILD DIGITAL WORLDS

Production website for **Moonbuilds**, an independent digital design & development
studio based in Nairobi, Kenya.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS + GSAP/ScrollTrigger +
Lenis + Three.js**, using real licensed photography from Pexels (see
[`public/photos/CREDITS.md`](public/photos/CREDITS.md)).

---

## What's inside

| Page | Route |
| --- | --- |
| Home (scroll-driven photo walk-through) | `/` |
| Studio | `/studio` |
| Services + 7 service pages | `/services`, `/services/[slug]` |
| Portfolio + 4 concept projects | `/portfolio`, `/portfolio/[slug]` |
| Process (5 steps) | `/process` |
| Contact / enquiry form | `/contact` |
| Privacy | `/privacy` |
| Custom 404 | any unknown path |

The enquiry form posts to `/api/enquiry`, validates on the client and server,
blocks spam with a honeypot + basic rate limiting, and sends email through
**Resend**. If no email API key is configured, the form honestly tells you and
offers a pre-filled WhatsApp handoff — it never fakes a success.

---

## Run it locally (beginner friendly)

You need **Node.js 20 or newer** (https://nodejs.org — pick the LTS installer).
One-time setup, from inside this folder:

```bash
npm install          # downloads the libraries the site needs
npm run photos:download   # downloads + optimises the real photos into public/photos (needs internet)
npm run dev          # starts a local server at http://localhost:3000
```

Open **http://localhost:3000** in your browser. Every time you save a file the
page reloads automatically.

Other useful commands:

```bash
npm run build        # creates the optimised production build
npm run start        # serves the production build (run build first)
npm run typecheck    # checks the TypeScript for errors
npm run lint         # checks the code for problems
```

### Note about photos

The photos are **not committed to git** — they are downloaded from the Pexels CDN
by `npm run photos:download` (script: `scripts/download-photos.mjs`). Run it once
before deploying. Each photo's photographer and licence were verified on its own
Pexels page and are credited in `public/photos/CREDITS.md` and in the site footer.

---

## Environment variables (secrets)

Copy `.env.example` to `.env.local` and fill in what you have. **Never commit
`.env.local` — it is already excluded by `.gitignore`.**

| Variable | Required? | What it does |
| --- | --- | --- |
| `RESEND_API_KEY` | for email | API key from https://resend.com — enables the contact form to send email |
| `CONTACT_TO_EMAIL` | for email | Where enquiries are sent (e.g. `Moonbuilds001.com@gmail.com`) |
| `CONTACT_FROM_EMAIL` | for email | Verified sender on Resend, e.g. `onboarding@resend.dev` |
| `NEXT_PUBLIC_SITE_URL` | recommended | Your live address, e.g. `https://moonbuilds.com` — used for SEO/sitemap |
| `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | optional | Cloudflare Turnstile CAPTCHA on the contact form |
| `NEXT_PUBLIC_GA_ID` | optional | Google Analytics measurement ID (`G-…`) |

**Without email variables the site still works perfectly** — the form switches to
the WhatsApp handoff (`wa.me/254103732569`) with the enquiry pre-filled.

---

## Deploying (choose one host)

All three hosts below connect to your **GitHub** repository and rebuild the site
automatically every time you push. All three have a free tier that fits this site.

### Step 0 — Put the code on GitHub first

1. Create a free account at https://github.com if you don't have one.
2. Create a new **empty repository** (no README, no .gitignore — this folder already has them).
3. In this folder, run:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

(When asked to log in, GitHub opens a browser window — that's normal.)

### Option A — Vercel (simplest for Next.js)

Next.js's own platform. Everything just works, including the API route that
sends email.

1. Go to https://vercel.com → **Sign up with GitHub**.
2. **Add New… → Project** → pick the repo → **Import**.
3. Vercel detects Next.js automatically — just click **Deploy**.
4. After the first deploy: **Settings → Environment Variables** and add
   `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`,
   `NEXT_PUBLIC_SITE_URL` → **Redeploy**.
5. Free tier: `*.vercel.app` domain; custom domains supported.

**Cost:** free hobby tier (personal, non-commercial) — for a client/business site
check the Pro plan terms.

### Option B — Netlify

1. https://app.netlify.com → **Sign up with GitHub**.
2. **Add new site → Import an existing project** → pick the repo.
3. Build command `npm run build`, publish directory `.next` are detected from
   `package.json` (the included `netlify.toml` sets this).
4. **Site settings → Environment variables** — add the same variables as above,
   then **Deploys → Trigger deploy**.
5. Free tier: `*.netlify.app` domain; custom domains supported.

**Cost:** generous free tier, paid plans from ~$19/mo when you outgrow it.

### Option C — Cloudflare Pages

1. https://dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**.
2. Pick the repo. Build command `npm run build`, build output directory `.next`.
   (`Workers & Pages → Create → Pages → Connect to Git`)
3. Add environment variables in **Settings → Variables and Secrets**, then redeploy.
4. Free tier: `*.pages.dev` domain; custom domains supported.

**Cost:** very generous free tier; Cloudflare's CDN is strong in East Africa.

### Quick comparison

| | Vercel | Netlify | Cloudflare Pages |
| --- | --- | --- | --- |
| Next.js support | Best (it's made by Vercel) | Good (uses a Next adapter) | Good, needs the build output set to `.next` |
| Email API route | Works out of the box | Works (serverless functions) | Works (Functions) |
| Free tier | Personal use | Business-friendly | Business-friendly |
| Custom domain | Yes | Yes | Yes |

### Adding your custom domain (e.g. `moonbuilds.com`)

1. Buy the domain at any registrar (Namecheap, Cloudflare Registrar, Truehost Kenya, etc.).
2. In your host's dashboard: **Domains → Add domain** → type your domain.
3. The host shows you a CNAME record (or A record for the bare domain).
4. In your registrar's DNS settings, add exactly the records shown.
5. Wait 5 minutes – 24 hours. The host issues a free HTTPS certificate automatically.

---

## Folder tour

```
moonbuilds-next/
├─ src/
│  ├─ app/            pages, API route, sitemap, robots
│  ├─ components/     Nav, Footer, SceneWalk (the photo walk-through), form…
│  └─ lib/            site data: services, projects, process, photo credits
├─ public/photos/     downloaded photos + CREDITS.md (not committed)
├─ scripts/           photo download/optimisation script
├─ .env.example       list of environment variables to fill in
└─ netlify.toml       Netlify build settings
```
