import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import taxonomy from '@site/src/data/newsTaxonomy.json';
import styles from './categories.module.css';

const ICONS: Record<string, string> = {
  'doi-song-clb': '💙',
  'chia-se-kien-thuc': '📚',
  'tuyen-thanh-vien': '🙌',
  'su-kien-cuoc-thi': '🏆',
  'workshop-sinh-hoat': '🧑‍💻',
  'thong-bao': '📢',
};

const TITLE = translate({ id: 'news.categories.title', message: 'Danh mục hoạt động' });
const DESCRIPTION = translate({
  id: 'news.categories.description',
  message: 'Sự kiện, hoạt động và thông báo của CLB, lưu trữ từ fanpage và sắp xếp theo danh mục và chủ đề.',
});

export default function NewsCategories(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="container margin-vert--lg">
        <header className={styles.header}>
          <Heading as="h1">{TITLE}</Heading>
          <p>{DESCRIPTION}</p>
          <p className={styles.links}>
            <Link to="/news">
              <Translate id="news.categories.all" values={{ count: taxonomy.total }}>
                {'Tất cả {count} bài viết'}
              </Translate>
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/news/archive">
              <Translate id="news.categories.archive">Lưu trữ theo năm</Translate>
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/news/tags">
              <Translate id="news.categories.allTags">Tất cả tags</Translate>
            </Link>
          </p>
        </header>

        <section>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="news.categories.categories">Danh mục</Translate>
          </Heading>
          <ul className={styles.grid}>
            {taxonomy.categories.filter((c) => c.count > 0).map((c) => (
              <li key={c.slug}>
                <Link to={`/news/tags/${c.slug}`} className={clsx('card', styles.card)}>
                  <span className={styles.icon} aria-hidden="true">{ICONS[c.slug] ?? '📁'}</span>
                  <span className={styles.cardBody}>
                    <span className={styles.cardTitle}>{c.label}</span>
                    <span className={styles.cardDesc}>{c.description}</span>
                  </span>
                  <span className={styles.count}>{c.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="margin-top--xl">
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="news.categories.topics">Chủ đề</Translate>
          </Heading>
          <ul className={styles.tags}>
            {taxonomy.tags.map((t) => (
              <li key={t.slug}>
                <Link to={`/news/tags/${t.slug}`} className={styles.tag}>
                  {t.label}
                  <span className={styles.tagCount}>{t.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
}
