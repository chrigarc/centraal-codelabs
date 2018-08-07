const dataCacheName = 'CentraalCodelabData-v1';
const cacheName = 'CentraalCodelab-1';
const filesToCache =  [
    '/index.html',
    '/images/manifest/icon-48x48.png',
    '/images/manifest/icon-96x96.png',
    '/images/manifest/icon-512x512.png',
    '/images/manifest/icon-72x72.png',
    '/images/manifest/icon-192x192.png',
    '/images/manifest/icon-144x144.png',
    '/images/favicon.ico',
    '/images/banner.jpg',
    '/src/users-view.html',
    '/src/labs-view.html',
    '/src/lab-view.html',
    '/src/centraal-codelabs-app.html',
    '/src/my-view404.html',
    '/bower_components/webcomponentsjs/custom-elements-es5-adapter.js',
    '/bower_components/webcomponentsjs/webcomponents-sd.js',
    '/bower_components/webcomponentsjs/webcomponents-hi-ce.js',
    '/bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js',
    '/bower_components/webcomponentsjs/webcomponents-ce.js',
    '/bower_components/webcomponentsjs/webcomponents-sd-ce.js',
    '/bower_components/webcomponentsjs/webcomponents-loader.js',
    '/bower_components/webcomponentsjs/webcomponents-hi.js',
    '/bower_components/webcomponentsjs/webcomponents-hi-sd.js',
    '/bower_components/webcomponentsjs/webcomponents-lite.js'
];


self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});