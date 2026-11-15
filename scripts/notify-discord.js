// Posts new blog/news articles to a Discord channel through a webhook.
// Used by the "notify" job in .github/workflows/deploy.yml, which passes the files added by the push:
// With DISCORD_BOT_TOKEN also set, it opens a discussion thread on each announcement.
//   DISCORD_WEBHOOK_URL=... SITE_URL=https://hcmute-dsc.io.vn node scripts/notify-discord.js news/2026-10-19-x/index.md ...

const fs = require('fs');

const WEBHOOK = process.env.DISCORD_WEBHOOK_URL;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN; // optional: when set, each announcement also gets a discussion thread
const SITE_URL =(process.env.SITE_URL || 'https://hcmute-dsc.io.vn').replace(/\/$/, '');

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

  // wait=true makes Discord return the created message, which we need to start a thread on it
  const res = await fetch(WEBHOOK + (WEBHOOK.includes('?') ? '&' : '?') + 'wait=true', {
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

  const message = await res.json();
  await createThread(message, meta.title || folderSlug);
}

// A webhook cannot open threads, so this needs a bot in the server with the
// "View Channel" and "Create Public Threads" permissions on the channel.
// A failure here only warns: the announcement itself has already been posted.
async function createThread(message, title) {
  if (!BOT_TOKEN) return;
  const res = await fetch(`https://discord.com/api/v10/channels/${message.channel_id}/messages/${message.id}/threads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bot ${BOT_TOKEN}` },
    body: JSON.stringify({
      name: `💬 ${title}`.slice(0, 100), // Discord limits thread names to 100 characters
      auto_archive_duration: 10080, // archive after 7 days without activity
    }),
  });
  if (!res.ok) {
    console.warn(`Could not create a thread (${res.status}): ${await res.text()}`);
    return;
  }
  console.log('Created discussion thread');
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
