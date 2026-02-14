# Add Emotion Labeling Research Project + Restructure public/ — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure `public/` into `public/assets/{about,research,blog}`, add the emotion labeling position paper as a research project with PDF download, and enforce reverse chronological ordering.

**Architecture:** Reorganize static assets by page section, extend the `ResearchProject` TypeScript interface with an optional `pdf` field, render a conditional download link, and update all path references in code and docs.

**Tech Stack:** Next.js 15 (static export), TypeScript, Tailwind CSS

---

### Task 1: Restructure public/ directory

**Files:**
- Move: `public/images/jiahaozhu.jpg` → `public/assets/about/jiahaozhu.jpg`
- Move: `public/CV_Jiahao_2026_v2.pdf` → `public/assets/about/CV_Jiahao_2026_v2.pdf`
- Move: `app/research/Position paper Jiahao Zhu 20241020_2.pdf` → `public/assets/research/emotion-labeling-predictive-coding-2024.pdf`
- Keep: `public/images/readme-preview.png` (README-only, not a page section)
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`

**Step 1: Create new directories**

```bash
mkdir -p public/assets/about public/assets/research public/assets/blog
```

**Step 2: Move files to new locations**

```bash
mv public/images/jiahaozhu.jpg public/assets/about/jiahaozhu.jpg
mv public/CV_Jiahao_2026_v2.pdf public/assets/about/CV_Jiahao_2026_v2.pdf
mv "app/research/Position paper Jiahao Zhu 20241020_2.pdf" public/assets/research/emotion-labeling-predictive-coding-2024.pdf
```

**Step 3: Delete unused Next.js template SVGs**

```bash
rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

**Step 4: Verify new structure**

```bash
find public -type f | sort
```

Expected:
```
public/.nojekyll
public/assets/about/CV_Jiahao_2026_v2.pdf
public/assets/about/jiahaozhu.jpg
public/assets/research/emotion-labeling-predictive-coding-2024.pdf
public/images/readme-preview.png
```
(`public/assets/blog/` exists but is empty — that's correct.)

---

### Task 2: Update asset paths in app code

**Files:**
- Modify: `app/page.tsx:13` (profile photo path)
- Modify: `app/page.tsx:41` (CV download path)

**Step 1: Update profile photo path**

In `app/page.tsx`, change line 13 from:

```tsx
          src="/images/jiahaozhu.jpg"
```

to:

```tsx
          src="/assets/about/jiahaozhu.jpg"
```

**Step 2: Update CV download path**

In `app/page.tsx`, change line 41 from:

```tsx
              { label: "CV ↓", href: "/CV_Jiahao_2026_v2.pdf" },
```

to:

```tsx
              { label: "CV ↓", href: "/assets/about/CV_Jiahao_2026_v2.pdf" },
```

**Step 3: Verify TypeScript compiles**

```bash
cd /Users/jiahaozhu/Desktop/Jiahao/Python_projects/Jiahao_web && npx tsc --noEmit
```

Expected: no errors.

---

### Task 3: Update ResearchProject interface and add new entry

**Files:**
- Modify: `content/research.ts`

**Step 1: Add `pdf` optional field to interface**

In `content/research.ts`, change:

```typescript
  description: string;
}
```

to:

```typescript
  description: string;
  pdf?: string;
}
```

**Step 2: Insert new project entry**

In `content/research.ts`, insert the following after the "Automatic and Motivational Avoidance" entry and before the "Emotional Co-Expressions" entry:

```typescript
  {
    title: "Emotion Labeling Through the Lens of Predictive Coding",
    href: "/research#emotion-labeling",
    role: "Position Paper (Course Project)",
    institution: "Radboud University",
    period: "2024",
    description:
      "Proposed a predictive coding account to reconcile conflicting evidence on whether naming emotions dampens or intensifies them. Argued that prediction uncertainty is the key mechanism, modulated by label-experience intensity mismatch and labeling freedom.",
    pdf: "/assets/research/emotion-labeling-predictive-coding-2024.pdf",
  },
```

---

### Task 4: Render conditional PDF download link on research page

**Files:**
- Modify: `app/research/page.tsx`

**Step 1: Add PDF link after description**

In `app/research/page.tsx`, after the description `<p>` tag (line 28), add:

```tsx
            {project.pdf && (
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-[13px] text-accent underline underline-offset-2"
              >
                PDF
              </a>
            )}
```

Style matches existing link pattern from `app/publications/page.tsx:12`.

**Step 2: Build and verify**

```bash
cd /Users/jiahaozhu/Desktop/Jiahao/Python_projects/Jiahao_web && npm run build
```

Expected: build succeeds.

---

### Task 5: Update documentation (CLAUDE.md, CONTENT-GUIDE.md, README.md)

**Files:**
- Modify: `CLAUDE.md`
- Modify: `docs/CONTENT-GUIDE.md`
- Modify: `README.md`

**Step 1: Update CLAUDE.md — blog images path**

Change line 34 from:

```markdown
   - **Images**: Place in `public/images/` and reference as `/images/filename.png`
```

to:

```markdown
   - **Images**: Place in `public/assets/blog/` and reference as `/assets/blog/filename.png`
```

**Step 2: Update CLAUDE.md — research project example**

Replace the research project example code block (lines 42-51) with:

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

Add after the closing code fence:

```markdown

Research projects are listed in reverse chronological order (newest first). When adding a new project, insert it at the correct position in the array.
```

**Step 3: Update CLAUDE.md — CV section**

Change line 85 from:

```markdown
Replace `public/CV_Jiahao_2026.pdf` with the new version. Keep the same filename or update the link in `app/page.tsx`.
```

to:

```markdown
Replace `public/assets/about/CV_Jiahao_2026_v2.pdf` with the new version. Keep the same filename or update the link in `app/page.tsx`.
```

**Step 4: Update CONTENT-GUIDE.md — images section**

Change line 37 from:

```markdown
Place image in `public/images/`, then:
```

to:

```markdown
Place image in `public/assets/blog/`, then:
```

Change line 40 from:

```markdown
![Alt text](/images/my-figure.png)
```

to:

```markdown
![Alt text](/assets/blog/my-figure.png)
```

**Step 5: Update CONTENT-GUIDE.md — file locations table**

Change lines 58-59 from:

```markdown
| CV | `public/CV_Jiahao_2026.pdf` | PDF |
| Images | `public/images/` | PNG/JPG/SVG |
```

to:

```markdown
| CV | `public/assets/about/CV_Jiahao_2026_v2.pdf` | PDF |
| Blog images | `public/assets/blog/` | PNG/JPG/SVG |
| Research PDFs | `public/assets/research/` | PDF |
```

**Step 6: Update README.md — customize table**

Change lines 43-44 from:

```markdown
| CV                | `public/CV_Jiahao_2026.pdf`  | PDF              |
| Profile photo     | `public/images/jiahaozhu.jpg`| JPG              |
```

to:

```markdown
| CV                | `public/assets/about/CV_Jiahao_2026_v2.pdf`  | PDF    |
| Profile photo     | `public/assets/about/jiahaozhu.jpg`          | JPG    |
```

---

### Task 6: Final verification and commit

**Step 1: Run full build**

```bash
cd /Users/jiahaozhu/Desktop/Jiahao/Python_projects/Jiahao_web && npm run build
```

Expected: clean build, no errors.

**Step 2: Commit all changes**

```bash
git add -A
git status
```

Review staged files. Expected changed files:
- `content/research.ts` (interface + new entry)
- `app/page.tsx` (asset paths)
- `app/research/page.tsx` (PDF link)
- `CLAUDE.md` (paths + ordering convention)
- `docs/CONTENT-GUIDE.md` (paths)
- `README.md` (paths)
- `public/assets/about/jiahaozhu.jpg` (moved)
- `public/assets/about/CV_Jiahao_2026_v2.pdf` (moved)
- `public/assets/research/emotion-labeling-predictive-coding-2024.pdf` (moved)
- Deleted: 5 SVGs, old PDF location, old image location

```bash
git commit -m "feat: add emotion labeling research project + restructure public/ assets

Reorganize public/ into assets/{about,research,blog} by page section.
Add position paper on predictive coding and emotion labeling as a
research project with PDF download link. Remove unused Next.js
template SVGs. Document reverse chronological ordering convention."
```
