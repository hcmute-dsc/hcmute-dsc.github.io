import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Image from '@theme/IdealImage';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css';
import { CONTACTS } from '@site/src/data/contacts';

function ContactItem({icon, contact, title}) {
  const Svg = contact.icon;
  return (
    <div className={styles.buttons}>
      <Link className={clsx('button button--lg', styles.cardInfoButton)}
        title={title} to={contact.link}>
          {contact.icon && <Svg role="img" />}
          {!contact.icon && <FontAwesomeIcon icon={icon} size='xl'/>}
      </Link>
    </div>
  );
}

const backgroundImage = 'img/background/hcmute-dsc-hero.webp';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner, styles.backgroundImage)} style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className={clsx('container', styles.cardContainer)}>
        {/* <div className={clsx(styles.cardInfo)}>
          <Image img='/img/logo/hcmute-dsc-logo.png' alt='HCMUTE DSC' about='HCMUTE DSC' className={clsx(styles.cardInfoImage)}
            width={150} height={150} loading='lazy' decoding='async'/>

          <h1 className="hero__title">{siteConfig.title}</h1>
          <h2 className="hero__subtitle">{siteConfig.tagline}</h2>

          <div style={{margin: '1rem'}}>
            <Link className={clsx('button button--primary')} title='CV' to='/'>
                🪪🧑‍💻
            </Link>
          </div>
          
          <div className={clsx(styles.buttonsGroup)}>
            <ContactItem icon={faEnvelope} contact={CONTACTS.Email} title={'Email'}/>
            <ContactItem icon={faFacebook} contact={CONTACTS.Facebook} title={'Facebook'}/>
            <ContactItem icon={faGithub} contact={CONTACTS.Github} title={'Github'}/>
            <ContactItem icon={faGlobe} contact={CONTACTS.Website} title={'Website'}/>
          </div>
        </div> */}
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.title}`}>
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
