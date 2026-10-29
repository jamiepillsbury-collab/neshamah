/* Neshamah offline cache. Bump CACHE when shipping a new version. */
const CACHE = "neshamah-v2.25";
const CORE = ["./", "index.html", "prayers.js", "practices.js", "oracle.js", "library.js", "odyssey.js", "manifest.webmanifest",
  "icon-192.png", "icon-512.png", "icon.svg"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(
    ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const host = new URL(r.url).hostname;
  if (host === "fonts.googleapis.com" || host === "fonts.gstatic.com") {
    // fonts: cache-first so Hebrew keeps its font offline
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => {
      const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); return res;
    })));
    return;
  }
  if (new URL(r.url).origin !== location.origin) return;
  if (r.mode === "navigate") {
    // network first, so a new version shows up as soon as you're online
    e.respondWith(fetch(r).then(res => {
      const cp = res.clone();
      caches.open(CACHE).then(c => c.put("index.html", cp));
      return res;
    }).catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => {
    if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); }
    return res;
  })));
});
