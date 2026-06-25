// Self-Destructing Service Worker
self.addEventListener('install', (e) => {
    // Instantly install the new worker
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    // When activated, hunt down and destroy EVERY old cache vault
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            // Take control of the page and force it to use the network
            self.clients.claim();
        })
    );
});
