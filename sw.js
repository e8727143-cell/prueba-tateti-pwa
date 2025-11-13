
const CACHE = 'tateti-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/components/Board.tsx',
  '/components/GameStatus.tsx',
  '/components/Modal.tsx',
  '/components/Scoreboard.tsx',
  '/components/Square.tsx',
  '/icons/icon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      console.log('Installing service worker and caching app shell');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE) {
          console.log('Deleting old cache:', key);
          return caches.delete(key);
        }
        return Promise.resolve();
      })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') {
    return;
  }

  // Strategy: Cache First, then Network
  e.respondWith(
    caches.match(request).then(cachedResponse => {
      // Return cached response if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise, fetch from network
      return fetch(request).then(networkResponse => {
        // A response is a stream and can only be consumed once.
        // We need to clone it to put one copy in cache and serve the other.
        const responseToCache = networkResponse.clone();
        
        caches.open(CACHE).then(cache => {
            // We don't want to cache failed requests
            if(networkResponse.ok) {
                 cache.put(request, responseToCache);
            }
        });

        return networkResponse;
      }).catch(() => {
        // If the network fails and there's no cached response, the request will fail.
        // This is expected for resources not in the initial cache list when offline.
        // For a simple app like this, pre-caching all assets is the most reliable approach.
      });
    })
  );
});
