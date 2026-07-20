self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // Peticiones estándar de red
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});