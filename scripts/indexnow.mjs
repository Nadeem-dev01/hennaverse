// Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Naver, Seznam).
// Run after a deploy: `npm run indexnow`
// Submit only specific URLs: `npm run indexnow -- https://www.mehndidesignhenna.com/blog/some-post`

const HOST = "www.mehndidesignhenna.com";
const BASE_URL = `https://${HOST}`;
// The key is public by design — it is served from /public/<key>.txt so search
// engines can verify we own the host.
const KEY = "20674103685b4ffc824ee84909fb3261";
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
// IndexNow accepts at most 10,000 URLs per request.
const BATCH_SIZE = 10000;

async function getSitemapUrls() {
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].trim().replace(/&amp;/g, "&")
  );
}

async function checkKeyFile() {
  const res = await fetch(KEY_LOCATION);
  const body = res.ok ? (await res.text()).trim() : "";
  if (body !== KEY) {
    throw new Error(
      `Key file not live at ${KEY_LOCATION} (status ${res.status}). Deploy first, then re-run.`
    );
  }
}

async function main() {
  await checkKeyFile();

  const cliUrls = process.argv.slice(2);
  const urls = cliUrls.length > 0 ? cliUrls : await getSitemapUrls();
  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const urlList = urls.slice(i, i + BATCH_SIZE);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
    });
    // 200 = accepted, 202 = accepted but key validation still pending.
    console.log(`Batch ${i / BATCH_SIZE + 1}: ${res.status} ${res.statusText} (${urlList.length} URLs)`);
    if (!res.ok) {
      console.error(await res.text());
      process.exitCode = 1;
    }
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
