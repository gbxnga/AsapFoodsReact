var cacheName = 'asapfoods-cache-files-v8.0.2';

var filesToCache = [
    'src/css/bootstrap.min.css',
    'src/js/app.js',
    'src/js/user.js',
    'src/js/init.js',
    'src/js/facebookauth.js',
    'src/js/toast.js',
    'src/js/offline.js',
    'src/js/router.js',
    'src/js/push.js',
    'src/js/checkout.js',
    '/',
    'src/css/main.css',
    'src/css/check-btn-style.css'
];

// Install Service Worker
self.addEventListener('install', function(event) {

    //console.log('Service Worker: Installing....');
    self.skipWaiting();

    event.waitUntil(

        // Open the Cache
        caches.open(cacheName).then(function(cache) {
            //console.log('Service Worker: Caching App Shell at the moment......');

            // Add Files to the Cache
            return cache.addAll(filesToCache);
        })
    );
});

// Fired when the Service Worker starts up
self.addEventListener('activate', function(event) {

    console.log('Service Worker: Activating....');

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(key) {
                if (key !== cacheName) {
                    // console.log('Service Worker: Removing Old Cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

/*
    Fetch: This event helps serve the app shell from the cache. caches.match() dissects 
    the web request that triggered the event, and checks to see if it's available in the cache. It then either 
    responds with the cached version, or uses fetch to get a copy from the network. 
    The response is returned to the web page with e.respondWith().
*/
self.addEventListener('fetch', function(event) {

    //console.log('Service Worker: Fetch', event.request.url);

    //console.log("Url", event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('openWindow', function() {
    console.log('WINDOW OPEND');
});
/*self.openWindow(url).then(function(WindowClient) {
    // do something with your WindowClient
    console.log('WINDOW OPEND');
});*/
self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'ASAPFoods';
    const options = {
        body: event.data.text() || 'Ayo, your have a notification',
        icon: 'src/icons/logo 48.png',
        badge: 'src/icons/logo 96.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('https://asapfoods.360needs.ng/')
    );
});
self.addEventListener('message', function(event) {
    console.log("SW Received Message: " + event.data);
});