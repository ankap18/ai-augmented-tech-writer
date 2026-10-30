// Fixes for the Orama search plugin.
//
// Styles: the search dialog lives in the <orama-search-box> shadow root where
// custom.css can't reach, so inject a small style into that root instead:
// - The footer loads its logo from website-assets.oramasearch.com, which no
//   longer serves it. Hide the image and append "Orama" to "Powered by".
// - The modal dims the whole page with a 70% black overlay. Remove it, and
//   give the panel a border and shadow so it still stands out from the page.
//   Site variables like --ifm-color-emphasis-300 inherit into shadow DOM.
//
// Theme: the plugin reads <html data-theme> only when the search bar renders,
// so toggling light/dark mode doesn't reach the search until the next
// re-render. Push the current theme to the Orama elements on every toggle.

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const STYLE_ID = 'orama-fixes';
const CSS = `
  .logo-link img.logo { display: none; }
  .logo-link small::after { content: ' Orama'; font-weight: 600; }
  dialog.modal { background-color: transparent !important; }
  .modal-content {
    border: 1px solid var(--ifm-color-emphasis-300) !important;
    box-shadow: 0 12px 32px rgb(0 0 0 / 18%), 0 2px 6px rgb(0 0 0 / 8%) !important;
  }
`;

function injectStyles() {
  document.querySelectorAll('orama-search-box').forEach((box) => {
    const root = box.shadowRoot;
    if (!root || root.getElementById(STYLE_ID)) {
      return;
    }
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS;
    root.appendChild(style);
  });
}

function syncColorScheme() {
  const theme = document.documentElement.dataset.theme;
  if (!theme) {
    return;
  }
  // colorScheme is a Stencil prop, so setting the element property re-renders it.
  document
    .querySelectorAll('orama-search-box, orama-search-button')
    .forEach((el) => {
      if (el.colorScheme !== theme) {
        el.colorScheme = theme;
      }
    });
}

if (ExecutionEnvironment.canUseDOM) {
  // The search box is created lazily, so watch for it instead of patching once.
  new MutationObserver(() => {
    injectStyles();
    syncColorScheme();
  }).observe(document.body, {childList: true, subtree: true});

  // The theme toggle only changes an attribute on <html>.
  new MutationObserver(syncColorScheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  injectStyles();
  syncColorScheme();
}
