import { initGallery } from './gallery.js';

const menu = document.querySelector('#mobile-menu');
const menuButton = document.querySelector('#mobile-menu-btn');
const closeButton = document.querySelector('#close-menu-btn');

if (menu && menuButton) {
  menuButton.addEventListener('click', () => {
    menu.showModal();
    menuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('modal-open');
    closeButton?.focus();
  });
  const closeMenu = () => menu.close();
  closeButton?.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  menu.addEventListener('close', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('modal-open');
    menuButton.focus({ preventScroll: true });
  });
  // A desktop resize must not leave a modal covering the page.
  matchMedia('(min-width: 1001px)').addEventListener('change', event => {
    if (event.matches && menu.open) menu.close();
  });
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 20px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(element => {
    // Never hide content already visible, or a sticky sidebar.
    if (element.getBoundingClientRect().top > innerHeight) element.classList.add('reveal-ready');
    observer.observe(element);
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      observer.disconnect();
      document.querySelectorAll('.reveal-ready').forEach(element => element.classList.add('reveal-visible'));
    }
  });
}

initGallery();
