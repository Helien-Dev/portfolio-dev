# Registro de cambios

Historial completo del proyecto, reconstruido a partir del historial de commits del repositorio. Los commits de tipo *merge* (fusión de ramas) se omiten como entradas propias porque no aportan cambios adicionales a los ya listados en su período.

## [1.1.4] - 2026-08-23 (`9803e44`–`65d69b4`)

Indentación de los logros de Experiencia y corrección del navbar (bug de contraste, orden de links y restos de plantilla).

### Cambiado

- Logros de cada puesto en la sección de Experiencia (`ExperienceCard`) indentados respecto al título del rol y el período, para reforzar que pertenecen a ese apartado.
- Hover/focus de los links del navbar cambiado de blanco a azul de acento (`text-blue-600`), igual que el resto del sitio.
- Link de Github del navbar movido fuera del grupo de links de la izquierda (Daily, Proyectos, Contactame) y fijado al borde derecho.

### Corregido

- Bug de contraste en el navbar: los textos y el ícono del menú móvil usaban clases `text-black`/`dark:*` heredadas de la plantilla original, casi invisibles sobre el fondo oscuro del sitio para cualquier visitante con el sistema en modo claro (el sitio no tiene toggle de tema). Reemplazadas por colores fijos legibles.
- Comentarios desactualizados en el navbar (`Features link`, `Pricing link`) que no correspondían a los links reales (Proyectos, Contactame).
- `aria-current="page"` aplicado incorrectamente al link externo "Daily".

### Agregado

- Link de Github en el navbar (antes un `<span>` sin destino) ahora apunta a `https://github.com/Helien-Dev`.

## [1.1.3] - 2026-08-23 (`75a2c92`)

Ajuste de alineación en el Hero: los íconos de redes sociales y el botón de descarga del CV quedan en la misma fila.

### Cambiado

- Íconos de redes sociales y botón "Descargar CV" del Hero (`index.astro`), antes apilados en dos filas, ahora comparten una sola fila (`.actions-row`): redes sociales a la izquierda, botón a la derecha, con una separación fija de 50px entre ambos grupos.

## [1.1.2] - 2026-08-23 (`c571a57`)

Fondo de página con patrón de cuadrícula sutil, en lugar de un color sólido plano.

### Cambiado

- Fondo global (`html` en `Layout.astro`) actualizado: mantiene el color mate oscuro (`#13151a`) de base y le agrega un grid de líneas grises tenues (celdas de 96px) mediante `linear-gradient`, sin usar imágenes ni SVG.

## [1.1.1] - 2026-08-23 (`910f8c4`)

Corrección del diseño de la sección de Habilidades, que presentaba problemas de visualización en dispositivos móviles.

### Cambiado

- Sección de Habilidades rediseñada: cada categoría (Fullstack, DevOps, RPA) es ahora un desplegable (`SkillGroupCard`) que, al expandirse, muestra sus habilidades como una lista de texto plano en lugar de una cuadrícula de tarjetas con íconos.
- Habilidades presentadas como texto simple sin viñetas, indentado respecto al título de la categoría para reforzar la jerarquía visual entre el rol y sus habilidades.

### Eliminado

- Íconos SVG de cada habilidad individual, en favor de una presentación basada únicamente en texto.

## [1.1.0] - 2026-08-22 (`09bdeea`–`b41f3b0`)

Nueva sección de Experiencia, reagrupación de Habilidades por categorías y configuración de despliegue en Cloudflare Workers.

### Agregado

- Sección de Experiencia laboral (`ExperienceSection`, `ExperienceCard`), con los datos de cada puesto tipados y centralizados en `src/types/experience.types.ts` y `src/data/experience.data.ts`; cada entrada muestra rol, empresa, período y logros, separadas por un divisor, con una insignia "Actual" para el puesto vigente.
- Habilidades reagrupadas en tres categorías (Fullstack, DevOps, RPA/Automatización), extraídas a un componente `SkillCard` y a datos tipados en `src/types/skill.types.ts` y `src/data/skills.data.ts`.
- Íconos de TypeScript, FastAPI, Docker, Proxmox, Linux/Ubuntu, CI/CD, Playwright, Patchright y Pywinauto, incorporados a la sección de Habilidades.
- Configuración de despliegue de assets estáticos a Cloudflare Workers (`wrangler.jsonc`, script `deploy` en `package.json`, dependencia `wrangler`).

### Cambiado

- Contenido de la sección "Acerca de mí" actualizado con una descripción más detallada de la trayectoria profesional.
- Íconos de la sección de Habilidades reemplazados por versiones monocromáticas consistentes (antes usaban el color de marca de cada logo, lo que rompía la paleta del sitio, de un solo acento azul).
- Cuadrícula de Habilidades alineada a la izquierda y con altura uniforme entre tarjetas, en lugar del acomodo centrado que dejaba la última fila de cada grupo descuadrada cuando no completaba la fila.

### Corregido

- Etiqueta `<p>` anidada dentro de `<h2>` en las secciones de Experiencia y Acerca de mí (HTML inválido), reemplazada por `<span>`.

### Eliminado

- Íconos de Django, Figma y Node.js en la sección de Habilidades (fuera del alcance de las categorías actuales).
- Animación de flotación constante ("wave") en los íconos de Habilidades, en favor de una presentación más sobria; se mantiene una reacción sutil al pasar el cursor.

## [1.0.0] - 2026-08-21 (`00cacb6`–`18fb10b`)

Primera entrega del proyecto como sitio funcional: modernización completa del stack técnico y reestructuración del código, tras casi dos años sin actividad en el repositorio.

### Agregado

- Migración del gestor de paquetes de npm a pnpm (`pnpm-lock.yaml`, `pnpm-workspace.yaml`).
- Actualización de Astro de la versión 4.16 a la 7.2.4.
- Actualización de Tailwind CSS de la versión 3.4 a la 4.3, usando el plugin oficial `@tailwindcss/vite` en lugar de `@astrojs/tailwind`, que no tiene soporte para Tailwind v4.
- Reemplazo de la librería `tw-elements` (sin soporte para Tailwind v4) por una función propia en TypeScript para el menú colapsable de la barra de navegación.
- Nueva estructura de carpetas en `src/`, organizada por rol: `components/layout`, `components/sections`, `components/cards`, `components/buttons`, `components/ui`, `data/`, `types/`, `lib/` y `scripts/`.
- Interfaces de TypeScript compartidas para las props de los componentes y la forma de los datos (`src/types/`).
- Contenido del sitio (proyectos, certificados, proyectos destacados) extraído del marcado y convertido en arreglos tipados (`src/data/`).
- Lógica de procesamiento de imágenes centralizada en un módulo reutilizable (`src/lib/images.ts`).
- Archivo `README.md` con la descripción del proyecto, las tecnologías usadas y la guía de instalación.
- Archivo `LICENSE` (MIT), recuperado del historial del repositorio.
- Documentación de la estructura del proyecto y de las convenciones de TypeScript en `AGENTS.md` (enlazado también como `CLAUDE.md`).
- Symlink `CLAUDE.md` → `AGENTS.md`, de forma que ambos apunten al mismo documento de convenciones.

### Corregido

- Veintiséis vulnerabilidades de seguridad reportadas por `npm audit`, heredadas de versiones desactualizadas de Astro y de su cadena de herramientas (esbuild, Vite, sharp, Rollup, entre otras).
- Etiqueta `<section>` sin cerrar en la página principal, que impedía compilar el proyecto con el compilador de Astro 7.
- Componentes (`ProjectCard`, `OutstandingCard`, `CertificateCard`) cuyas props no se tipaban correctamente por nombrar su interfaz de forma distinta a `Props`, el nombre que Astro requiere para inferir los tipos automáticamente.
- Código muerto en el componente de certificados: `getImage` se importaba pero nunca se invocaba, dejando esas imágenes sin optimizar.
- Rutas inexistentes generadas por accidente (`/aboutMe`, `/skills`, `/contact`, `/certificates`, `/projects`, `/outstanding`), producto de que esos archivos de sección vivían dentro de `src/pages/` sin ser páginas reales.
- Enlaces sin destino (`href=""` o `href="#"`) en las tarjetas de habilidades y en un ícono de la sección de presentación, que recargaban la página al hacer clic.
- Atributo `frameborder` (obsoleto) en el iframe de YouTube, reemplazado por la propiedad CSS `border: 0`.
- Enlace a la licencia en el pie de página, que apuntaba a un repositorio (`Portfolio-astro`) distinto al actual (`portfolio-dev`).

### Cambiado

- Componentes y archivos renombrados a `PascalCase` consistente (por ejemplo, `Daily_button.astro` a `DailyButton.astro`, `Outstanding_section.astro` a `OutstandingCard.astro`).
- Prop `link` de los botones renombrada a `href`, para que coincida con el atributo real del elemento HTML que representa.
- Script de cliente `src/js/main.js` convertido a TypeScript y trasladado a `src/scripts/main.ts`.

### Eliminado

- Dependencias `@astrojs/tailwind`, `tw-elements`, `autoprefixer`, `postcss` y `postcss-import`.
- Archivos generados u obsoletos: `package-lock.json`, `tailwind.config.js`, `output.css`, `main.css`.

## 6 al 9 de noviembre de 2024 (`6031a87`–`dd435d3`)

Ajustes de responsividad, incorporación del contacto y cierre de pendientes antes de una pausa prolongada en el desarrollo.

### Agregado

- Diseño responsivo aplicado a todas las secciones del sitio.
- Sección de contacto.
- Dominio propio enlazado desde el botón "Daily".
- Imagen del proyecto "Honey Bun".

### Cambiado

- Enlace del proyecto "Honey Bun" actualizado.
- Currículum (CV) actualizado, con una corrección posterior adicional.
- Rutas de archivos y parámetros de la sección de contacto ajustados.
- Pie de página y licencia modificados.

### Corregido

- Problemas de seguridad detectados en el proyecto.
- Error en la ruta del archivo de currículum.

## 10 al 15 de octubre de 2024 (`694b25f`–`b0c94a0`)

Construcción inicial del sitio, desde el andamiaje del proyecto hasta las primeras versiones de todas sus secciones.

### Agregado

- Proyecto inicializado con el generador oficial de Astro.
- Configuración de Tailwind CSS.
- Barra de navegación, construida y luego corregida en varias iteraciones.
- Sección de presentación, con foto de perfil animada.
- Sección de proyectos destacados, con su componente y contenido.
- Sección de proyectos regulares, con su componente y contenido.
- Sección de habilidades.
- Tarjetas de certificados destacados.
- Botones de enlace a GitHub, sitio web y Daily.
- Componente de descarga de archivos (usado para el CV y los certificados).
- Favicon del sitio.
- Separador visual (barra vertical) con color distintivo.
- Comando de ejecución agregado al Dockerfile.

### Corregido

- Error en la ruta de las imágenes.
- Error menor en la sección de proyectos.

### Cambiado

- Formato general del documento (indentación y orden del código).
