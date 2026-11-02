import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {CONSENT_EVENT, getConsent, setConsent} from '@site/src/utils/analytics';
import styles from './styles.module.css';

// Saves the choice and counts it as a GoatCounter event, so the dashboard
// shows how many visitors accept or decline. GoatCounter is cookieless, so
// counting a "No, thanks" doesn't go against the visitor's choice.
function choose(value) {
  setConsent(value);
  window.goatcounter?.count?.({
    path: `consent-${value}`,
    title: value === 'granted' ? 'Banner: Sure!' : 'Banner: No, thanks',
    event: true,
  });
}

// Asks once whether Google Analytics may run, and shows again only if the
// visitor resets the choice on the privacy page. Accept and Decline look the
// same on purpose: declining shouldn't be harder than accepting.
export default function ConsentBanner() {
  // Hidden during server rendering; localStorage is read after mount.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
    const onChange = (event) => setVisible(event.detail === null);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <section className={styles.banner} aria-label="Analytics consent">
      <p className={styles.text}>
        Hi! I'm learning Google Analytics and would love to see which pages you
        read. I never see who you are, and it sets cookies only if you say yes.{' '}
        <Link to="/privacy">Privacy details</Link>
      </p>
      <div className={styles.buttons}>
        <button
          type="button"
          className="button button--outline button--primary"
          onClick={() => choose('denied')}>
          No, thanks
        </button>
        <button
          type="button"
          className="button button--outline button--primary"
          onClick={() => choose('granted')}>
          Sure!
        </button>
      </div>
    </section>
  );
}
