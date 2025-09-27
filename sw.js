const CACHE_NAME = "certificate-cache-v1";
const FILES_TO_CACHE = [
  "/",              // root
  "/index.html",    // your main file
  "/style.css",     // if you have a CSS file
  "/script.js",     // if you have JS file
  "/logo.png"       // your certificate/logo image (optional)
];

// Install Service Worker and Cache Files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Serve Files from Cache First
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Update Cache if needed
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
});
