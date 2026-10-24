// Posts new blog/news articles to a Discord channel through a webhook.
// Used by the "notify" job in .github/workflows/deploy.yml, which passes the files added by the push:
//   DISCORD_WEBHOOK_URL=... SITE_URL=https://hcmute-dsc.io.vn node scripts/notify-discord.js news/2026-10-19-x/index.md ...

const fs = require('fs');

const WEBHOOK = process.env.DISCORD_WEBHOOK_URL;
const SITE_URL = (process.env.SITE_URL || 'https://hcmute-dsc.io.vn').replace(/\/$/, '');

// news/2026-10-19-some-slug/index.md  ->  /news/2026/10/19/some-slug
const POST_PATH = /^(news|blog)\/(\d{4})-(\d{2})-(\d{2})-([^/]+?)(?:\.mdx?|\/index\.mdx?)$/;

function frontMatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fields = {};
  if (!match) return fields;
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(title|slug|description):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (/^".*"$/.test(value)) value = value.slice(1, -1).replace(/\\"/g, '"');
    else if (/^'.*'$/.test(value)) value = value.slice(1, -1).replace(/''/g, "'");
    fields[kv[1]] = value;
  }
  return fields;
}

async function notify(file) {
  const match = file.match(POST_PATH);
  if (!match) return;
  const [, section, year, month, day, folderSlug] = match;
  const meta = frontMatter(fs.readFileSync(file, 'utf8'));
  // Docusaurus: a front-matter slug replaces the whole post path, otherwise the path is /<section>/yyyy/mm/dd/<folder slug>
  const path = meta.slug
    ? `/${section}/${meta.slug.replace(/^\//, '')}`
    : `/${section}/${year}/${month}/${day}/${folderSlug}`;
  const url = `${SITE_URL}${path}`;

  const res = await fetch(WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'HCMUTE DSC',
      content: section === 'news' ? '📣 Có hoạt động mới trên website nè mọi người ơi!' : '📝 Có bài blog mới nè!',
      embeds: [
        {
          title: meta.title || folderSlug,
          url,
          description: meta.description || undefined,
          color: 0x4285f4,
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Discord webhook failed (${res.status}) for ${file}: ${await res.text()}`);
  console.log(`Posted ${url}`);
}

async function main() {
  if (!WEBHOOK) {
    console.log('DISCORD_WEBHOOK_URL is not set, skipping.');
    return;
  }
  for (const file of process.argv.slice(2)) await notify(file);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
