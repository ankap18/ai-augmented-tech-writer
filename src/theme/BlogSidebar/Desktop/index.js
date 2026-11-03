import React, {memo} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  useVisibleBlogSidebarItems,
  groupBlogSidebarItemsByYear,
  BlogSidebarItemList,
} from '@docusaurus/plugin-content-blog/client';
import styles from './styles.module.css';

// Swizzled (ejected) from @docusaurus/theme-classic 3.10.2.
// Renders the blog sidebar with the docs sidebar's Infima menu classes, so
// both sidebars look the same: each year is an uppercase label like a
// top-level docs category, and its posts sit under it with the blue guide line.
// Without year grouping, the sidebar title is the only label.
function BlogSidebarDesktop({sidebar}) {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  const {groupByYear} = useThemeConfig().blog.sidebar;
  const groups = groupByYear
    ? groupBlogSidebarItemsByYear(items)
    : [[sidebar.title, items]];
  return (
    <aside className={styles.sidebarContainer}>
      <nav
        className={clsx('menu thin-scrollbar', styles.sidebar)}
        aria-label={translate({
          id: 'theme.blog.sidebar.navAriaLabel',
          message: 'Blog recent posts navigation',
          description: 'The ARIA label for recent posts in the blog sidebar',
        })}>
        <ul className="menu__list">
          {groups.map(([label, groupItems]) => (
            <li key={label} className="menu__list-item">
              <div className={clsx('menu__link', styles.groupLabel)}>
                {label}
              </div>
              <BlogSidebarItemList
                items={groupItems}
                ulClassName="menu__list"
                liClassName="menu__list-item"
                linkClassName="menu__link"
                linkActiveClassName="menu__link--active"
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
export default memo(BlogSidebarDesktop);
