import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { TIMELINE } from '@site/src/data/timeline';
import styles from './styles.module.css';

const VIDEO_ID = 'hdXo_brnj9M';

function IntroVideo() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.heading}>
          <Translate id="home.intro.title">Về chúng mình</Translate>
        </Heading>
        <p className={styles.lead}>
          <Translate id="home.intro.lead">
            Câu lạc bộ Sinh viên Lập trình HCMUTE (HCMUTE DSC) là câu lạc bộ học thuật mở và năng động dành cho tất cả sinh viên đam mê công nghệ – lập trình, trực thuộc khoa Công nghệ Thông tin, Trường Đại học Công nghệ Kỹ thuật TP.HCM.
          </Translate>
        </p>
        <div className={styles.video}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
            title="HCMUTE DSC"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <p className={styles.caption}>
          <Translate id="home.intro.caption">
            Video giới thiệu CLB năm 2021, khi còn mang tên GDSC HCMUTE.
          </Translate>
        </p>
      </div>
    </section>
  );
}

function Timeline() {
  const { i18n } = useDocusaurusContext();
  const lang = i18n.currentLocale === 'en' ? 'en' : 'vi';
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <Heading as="h2" className={styles.heading}>
          <Translate id="home.timeline.title">Hành trình</Translate>
        </Heading>
        <ol className={styles.timeline}>
          {TIMELINE.map((m) => (
            <li key={m.date.en} className={styles.item}>
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.card}>
                <time className={styles.date}>{m.date[lang]}</time>
                <Heading as="h3" className={styles.title}>
                  {m.link ? <Link to={m.link}>{m.title[lang]}</Link> : m.title[lang]}
                </Heading>
                <p className={styles.desc}>{m.description[lang]}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function ClubIntro(): JSX.Element {
  return (
    <>
      <IntroVideo />
      <Timeline />
    </>
  );
}
