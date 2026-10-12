# Prarthana AI

A spiritually immersive Hindu prayer app. Describe your situation, pick a language (and optionally a deity), and receive a heartfelt prayer grounded in scripture via Gemini + Google Search.

**Stack:** Next.js 14 (App Router), Tailwind CSS, Framer Motion, Google Gemini (`@google/genai`) with Search grounding, Firebase/Firestore (optional), Lucide icons, custom SVG mandala.

## Run locally

```bash
npm install
cp .env.example .env.local   # then add GEMINI_API_KEY
npm run dev                  # http://localhost:3000
```

Get a Gemini key at https://aistudio.google.com/apikey.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Gemini API access |
| `GEMINI_MODEL` | No | Defaults to `gemini-2.5-pro` (must support Search grounding) |
| `NEXT_PUBLIC_FIREBASE_*` | No | Enables saving prayers and shareable `/prayer/[id]` links |

Without Firebase the app works fully; the Share button just doesn't appear.

### Firestore setup (optional)
1. Create a Firebase project and a Firestore database.
2. Put the web-app config values in `.env.local`.
3. Rules need to allow create and read on the `prayers` collection, for example:
   ```
   match /prayers/{id} {
     allow create: if true;
     allow get: if true;
     allow list, update, delete: if false;
   }
   ```
   Prayers contain what users typed about their situation, so consider tightening this (auth, rate limits, or moving writes to firebase-admin) before launch.

## Structure

```
app/
  api/generate-prayer/route.ts   Gemini + Search grounding, JSON parsing, optional save
  page.tsx                       Landing page, input, result
  prayer/[id]/page.tsx           Shared prayer view
components/  PrayerInput, PrayerCard, DeitySelector, Mandala
lib/         types, firebase helpers
theme/       colors.js (indigo / saffron / gold)
```

## Deploy
Push to GitHub and import into Vercel, add the env vars, deploy.

## Notes
- Search grounding can't be combined with Gemini's JSON response mode, so the route asks for raw JSON and parses it defensively.
- The mantra is kept in Devanagari with a Roman transliteration; if the model can't verify one, none is shown.
- Always verify mantras with a trusted teacher or text before relying on them.
