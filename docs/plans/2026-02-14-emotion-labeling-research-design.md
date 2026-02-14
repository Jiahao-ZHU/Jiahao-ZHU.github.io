# Add emotion labeling research project

## Goal

Add the position paper on emotion labeling and predictive coding as a research project entry, with a PDF download link. Ensure all research projects are listed in reverse chronological order.

## Changes

### 1. Move PDF to public/papers/

Move `app/research/Position paper Jiahao Zhu 20241020_2.pdf` to `public/papers/emotion-labeling-predictive-coding-2024.pdf`.

### 2. Update ResearchProject interface

Add optional `pdf` field to `content/research.ts`:

```typescript
export interface ResearchProject {
  title: string;
  href: string;
  role: string;
  institution: string;
  period: string;
  description: string;
  pdf?: string;
}
```

### 3. Add new research project entry

Insert at position 3 (after "Automatic and Motivational Avoidance", before "Emotional Co-Expressions") in the `researchProjects` array:

```typescript
{
  title: "Emotion Labeling Through the Lens of Predictive Coding",
  href: "/research#emotion-labeling",
  role: "Position Paper (Course Project)",
  institution: "Radboud University",
  period: "2024",
  description:
    "Proposed a predictive coding account to reconcile conflicting evidence on whether naming emotions dampens or intensifies them. Argued that prediction uncertainty is the key mechanism, modulated by label-experience intensity mismatch and labeling freedom.",
  pdf: "/papers/emotion-labeling-predictive-coding-2024.pdf",
}
```

### 4. Render PDF download link on research page

In `app/research/page.tsx`, add a conditional PDF link below the description paragraph. Only render when `project.pdf` exists.

### 5. Update CLAUDE.md

Add to the "Adding a New Research Project" section:

> Research projects are listed in reverse chronological order (newest first). When adding a new project, insert it at the correct position in the array.

## Ordering (final)

| # | Project | Period |
|---|---------|--------|
| 1 | Dynamic Modelling of Latent Risk-Taking using Particle Filters | 2025 – present |
| 2 | Automatic and Motivational Avoidance in Academic Worry | 2024 – 2025 |
| 3 | Emotion Labeling Through the Lens of Predictive Coding | 2024 |
| 4 | Emotional Co-Expressions: A Network Perspective | 2022 – 2024 |
