'use strict';
const CACHE = 'cfa-reel-2026.08.17.03';
const CORE = [
  './',
  './index.html?v=20260817.03',
  './styles.css?v=20260817.03',
  './app.js?v=20260817.03',
  './manifest.webmanifest?v=20260817.03',
  './banks/fsa.js?v=20260817.03',
  './banks/equity.js?v=20260817.03',
  './icons/icon-180.png?v=20260817.03',
  './icons/icon-192.png?v=20260817.03',
  './icons/icon-512.png?v=20260817.03'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const sameOrigin = url.origin === self.location.origin;
  const isLegacyEthics = sameOrigin && (url.pathname.endsWith('/questions.js') || url.pathname.endsWith('/questions(1).js'));

  // Navigation is network-first so a GitHub Pages update can break through an older cached shell.
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      if (response.ok) caches.open(CACHE).then(cache => cache.put('./', response.clone()));
      return response;
    }).catch(() => caches.match('./')));
    return;
  }

  // Preserve the user's existing Ethics bank without bundling or overwriting it.
  if (isLegacyEthics) {
    event.respondWith(fetch(event.request, { cache: 'no-store' }).then(response => {
      if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match(event.request)));
    return;
  }

  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request)));
});
