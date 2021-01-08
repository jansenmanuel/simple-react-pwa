const dynamicCacheName = 'dynamic-cache-v1';

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};

// install
self.addEventListener('install', event => {
    console.log('sw is installed', event);
});

// activate
self.addEventListener('activate', event => {
    console.log('sw is activated', event);
})

// fetch
self.addEventListener('fetch', event => {
    console.log('sw fetch event', event);
    event.respondWith(
        fetch(event.request).then(dynamicRes => {
            return caches.open(dynamicCacheName).then(cache => {
                cache.put(event.request.url, dynamicRes.clone())
                // check cached items size
                limitCacheSize(dynamicCacheName, 255);
                return dynamicRes
            })
        }).catch(function () {
            return caches.match(event.request);
        })
    );
});