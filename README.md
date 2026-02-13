# Jiahao Zhu — Academic Website

> A minimal, statically-generated academic portfolio built with Next.js 15 and deployed to GitHub Pages.

![Website Preview](public/images/readme-preview.png)

[Live Demo](https://jiahao-zhu.github.io) · [Fork this template](#quick-start)

## Features

- **MDX Blog** — Write posts in Markdown + JSX with math (KaTeX) and syntax highlighting (Shiki)
- **Static Export** — No server required; deploys to GitHub Pages via GitHub Actions
- **Dark Mode** — Toggle with localStorage persistence
- **Academic Content** — Structured sections for Research, Publications, and Projects
- **Responsive Design** — Mobile-first with custom typography (Playfair Display + Inter)

## Quick Start

> **Prerequisites:** [Node.js](https://nodejs.org/) 20 or later

1. **Fork** this repository and clone it locally
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the dev server**
   ```bash
   npm run dev
   ```
4. **Open** [http://localhost:3000](http://localhost:3000) to see your site

## Customize

Replace the content below to make it your own:

| What              | File / Directory              | Format           |
|-------------------|-------------------------------|------------------|
| Profile & Bio     | `app/page.tsx`                | TSX              |
| Blog posts        | `content/blog/*.mdx`         | MDX + frontmatter|
| Research projects | `content/research.ts`        | TypeScript array |
| Publications      | `content/publications.ts`    | TypeScript array |
| Projects          | `content/projects.ts`        | TypeScript array |
| CV                | `public/CV_Jiahao_2026.pdf`  | PDF              |
| Profile photo     | `public/images/jiahaozhu.jpg`| JPG              |

For detailed content editing instructions, see [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md).

## Deploy to GitHub Pages

This site is configured for automatic deployment:

1. Enable **GitHub Pages** in your repo settings (set source to **GitHub Actions**)
2. Push to the `main` branch
3. GitHub Actions will build and deploy automatically

The workflow is defined in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Tech Stack

- [Next.js 15](https://nextjs.org/) — Static site generation
- [Tailwind CSS 4](https://tailwindcss.com/) — Styling
- [MDX](https://mdxjs.com/) + [KaTeX](https://katex.org/) — Content with math rendering
- [Shiki](https://shiki.style/) — Syntax highlighting
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## License

MIT
