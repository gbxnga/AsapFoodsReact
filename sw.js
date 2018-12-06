//importScripts('workbox-sw.prod.v2.1.3.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
/*const fileManifest = [
  {
    "url": "index.html",
    "revision": "39a67acdc9bc55b91af0a2957f58f9ea"
  },
  {
    "url": "src/css/bootstrap.min.css",
    "revision": "ec3bb52a00e176a7181d454dffaea219"
  },
  {
    "url": "src/css/check-btn-style.css",
    "revision": "5aba04456b4add797f5a6df231a53754"
  },
  {
    "url": "src/css/main.css",
    "revision": "f0ea8c796d1fa45dbb4c209e2ab55320"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute(/https:\/\/hacker-news.firebaseio.com/, workboxSW.strategies.staleWhileRevalidate({}), 'GET');*/

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {

  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.networkFirst()
  );

  workbox.routing.registerRoute(
    // Cache CSS files
    /.*\.css/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: 'css-cache',
    })
  );
  
  workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );


  const matchCb = ({url, event}) => {
    return (url.pathname === '/');
  };

  workbox.routing.registerRoute(matchCb, workbox.strategies.networkFirst());

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

self.addEventListener('openWindow', function() {
  console.log('WINDOW OPEND');
});
/*self.openWindow(url).then(function(WindowClient) {
  // do something with your WindowClient
  console.log('WINDOW OPEND');
});*/
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(event)
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Asapfoods';
  const data = JSON.parse(event.data.text()); 
  const options = {
      body: data.message || 'You have a notification',
      icon: 'src/icons/logo 48.png',
      badge: 'src/icons/logo 96.png',
      data: data
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', function(event) {
  console.log(event)
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();
  const orderId = event.notification.data.order_id ;
  if (orderId) {
   // let uri = 
  }
  console.log(event.target.location.host);

  event.waitUntil(
      clients.openWindow(event.target.location.host+'/view-order/'+orderId)
  );
});
