import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { FEATURED_EVENT } from '@site/src/data/featuredEvent';
import styles from './styles.module.css';

/** Home page spotlight for the current event. Content lives in `src/data/featuredEvent.ts`. */
export default function FeaturedEvent(): JSX.Element | null {
  if (!FEATURED_EVENT) return null;
  const { kicker, title, titleAccent, description, image, imageAlt, stats, primary, secondary } = FEATURED_EVENT;

  return (
    <section className={styles.section} aria-labelledby="featured-event">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.text}>
            <p className={styles.kicker}>{kicker}</p>
            <Heading as="h2" id="featured-event" className={styles.title}>
              {title}
              <br />
              <span>{titleAccent}</span>
            </Heading>
            <p className={styles.lead}>{description}</p>
            <div className={styles.actions}>
              <Link className={clsx('button button--lg', styles.primary)} to={primary.to}>
                {primary.label}
              </Link>
              {secondary && (
                <Link className={clsx('button button--lg', styles.secondary)} to={secondary.to}>
                  {secondary.label}
                </Link>
              )}
            </div>
            <dl className={styles.stats}>
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Link to={primary.to} className={styles.media} tabIndex={-1} aria-hidden="true">
            <img src={image} alt={imageAlt} width={1600} height={900} loading="lazy" decoding="async" />
          </Link>
        </div>
      </div>
    </section>
  );
}
