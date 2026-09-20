const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileMenu?.classList.toggle('open', !open);
});

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
}));

const filterButtons = document.querySelectorAll('.filter-button');
const publications = document.querySelectorAll('.publication');
const publicationStatus = document.querySelector('#publication-status');

function setPublicationFilter(filter) {
  let visibleCount = 0;

  publications.forEach((publication) => {
    const visible = filter === 'all' || publication.dataset.selected === 'true';
    publication.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  filterButtons.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  if (publicationStatus) {
    publicationStatus.textContent = filter === 'all'
      ? `Showing all ${visibleCount} publications`
      : `Showing ${visibleCount} first-author publications`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => setPublicationFilter(button.dataset.filter));
});

setPublicationFilter('selected');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const items = document.querySelectorAll('.publication, .timeline li, .service-list li, .talk-list li');
  items.forEach((item) => item.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((item) => observer.observe(item));
}
