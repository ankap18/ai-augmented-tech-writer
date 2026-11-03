import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import styles from './styles.module.css';

// Swizzled (ejected) from @docusaurus/theme-classic 3.10.2.
// Uses the docs page layout instead of the default three centered columns:
// the sidebar sits flush left at a fixed width, and the content area takes the
// rest, split 9/3 between the post and the table of contents, like docs.
export default function BlogLayout(props) {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  return (
    <Layout {...layoutProps}>
      <div className={styles.blogRoot}>
        {hasSidebar && <BlogSidebar sidebar={sidebar} />}
        <div className={clsx(styles.blogMain, hasSidebar && styles.blogMainWithSidebar)}>
          <div className="container padding-top--md padding-bottom--lg">
            <div className="row">
              <main className={clsx('col', styles.blogItemCol)}>{children}</main>
              {toc && <div className="col col--3">{toc}</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
