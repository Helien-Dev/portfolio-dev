# Registro de cambios

Historial completo del proyecto, reconstruido a partir del historial de commits del repositorio. Los commits de tipo *merge* (fusión de ramas) se omiten como entradas propias porque no aportan cambios adicionales a los ya listados en su período.

## [2.2.0] - 2026-08-23 (`36ba508`–`7e6b1ac`)

Sección de Actividad de GitHub, rediseño completo de Proyectos (destacados + lista paginada) y ajustes de layout/accesibilidad.

### Agregado

- Sección "Actividad de GitHub": calendario de contribuciones del último año y feed de actividad reciente, obtenidos en build-time (nunca en el navegador del visitante, el sitio sigue siendo 100% estático). Resiliente a fallos/límites de la API — se degrada con gracia en vez de romper el build.
- Sección "Proyectos" rediseñada por completo: un carrusel de proyectos **destacados** (rotación automática cada 35s, arranca en orden random, bullets clickeables) y, debajo, una lista **numerada y paginada** (5 por página) del resto de proyectos. Cada proyecto se marca con `featured: true` para decidir en cuál de los dos aparece.
- 20 proyectos de plantilla listos para completar en `projects.data.ts` (varios ya rellenados con contenido real: projects-wip, self-runner, ascii-photo, auto-cloudflared, auto-rdp).

### Cambiado

- Ancho de "Acerca de mí", "Experiencia" y "Proyectos" normalizado a 1000px, igual que Habilidades, Certificados, Contacto y Actividad de GitHub (antes eran 800px, inconsistentes con el resto).
- Comentarios de todo el código aplanados a una sola línea; regla documentada en `AGENTS.md` para mantenerlo así.
- Separador visual entre certificados eliminado, para que el bloque se vea unificado (mismo criterio que Habilidades).

### Corregido

- Indicador de scroll del Hero oculto en móvil.
- Ícono de "Daily" con fallos visuales al rotar entre proyectos destacados — causado por IDs de `<mask>` SVG duplicados al renderizar varias diapositivas a la vez; ahora se actualiza una sola instancia por JS en vez de duplicar el DOM.

## [2.1.0] - 2026-08-23 (`ab7e8c5`)

Indexación real en buscadores: sitemap, robots.txt y datos estructurados.

### Agregado

- `sitemap.xml` generado en cada build con la integración oficial `@astrojs/sitemap`.
- `robots.txt` en `public/`, permitiendo a todos los bots y apuntando al sitemap.
- Datos estructurados `schema.org Person` (JSON-LD) en `Layout.astro`: nombre, rol, habilidades, ubicación y GitHub, para que Google entienda de quién es el sitio.

## [2.0.1] - 2026-08-23 (`21b5e86`) — Optimización

Correcciones puntuales de accesibilidad y buenas prácticas encontradas con una auditoría real de Lighthouse (100/100/100/100 tras el fix).

### Corregido

- Contraste insuficiente (3.29:1) del texto azul en las tarjetas de Contacto — bajo el mínimo 4.5:1 de WCAG AA. Ajustado a un azul más claro (4.62:1).
- Links de ícono sin nombre accesible en el Hero (GitHub y "ir a contacto"): sin texto ni `aria-label`, un lector de pantalla no tenía nada que anunciar.
- Aspect ratio incorrecto en las imágenes de certificados: faltaban los atributos `width`/`height` en el `<img>` (ahora se toman de `getImage()`), lo mismo aplicado a las imágenes de proyectos para reducir layout shift.

## [2.0.0] - 2026-08-23 (`553fa42`–`a773c48`)

Footer completo, auditoría de bugs (SEO, imágenes, contacto) y rediseño de Certificados y Habilidades como bloques unificados de desplegables.

### Agregado

- Footer ampliado: links a "Sobre mí" (corregido para apuntar a `#about`), Proyectos y Contacto; íconos de GitHub y Email (reales, antes no existían en el footer); barra de copyright al pie.
- Meta tags de SEO en `Layout.astro`: `description` real (antes el placeholder de Astro), Open Graph y Twitter Card completos, `<link rel="canonical">` y `site` configurado en `astro.config.mjs` — compartir el link ahora muestra una tarjeta de vista previa con título, descripción e imagen.
- Datos de contacto (Email, Celular, WhatsApp) convertidos en links reales (`mailto:`, `tel:`, `wa.me`), con una pequeña animación en el ícono al pasar el mouse.

### Cambiado

- **Optimización de imágenes corregida de raíz**: faltaba la dependencia `sharp`, por lo que `getCardImage` nunca procesaba nada (verificado por MD5 idéntico antes/después del build). Se instaló `sharp` y las imágenes de proyectos/certificados se movieron a `src/assets/images/` (la única ubicación que Astro puede optimizar) — ahora se convierten a WebP con hasta 96% menos peso.
- Todos los archivos de imagen/PDF usados en el sitio renombrados de nombres tipo hash o de banco de imágenes a nombres descriptivos (`hero-avatar.jpg`, `python-organizer.png`, `certificate-power-bi-basico.*`, `cv-alvaro-avila.pdf`, etc.).
- Certificados rediseñados como una lista de desplegables (antes tarjetas de imagen siempre visibles): colapsado solo muestra emisor y título; al expandir se ve la imagen completa, la descripción y el botón de descarga. Se corrigió además un recorte incorrecto de la imagen del certificado (se pedía un tamaño 280×400 que no correspondía a la proporción real de la imagen).
- Certificados y Habilidades pasaron de tener un fondo independiente por ítem a un solo bloque de fondo compartido, sin líneas divisorias entre ítems (mismo criterio que ya usaba Contacto).
- El primer rol de Habilidades ahora aparece desplegado por defecto al cargar la página.
- Período del puesto actual en Experiencia corregido ("Octubre 2025 - 2026" sonaba a que ya había terminado, pese al badge "Actual").
- Hover del footer ya no subraya el texto, para que coincida con el estilo del navbar.

### Eliminado

- ~13.5 MB de imágenes huérfanas en `public/images/` sin ninguna referencia en el código (incluía un archivo de 10.8 MB).

## [1.2.0] - 2026-08-23 (`2136a72`)

Rediseño del Hero: ocupa toda la pantalla inicial, con scroll dirigido hacia "Acerca de mí" e imagen de presentación con medidas fijas.

### Agregado

- El Hero (navbar + presentación) ahora ocupa exactamente el alto del viewport inicial (`header.hero-viewport`, flex column con `min-height: 100svh`), de modo que nada de "Acerca de mí" se asoma antes de hacer scroll.
- Indicador de scroll minimalista (flecha animada, esquina inferior derecha del Hero) que enlaza a `#about`, con color de acento azul y una animación de rebote sutil (respeta `prefers-reduced-motion`).
- Navegación dirigida por scroll (`src/scripts/heroScroll.ts`): el primer scroll con la rueda desde el tope del Hero salta directo a "Acerca de mí", y viceversa desde ahí de vuelta al Hero; cualquier otro scroll (más abajo en la página, táctil o teclado) es completamente normal.

### Cambiado

- Imagen de presentación con `width`/`height` fijos en vez de `max-width`/`max-height` fluidos, con las mismas medidas que ya se renderizaban (400×400 escritorio, 300×300 y 250×250 en los breakpoints existentes), neutralizando el `max-width: 100%` heredado del Preflight de Tailwind que las distorsionaba.

### Corregido

- El salto de scroll hero↔"Acerca de mí" necesitaba dos gestos de scroll para completarse: un gesto real de mouse/trackpad manda varios eventos `wheel` seguidos, y los que llegaban durante la animación de snap no se bloqueaban, compitiendo con ella. Ahora se bloquean todos hasta que la animación termina.

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
