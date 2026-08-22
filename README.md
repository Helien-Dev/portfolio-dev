# Portfolio Dev

Sitio de portafolio personal de Alvaro Avila. Presenta información de contacto, habilidades, proyectos y certificados, construido como un sitio estático con Astro y Tailwind CSS.

## Tecnologías

- **[Astro](https://astro.build)** (v7) — framework principal, renderizado a HTML estático.
- **[Tailwind CSS](https://tailwindcss.com)** (v4) — estilos, vía el plugin oficial `@tailwindcss/vite`.
- **TypeScript** (v6, modo `strict`) — todo el código del proyecto, sin `.js` plano.
- **[pnpm](https://pnpm.io)** — gestor de paquetes.

## Requisitos previos

- Node.js `>= 22.12.0`
- pnpm `>= 9.0.0`

Si no tienes pnpm instalado, puedes habilitarlo con Corepack (incluido en Node.js):

```bash
corepack enable
corepack prepare pnpm@11.22.0 --activate
```

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
git clone https://github.com/Helien-Dev/portfolio-dev.git
cd portfolio-dev
pnpm install
```

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Inicia el servidor de desarrollo en `http://localhost:4321`. |
| `pnpm start` | Igual que `dev`, pero expuesto en la red local (`--host`). |
| `pnpm build` | Verifica los tipos (`astro check`) y genera el build de producción en `dist/`. |
| `pnpm preview` | Sirve localmente el contenido ya compilado en `dist/`. |
| `pnpm astro ...` | Acceso directo al CLI de Astro (por ejemplo `pnpm astro add`). |

Para ejecutar el servidor de desarrollo en segundo plano:

```bash
astro dev --background
```

Se administra con `astro dev stop`, `astro dev status` y `astro dev logs`.

## Estructura del proyecto

```
src/
  components/
    layout/     Navbar, Footer — envoltorio presente en toda página
    sections/   Bloques de página completos (AboutSection, ProjectsSection, ...)
    cards/      Elementos repetidos dentro de una sección (ProjectCard, ...)
    buttons/    Componentes interactivos pequeños (GithubButton, ...)
    ui/         Componentes genéricos sin contenido propio (Subheading, ...)
  data/         Contenido del sitio como arreglos tipados (*.data.ts)
  lib/          Lógica reutilizable extraída del frontmatter de los componentes
  types/        Interfaces compartidas para props y datos (*.types.ts)
  layouts/      Layout.astro — el único documento HTML del sitio
  pages/        Rutas reales (actualmente solo index.astro)
  scripts/      TypeScript de cliente, cargado desde <script src="...">
  styles/       Punto de entrada de Tailwind (global.css)
public/         Archivos estáticos servidos tal cual (imágenes, PDFs, íconos)
```

Las convenciones de código y las reglas de TypeScript del proyecto están documentadas en `AGENTS.md` (enlazado también como `CLAUDE.md`).

## Build de producción

```bash
pnpm build
```

El resultado queda en `dist/`, listo para servirse como sitio estático desde cualquier hosting (Cloudflare Pages, Netlify, Vercel, GitHub Pages, etc.). Para revisarlo localmente antes de publicar:

```bash
pnpm preview
```
