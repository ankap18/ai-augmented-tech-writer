import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// Each card links straight to a portfolio area, so crawlers find the
// strongest pages from the homepage.
const FeatureList = [
  {
    title: 'API documentation',
    to: '/docs/portfolio/api-docs/overview',
    icon: '/img/icons/api-code.svg',
    description:
      'A complete REST API doc set for the Synonyms API: overview, ' +
      'authentication, quickstart, and an OpenAPI-generated reference.',
  },
  {
    title: 'Vector search concepts',
    to: '/docs/portfolio/vector-search/overview',
    icon: '/img/icons/vector-search.svg',
    description:
      'Conceptual docs that explain embeddings, indexing and querying, ' +
      'and how vector search powers RAG and semantic search.',
  },
  {
    title: 'AI for technical writers',
    to: '/docs/ai-stuff/prompt-workflow-agent',
    icon: '/img/icons/ai-head.svg',
    description:
      'Notes on prompts, workflows, and agents, and on making docs readable ' +
      'for AI with llms.txt.',
  },
];

function Feature({title, to, icon, description}) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <Link to={to} className={clsx('card padding--lg', styles.featureCard)}>
        <Heading as="h2" className={styles.featureTitle}>
          {/* Black outline icons, inverted in dark mode like the doc cards. */}
          <img className={styles.featureIcon} src={useBaseUrl(icon)} alt="" />{' '}
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
