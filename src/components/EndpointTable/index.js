import React from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import {useCurrentSidebarCategory} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

// Lists the spec's operations (from src/plugins/apiEndpoints.js) with the
// same colored method labels as the sidebar. Each row links to the endpoint
// page with the same label in the current sidebar category, and rows follow
// the sidebar's order. Operations not in the sidebar go last, in spec order.
export default function EndpointTable() {
  const {endpoints: specEndpoints} = usePluginData('api-endpoints');
  const items = useCurrentSidebarCategory().items;
  const hrefByLabel = Object.fromEntries(
    items.map((item) => [item.label, item.href]),
  );
  const position = (summary) => {
    const index = items.findIndex((item) => item.label === summary);
    return index === -1 ? items.length : index;
  };
  // Array.prototype.sort is stable, so ties keep the spec's order
  const endpoints = [...specEndpoints].sort(
    (a, b) => position(a.summary) - position(b.summary),
  );

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Method</th>
            <th scope="col">Path</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map(({method, path, summary}) => {
            const href = hrefByLabel[summary];
            return (
              <tr key={`${method} ${path}`}>
                <td>
                  <span className={`api-method ${method} api-method-badge`}>
                    {method}
                  </span>
                </td>
                <td>
                  <code className={styles.path}>{path}</code>
                </td>
                <td>{href ? <Link to={href}>{summary}</Link> : summary}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
