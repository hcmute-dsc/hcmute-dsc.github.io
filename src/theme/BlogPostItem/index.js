import React from 'react';
import { useBlogPost } from '@docusaurus/theme-common/internal'
import BlogPostItem from '@theme-original/BlogPostItem';
import GiscusComponent from '@site/src/components/GiscusComponent';
import useIsBrowser from '@docusaurus/useIsBrowser';

import styles from './styles.module.css';
import clsx from 'clsx';

import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";
import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export function ShareSocialMedia({ isBrowser, title, ...rest }) {
  return (
    <div className={clsx(styles.shareSocialMedia)}>
      <h4 className={clsx(styles.shareHeading)}>
        <Translate id='share.section.title'>Share this page</Translate> 
      </h4>
      <div className={clsx(styles.shareButtons)}>
        <FacebookShareButton url={isBrowser ? window.location.href : ''} quote={title}>
          <FacebookIcon size={48} round={true} />
        </FacebookShareButton>
        <WorkplaceShareButton url={isBrowser ? window.location.href : ''} quote={title}>
          <WorkplaceIcon size={48} round={true} />
        </WorkplaceShareButton>
        <TwitterShareButton url={isBrowser ? window.location.href : ''} title={title}>
          <TwitterIcon size={48} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton url={isBrowser ? window.location.href : ''} title={title}>
          <LinkedinIcon size={48} round={true} />
        </LinkedinShareButton>
        <RedditShareButton url={isBrowser ? window.location.href : ''} title={title}>
          <RedditIcon size={48} round={true} />
        </RedditShareButton>
      </div>
    </div>
  )
}

/** List pages: a compact card (cover, date, category, title, summary) instead of the post preview. */
function PostCard() {
  const { metadata, assets } = useBlogPost();
  const { permalink, title, formattedDate, date, tags, description, frontMatter } = metadata;
  const cover = assets.image ?? frontMatter.image;
  const fallback = useBaseUrl('/img/hcmute-dsc-social-card.jpg');
  const category = tags[0];
  return (
    <article className={styles.card}>
      <Link to={permalink} className={styles.cardCover} tabIndex={-1} aria-hidden="true">
        <img src={cover || fallback} alt="" loading="lazy" decoding="async" />
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <time dateTime={date}>{formattedDate}</time>
          {category && <Link to={category.permalink} className={styles.cardCategory}>{category.label}</Link>}
        </div>
        <h2 className={styles.cardTitle}>
          <Link to={permalink}>{title}</Link>
        </h2>
        {description && <p className={styles.cardDesc}>{description}</p>}
        <Link to={permalink} className={styles.cardMore}>
          <Translate id="blog.card.readMore">Đọc tiếp</Translate> →
        </Link>
      </div>
    </article>
  );
}

export default function BlogPostItemWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost()
  const isBrowser = useIsBrowser();

  if (!isBlogPostPage) {
    return <PostCard />;
  }

  const { frontMatter, slug, title } = metadata
  const { enableComments } = frontMatter

  return (
    <div className={clsx(styles.main)}>
      <BlogPostItem {...props} />

      {(enableComments && isBlogPostPage) && (
        <>
          <ShareSocialMedia isBrowser={isBrowser} title={title} />
          <GiscusComponent />
        </>
      )}
    </div>
  );
}