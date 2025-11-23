/**
 * Service Worker for Bolt Market PWA
 * Handles offline support, caching, and background sync
 */

const CACHE_NAME = 'bolt-market-v1';
const RUNTIME_CACHE = 'bolt-market-runtime-v1';
const ASSETS_CACHE = 'bolt-market-assets-v1';
const API_CACHE = 'bolt-market-api-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles/globals.css',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.log('Some assets failed to cache:', error);
        // Don't fail install if some assets can't be cached
      });
    })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              cacheName !== CACHE_NAME &&
              cacheName !== RUNTIME_CACHE &&
              cacheName !== ASSETS_CACHE &&
              cacheName !== API_CACHE
            );
          })
          .map((cacheName) => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  
  // Claim all clients immediately
  return self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // API requests - network first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response
          const responseClone = response.clone();
          
          // Cache successful API responses
          if (response.status === 200) {
            caches.open(API_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          
          return response;
        })
        .catch(() => {
          // Fall back to cache
          return caches.match(request).then((cached) => {
            return (
              cached ||
              new Response(
                JSON.stringify({ offline: true, message: 'You are offline' }),
                {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: new Headers({ 'Content-Type': 'application/json' }),
                }
              )
            );
          });
        })
    );
    return;
  }

  // HTML pages - network first
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return (
              cached ||
              caches.match('/offline.html')
            );
          });
        })
    );
    return;
  }

  // CSS, JS, Images - cache first
  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request).then((response) => {
          const responseClone = response.clone();
          caches.open(ASSETS_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
      );
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'sync-listings') {
    event.waitUntil(syncListings());
  }
  
  if (event.tag === 'sync-chat') {
    event.waitUntil(syncChat());
  }
  
  if (event.tag === 'sync-transactions') {
    event.waitUntil(syncTransactions());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    tag: data.tag || 'notification',
    requireInteraction: data.requireInteraction || false,
    data: data.data || {},
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Bolt Market', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Check if app is already open
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window if not already open
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

/**
 * Sync listings when back online
 */
async function syncListings() {
  try {
    const cache = await caches.open(API_CACHE);
    const requests = await cache.keys();
    
    const listingRequests = requests.filter((req) =>
      req.url.includes('/listings')
    );

    for (const request of listingRequests) {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.put(request, response);
        }
      } catch (error) {
        console.log('Failed to sync listing:', error);
      }
    }
  } catch (error) {
    console.error('Listings sync error:', error);
  }
}

/**
 * Sync chat messages when back online
 */
async function syncChat() {
  try {
    // Implementation for chat sync
    console.log('Syncing chat messages...');
  } catch (error) {
    console.error('Chat sync error:', error);
  }
}

/**
 * Sync transactions when back online
 */
async function syncTransactions() {
  try {
    // Implementation for transaction sync
    console.log('Syncing transactions...');
  } catch (error) {
    console.error('Transaction sync error:', error);
  }
}

// Message handling from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker loaded');
