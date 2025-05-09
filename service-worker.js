const CACHE_NAME = 'transaction-images-cache-v1';
const IMAGE_URLS = [
  'IMG-20250509-WA0011.jpg',
  'ChatGPT Image May 9, 2025, 03_05_18 PM.png',
  'ChatGPT Image May 9, 2025, 02_30_28 PM.png',
  'https://www.paypalobjects.com/webstatic/icon/pp258.png',
  'InShot_20250509_153055158.jpg',
];

// Install the service worker and cache images
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(IMAGE_URLS))
  );
});

// Activate event to clean up old caches if needed
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

// Fetch event to serve cached images
self.addEventListener('fetch', event => {
  if (IMAGE_URLS.some(url => event.request.url.includes(url))) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
