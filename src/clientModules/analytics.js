// Loads Google Analytics for visitors who accepted earlier, and counts page
// changes inside the site. Docusaurus switches pages without a full reload,
// so GA and GoatCounter only see the first page unless we count each route.
// See src/utils/analytics.js.

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import {getConsent, loadGtag, trackPageView} from '../utils/analytics';

if (ExecutionEnvironment.canUseDOM && getConsent() === 'granted') {
  loadGtag();
}

export function onRouteDidUpdate({location, previousLocation}) {
  if (previousLocation && location.pathname !== previousLocation.pathname) {
    trackPageView();
    // GoatCounter counts the first page itself. `?.` because its script
    // loads async and ad blockers may block it.
    window.goatcounter?.count?.({path: location.pathname});
  }
}
