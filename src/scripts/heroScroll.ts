// At the hero's top or the next section's top, the first wheel nudge snaps fully to the other side instead of scrolling partway; everything else is native scroll.
const hero = document.querySelector<HTMLElement>('.hero-viewport');
const nextSection = document.querySelector<HTMLElement>('.about-anchor');

if (hero && nextSection) {
  const SNAP_THRESHOLD = 4;
  let isSnapping = false;

  const snapTo = (targetY: number) => {
    isSnapping = true;
    window.scrollTo({ top: targetY, behavior: 'smooth' });

    const stopIfSettled = () => {
      if (Math.abs(window.scrollY - targetY) < 1) {
        isSnapping = false;
        window.removeEventListener('scroll', stopIfSettled);
      }
    };
    window.addEventListener('scroll', stopIfSettled, { passive: true });

    // Safety net in case the scroll never rests exactly on targetY (rounding, or an interrupted gesture).
    window.setTimeout(() => {
      isSnapping = false;
      window.removeEventListener('scroll', stopIfSettled);
    }, 1000);
  };

  window.addEventListener(
    'wheel',
    (event) => {
      if (isSnapping) {
        // Swallow every wheel tick until the snap settles, so a fast gesture can't fight the in-progress scroll.
        event.preventDefault();
        return;
      }

      const heroHeight = hero.getBoundingClientRect().height;
      const atHeroTop = window.scrollY <= SNAP_THRESHOLD;
      const atNextSectionTop = Math.abs(window.scrollY - heroHeight) <= SNAP_THRESHOLD;

      if (atHeroTop && event.deltaY > 0) {
        event.preventDefault();
        snapTo(heroHeight);
      } else if (atNextSectionTop && event.deltaY < 0) {
        event.preventDefault();
        snapTo(0);
      }
    },
    { passive: false },
  );
}
