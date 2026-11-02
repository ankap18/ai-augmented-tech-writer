import React, {useEffect, useState} from 'react';
import {CONSENT_EVENT, getConsent, setConsent} from '@site/src/utils/analytics';

const STATUS = {
  granted: 'Analytics is on for this browser.',
  denied: 'Analytics is off for this browser.',
};

// Shows the visitor's current analytics choice and lets them change it.
export default function AnalyticsSettings() {
  // undefined until mounted, so the server render shows no status.
  const [consent, setConsentState] = useState(undefined);

  useEffect(() => {
    setConsentState(getConsent());
    const onChange = (event) => setConsentState(event.detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (consent === undefined) {
    return null;
  }

  return (
    <div className="margin-bottom--lg">
      <p>
        <strong>{STATUS[consent] ?? "You haven't chosen yet."}</strong>
      </p>
      {consent === 'granted' ? (
        <button
          type="button"
          className="button button--outline button--primary"
          onClick={() => setConsent('denied')}>
          Turn off analytics
        </button>
      ) : (
        <button
          type="button"
          className="button button--outline button--primary"
          onClick={() => setConsent('granted')}>
          Turn on analytics
        </button>
      )}
    </div>
  );
}
