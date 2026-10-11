"""Turn the scraped Facebook posts of facebook.com/hcmute.dsc into posts of the `news` blog.

Inputs (scripts/facebook-archive/data/):
  library.json  posts from the Page's Content Library: date + full text (line breaks flattened)
  images/       photos downloaded by fetch_images.py, named <library index>-<n>.<ext>

Output: news/<yyyy-mm-dd>-<slug>/index.md (+ images), one folder per post.

Usage: python scripts/facebook-archive/build_news.py
"""
import json
import re
import shutil
import unicodedata
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = Path(__file__).resolve().parent / 'data'
OUT = ROOT / 'news'
THIS_YEAR = 2026  # Content Library omits the year for posts of the current year

# --- what to leave out --------------------------------------------------------
SKIP_PATTERNS = [
    r'h[ỗo] tr[ợo] truy[ềe]n th[ôo]ng',  # media-partner reposts for other organisations
    r'^.{0,40}\bhttt\b',                 # same, abbreviated
]
HOLIDAY = re.compile(
    r'(ch[úu]c m[ừu]ng|m[ừu]ng|ch[àa]o m[ừu]ng|k[ỷy] ni[ệe]m|h[ướ]+ng v[ềe]).{0,40}'
    r'(20/10|20/11|8/3|ph[ụu] n[ữu]|nh[àa] gi[áa]o|t[ếe]t|n[ăa]m m[ớo]i|trung thu|gi[áa]ng sinh|noel|qu[ốo]c kh[áa]nh|30/4|'
    r'gi[ỗo] t[ổo]|th[àa]nh l[ậa]p khoa|th[àa]nh l[ậa]p [đd]o[àa]n|qu[ốo]c t[ếe]|gi[ảa]i ph[óo]ng)'
    r'|gi[ỗo] t[ổo] h[ùu]ng v[ươ]+ng|merry christmas|happy new year|happy women|th[ưu] ch[úu]c t[ếe]t|xu[âa]n (gi[áa]p|qu[ýy]|[ấa]t)',
    re.I,
)

# --- categories: exactly one per post, first match wins --------------------------
CATEGORIES = [
    ('doi-song-clb', 'Đời sống CLB', 'Ban chủ nhiệm, tri ân, sinh nhật CLB và những khoảnh khắc của đại gia đình DSC',
     r'ban ch[ủu] nhi[ệe]m|tri [âa]n|throwback|kh[ảa]o s[áa]t|ch[úu]c m[ừu]ng.{0,30}t[ốo]t nghi[ệe]p|happy birthday|ch[àa]o 20\d\d|welcome 20\d\d|xin ch[àa]o 20\d\d|đ[ổo]i khung|đ[ổo]i m[àa]u [áa]o'),
    ('chia-se-kien-thuc', 'Chia sẻ kiến thức', 'Bài viết kỹ thuật, cẩm nang phỏng vấn, tin công nghệ và cơ hội nghề nghiệp',
     r'interviewprep|c[ẩa]m nang|handbook|tips|topic|ra m[ắa]t|c[ậa]p nh[ậa]t|top nh[ữu]ng|h[ọo]c b[ổo]ng|career ?connect|vi[ệe]c l[àa]m|chia s[ẻe] (kinh nghi[ệe]m|kh[áa]m ph[áa])|gi[ớo]i thi[ệe]u v[ềe] capture'),
    ('tuyen-thanh-vien', 'Tuyển thành viên', 'Các đợt tuyển thành viên, phỏng vấn và công bố thành viên mới qua từng Gen',
     r'tuy[ểe]n th[àa]nh vi[êe]n|ph[ỏo]ng v[ấa]n|danh s[áa]ch th[àa]nh vi[êe]n|check mail|ứng tuyển|generation|gi[ớo]i thi[ệe]u c[áa]c ban|gen 5|gen 3|th[àa]nh vi[êe]n c[âa]u l[ạa]c b[ộo]'),
    ('su-kien-cuoc-thi', 'Sự kiện & cuộc thi', 'Cuộc thi học thuật, hackathon, Study Jam, Learning Sprint và các sự kiện lớn',
     r'cu[ộo]c thi|hackathon|\bctf\b|challenge|contest|mastering it|olympic|kick ?-?off|kick of|summit|open day|info session|đ[ạa]i ti[ệe]c|study ?jam|journey|devfest|li[êe]n hoan|club.?s day|ch[ợo] thanh ni[êe]n|sudoku|minigame|t[âa]n sinh vi[êe]n'),
    ('workshop-sinh-hoat', 'Workshop & sinh hoạt', 'Workshop, training, sinh hoạt tuần và lớp ôn tập',
     r'workshop|training|sinh ho[ạa]t|l[ớo]p [ôo]n t[ậa]p|webinar|talkshow|seminar|offline|bu[ổo]i h[ọo]c'),
    ('thong-bao', 'Thông báo', 'Thông báo đăng ký, lịch hoạt động và kết quả',
     r'th[ôo]ng b[áa]o|đ[ăa]ng k[ýyí]|đ[óo]ng form|đ[óo]ng link|đ[óo]ng đ[ơo]n|m[ởo] đ[ơo]n|nh[ắa]c nh[ởo]|c[ôo]ng b[ốo]|k[ếe]t qu[ảa]|coming soon|countdown'),
]
DEFAULT_CATEGORY = CATEGORIES[0]

# --- topic tags: every match (max 4) ---------------------------------------------
TOPICS = [
    ('git-github', 'Git & GitHub', r'\bgit\b|github'),
    ('study-jam', 'Study Jam', r'study ?jam'),
    ('sql', 'SQL', r'\bsql\b'),
    ('interviewprep101', 'InterviewPrep101', r'interviewprep'),
    ('ctf', 'CTF & an toàn thông tin', r'\bctf\b|an to[àa]n th[ôo]ng tin|capture the flag'),
    ('hackathon', 'Hackathon', r'hackathon'),
    ('mastering-it', 'Mastering IT', r'mastering it'),
    ('linux', 'Linux', r'linux'),
    ('ai', 'AI', r'\bai\b|gemini|notebooklm|generative|nano banana|machine learning|vertex'),
    ('nghe-nghiep', 'Nghề nghiệp & doanh nghiệp', r'career connect|vi[ệe]c l[àa]m|tuy[ểe]n d[ụu]ng|hiring|office tour|doanh nghi[ệe]p|quy[ềe]n l[ợo]i lao [đd][ộo]ng|\bcv\b'),
    ('on-tap-nhap-mon', 'Ôn tập Nhập môn lập trình', r'nh[ậa]p m[ôo]n l[ậa]p tr[ìi]nh'),
    ('qa', 'Q&A', r'\bq ?& ?a\b|\bqa\b|gi[ảa]i đ[áa]p'),
    ('thiet-ke', 'Thiết kế', r'illustrator|figma|thi[ếe]t k[ếe] (cv|thi[ệe]p)|cv contest'),
    ('recap', 'Recap', r'recap|t[ổo]ng k[ếe]t|nh[ìi]n l[ạa]i|flex th[àa]nh ph[ẩa]m|memory|record bu[ổo]i'),
    ('ban-chu-nhiem', 'Ban chủ nhiệm', r'ban ch[ủu] nhi[ệe]m'),
]
GEN_RE = re.compile(r'\bgen\s?(\d)(?:th|rd)?\b|đ[ợo]t (\d)\b|generation[ -]+(\d)', re.I)
TITLE_MAX = 110

EMOJI = re.compile(
    '[\U0001F000-\U0001FAFF☀-➿⬀-⯿️‍⃣←-⇿'
    '⌀-⏿■-◿⤀-⥿〰〽]'
)
STATS_TAIL = re.compile(r'\n[\s\n]*(Published|HCMUTE Developer Student Club|HCM UTE Developer Student Club)\s*•[\s\S]*$')
URL = re.compile(r'(https?://[^\s<>()\[\]]+[^\s<>()\[\].,;:!?\'"”’)])')

# Words kept as written when a SHOUTY title is turned into sentence case
PROPER = {w.lower(): w for w in [
    'HCMUTE', 'DSC', 'GDSC', 'GDG', 'IT', 'CNTT', 'CLB', 'BTC', 'CV', 'SQL', 'API', 'AI', 'ML', 'CTF', 'QA', 'Q&A',
    'HKI', 'HKII', 'HK1', 'UTE', 'TP.HCM', 'HCMC', 'VN', 'KMS', 'FPT', 'IELTS', 'TOEIC', 'BCN', 'ITUTE', 'UI', 'UX',
    'OOP', 'DSA', 'IoT', 'Git', 'GitHub', 'Gen', 'DevOps', 'Linux', 'Python', 'Java', 'Spring', 'React', 'Angular',
    'Next.js', 'NestJS', 'DotNet', 'Google', 'Gemini', 'NotebookLM', 'Colab', 'Android', 'Kotlin', 'Flutter',
    'Illustrator', 'Figma', 'Docker', 'Vertex', 'Cloud', 'Vietnam', 'Việt', 'Nam', 'Study', 'Jam', 'Hackathon',
    'Summit', 'DevFest', 'Mastering', 'InterviewPrep101', 'HCMUTE_CTF', 'Junction', 'Orient', 'Journey', 'Info',
    'Session', 'Open', 'Day', 'Learning', 'Sprint', 'Career', 'Connect', 'Sudoku', 'Master',
]}


def parse_date(s):
    s = s.split(' at ')[0].strip()
    if not re.search(r'\d{4}', s):
        s += f' {THIS_YEAR}'
    return datetime.strptime(s, '%d %b %Y')


def norm(s):
    return re.sub(r'\s+', ' ', s).strip()


def key_of(text):
    """Comparable prefix: letters/digits only, so emoji/markdown/whitespace differences don't matter."""
    t = unicodedata.normalize('NFC', text).replace('**', '')
    return re.sub(r'[^\w]+', '', t.lower())[:60]


def slugify(s, n=60):
    s = s.replace('đ', 'd').replace('Đ', 'D')
    s = ''.join(c for c in unicodedata.normalize('NFKD', s) if not unicodedata.combining(c))
    s = re.sub(r'[^a-zA-Z0-9]+', '-', s).strip('-').lower()
    return s[:n].rstrip('-') or 'post'


def clean_title(t):
    t = EMOJI.sub('', t).replace('**', '').replace('__', '')
    t = re.sub(r'^[#\s]+', '', t)
    return norm(t).strip(' -–|:')


STUDENT_ID = re.compile(r'\s*[-–—:(]?\s*(?:MSSV:?\s*)?\b(1[5-9]|2\d)(1\d{5}|[1-9]\d{6})\b\)?')


PHONE = re.compile(r'\s*[-–—:]?\s*(?:\(\+84\)|\+84|\b0)[1-9]\d{1,2}[ .]?\d{3}[ .]?\d{3,4}\b')


def redact(t):
    """Drop personal data that an archive doesn't need: student IDs (MSSV) and phone numbers."""
    return PHONE.sub('', STUDENT_ID.sub('', t))


def clean_library_text(msg):
    """Content Library flattens a post to one line and appends its stats; undo what we can."""
    t = STATS_TAIL.sub('', msg).strip()
    t = re.sub(r'\s*([_\-━—=─~*]{6,})\s*', r'\n\1\n', t)                       # separator lines
    t = re.sub(r'(?<=[.!?:\]”"…)])\s+(?=' + EMOJI.pattern + ')', '\n', t)     # emoji after a sentence starts a line
    t = redact(t)
    m = re.search(r'\s+((?:#\w+\s*){2,})$', t)                                   # trailing hashtags
    if m:
        t = t[:m.start()] + '\n\n' + norm(m.group(1))
    return t


def make_title(text):
    first = norm(text.replace('**', ''))
    m = re.match(r'^\W*?\[\s*([^\]]{2,200}?)\s*\]', first)
    if m:
        title = clean_title(m.group(1))
        if len(title) < 25:  # "[KICK OFF] - CUỘC THI ..." / "[TOPIC] TIPS ...": keep going
            tail = first[m.end():]
            tail = re.split(EMOJI.pattern + r'|_{3,}|-{3,}|━|\n', tail)[0]
            tail = clean_title(re.split(r'(?<=[.!?])\s', tail)[0])
            if tail:
                title = tail if re.fullmatch(r'topic|tips?', title, re.I) else f'{title} – {tail}'
    else:
        line = re.split(r'(?<=[.!?])\s', text.strip().split('\n')[0])[0]
        head = clean_title(re.split(EMOJI.pattern, line)[0])  # "#InterviewPrep101 - Part 8 | Next.js 🚀 CẨM NANG..."
        line = head if len(head) >= 12 else clean_title(line)
        # "“LEVEL UP YOUR CAREER” || GIỚI THIỆU DIỄN GIẢ Chớp mắt chỉ còn..." -> the shouty heading only
        words = line.split(' ')
        n = 0
        while n < len(words) and not any(c.islower() for c in words[n]):
            n += 1
        title = ' '.join(words[:n]).strip(' |-–:') if n >= 3 and n < len(words) else line
        # "InterviewPrep101 - Part 3 | OOP & System Design TỪ OOP ĐẾN SYSTEM DESIGN..." -> cut before the shouty run
        caps = lambda w: any(c.isalpha() for c in w) and not any(c.islower() for c in w)  # noqa: E731
        ws = title.split(' ')
        for i in range(2, len(ws) - 2):
            run = ws[i:i + 3]
            if all(map(caps, run)) and any(w.lower() not in PROPER for w in run) and any(c.islower() for c in ' '.join(ws[:i])):
                title = ' '.join(ws[:i]).strip(' |-–:')
                break
    if len(title) > TITLE_MAX:
        title = title[:TITLE_MAX].rsplit(' ', 1)[0] + '…'
    return title or 'Bài đăng'


def is_shouty(t):
    letters = [c for c in t if c.isalpha()]
    return bool(letters) and sum(c.isupper() for c in letters) / len(letters) > 0.8


def pretty_title(t):
    """FACEBOOK SHOUTY TITLES -> Sentence case, keeping acronyms and names."""
    if not is_shouty(t):
        return t
    out, cap_next = [], True
    for w in t.split(' '):
        m = re.match(r'^(\W*)(.*?)(\W*)$', w)
        pre, core, post = m.groups()
        if not core:
            out.append(w)
            cap_next = cap_next or bool(re.search(r'[–|:"“(]', w))
            continue
        low = core.lower()
        if low in PROPER:
            word = PROPER[low]
        elif re.search(r'\d|_', core) and re.search(r'[A-Za-z]', core):
            word = core.upper()
        elif cap_next or re.search(r'["“(]', pre):
            word = low[:1].upper() + low[1:]
        else:
            word = low
        out.append(pre + word + post)
        cap_next = bool(re.search(r'[–|:]$', post))
    return ' '.join(out)


def classify(text, title):
    """-> (category, [topic tags]); a tag is (slug, label)"""
    head = title.lower()
    hay = (title + ' ' + norm(text)[:500]).lower()
    cat = next((c for c in CATEGORIES if re.search(c[3], head, re.I)), None) \
        or next((c for c in CATEGORIES if re.search(c[3], hay, re.I)), DEFAULT_CATEGORY)
    topics = [(s, l) for s, l, rx in TOPICS if re.search(rx, hay, re.I)]
    m = GEN_RE.search(title) or (GEN_RE.search(hay) if cat[0] == 'tuyen-thanh-vien' else None)
    if m:
        n = next(g for g in m.groups() if g)
        topics.insert(0, (f'gen-{n}', f'Gen {n}'))
    return cat, topics[:4]


def to_markdown(text):
    """Escape a Facebook post so MDX 1 renders it literally, keeping its line breaks."""
    text = unicodedata.normalize('NFC', text).replace('\r', '').replace(' ', '\n')
    # some posts already carry markdown links: back to plain urls, they are re-linked below
    text = re.sub(r'\[([^\]\n]+)\]\((https?://[^)\s]+)\)', lambda m: m.group(2) if m.group(1).startswith('http') else f'{m.group(1)} {m.group(2)}', text)
    text = re.sub(r'([?&])fbclid=[^&\s]+&?', lambda m: m.group(1), text)  # Facebook click trackers
    text = re.sub(r'[?&](?=\s|$)', '', text)
    out = []
    for line in text.split('\n'):
        line = line.rstrip().replace('\\', '\\\\')
        line = line.replace('<', '&lt;').replace('>', '&gt;').replace('{', '&#123;').replace('}', '&#125;')
        line = re.sub(r'^(\s*)([#>+]|\d+\.|-(?!-))', lambda m: m.group(1) + '\\' + m.group(2), line)
        line = re.sub(r'(?<![\w*])\*(?!\*)', r'\\*', line)  # lone asterisks are not emphasis on Facebook
        line = line.replace('_', '\\_').replace('[', '\\[').replace(']', '\\]')
        line = URL.sub(lambda m: (lambda u: f'[{u}]({u})')(m.group(1).replace('\\_', '_').replace('\\[', '[').replace('\\]', ']')), line)
        out.append(line)
    md = '\n'.join(out)
    md = re.sub(r'\n(?!\n)', '  \n', md)  # Facebook line breaks are hard breaks
    md = re.sub(r'\n{3,}', '\n\n', md)
    return md.strip()


def lead_and_rest(body):
    """List view shows the lead: the first paragraph, or the first two lines of a one-paragraph post."""
    paras = body.split('\n\n')
    if len(paras) > 1 and len(paras[0]) < 900:
        return paras[0], '\n\n'.join(paras[1:])
    lines = body.split('  \n')
    return '  \n'.join(lines[:2]), '  \n'.join(lines[2:])


def yaml_str(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'


def main():
    library = json.loads((DATA / 'library.json').read_text(encoding='utf-8'))['posts']
    extra_file = DATA / 'extra_posts.json'
    extra = json.loads(extra_file.read_text(encoding='utf-8'))['posts'] if extra_file.exists() else []
    images_dir = DATA / 'images'

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()

    used_slugs, kept, skipped, with_imgs = set(), 0, [], 0
    cat_count, topic_count = {}, {}
    entries = list(enumerate(library)) + [(f'x{k}', p) for k, p in enumerate(extra)]
    for idx, p in entries:
        msg = STATS_TAIL.sub('', p['msg'])
        head = norm(msg)[:200]
        if any(re.search(pat, head, re.I) for pat in SKIP_PATTERNS) or HOLIDAY.search(head[:120]):
            skipped.append(head[:80])
            continue
        if norm(msg) in ('', 'No text content'):
            skipped.append(f'(no text) {p["date"]}')
            continue

        date = parse_date(p['date'])
        text = clean_library_text(p['msg'])
        title = pretty_title(make_title(text))
        slug = f'{date:%Y-%m-%d}-{slugify(title)}'
        while slug in used_slugs:
            slug += '-2'
        used_slugs.add(slug)

        folder = OUT / slug
        folder.mkdir()
        imgs = []
        if images_dir.exists():
            srcs = sorted(images_dir.glob(f'{idx}-*'), key=lambda x: int(x.stem.split('-')[1]))
            for src in srcs:
                dst = f'img-{len(imgs) + 1}{src.suffix}'
                shutil.copy2(src, folder / dst)
                imgs.append(dst)
        with_imgs += bool(imgs)

        cat, topics = classify(text, title)
        cat_count[cat[0]] = cat_count.get(cat[0], 0) + 1
        for t in topics:
            topic_count[t] = topic_count.get(t, 0) + 1
        lead, rest = lead_and_rest(to_markdown(text))

        # the category is also the first tag, so the theme lists posts of a category on its tag page
        fm = ['---', f'title: {yaml_str(title)}', f'date: {date:%Y-%m-%d}', f'category: {cat[0]}', 'tags:']
        for tid, label in [(cat[0], cat[1])] + topics:
            fm += [f'  - label: {yaml_str(label)}', f'    permalink: /{tid}']
        if imgs:
            fm.append(f'image: ./{imgs[0]}')
        fm.append(f'description: {yaml_str(norm(EMOJI.sub("", text.replace("**", "")))[:155])}')
        fm.append('---')

        alt = title.replace('[', '(').replace(']', ')')
        parts = ['\n'.join(fm), '', lead, '', '<!--truncate-->', '']
        if imgs:
            parts += [f'![{alt}](./{imgs[0]})', '']
        if rest:
            parts += [rest, '']
        if len(imgs) > 1:
            parts += ['<div className="news-gallery">', '']
            parts += [f'![{alt} ({i + 2})](./{im})' for i, im in enumerate(imgs[1:])]
            parts += ['', '</div>', '']
        parts += ['---', '', '_Bài viết được lưu trữ từ [fanpage HCMUTE Developer Student Club](https://www.facebook.com/hcmute.dsc)._', '']
        (folder / 'index.md').write_text('\n'.join(parts), encoding='utf-8')
        kept += 1

    taxonomy = {
        'categories': [{'slug': c[0], 'label': c[1], 'description': c[2], 'count': cat_count.get(c[0], 0)} for c in CATEGORIES],
        'tags': sorted(({'slug': s, 'label': l, 'count': n} for (s, l), n in topic_count.items()), key=lambda t: (-t['count'], t['label'])),
        'total': kept,
    }
    taxonomy_json = json.dumps(taxonomy, ensure_ascii=False, indent=2) + '\n'
    (ROOT / 'src' / 'data' / 'newsTaxonomy.json').write_text(taxonomy_json, encoding='utf-8')

    print(f'kept {kept} ({with_imgs} with images), skipped {len(skipped)}')
    print('categories:', {c['label']: c['count'] for c in taxonomy['categories']})
    for s in skipped:
        print('  skip:', s)


if __name__ == '__main__':
    main()
