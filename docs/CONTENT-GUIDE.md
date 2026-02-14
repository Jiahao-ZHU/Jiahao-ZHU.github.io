# Content Guide

## Blog Post MDX Cheat Sheet

### Frontmatter Template

```yaml
---
title: "Post Title Here"
date: "2026-02-13"
category: "Computational Methods"
description: "One-line description."
tags: ["bayesian", "modelling"]
---
```

### Math

Inline: `$\alpha + \beta = \gamma$`

Display (centered, own line):
```
$$
\int_0^1 f(x) \, dx = F(1) - F(0)
$$
```

### Code

````python
def example():
    return "syntax highlighted"
````

### Images

Place image in `public/assets/blog/`, then:

```markdown
![Alt text](/assets/blog/my-figure.png)
```

### Links

```markdown
[Link text](https://example.com)
[Internal link](/research)
```

## File Locations

| Content Type | Location | Format |
|-------------|----------|--------|
| Blog posts | `content/blog/*.mdx` | MDX with frontmatter |
| Research | `content/research.ts` | TypeScript array |
| Publications | `content/publications.ts` | TypeScript array |
| Projects | `content/projects.ts` | TypeScript array |
| CV | `public/assets/about/CV_Jiahao_2026_v2.pdf` | PDF |
| Blog images | `public/assets/blog/` | PNG/JPG/SVG |
| Research PDFs | `public/assets/research/` | PDF |
