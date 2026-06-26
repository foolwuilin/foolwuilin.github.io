# DJ FOOL Wuilin — Scratch the World

GEO/AEO-optimized static site. **Astro + Sveltia CMS + Cloudinary + GitHub Pages.**

## What this is
- Static HTML (zero-JS by default) → fast, fully crawlable by Google + AI engines.
- Content lives as Markdown/YAML in `src/content/` and is edited via the CMS at `/admin`.
- Images are managed in Cloudinary (cloud: `nkbzi14a`); videos via YouTube embeds.

## Local development
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static site to dist/
```

## Deploy (GitHub Pages)
1. Create repo **foolwuilin/foolwuilin.github.io**, push this project to `main`.
2. Repo → Settings → Pages → Build and deployment → Source = **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push.
4. Site goes live at https://foolwuilin.github.io

## Enable the CMS login (one-time)
Sveltia CMS needs GitHub OAuth. Easiest path = a free Cloudflare Worker:
1. Create a GitHub OAuth App (Settings → Developer settings → OAuth Apps):
   - Homepage URL: `https://foolwuilin.github.io`
   - Authorization callback URL: your worker URL + `/callback`
2. Deploy the **sveltia-cms-auth** Cloudflare Worker (free); set its `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` vars.
3. Put the worker URL into `public/admin/config.yml` → `backend.base_url`.
4. Visit `https://foolwuilin.github.io/admin` and log in with GitHub.

## Editing content
- Go to `/admin`, pick a collection (Scratch the World / Tutorials / Gear / Q&A), write, add images from the Cloudinary widget (alt text required), and Publish.
- Publishing commits to GitHub → the Action rebuilds → live in ~1–2 minutes.

## Connecting foolwuilin.com later
Add a `public/CNAME` file containing `foolwuilin.com`, set DNS, and update `site` in `astro.config.mjs`.
