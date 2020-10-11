const CACHE_NAME = "englandLeague-v3";
let urlsToCache = [
    "/",
    "/css/materialize.min.css",
    "/css/style.css",
    "/img/contact/fb.png",
    "/img/contact/ig.png",
    "/img/contact/tgram.png",
    "/img/contact/wa.png",
    "/img/icons/icon1024.png",
    "/img/icons/icon144.png",
    "/img/icons/icon192.png",
    "/img/icons/icon48.png",
    "/img/icons/icon512.png",
    "/img/icons/icon72.png",
    "/img/icons/icon96.png",
    "/js/notification.js",
    "/js/api.js",
    "/js/db.js",
    "/js/idb.js",
    "/js/jquery.min.js",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/swregist.js",
    "/pages/about.html",
    "/pages/favourite.html",
    "/pages/home.html",
    "/pages/team.html",
    "/index.html",
    "/manifest.json",
    "nav.html",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    let base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return fetch(event.request).then((response) => {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then((response) => {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName != CACHE_NAME) {
                        console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', (event) => {
    let body;

    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    let options = {
        body: body,
        icon: 'img/icon48.png',
        badge: 'img/icon48.png',

        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
