const CACHE_NAME = 'transaction-images-cache-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'balance.html',
  'profile.html',
  'IMG-20250509-WA0011.jpg',
  'ChatGPT Image May 9, 2025, 03_05_18 PM.png',
  'ChatGPT Image May 9, 2025, 02_30_28 PM.png',
  'https://www.paypalobjects.com/webstatic/icon/pp258.png',
  'InShot_20250509_153055158.jpg',
  'icon_192.png',
  'icon_512.png',
];

// Install the service worker and cache important assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate: cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch: serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
