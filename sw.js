const CACHE_NAME = 'sfa-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
  // Jika anda ada masukkan gambar di folder assets ke dalam HTML, senaraikannya di sini:
  // './assets/icon-192.png',
  // './assets/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada dalam cache, guna cache. Jika tiada, ambil dari internet.
        return response || fetch(event.request);
      })
  );
});
