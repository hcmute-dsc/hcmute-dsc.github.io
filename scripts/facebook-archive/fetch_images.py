"""Download the photos of the archived Facebook posts and attach them to their posts.

Input:  data/photos.json  every photo of the Page, scraped from the photo viewer:
          {fbid, caption, lib, post, img: {src, w, h}}
        - lib:  index of the Content Library post whose text appears next to the photo (-1 if none)
        - post: link of the post the photo belongs to (multi-photo posts), else null
        data/library.json
Output: data/images/<library index>-<n>.webp  (max 1280px wide, re-encoded to keep the repo small)

Usage: python scripts/facebook-archive/fetch_images.py
"""
import io
import json
import re
import sys
import time
import urllib.request
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_news import parse_date, STATS_TAIL, norm, key_of, THIS_YEAR, SKIP_PATTERNS, HOLIDAY  # noqa: E402

DATA = Path(__file__).resolve().parent / 'data'
OUT = DATA / 'images'
MAX_W = 1280
MONTHS = 'January February March April May June July August September October November December'.split()
DATE_RE = re.compile(r'^\s*(\d{1,2}) (' + '|'.join(MONTHS) + r')(?: (\d{4}))?')


def caption_date(caption):
    m = DATE_RE.match(re.sub(r'[͏​]', '', caption).replace(' ', ' '))
    if not m:
        return None
    return datetime(int(m.group(3) or THIS_YEAR), MONTHS.index(m.group(2)) + 1, int(m.group(1))).date()


def archived(msg):
    """Same filter as build_news: is this library post published on the site?"""
    head = norm(STATS_TAIL.sub('', msg))[:200]
    return bool(head) and head != 'No text content' and not (
        any(re.search(p, head, re.I) for p in SKIP_PATTERNS) or HOLIDAY.search(head[:120]))


def group_photos(photos, library):
    """photo groups (one per Facebook post) -> library index"""
    groups = defaultdict(list)
    for p in photos:
        key = p['post'].split('?')[0] if p.get('post') else f'photo:{p["fbid"]}'
        groups[key].append(p)

    by_date = defaultdict(list)
    for i, lp in enumerate(library):
        if archived(lp['msg']):
            by_date[parse_date(lp['date']).date()].append(i)

    assigned, pending, unmatched = {}, [], []

    def attach(idx, ps):
        ps = sorted(ps, key=lambda p: int(p['fbid']))  # upload order = order in the post
        have = {q['fbid'] for q in assigned.setdefault(idx, [])}
        assigned[idx] += [p for p in ps if p['fbid'] not in have]

    # pass 1: the post text is shown next to the photo
    for key, ps in groups.items():
        votes = Counter(p['lib'] for p in ps if p.get('lib', -1) >= 0)
        if votes:
            attach(votes.most_common(1)[0][0], ps)
        else:
            pending.append((key, ps))
    # pass 2: match by date, among the posts of that day that have no photos yet
    for key, ps in pending:
        dates = {caption_date(p.get('caption', '')) for p in ps} - {None}
        cands = [i for d in dates for i in by_date.get(d, []) if i not in assigned]
        if len(cands) > 1:  # several posts that day: the one sharing most words with the photo captions
            words = lambda t: set(re.findall(r'\w{4,}', t.lower()))  # noqa: E731
            cap = words(' '.join(p.get('caption', '') for p in ps))
            scored = sorted(((len(cap & words(library[i]['msg'])), i) for i in cands), reverse=True)
            if scored[0][0] >= 3 and scored[0][0] > scored[1][0]:
                cands = [scored[0][1]]
        if len(cands) == 1:
            attach(cands[0], ps)
        else:
            unmatched.append((key, ps, len(cands)))
    return assigned, unmatched


def fetch(job):
    idx, n, src = job
    dst = OUT / f'{idx}-{n}.webp'
    if dst.exists():
        return dst, 'cached'
    for attempt in range(3):
        try:
            req = urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
            im = Image.open(io.BytesIO(data)).convert('RGB')
            if im.width > MAX_W:
                im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
            im.save(dst, 'WEBP', quality=78, method=6)
            return dst, 'ok'
        except Exception as e:  # noqa: BLE001
            err = e
            time.sleep(1 + attempt)
    return dst, f'error: {err}'


def early_posts(unmatched, library):
    """Posts older than the Content Library reaches: rebuilt from the full photo captions."""
    first = min(parse_date(lp['date']).date() for lp in library)
    posts = {}
    for key, ps, _ in unmatched:
        full = max((p.get('full') or '' for p in ps), key=len).lstrip('·· \n')
        date = next((d for d in (caption_date(p.get('dateLine') or p.get('caption', '')) for p in ps) if d), None)
        if len(full) < 40 or not date or date >= first:
            continue
        k = key_of(full)
        post = posts.setdefault(k, {'date': date.strftime('%d %b %Y'), 'msg': full, 'photos': []})
        have = {q['fbid'] for q in post['photos']}
        post['photos'] += [p for p in sorted(ps, key=lambda p: int(p['fbid'])) if p['fbid'] not in have]
    return sorted(posts.values(), key=lambda p: parse_date(p['date']), reverse=True)


def main():
    photos = json.loads((DATA / 'photos.json').read_text(encoding='utf-8'))
    library = json.loads((DATA / 'library.json').read_text(encoding='utf-8'))['posts']
    assigned, unmatched = group_photos(photos, library)
    OUT.mkdir(exist_ok=True)

    extra = early_posts(unmatched, library)
    for k, post in enumerate(extra):
        assigned[f'x{k}'] = post.pop('photos')
    (DATA / 'extra_posts.json').write_text(json.dumps({'posts': extra}, ensure_ascii=False, indent=1), encoding='utf-8')
    unmatched = [u for u in unmatched if not any(caption_date(p.get('dateLine') or p.get('caption', '')) for p in u[1])
                 or len(max((p.get('full') or '' for p in u[1]), key=len)) < 40]
    print(f'{len(extra)} early posts rebuilt from photo captions')

    jobs = [(idx, n + 1, p['img']['src']) for idx, ps in assigned.items() for n, p in enumerate(ps) if p.get('img')]
    print(f'{len(photos)} photos -> {len(assigned)} posts, {len(jobs)} images to fetch, {len(unmatched)} photo groups unmatched')
    results = Counter()
    with ThreadPoolExecutor(6) as ex:
        for dst, status in ex.map(fetch, jobs):
            results[status.split(':')[0]] += 1
            if status.startswith('error'):
                print(' ', dst.name, status)
    print(dict(results))
    size = sum(f.stat().st_size for f in OUT.glob('*.webp'))
    print(f'images dir: {size / 1e6:.1f} MB')
    for key, ps, c in unmatched[:40]:
        print(f'  unmatched: {len(ps)} photo(s), {c} candidates:', ps[0].get('caption', '')[:60])


if __name__ == '__main__':
    main()
