importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')

workbox.precaching.precacheAndRoute([{
        url: '/index.html',
        revision: '1'
    },
    {
        url: '/manifest.json',
        revision: '1'
    },
    {
        url: '/assets/component/nav.html',
        revision: '1'
    },
    {
        url: '/assets/css/materialize.min.css',
        revision: '1'
    },
    {
        url: '/assets/css/style.css',
        revision: '1'
    },
    {
        url: '/assets/js/materialize.min.js',
        revision: '1'
    },
    {
        url: '/assets/js/api.js',
        revision: '1'
    },
    {
        url: '/assets/js/clubById.js',
        revision: '1'
    },
    {
        url: '/assets/js/db.js',
        revision: '1'
    },
    {
        url: '/assets/js/dom.js',
        revision: '1'
    },
    {
        url: '/assets/js/idb.js',
        revision: '1'
    },
    {
        url: '/assets/js/index.js',
        revision: '1'
    },
    {
        url: '/assets/js/nav.js',
        revision: '1'
    },
    {
        url: '/assets/img/maskable_icon_192x192.png',
        revision: '1'
    },
    {
        url: '/assets/img/maskable_icon_512x512.png',
        revision: '1'
    },

], {
    ignoreUrlParametersMatching: [/.*/]
});


workbox.routing.registerRoute(
    new RegExp('/assets/component/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);


// API cache
workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-api',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 120,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);






self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push Message no payload"
    }

    var options = {
        body: body,
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
})