import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

// The visible pitch, for people who already landed on the page.
const TAGLINE = 'I use AI to move faster — and human judgment to get it right.';
const SUBLINE =
  '15+ years of helping teams ship documentation that users trust. I start ' +
  'with structure — taxonomy, information architecture, templates — then use ' +
  'docs-as-code and AI to scale it across teams and products.';
// A small personality beat before the buttons.
const POSTSCRIPT = "P.S. And yes, I've always loved em dashes.";

// One plain, quotable sentence for the meta description: search snippets and
// AI answers both pull from it, so keep the name and role in it.
const DESCRIPTION =
  'Anna Korolivska is a senior technical writer with 15+ years of experience ' +
  'in API documentation, AI-assisted workflows, and docs-as-code.';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        {/* Name in the file name and alt text helps image search match the photo to you. */}
        <img
          src={useBaseUrl('/img/anna-korolivska.jpg')}
          alt="Anna Korolivska, senior technical writer"
          className={styles.avatar}
          width={140}
          height={140}
        />
        <Heading as="h1" className="hero__title">
          Anna Korolivska — Senior Technical Writer
        </Heading>
        <p className={clsx('hero__subtitle', styles.tagline)}>{TAGLINE}</p>
        <p className={styles.subline}>{SUBLINE}</p>
        <p className={styles.postscript}>{POSTSCRIPT}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/portfolio/about-portfolio">
            View portfolio
          </Link>
          <Link
            className="button button--outline button--primary button--lg"
            to="/blog">
            Read the blog
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="Senior Technical Writer Portfolio"
      description={DESCRIPTION}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
