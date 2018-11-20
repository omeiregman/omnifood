const cacheName = 'v1';

//call Install Event 

self.addEventListener('install', (e) => {
 
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
    e.respondWith(
        fetch(e.request)
        .then(res => {
            //Make clone of response 
            const resClone = res.clone();
            //Open a cache
            caches
                .open(cacheName)
                .then(cache => {
                    //Add response to cache
                    cache.put(e.request, resClone);
                });
                return res;
        }).catch(err => caches.match(e.request).then(res => res))
        );
});