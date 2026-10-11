import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';
import Image from '@theme/IdealImage';
import FavoriteIcon from '@site/src/components/svgIcons/FavoriteIcon';
import { Project } from '@site/src/shared/dto/Project';
import { sortBy } from '@site/src/utils/jsUtils';
import Heading from '@theme/Heading';
import Tooltip from '../ShowcaseTooltip';
import styles from './styles.module.css';
import { ProjectTagList, ProjectTagType, ProjectTags } from '@site/src/shared/constants/ProjectConsts';
import { Tag } from '@site/src/shared/dto/Tag';

const HCMUTEDSC = require('@site/static/img/hcmute-dsc-social-card.jpg');

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
  ({ label, color, description }, ref) => (
    <li ref={ref} className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label.toLowerCase()}</span>
      <span className={styles.colorLabel} style={{ backgroundColor: color }} />
    </li>
  ),
);

function ShowcaseCardTag({ tags }: { tags: ProjectTagType[] }) {
  const tagObjects = tags.map((tag) => ({ tag, ...ProjectTags[tag] }));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    ProjectTagList.indexOf(tagObject.tag),
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `showcase_card_tag_${tagObject.tag}`;
        return (
          <Tooltip key={index} id={id} text={tagObject.description} anchorEl="#__docusaurus">
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        );
      })}
    </>
  );
}

/**
 * Returns the image url for the card, either the user-provided one or a screenshot of the website
 * Ref: https://api-explorer.11ty.dev/
 * @param user user object
 * @returns image url
 */
function getCardImage(user: Project): string {
  if (user.preview) {
    return user.preview;
  }
  if (user.website) {
    var img = user.website ?? 'https://github.com/hcmute-dsc'
    // var yyyyMMdd = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    var yyyyMMddhhmm = new Date().toISOString().slice(0, 16).replace(/-/g, '').replace(/:/g, '').replace(/T/g, '');

    return (
      user.preview ??
      `https://v1.screenshot.11ty.dev/${encodeURIComponent(img)}/opengraph/smaller/_${yyyyMMddhhmm}`
    );

    // return (
    //   user.preview ??
    //   `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(img)}/showcase/_${yyyyMMddhhmm}`
    // );
  }
  return HCMUTEDSC;
}

/**
 * Website screenshot with a fallback: the screenshot service answers failures with a 200 + its logo
 * as SVG (and an X-11ty-Error-Message header), so those, and network errors, show the club card.
 */
function ScreenshotImage({ src, alt }: { src: string; alt: string }) {
  const fallbackSrc = useBaseUrl('/img/hcmute-dsc-social-card.jpg');
  const [current, setCurrent] = React.useState(fallbackSrc);
  React.useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;
    fetch(src)
      .then((res) => {
        const failed = !res.ok
          || res.headers.has('x-11ty-error-message')
          || (res.headers.get('content-type') ?? '').includes('svg');
        return failed ? null : res.blob();
      })
      .then((blob) => {
        if (blob && !cancelled) {
          objectUrl = URL.createObjectURL(blob);
          setCurrent(objectUrl);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);
  return <img src={current} alt={alt} loading="lazy" decoding="async" />;
}

function ShowcaseCard({ user }: { user: Project }) {
  const image = getCardImage(user);
  return (
    <li key={user.title} className="card shadow--md">
      <div className={clsx('card__image', styles.showcaseCardImage)}>
        {typeof image === 'string'
          ? <ScreenshotImage src={image} alt={user.title} />
          : <Image img={image} alt={user.title} loading='lazy' about={user.title} decoding='async' />}
      </div>

      <div className="card__body">
        <div className={clsx(styles.showcaseCardHeader)}>
          <Heading as="h4" className={styles.showcaseCardTitle}>
            <Link href={user.website ?? user.source} className={styles.showcaseCardLink}>
              {user.title}
            </Link>
          </Heading>

          {user.tags.includes('favorite') && (
            <FavoriteIcon svgClass={styles.svgIconFavorite} size="small" />
          )}

          {user.source && (
            <Link href={user.source} className={clsx('button button--secondary button--sm', styles.showcaseCardSrcBtn)}>
              <Translate id="showcase.card.sourceLink">source</Translate>
            </Link>
          )}
        </div>

        <p className={styles.showcaseCardBody}>{user.description}</p>
      </div>

      <ul className={clsx('card__footer', styles.cardFooter)}>
        <ShowcaseCardTag tags={user.tags} />
      </ul>
    </li>
  );
}

export default React.memo(ShowcaseCard);
