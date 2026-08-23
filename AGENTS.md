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

## Release process

Claude never runs `git commit`, `git push`, `git tag`, or `gh release create` directly in this repo — it edits files and hands over the exact commands for the user to run themselves.

Command formatting rules (violating these has broken pastes in this repo's terminal before — corrupted mid-line, or left bash hanging on an unclosed quote):

- Give the whole sequence as **one single fenced code block** the user copies and pastes once — not one block per command.
- Every line inside that block must still be short and self-contained: no `\` line continuation, no multi-line quoted strings, no long inline arguments. A long single line (e.g. a full absolute path) wrapping in the terminal is exactly what corrupts on paste, so line *length* matters as much as line *count*.
- Any long text (release notes, commit bodies) goes in a file referenced with a `--*-file` flag instead of being inlined — and that file's path itself must be short. Write it to something like `/tmp/rn.md`, not a long nested scratchpad path: the path is what ends up embedded in the command line.

Steps for each release:

1. **Bump the version** in `package.json` following semver: `patch` for fixes/tweaks, `minor` for new features, `major` for breaking changes. If the user requests a specific version number that skips releases that never existed, flag the mismatch and confirm before using it.
2. **Add a `CHANGELOG.md` entry** at the top (newest first), matching the existing format: `## [x.y.z] - YYYY-MM-DD (\`__HASH__\`)`, a one-line summary, then `### Agregado` / `### Cambiado` / `### Corregido` / `### Eliminado` sections (Spanish, only the sections that apply) listing the actual changes. Leave the commit hash as the literal placeholder `__HASH__` — it gets filled in by the commands below, since the real hash isn't known until the fix commit exists.
3. **Hand the user one single command block** (adjust file names, messages, and version number), formatted per the rules above:

   ```bash
   git add <changed source files>
   git commit -m "<type>: <summary of the fix/feature>"
   HASH=$(git rev-parse --short HEAD)
   sed -i "s/__HASH__/$HASH/" CHANGELOG.md
   git add package.json CHANGELOG.md
   git commit -m "chore: release vX.Y.Z"
   git tag vX.Y.Z
   git checkout main
   git merge --ff-only dev
   git checkout dev
   git push origin dev
   git push origin main
   git push origin vX.Y.Z
   gh release create vX.Y.Z --title "vX.Y.Z" --notes-file /tmp/rn.md
   ```

   `main` and `dev` stay in sync via fast-forward merges (no merge commits) — this only works as long as `main` never receives commits `dev` doesn't have.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)