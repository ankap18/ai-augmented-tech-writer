// Google Analytics 4, loaded only after the visitor accepts.
//
// Until the visitor clicks Accept in the consent banner, the GA script isn't
// requested at all: nothing is sent to Google and no cookies are set. The
// choice is kept in localStorage. Changing it fires CONSENT_EVENT so the
// banner and the privacy page stay in sync.
//
// GA loads in production builds only, so `npm start` sessions aren't counted.

import siteConfig from '@generated/docusaurus.config';

const MEASUREMENT_ID = siteConfig.customFields.gaMeasurementId;
const STORAGE_KEY = 'analytics-consent';
export const CONSENT_EVENT = 'analytics-consent-change';

let loaded = false;

/** Returns 'granted', 'denied', or null if the visitor hasn't chosen yet. */
export function getConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Saves the choice ('granted', 'denied', or null to ask again) and applies it. */
export function setConsent(value) {
  try {
    if (value) {
      localStorage.setItem(STORAGE_KEY, value);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
  if (value === 'granted') {
    loadGtag();
  } else {
    disableGtag();
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, {detail: value}));
}

export function loadGtag() {
  if (process.env.NODE_ENV !== 'production' || !MEASUREMENT_ID) {
    return;
  }
  window[`ga-disable-${MEASUREMENT_ID}`] = false;
  if (loaded) {
    // Accepted again after declining on the same page.
    window.gtag('consent', 'update', {analytics_storage: 'granted'});
    return;
  }
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  // gtag.js expects the `arguments` object itself, so this can't be an
  // arrow function or use rest parameters.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  // Analytics only: ad features stay off even after the visitor accepts.
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  // Sends the page_view for the current page.
  window.gtag('config', MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

function disableGtag() {
  if (loaded) {
    window[`ga-disable-${MEASUREMENT_ID}`] = true;
    window.gtag('consent', 'update', {analytics_storage: 'denied'});
  }
  // Remove the _ga and _ga_<id> cookies GA set while consent was granted.
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (name === '_ga' || name.startsWith('_ga_')) {
      for (const domain of ['', `; domain=${location.hostname}`, `; domain=.${location.hostname}`]) {
        document.cookie = `${name}=; max-age=0; path=/${domain}`;
      }
    }
  }
}

/** Sends a page_view after a client-side route change. */
export function trackPageView() {
  if (!loaded || getConsent() !== 'granted') {
    return;
  }
  // Docusaurus updates the document title in the next tick, so wait for it
  // to send the new page's title instead of the previous one's.
  setTimeout(() => {
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_title: document.title,
    });
  });
}
