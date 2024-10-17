// service-worker.js

const CACHE_NAME = 'isteagram-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/camara.html',
  '/styles.css',
  '/camera.js',
  '/index.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Instalar el Service Worker y cachear archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activar el Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Caché vieja eliminada');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar las peticiones y servir archivos desde el caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
