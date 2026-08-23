// While the page rests exactly at the hero's top or exactly at the next
// section's top, the first mouse-wheel nudge (down from the hero, or up
// from the next section) snaps fully to the other side instead of
// scrolling partway. Any other scroll gesture (touch, keyboard, or wheel
// scrolling that starts mid-page) is fully native.
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

    // Safety net in case the scroll never rests exactly on targetY
    // (sub-pixel rounding, or the gesture got interrupted).
    window.setTimeout(() => {
      isSnapping = false;
      window.removeEventListener('scroll', stopIfSettled);
    }, 1000);
  };

  window.addEventListener(
    'wheel',
    (event) => {
      if (isSnapping) {
        // Swallow every wheel tick until the snap animation settles, so a
        // fast scroll gesture (multiple wheel events in a row) can't fight
        // the in-progress smooth scroll and leave it half-finished.
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
