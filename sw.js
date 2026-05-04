// Interval Trainer — service worker for offline support
const CACHE_NAME = 'interval-trainer-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Cache-first for same-origin assets, network-first for fonts (Google Fonts CDN)
  const url = new URL(event.request.url);
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request).then((resp) => {
        // Cache new same-origin responses opportunistically
        const respClone = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, respClone)).catch(() => {});
        return resp;
      }).catch(() => caches.match('./index.html')))
    );
  } else {
    // Cross-origin (e.g. Google Fonts): try network, fall back to cache
    event.respondWith(
      fetch(event.request).then((resp) => {
        const respClone = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, respClone)).catch(() => {});
        return resp;
      }).catch(() => caches.match(event.request))
    );
  }
});
