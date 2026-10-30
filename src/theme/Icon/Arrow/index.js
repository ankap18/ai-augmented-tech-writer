import React from 'react';

// Thin outline double chevron for the sidebar collapse/expand buttons,
// replacing Docusaurus's filled grey arrow. It points right; the collapse
// button rotates it to point left.
export default function IconArrow(props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path d="M6 7l5 5-5 5" />
      <path d="M13 7l5 5-5 5" />
    </svg>
  );
}
