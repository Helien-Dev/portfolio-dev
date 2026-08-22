## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## TypeScript

This project uses TypeScript exclusively (`.ts` / `.astro` with typed frontmatter, no plain `.js`). Write TypeScript in a professional, scalable, and clean style:

- **Strict mode stays on.** `tsconfig.json` extends `astro/tsconfigs/strict` — never weaken it (no `any`, no `@ts-ignore` without a comment explaining why, no disabling strict flags to silence errors).
- **No implicit `any`.** Type all function parameters, return values, and component props explicitly. Prefer `unknown` over `any` when a type is genuinely not known yet, and narrow it before use.
- **Componentize aggressively.** Break UI into small, single-responsibility components under `src/components/`. If a piece of markup, logic, or styling is reused (or likely to be reused) more than once, extract it into its own component rather than duplicating it.
- **Reusable components take typed props.** Define a `Props` interface (or `type Props`) at the top of each `.astro` component's frontmatter, and export shared/reusable types from a dedicated `src/types/` (or colocated `*.types.ts`) module instead of redefining them per file.
- **Separate concerns.** Keep data-fetching, business logic, and utility functions out of component markup — extract them into plain `.ts` modules (e.g. `src/lib/` or `src/utils/`) that components import and call. Components should stay focused on composition and presentation.
- **Prefer composition over duplication.** Use component slots, props, and small utility/helper functions to share behavior instead of copy-pasting logic across components or pages.
- **Naming and structure should scale.** Use `PascalCase` for component files, `camelCase` for functions/variables, and organize by feature/domain as the project grows rather than dumping everything into flat folders.
- **Type content and data.** When adding content collections or structured data, define and export explicit TypeScript interfaces/types for their shape so consumers get full autocomplete and type-checking.

## Project structure

`src/` is organized by role, not by page — pages compose sections, sections compose cards/UI, everything reusable is typed and centralized:

```
src/
  components/
    layout/     Navbar, Footer — chrome that wraps every page
    sections/   Page-sized building blocks composed into src/pages/*.astro
                (AboutSection, ProjectsSection, SkillsSection, ...). These
                are NOT routes — they must never live under src/pages/,
                or Astro's file-based router will publish them as pages.
    cards/      One repeated item within a section (ProjectCard, CertificateCard, ...)
    buttons/    Small interactive leaf components (GithubButton, DownloadButton, ...)
    ui/         Generic, content-agnostic building blocks (Subheading, ...)
  data/         *.data.ts — hardcoded content as typed arrays (projects, certificates, ...).
                Adding an item means pushing to an array here, not editing a template.
  lib/          Plain .ts modules for logic pulled out of component frontmatter
                (image processing, data-fetching, formatting helpers, ...) —
                never let a component's frontmatter do more than call these
                and pass the result to its markup.
  types/        *.types.ts — shared interfaces for props and data shapes.
                A component's own Props type stays local to that component;
                move a type here only once more than one file needs it.
  layouts/      Layout.astro — the single <html> shell
  pages/        Real routes only (thin: Layout + Navbar/Footer + sections)
  scripts/      Client-side TypeScript loaded via <script src="...">
  styles/       global.css — the Tailwind v4 entrypoint (`@import "tailwindcss";`)
```

Astro components name their props type `Props` (not `Options`, `Config`, or a
custom name) — Astro only infers `Astro.props`'s type when the type is
literally called `Props`; anything else silently falls back to `any`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)