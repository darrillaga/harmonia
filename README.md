# Interval Trainer

A music theory practice app: interval drills, chord-tones walks, and scale ear-training.

Live: **https://darrillaga.github.io/interval-trainer/**

## Files

- `index.html` — the app (single file, all CSS/JS inlined)
- `manifest.json` — PWA manifest (makes it installable on phones)
- `sw.js` — service worker (caches assets for offline use)
- `icon-192.png`, `icon-512.png` — app icons

## Deploy to GitHub Pages

### Option A: GitHub web UI (no command line)

1. Go to https://github.com/new
2. Name the repo **`interval-trainer`**, make it **Public**, click **Create repository**
3. On the empty repo page, click **uploading an existing file**
4. Drag all 5 files from this folder (`index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`) into the upload area
5. Click **Commit changes**
6. Go to **Settings → Pages** (left sidebar)
7. Under **Source**, select branch **`main`** and folder **`/ (root)`**, then **Save**
8. Wait ~1 minute. Your URL: **https://darrillaga.github.io/interval-trainer/**

### Option B: Command line

```bash
cd interval-trainer-pwa
git init
git add .
git commit -m "Initial PWA"
git branch -M main
git remote add origin https://github.com/darrillaga/interval-trainer.git
git push -u origin main
```

Then in the GitHub UI: **Settings → Pages → Source: main / (root) → Save**.

## Install on phone (after deploy)

**iPhone (Safari):** Open the URL → tap Share → "Add to Home Screen" → Add. Launches fullscreen with the icon.

**Android (Chrome):** Open the URL → tap menu (⋮) → "Install app" or "Add to Home Screen". Same result.

After installation, the app works **offline** — service worker caches everything on first load.

## Updating the app

Edit `index.html`, push the change. To force phones to pick up new versions, bump the `CACHE_NAME` in `sw.js` (e.g. `interval-trainer-v1` → `interval-trainer-v2`). The service worker will replace the old cache on the next visit.
