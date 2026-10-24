import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

interface Subsite {
  label: string;
  icon: string;
  description: string;
  href: string;
}

/** Home page strip linking the club's sister sites on subdomains. */
export default function SiteLinks(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const subsites = siteConfig.customFields?.subsites as Subsite[];

  return (
    <section className={styles.section} aria-labelledby="dsc-sites">
      <div className="container">
        <Heading as="h2" id="dsc-sites" className={styles.title}>
          Các dự án của DSC
        </Heading>
        <ul className={styles.grid}>
          {subsites.map((s) => (
            <li key={s.href}>
              <Link className={clsx(styles.card)} href={s.href}>
                <span className={styles.icon} aria-hidden="true">{s.icon}</span>
                <strong>{s.label}</strong>
                <span className={styles.desc}>{s.description}</span>
                <span className={styles.host}>{new URL(s.href).host} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
