importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute( [{"revision":"445658ef9cd4353d460646db9e119cab","url":"asset-manifest.json"},{"revision":"c92b85a5b907c70211f4ec25e29a8c4a","url":"favicon.ico"},{"revision":"902aac659a6798ed76fb8504065db635","url":"index.html"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512.png"},{"revision":"773556fe43123bf07d49e15126db0fff","url":"manifest.json"},{"revision":"fa1ded1ed7c11438a9b0385b1e112850","url":"robots.txt"},{"revision":"89d63711abc572a4fc1b32c0a5613f7c","url":"static/css/main.01079d68.css"},{"revision":"22ad98eb6d63596ae00dd34c77a0eedf","url":"static/js/787.b94b3e6f.chunk.js"},{"revision":"9627a32a3a79e4238dbe1ae7777a33bc","url":"static/js/main.58ad0e25.js"},{"revision":"1fe1e3f82113394d039eafd856a1d3f8","url":"static/js/main.58ad0e25.js.LICENSE.txt"}] );

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;


const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events',
]

registerRoute(
    ({ request, url }) => {

        // console.log({request, url})
        if ( cacheNetworkFirst.includes( url.pathname ) ) return true
        
        return false;
    },
    new NetworkFirst()
)

// Referencia
// registerRoute(
//     new RegExp('http://localhost:4000/api/auth/renew'),
//     new NetworkFirst()
// )


const cacheFirstNetwork = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
];

registerRoute(
    ({ request, url }) => {
        console.log({url})

        if ( cacheFirstNetwork.includes( url.href ) ) return true        

        return false;
    },
    new CacheFirst()
)



// Posteos Offline 
const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'POST'
)

registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'DELETE'
)

registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'PUT'
)