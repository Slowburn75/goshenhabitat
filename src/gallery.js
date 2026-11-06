/** Native modal semantics provide Escape, focus containment and background inertness. */
export function initGallery() {
  const triggers = [...document.querySelectorAll('[data-gallery-src]')];
  if (!triggers.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Project image gallery');
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'lightbox-close';
  close.textContent = 'Close ×';
  close.setAttribute('aria-label', 'Close gallery');
  const figure = document.createElement('figure');
  const image = document.createElement('img');
  const caption = document.createElement('figcaption');
  figure.append(image, caption);
  dialog.append(close, figure);
  document.body.append(dialog);
  let opener;

  triggers.forEach(trigger => trigger.addEventListener('click', () => {
    opener = trigger;
    image.src = trigger.dataset.gallerySrc;
    image.alt = trigger.dataset.galleryCaption;
    caption.textContent = trigger.dataset.galleryCaption;
    dialog.showModal();
    document.body.classList.add('modal-open');
    close.focus();
  }));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    image.removeAttribute('src');
    opener?.focus({ preventScroll: true });
  });
}
