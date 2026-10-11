/**
 * Gallery lightbox for images in posts and docs: click an image to view it full screen,
 * then browse the other images of the same article (buttons, ←/→, swipe), Esc to close.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const SELECTOR = 'article .markdown img';

let overlay;
let state = { images: [], index: 0 };

function build() {
  overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Xem ảnh');
  overlay.innerHTML = `
    <figure class="lightbox__figure">
      <img class="lightbox__img" alt="" />
      <figcaption class="lightbox__caption"></figcaption>
    </figure>
    <span class="lightbox__counter" aria-live="polite"></span>
    <button type="button" class="lightbox__btn lightbox__close" aria-label="Đóng">×</button>
    <button type="button" class="lightbox__btn lightbox__prev" aria-label="Ảnh trước">‹</button>
    <button type="button" class="lightbox__btn lightbox__next" aria-label="Ảnh sau">›</button>`;
  document.body.appendChild(overlay);

  overlay.querySelector('.lightbox__close').addEventListener('click', close);
  overlay.querySelector('.lightbox__prev').addEventListener('click', () => show(state.index - 1));
  overlay.querySelector('.lightbox__next').addEventListener('click', () => show(state.index + 1));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('lightbox__figure')) close();
  });

  let startX = null;
  overlay.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  overlay.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(state.index + (dx < 0 ? 1 : -1));
    startX = null;
  });
}

function show(i) {
  const n = state.images.length;
  state.index = (i + n) % n;
  const src = state.images[state.index];
  const img = overlay.querySelector('.lightbox__img');
  img.src = src.currentSrc || src.src;
  img.alt = src.alt || '';
  overlay.querySelector('.lightbox__caption').textContent = src.alt || '';
  overlay.querySelector('.lightbox__counter').textContent = n > 1 ? `${state.index + 1} / ${n}` : '';
  overlay.classList.toggle('lightbox--single', n < 2);
}

function open(images, index) {
  if (!overlay) build();
  state = { images, index };
  show(index);
  overlay.classList.add('lightbox--open');
  document.documentElement.classList.add('lightbox-lock');
  overlay.querySelector('.lightbox__close').focus({ preventScroll: true });
}

function close() {
  if (!overlay) return;
  overlay.classList.remove('lightbox--open');
  document.documentElement.classList.remove('lightbox-lock');
}

function onClick(e) {
  const img = e.target.closest && e.target.closest(SELECTOR);
  if (!img || img.closest('a')) return; // linked images keep their link
  e.preventDefault();
  const article = img.closest('article');
  const images = [...article.querySelectorAll(SELECTOR)].filter((x) => !x.closest('a'));
  open(images, images.indexOf(img));
}

function onKey(e) {
  if (!overlay || !overlay.classList.contains('lightbox--open')) return;
  if (e.key === 'Escape') close();
  else if (e.key === 'ArrowLeft') show(state.index - 1);
  else if (e.key === 'ArrowRight') show(state.index + 1);
}

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKey);
}

export function onRouteDidUpdate() {
  close();
}
