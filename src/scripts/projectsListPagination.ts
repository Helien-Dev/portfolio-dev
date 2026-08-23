// Shows 5 project-list items per page; the dots only exist in the DOM when there's more than one page.
const items = Array.from(document.querySelectorAll<HTMLElement>('.projects-list-item'));
const dots = Array.from(document.querySelectorAll<HTMLButtonElement>('.list-page-dot'));

if (dots.length > 0) {
  const showPage = (page: number) => {
    items.forEach((item) => {
      item.style.display = Number(item.dataset.page) === page ? '' : 'none';
    });
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === page));
  };

  dots.forEach((dot, page) => dot.addEventListener('click', () => showPage(page)));
  showPage(0);
}
