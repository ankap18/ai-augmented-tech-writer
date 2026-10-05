import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  findFirstSidebarItemLink,
  useDocById,
} from '@docusaurus/plugin-content-docs/client';
import {usePluralForm} from '@docusaurus/theme-common';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function CardLayout({className, href, icon, title, description}) {
  return (
    <Link
      href={href}
      className={clsx('card padding--lg', styles.cardContainer, className)}>
      <Heading
        as="h2"
        className={clsx('text--truncate', styles.cardTitle)}
        title={title}>
        {icon} {title}
      </Heading>
      {description && (
        <p
          className={clsx('text--truncate', styles.cardDescription)}
          title={description}>
          {description}
        </p>
      )}
    </Link>
  );
}

function CardIcon({src, invertInDark}) {
  const imageUrl = useBaseUrl(src);
  return (
    <img
      className={clsx(
        styles.cardIcon,
        invertInDark && styles.cardIconInvertDark,
      )}
      src={imageUrl}
      alt=""
    />
  );
}

function CardCategory({item}) {
  const href = findFirstSidebarItemLink(item);
  const {selectMessage} = usePluralForm();

  if (!href) {
    return null;
  }

  const description =
    item.description ??
    selectMessage(
      item.items.length,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        {count: item.items.length},
      ),
    );

  return (
    <CardLayout
      className={item.className}
      href={href}
      icon="🗃️"
      title={item.label}
      description={description}
    />
  );
}

function CardLink({item}) {
  const doc = useDocById(item.docId ?? undefined);
  const cardIcon = item.customProps?.card_icon;
  const invertIconInDark = item.customProps?.card_icon_invert_dark;

  if (
    cardIcon !== undefined &&
    (typeof cardIcon !== 'string' || !cardIcon.trim())
  ) {
    throw new Error(
      `Invalid sidebar_custom_props.card_icon for "${item.label}": expected a non-empty image path.`,
    );
  }
  if (
    invertIconInDark !== undefined &&
    typeof invertIconInDark !== 'boolean'
  ) {
    throw new Error(
      `Invalid sidebar_custom_props.card_icon_invert_dark for "${item.label}": expected a boolean.`,
    );
  }

  const icon = cardIcon ? (
    <CardIcon src={cardIcon} invertInDark={invertIconInDark} />
  ) : isInternalUrl(item.href) ? (
    '📄️'
  ) : (
    '🔗'
  );

  return (
    <CardLayout
      className={item.className}
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({item}) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`Unknown DocCard item type: ${JSON.stringify(item)}`);
  }
}
