import React from 'react';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

// Thin outline "opens in new tab" icon, replacing Docusaurus's filled sprite.
export default function IconExternalLink({width = 13.5, height = 13.5}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={translate({
        id: 'theme.IconExternalLink.ariaLabel',
        message: '(opens in new tab)',
        description: 'The ARIA label for the external link icon',
      })}
      className={styles.iconExternalLink}>
      <path d="M14 4h6v6" />
      <path d="M20 4l-9 9" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}
