import React from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import CopyForLLM from '@site/src/components/CopyForLLM';
import styles from './styles.module.css';

// Wraps the breadcrumbs so the "Copy for LLM" button sits on the same row.
// Both regular docs and OpenAPI pages render DocBreadcrumbs, so this covers both.
export default function DocBreadcrumbsWrapper(props) {
  return (
    <div className={styles.row}>
      <DocBreadcrumbs {...props} />
      <CopyForLLM />
    </div>
  );
}
