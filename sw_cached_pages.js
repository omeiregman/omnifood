const cacheName = 'v1';

const cacheAssets = [
    'home.html',
    '/resources/css/*',
    '/resources/img/',

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

self.addEventListener('activate', (e) => {
    
})