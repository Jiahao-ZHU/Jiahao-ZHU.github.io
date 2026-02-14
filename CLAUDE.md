# Jiahao Zhu — Academic Website

## Project Overview

Personal academic website built with Next.js 15 (static export), deployed to GitHub Pages.

- **Framework**: Next.js 15, App Router, static export (`output: 'export'`)
- **Styling**: Tailwind CSS with custom design tokens
- **Content**: MDX (Markdown + JSX) with KaTeX math and syntax highlighting
- **Deployment**: GitHub Pages via GitHub Actions (push to `main` triggers deploy)

## Content Operations

### Adding a New Blog Post

1. Create a new `.mdx` file in `content/blog/`:
   ```
   content/blog/your-post-slug.mdx
   ```
2. Add frontmatter at the top:
   ```yaml
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DD"
   category: "Category Name"
   description: "A short description for the post list."
   tags: ["tag1", "tag2"]
   ---
   ```
3. Write content in MDX. Supported features:
   - **Inline math**: `$x^2 + y^2 = z^2$`
   - **Display math**: `$$\int_0^\infty f(x) dx$$`
   - **Code blocks**: Use triple backticks with language identifier
   - **Images**: Place in `public/assets/blog/` and reference as `/assets/blog/filename.png`
4. The post automatically appears on `/blog` list and homepage "Recent Notes"
5. Commit and push to `main` — GitHub Actions deploys automatically

### Adding a New Research Project

Edit `content/research.ts` — add a new object to the `researchProjects` array:

```typescript
{
  title: "Project Title",
  href: "/research#anchor-id",
  role: "Your Role",
  institution: "Institution Name",
  period: "YYYY – YYYY",
  description: "Brief description of the project.",
  pdf: "/assets/research/filename.pdf",  // optional, place PDF in public/assets/research/
}
```

Research projects are listed in reverse chronological order (newest first). When adding a new project, insert it at the correct position in the array.

### Adding a New Publication

Edit `content/publications.ts` — add a new object to the `publications` array:

```typescript
{
  title: "Paper Title",
  authors: "Author1, A., Author2, B., & Author3, C.",
  venue: "Journal or Conference Name",
  year: 2026,
  status: "published",  // or "in-preparation" or "under-review"
  doi: "https://doi.org/...",  // optional
  pdf: "/papers/filename.pdf",  // optional, place PDF in public/papers/
}
```

### Adding a New Project

Edit `content/projects.ts` — add a new object to the `projects` array:

```typescript
{
  title: "Project Name",
  description: "What it does.",
  tags: ["Python", "Tool"],
  github: "https://github.com/Jiahao-ZHU/repo-name",
  demo: "https://demo-url.com",  // optional
}
```

### Updating CV

Replace `public/assets/about/CV_Jiahao_2026_v2.pdf` with the new version. Keep the same filename or update the link in `app/page.tsx`.

## Architecture Notes

- All pages are statically generated at build time (no server-side rendering)
- Blog posts are MDX files in `content/blog/`, processed by `lib/mdx.ts`
- Research/publications/projects data lives in TypeScript files under `content/`
- Design tokens (colors, fonts) are defined in `app/globals.css` and `tailwind.config.ts`
- Dark mode uses `class` strategy with localStorage persistence
- The approved visual mockup is at `mockup.html` — any style changes should reference it

## Commands

- `npm run dev` — Start dev server at localhost:3000
- `npm run build` — Build static site to `out/`
- `npx serve out` — Preview the static build locally

## Do NOT

- Use SSR features (API routes, server actions) — breaks GitHub Pages
- Change `output: 'export'` in `next.config.ts`
- Commit node_modules or the `out/` directory
