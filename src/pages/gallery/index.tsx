import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { ALBUMS } from '@site/src/data/gallery';
import taxonomy from '@site/src/data/newsTaxonomy.json';
import { openLightbox } from '@site/src/clientModules/lightbox';
import styles from './styles.module.css';

const PAGE = 24;
const TITLE = translate({ id: 'gallery.title', message: 'Thư viện ảnh' });
const DESCRIPTION = translate({
  id: 'gallery.description',
  message: 'Khoảnh khắc từ các sự kiện, workshop và hoạt động của HCMUTE Developer Student Club qua từng năm.',
});

type Album = (typeof ALBUMS)[number];

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function openAlbum(album: Album, index = 0) {
  openLightbox(
    album.images.map((src) => ({ src, alt: album.title, href: album.permalink })),
    index,
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className={clsx(styles.chip, active && styles.chipActive)} aria-pressed={active} onClick={onClick}>
      {children}
    </button>
  );
}

export default function Gallery(): JSX.Element {
  const years = useMemo(() => [...new Set(ALBUMS.map((a) => a.date.slice(0, 4)))], []);
  const categories = taxonomy.categories.filter((c) => ALBUMS.some((a) => a.category === c.slug));
  const [year, setYear] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE);

  const albums = ALBUMS.filter((a) => (!year || a.date.startsWith(year)) && (!category || a.category === category));
  const photoCount = albums.reduce((n, a) => n + a.images.length, 0);
  const pick = (fn: () => void) => { fn(); setShown(PAGE); };

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="container margin-vert--lg">
        <header className={styles.header}>
          <Heading as="h1">{TITLE}</Heading>
          <p>{DESCRIPTION}</p>
        </header>

        <div className={styles.filters}>
          <div className={styles.chips} role="group" aria-label={translate({ id: 'gallery.filter.year', message: 'Lọc theo năm' })}>
            <Chip active={!year} onClick={() => pick(() => setYear(null))}>
              <Translate id="gallery.filter.allYears">Tất cả</Translate>
            </Chip>
            {years.map((y) => (
              <Chip key={y} active={year === y} onClick={() => pick(() => setYear(y))}>{y}</Chip>
            ))}
          </div>
          <div className={styles.chips} role="group" aria-label={translate({ id: 'gallery.filter.category', message: 'Lọc theo danh mục' })}>
            <Chip active={!category} onClick={() => pick(() => setCategory(null))}>
              <Translate id="gallery.filter.allCategories">Mọi danh mục</Translate>
            </Chip>
            {categories.map((c) => (
              <Chip key={c.slug} active={category === c.slug} onClick={() => pick(() => setCategory(c.slug))}>{c.label}</Chip>
            ))}
          </div>
          <p className={styles.count}>
            <Translate id="gallery.count" values={{ albums: albums.length, photos: photoCount }}>
              {'{albums} album · {photos} ảnh'}
            </Translate>
          </p>
        </div>

        <ul className={styles.grid}>
          {albums.slice(0, shown).map((a) => (
            <li key={a.permalink} className={styles.album}>
              <button type="button" className={styles.cover} onClick={() => openAlbum(a)}
                aria-label={translate({ id: 'gallery.open', message: 'Xem ảnh: {title}' }, { title: a.title })}>
                <img src={a.images[0]} alt="" loading="lazy" decoding="async" />
                {a.images.length > 1 && <span className={styles.badge}>📷 {a.images.length}</span>}
              </button>
              <div className={styles.meta}>
                <time dateTime={a.date}>{formatDate(a.date)}</time>
                <Link to={a.permalink} className={styles.title}>{a.title}</Link>
              </div>
            </li>
          ))}
        </ul>

        {shown < albums.length && (
          <div className={styles.more}>
            <button type="button" className="button button--primary button--lg" onClick={() => setShown(shown + PAGE)}>
              <Translate id="gallery.more">Xem thêm</Translate>
            </button>
          </div>
        )}
      </main>
    </Layout>
  );
}
