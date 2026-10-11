import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ALBUMS } from '@site/src/data/gallery';
import taxonomy from '@site/src/data/newsTaxonomy.json';
import styles from './styles.module.css';

// Album permalinks shown in the collage: the 1st and 2nd birthdays, Open Day 2023, the 3rd anniversary.
const COLLAGE = [
  '/news/2022/11/08/happy-birthday-gdsc-hcmute',
  '/news/2023/01/09/open-day-2023-recap',
  '/news/2023/11/18/happy-birthday-gdsc-hcmute',
  '/news/2024/10/29/memory-recap-chao-don-thanh-vien-moi-ky-niem-3-nam-thanh-lap',
];

/** Home page feature for the club's 5th anniversary, pointing to Memoryland. */
export default function AnniversaryHighlight(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const url = siteConfig.customFields?.memorylandUrl as string;
  const posts = taxonomy.categories.reduce((n, c) => n + c.count, 0);
  const photos = ALBUMS.reduce((n, a) => n + a.images.length, 0);
  const collage = COLLAGE.map((p) => ALBUMS.find((a) => a.permalink === p)).filter(Boolean);

  return (
    <section className={styles.section} aria-labelledby="five-years">
      <div className={clsx('container', styles.grid)}>
        <div>
          <p className={styles.kicker}>Kỷ niệm 5 năm thành lập · 2021 – 2026</p>
          <Heading as="h2" id="five-years" className={styles.title}>
            Năm năm. Một cộng đồng.
            <br />
            <span>Vô vàn ký ức.</span>
          </Heading>
          <p className={styles.lead}>
            Ngày 20/07/2026, HCMUTE DSC tròn 5 năm. Nhân dịp này, CLB ra mắt <strong>Memoryland</strong>, kho ký ức số lưu
            giữ hành trình qua từng năm, các thế hệ Ban Chủ nhiệm và câu chuyện của những người đã cùng xây dựng DSC.
          </p>
          <p className={styles.lead}>
            Chiến dịch <strong>#WeWereThere</strong> đang mời các thế hệ thành viên gửi ảnh, câu chuyện và lời nhắn. Bạn từng ở
            đó, hãy giúp chúng mình kể lại.
          </p>
          <div className={styles.actions}>
            <Link className={clsx('button button--lg', styles.primary)} href={url}>
              Khám phá Memoryland
            </Link>
            <Link className={clsx('button button--lg', styles.secondary)} href={`${url}/dong-gop/`}>
              Góp một ký ức
            </Link>
          </div>
          <dl className={styles.stats}>
            <div><dt>Năm hoạt động</dt><dd>5</dd></div>
            <div><dt>Thế hệ thành viên</dt><dd>6</dd></div>
            <div><dt>Bài đăng lưu trữ</dt><dd>{posts}</dd></div>
            <div><dt>Tấm ảnh</dt><dd>{photos}</dd></div>
          </dl>
        </div>

        <div className={styles.collage} aria-hidden="true">
          <span className={styles.numeral}>05</span>
          {collage.map((a, i) => (
            <Link key={a.permalink} to={a.permalink} tabIndex={-1} className={clsx(styles.photo, styles[`photo${i}`])}>
              <img src={a.images[0]} alt="" loading="lazy" decoding="async" />
              <span>{a.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
