# Portfolio

A one-page, scroll-driven portfolio built with React + Vite + Tailwind + Framer Motion.
Sections: Hero → About → Stack → Projects (expandable) → Film Crossover → Education → Contact.

## 1. Fill in your real content

Everything you need to change lives in one file:

```
src/data/content.js
```

Swap the placeholder name, tagline, project details, honors, and links. You shouldn't need to
touch any component file just to update copy.

## 2. Run it locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173.

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
gh repo create your-portfolio --public --source=. --remote=origin --push
```

(Or create the repo on github.com first, then `git remote add origin <url>` and `git push -u origin main`.)

## 4. Deploy on Vercel

- Go to https://vercel.com/new
- Import the GitHub repo you just pushed
- Framework preset: **Vite** (auto-detected)
- Build command: `npm run build` (default)
- Output directory: `dist` (default)
- Deploy

Every push to `main` will auto-deploy after that.

## Structure

```
src/
  components/   UI sections (Hero, About, Skills, Projects, FilmCrossover, Education, Contact)
  data/         content.js — all editable copy lives here
  App.jsx       assembles the page
  index.css     Tailwind + a couple of custom utilities (sprocket-rail motif, selection color)
tailwind.config.js  color/type tokens (edit here to reskin the whole site)
```

## Notes on making it "more interactive" later

Good next additions, in rough order of effort:
- A cursor-reactive hero (parallax on mouse move)
- A filterable project grid by tag/stack
- A command-palette style nav (press `/` to jump to a section)
- Embedded video/demo clips in the Film Crossover section
- A CMS (e.g. simple JSON file or headless CMS) if you'll update projects often
