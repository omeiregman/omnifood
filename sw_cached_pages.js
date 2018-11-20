const cacheName = 'v1';

const cacheAssets = [
    'home.html'

]


//call Install Event 

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log("service worker: caching files");
            cache.addAll(cacheAssets);
        }).then(() => self.skipWaiting())
    )
})


//Call activate Event
self.addEventListener('activate', (e) => {  
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call fetch event
self.addEventListener('fetch', e => {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});