// Click-to-enlarge for images in docs and blog posts.
//
// Any image in page content opens larger in a native <dialog> when you click
// it or press Enter or Space on it. Esc, a click outside the image, or the
// Close button closes it, and focus goes back to the image. Images that are
// already links (such as DocCard icons) are left alone.
//
// To turn it off for one image, add #no-zoom to the image path in Markdown:
// ![Alt text](/img/example.png#no-zoom)
//
// With a light and a dark version of an image (#gh-light-mode-only and
// #gh-dark-mode-only), only the visible one can be clicked, so the lightbox
// always shows the version for the current theme.
//
// Styles are in src/css/custom.css under "Image lightbox".

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const SELECTOR = '.markdown img';
let dialog;
let dialogImg;
let trigger;

function isZoomable(img) {
  return img.matches(SELECTOR) && !img.closest('a') && !img.getAttribute('src')?.endsWith('#no-zoom');
}

function isVector(src) {
  return /\.svg($|[?#])|^data:image\/svg/.test(src);
}

function getDialog() {
  if (dialog) {
    return dialog;
  }
  dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.innerHTML = `
    <button type="button" class="lightbox__close" aria-label="Close">
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <img class="lightbox__img" alt="">
  `;
  dialogImg = dialog.querySelector('.lightbox__img');
  // A click on the backdrop or the image closes the dialog
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target === dialogImg || event.target.closest('.lightbox__close')) {
      dialog.close();
    }
  });
  // The close event fires asynchronously. If the lightbox already reopened
  // for another image, leave the new image and trigger alone.
  dialog.addEventListener('close', () => {
    if (dialog.open) {
      return;
    }
    dialogImg.removeAttribute('src');
    trigger?.focus();
    trigger = undefined;
  });
  document.body.appendChild(dialog);
  return dialog;
}

function open(img) {
  const d = getDialog();
  const src = img.currentSrc || img.src;
  trigger = img;
  dialogImg.src = src;
  dialogImg.alt = img.alt;
  dialogImg.classList.toggle('lightbox__img--vector', isVector(src));
  d.setAttribute('aria-label', img.alt || 'Enlarged image');
  d.showModal();
}

// Make images reachable with the keyboard after each page change
function markImages() {
  document.querySelectorAll(SELECTOR).forEach((img) => {
    if (!isZoomable(img) || img.classList.contains('zoomable')) {
      return;
    }
    img.classList.add('zoomable');
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-haspopup', 'dialog');
  });
}

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener('click', (event) => {
    const img = event.target.closest?.('img');
    if (img && isZoomable(img)) {
      open(img);
    }
  });
  document.addEventListener('keydown', (event) => {
    const img = event.target;
    if ((event.key === 'Enter' || event.key === ' ') && img.tagName === 'IMG' && isZoomable(img)) {
      event.preventDefault();
      open(img);
    }
  });
}

export function onRouteDidUpdate() {
  markImages();
}
