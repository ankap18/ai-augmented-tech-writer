import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

// Pages that docusaurus-plugin-llms doesn't create a .md copy for: generated
// category index pages, and generated API pages (ignoreFiles in the config).
const NO_MARKDOWN = [/\/docs\/category\//, /\/api-docs\/generated\//];

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="9" y="9" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function CopyForLLM() {
  const {pathname} = useLocation();
  const [status, setStatus] = useState('idle'); // idle | copied | error
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // Close the menu on an outside click or Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (NO_MARKDOWN.some((re) => re.test(pathname))) return null;

  // /docs/intro/ → /docs/intro.md. pathname already includes the baseUrl.
  const mdPath = `${pathname.replace(/\/$/, '')}.md`;
  const mdUrl = () => new URL(mdPath, window.location.origin).href;
  const prompt = () =>
    encodeURIComponent(`Read ${mdUrl()} so I can ask you questions about it.`);

  async function handleCopy() {
    try {
      const res = await fetch(mdPath);
      if (!res.ok) throw new Error(String(res.status));
      await navigator.clipboard.writeText(await res.text());
      setStatus('copied');
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 2000);
  }

  const label =
    status === 'copied' ? 'Copied!' : status === 'error' ? 'Copy failed' : 'Copy for LLM';

  const items = [
    {label: 'View as Markdown', href: () => mdPath},
    {label: 'Open in Claude', href: () => `https://claude.ai/new?q=${prompt()}`},
    {label: 'Open in ChatGPT', href: () => `https://chatgpt.com/?q=${prompt()}`},
  ];

  return (
    <div className={styles.root} ref={rootRef}>
      <button type="button" className={styles.main} onClick={handleCopy} aria-live="polite">
        <CopyIcon />
        {label}
      </button>
      <button
        type="button"
        className={styles.toggle}
        aria-label="More options for this page"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}>
        <ChevronIcon />
      </button>
      {open && (
        <ul className={styles.menu} role="menu">
          {items.map((item) => (
            <li key={item.label} role="none">
              <a
                role="menuitem"
                className={styles.item}
                href={item.href()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
