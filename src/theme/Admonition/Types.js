/**
 * Adds an `example` admonition type to the built-in ones (note, tip, info,
 * warning, danger). Use it in Markdown as:
 *
 *   :::example
 *   **Before:** …
 *
 *   **After:** …
 *   :::
 *
 * The keyword is registered in docusaurus.config.js (`admonitions.keywords`),
 * and the colors live in src/css/custom.css under "Example admonitions".
 */
import React from 'react';
import clsx from 'clsx';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import AdmonitionLayout from '@theme/Admonition/Layout';

// Lucide "lightbulb" (https://lucide.dev), ISC License,
// Copyright (c) Lucide Contributors.
function LightbulbIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function AdmonitionTypeExample({type, title = 'Example', icon, children, className}) {
  return (
    <AdmonitionLayout
      type={type}
      className={clsx('alert alert--example', className)}
      title={title}
      icon={icon ?? <LightbulbIcon />}>
      {children}
    </AdmonitionLayout>
  );
}

export default {
  ...DefaultAdmonitionTypes,
  example: AdmonitionTypeExample,
};
