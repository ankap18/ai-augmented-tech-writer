// Replaces the default "Page Not Found" text with a site-specific 404 page:
// a short AI joke and links to the main sections.
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// The main sections, in sidebar order. Each links to its landing page.
const SECTIONS = [
  {label: 'Welcome', to: '/docs/intro', text: 'Why this site exists and who I am'},
  {label: 'Portfolio', to: '/docs/portfolio/about-portfolio', text: 'Technical writing samples'},
  {label: 'AI and docs', to: '/docs/ai-stuff/about-ai-stuff', text: 'Notes on AI and docs that AI can read'},
  {label: 'Docs craft', to: '/docs/tw-stuff/about-tw-stuff', text: 'Notes on the craft of technical writing'},
  {label: 'Blog', to: '/blog', text: 'Short posts on learning and AI-assisted writing'},
];

export default function NotFoundContent({className}) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <p className={styles.code}>404</p>
          <Heading as="h1" className="hero__title">
            You’re right, this page doesn’t exist
          </Heading>
          <p>
            I apologize for the confusion. The URL looked plausible, but
            there’s no page here. Maybe a model made it up, or the page moved
            when I reorganized the site.
          </p>
          <p>Here’s where the real content lives:</p>
          <ul className={styles.sections}>
            {SECTIONS.map(({label, to, text}) => (
              <li key={to}>
                <Link to={to}>{label}</Link> — {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
