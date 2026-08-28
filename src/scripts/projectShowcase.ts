// Swaps the single showcase block's content (never duplicates it) so shared icons don't collide or replay glitchy; auto-rotates every 35s from a random start, bullets are clickable and reset the timer.
interface ProjectSlide {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  githubLink: string;
  blogLink: string;
}

const SLIDE_INTERVAL_MS = 35000;

const showcase = document.querySelector<HTMLElement>('.showcase');
const slidesData = showcase?.dataset.slides;

if (showcase && slidesData) {
  const slides: ProjectSlide[] = JSON.parse(slidesData);
  const bullets = Array.from(showcase.querySelectorAll<HTMLButtonElement>('.showcase-bullet'));
  const image = showcase.querySelector<HTMLImageElement>('#showcase-image');
  const title = showcase.querySelector<HTMLElement>('#showcase-title');
  const description = showcase.querySelector<HTMLElement>('#showcase-description');
  const [githubLink, blogLink] = showcase.querySelectorAll<HTMLAnchorElement>('.showcase-buttons a');

  let current = Math.floor(Math.random() * slides.length);
  let timer: ReturnType<typeof setInterval> | undefined;

  const show = (index: number) => {
    current = index;
    const slide = slides[index];
    if (image) {
      image.src = slide.imageSrc;
      image.alt = slide.imageAlt;
    }
    if (title) title.textContent = slide.title;
    if (description) description.textContent = slide.description;
    if (githubLink) githubLink.href = slide.githubLink;
    if (blogLink) blogLink.href = slide.blogLink;
    bullets.forEach((bullet, i) => bullet.classList.toggle('is-active', i === index));
  };

  const startAutoRotate = () => {
    if (slides.length <= 1) return;
    clearInterval(timer);
    timer = setInterval(() => show((current + 1) % slides.length), SLIDE_INTERVAL_MS);
  };

  show(current);
  startAutoRotate();

  bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
      show(index);
      startAutoRotate();
    });
  });
}
