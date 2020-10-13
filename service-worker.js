importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'
);

if (workbox) {
    console.log(`Workbox Loaded`);
    workbox.precaching.precacheAndRoute(
        [
            {url: "/", revision: "1"},
            {url: "/css/materialize.min.css", revision: "1"},
            {url: "/css/style.css", revision: "1"},
            {url: "/img/contact/fb.png", revision: "1"},
            {url: "/img/contact/ig.png", revision: "1"},
            {url: "/img/contact/tgram.png", revision: "1"},
            {url: "/img/contact/wa.png", revision: "1"},
            {url: "/img/icons/icon1024.png", revision: "1"},
            {url: "/img/icons/icon144.png", revision: "1"},
            {url: "/img/icons/icon192.png", revision: "1"},
            {url: "/img/icons/icon48.png", revision: "1"},
            {url: "/img/icons/icon512.png", revision: "1"},
            {url: "/img/icons/icon72.png", revision: "1"},
            {url: "/img/icons/icon96.png", revision: "1"},
            {url: "/js/notification.js", revision: "1"},
            {url: "/js/app.js", revision: "1"},
            {url: "/js/api.js", revision: "5"},
            {url: "/js/db.js", revision: "1"},
            {url: "/js/idb.js", revision: "1"},
            {url: "/js/jquery.min.js", revision: "1"},
            {url: "/js/materialize.min.js", revision: "1"},
            {url: "/js/nav.js", revision: "2"},
            {url: "/js/swregist.js", revision: "1"},
            {url: "/pages/about.html", revision: "1"},
            {url: "/pages/favourite.html", revision: "1"},
            {url: "/pages/home.html", revision: "1"},
            {url: "/pages/team.html", revision: "1"},
            {url: "/index.html", revision: "1"},
            {url: "/manifest.json", revision: "1"},
            {url: "nav.html", revision: "1"},
            {url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1"},
            {url: "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2", revision: "1"},
            {url: "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js", revision: "1"}
        ],
        {
            ignoreUrlParametersMatching: [/.*/]
        }
    );
    
    
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.networkFirst({
            cacheName: 'EnglandLeague'
        })
    );
}
else {
    console.log(`Workbox fail to load`);
} 

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
