// GitHub Pages staging: a project site is served under /<repo>/, but the site's
// links are root-relative ("/meet-the-team", "/_astro/x.css"). After a normal
// `astro build`, this prefixes every root-relative URL in the built HTML and
// CSS with the base path so the staging copy works exactly like production.
// Production (Cloudflare, served at the domain root) never runs this.
//
//   node scripts/pages-base-path.mjs /lebanon-small-animal-clinic [dist]
import fs from "node:fs";
import path from "node:path";

const base = (process.argv[2] || "").replace(/\/$/, "");
const dist = process.argv[3] || "dist";
if (!base.startsWith("/")) {
  console.error("usage: node scripts/pages-base-path.mjs /<repo-name> [dist]");
  process.exit(1);
}

// "/x" → "/base/x"; leaves "//cdn", "#hash", absolute and already-prefixed URLs alone.
const fix = (url) => (url.startsWith("/") && !url.startsWith("//") && !url.startsWith(base + "/") && url !== base ? base + url : url);

const rewriteHtml = (html) =>
  html
    .replace(/\b(href|src|action|poster|data-src|data-href)=(["'])(\/[^"']*)\2/g, (_, a, q, u) => `${a}=${q}${fix(u)}${q}`)
    .replace(/\b(srcset|imagesrcset)=(["'])([^"']*)\2/g, (_, a, q, v) =>
      `${a}=${q}${v.split(",").map((part) => part.replace(/^(\s*)(\S+)/, (m, s, u) => s + fix(u))).join(",")}${q}`)
    .replace(/(http-equiv="refresh"\s+content="\d+;\s*url=)(\/[^"]*)/gi, (_, a, u) => a + fix(u))
    .replace(/url\((["']?)(\/[^)"']*)\1\)/g, (_, q, u) => `url(${q}${fix(u)}${q})`);

const rewriteCss = (css) => css.replace(/url\((["']?)(\/[^)"']*)\1\)/g, (_, q, u) => `url(${q}${fix(u)}${q})`);

let files = 0;
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.html?$/.test(entry.name)) { fs.writeFileSync(p, rewriteHtml(fs.readFileSync(p, "utf8"))); files++; }
    else if (/\.css$/.test(entry.name)) { fs.writeFileSync(p, rewriteCss(fs.readFileSync(p, "utf8"))); files++; }
  }
};
walk(dist);
// Pages has no _redirects support; the meta-refresh fallback pages cover old URLs.
fs.rmSync(path.join(dist, "_redirects"), { force: true });
// Serve files as-is (no Jekyll processing of _astro/).
fs.writeFileSync(path.join(dist, ".nojekyll"), "");
console.log(`pages-base-path: prefixed root-relative URLs with ${base} in ${files} files`);
