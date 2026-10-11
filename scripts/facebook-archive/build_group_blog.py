"""Build blog posts from knowledge posts shared in the private Facebook group (groups/gdsc.hcmute).

Input: data/group_posts*.json dumps from the browser ({gp: {id: {name, preview}}, gd: {id: {ct, text, images}}}).
Only the posts listed in POSTS are published; the authors agreed to have them on the public blog.
"""
import io
import json
import re
import sys
import unicodedata
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

from PIL import Image

from build_news import redact, slugify, yaml_str

ROOT = Path(__file__).resolve().parents[2]
DATA = Path(__file__).resolve().parent / 'data'
OUT = ROOT / 'blog'
VN = timezone(timedelta(hours=7))
MAX_IMAGES = 10
MAX_SIDE = 1280

AUTHORS = {
    'Nguyễn Huỳnh Minh Tiến': 'tiennhm',
    'Võ Trần Minh Quân': 'vtmquan',
    'Lee Cường': 'leecuong',
    'Lê Duy Khiêm': 'leduykhiem',
    'Lã Minh Phúc': 'laminhphuc',
    'HCM UTE Developer Student Club': 'hcmute-dsc',
}

# id -> (slug, title, tags); title None = first heading of the post
POSTS = {
    '1422246062720068': ('diagram-design-ai-agent', None, ['ai', 'diagram', 'claude']),
    '1270844434526899': ('canh-bao-bao-mat-axios', 'Cảnh báo bảo mật liên quan đến package Axios', ['security', 'javascript', 'npm']),
    '1142131217398222': ('google-ai-pro-mien-phi-cho-sinh-vien', 'Google AI Pro miễn phí 1 năm cho sinh viên', ['ai', 'gemini', 'google']),
    '1138367367774607': ('quan-ly-nhieu-phien-ban-jdk', 'Quản lý nhiều phiên bản JDK, Maven, Gradle cho dân Java', ['java', 'tooling']),
    '960088808935798': ('git-commands', 'Những lệnh Git hay dùng', ['git']),
    '958091755802170': ('leetcode-bit-manipulation', 'LeetCode daily: thử sức với Bit Manipulation', ['leetcode', 'algorithm']),
    '956745302603482': ('leetcode-minimum-length-of-string', 'LeetCode daily: bài medium có lời giải bất ngờ', ['leetcode', 'algorithm']),
    '788663402745007': ('review-khoa-hoc-aws-saa-c03', 'Review khoá học Ultimate AWS Certified Solutions Architect Associate', ['aws', 'cloud', 'review']),
    '788403456104335': ('notes-ocp-java-se-17', 'Notes luyện thi Oracle Certified Professional Java SE 17', ['java', 'certificate']),
    '696679071943441': ('khoa-hoc-data-analytics-mien-phi', 'Khóa học Data Analytics miễn phí', ['data', 'course']),
    '691047492506599': ('don-nhan-thay-doi-trong-cong-viec', 'Đón nhận sự thay đổi trong công việc', ['career', 'soft-skills']),
    '690572065887475': ('vietnam-it-market-report-2023', 'Vietnam IT Market Report 2023', ['career', 'report']),
    '479427467001937': ('gioi-thieu-capture-the-flag', 'Giới thiệu về Capture The Flag (CTF)', ['security', 'ctf']),
    '459617518982932': ('tailwind-css-trang-web-luyen-front-end', 'Các trang web hay để luyện Front-end với Tailwind CSS', ['frontend', 'tailwind', 'css']),
    '397184405226244': ('powertoys-cho-windows', 'PowerToys: bộ tiện ích nhỏ mà có võ cho Windows', ['windows', 'tooling']),
    '340257450918940': ('bo-go-tieng-viet-khi-code', 'Bộ gõ tiếng Việt khi code', ['tooling', 'tips']),
}

# post id -> 1-based positions of photos to leave out (they show personal data: student IDs, emails...)
SKIP_PHOTOS = {
    '397184405226244': {1},
}

HASHTAG_LINK =re.compile(r'\[#(\w+)\]\(https?://www\.facebook\.com/hashtag/[^)]*\)')
CLUB_TAG = re.compile(r'(?<!\w)#(?:gdsc|hcmute)_?\w*', re.I)
FENCE = re.compile(r'^\s*```')


def load():
    gp, gd = {}, {}
    for f in sorted(DATA.glob('group_posts*.json'), key=lambda p: p.stat().st_mtime):
        d = json.loads(f.read_text(encoding='utf-8'))
        gp.update(d['gp'])
        gd.update({k: v for k, v in d['gd'].items() if v.get('text')})
    return gp, gd


def sidebar_images(gd):
    """The group's "Recent media" box is on every post page: an image seen on 3+ posts belongs to it."""
    seen = {}
    for v in gd.values():
        for im in v.get('images', []):
            seen[im['key']] = seen.get(im['key'], 0) + 1
    return {k for k, n in seen.items() if n >= 3}


def mdx_escape(line):
    """Escape what MDX 1 would parse as JSX, outside inline code."""
    parts = re.split(r'(`[^`]*`)', line)
    for i in range(0, len(parts), 2):
        parts[i] = (parts[i].replace('<', '&lt;').replace('>', '&gt;')
                    .replace('{', '&#123;').replace('}', '&#125;'))
    return ''.join(parts)


def to_markdown(text):
    """The group posts are already markdown (Facebook's editor): tidy it for MDX and keep line breaks."""
    t = unicodedata.normalize('NFC', text).replace('\r', '').replace(chr(0x2028), '\n')
    t = HASHTAG_LINK.sub(r'#\1', t)
    t = CLUB_TAG.sub('', t)
    tracker = re.compile(r'([?&])(fbclid|utm_\w+|__cft__\[0\]|__tn__|__eep__)=[^&\s)]+&?')
    while tracker.search(t):
        t = tracker.sub(r'\1', t)
    t = re.sub(r'(https?://\S+?)[?&]+(?=[\s)]|$)', r'\1', t)
    t = re.sub(r'@(mọi người|everyone)\b', r'mọi người', t)
    t = redact(t)
    out, fenced = [], False
    lines = t.split('\n')
    for i, line in enumerate(lines):
        if FENCE.match(line):
            fenced = not fenced
            out.append(line)
            continue
        if fenced:
            out.append(line)
            continue
        line = line.rstrip()
        if line.startswith('>'):  # quote marker stays, escape the rest
            line = '>' + mdx_escape(line[1:])
        else:
            line = mdx_escape(line)
        nxt = lines[i + 1].strip() if i + 1 < len(lines) else ''
        structural = re.match(r'^\s*([#>*+-]|\d+\.)\s', line) or re.match(r'^\s*([#>*+-]|\d+\.)\s', nxt)
        if line.strip() and nxt and not structural and not FENCE.match(nxt):
            line += '  '  # Facebook line breaks are hard breaks
        out.append(line)
    md = '\n'.join(out)
    md = re.sub(r'\n{3,}', '\n\n', md).strip()
    return md


def first_heading(md):
    m = re.search(r'^#+\s+(.+)$', md, re.M)
    return re.sub(r'[*_]', '', m.group(1)).strip() if m else None


def drop_heading(md, title):
    """The title is in the front matter: drop the same line from the body."""
    lines = md.split('\n')
    key = lambda s: re.sub(r'[\W_]+', '', s.lower())  # noqa: E731
    if lines and (lines[0].startswith('#') or key(lines[0]).startswith(key(title)[:40])):
        lines = lines[1:]
    return '\n'.join(lines).strip()


def description(md, n=180):
    t = re.sub(r'[#>*_`\[\]]|\(https?://[^)]*\)|&#\d+;|&lt;|&gt;', ' ', md)
    t = re.sub(r'\s+', ' ', t).strip()
    return t if len(t) <= n else t[:n].rsplit(' ', 1)[0] + '…'


def fetch_image(url, dest):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        im = Image.open(io.BytesIO(r.read()))
    im = im.convert('RGB')
    im.thumbnail((MAX_SIDE, MAX_SIDE))
    im.save(dest, 'WEBP', quality=82)


def main():
    gp, gd = load()
    skip = sidebar_images(gd)
    missing = [i for i in POSTS if i not in gd]
    for pid, (slug, title, tags) in POSTS.items():
        if pid not in gd:
            continue
        v = gd[pid]
        name = gp[pid]['name']
        author = AUTHORS.get(name)
        if not author:
            sys.exit(f'no author key for {name!r} ({pid})')
        date = datetime.fromtimestamp(int(v['ct']), VN).date()
        folder = OUT / f'{date}-{slug}'
        folder.mkdir(parents=True, exist_ok=True)
        md = to_markdown(v['text'])
        title = title or first_heading(md) or slug
        body = drop_heading(md, title)

        images = []
        photos = [im for im in v.get('images', []) if im['key'] not in skip and min(im['w'], im['h']) >= 200]
        for pos, im in enumerate(photos, 1):
            if pos in SKIP_PHOTOS.get(pid, ()) or len(images) >= MAX_IMAGES:
                continue
            dest = folder / f'img-{len(images) + 1}.webp'
            if not dest.exists():
                try:
                    fetch_image(im['u'], dest)
                except Exception as e:  # expired CDN link: keep the text
                    print('  image failed', pid, e)
                    continue
            images.append(dest.name)

        fm = ['---', f'slug: {slug}', f'title: {yaml_str(title)}', f'authors: [{author}]',
              f'tags: [{", ".join(tags + ["chia-se-tu-group"])}]',
              f'description: {yaml_str(description(body))}']
        if images:
            fm.append(f'image: ./{images[0]}')
        fm += ['---', '']
        paras = body.split('\n\n')
        lead, rest = paras[0], '\n\n'.join(paras[1:])
        parts = [lead, '<!--truncate-->']
        if rest:
            parts.append(rest)
        if images:
            gallery = '\n'.join(f'![{yaml_str(title)[1:-1]} ({i + 1})](./{n})' for i, n in enumerate(images))
            parts.append('<div className="news-gallery">\n\n' + gallery + '\n\n</div>')
        parts.append(f'_Bài viết được chia sẻ lần đầu trong group nội bộ của CLB ngày {date:%d/%m/%Y}._')
        (folder / 'index.md').write_text('\n'.join(fm) + '\n\n'.join(parts) + '\n', encoding='utf-8')
        print(f'{date} {slug} [{author}] {len(images)} img')
    if missing:
        print('not fetched yet:', ', '.join(missing))


if __name__ == '__main__':
    main()
