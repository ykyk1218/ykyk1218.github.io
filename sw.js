importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js')

var CACHE_NAME = 'my-site-cache-v12';
var STORE_NAME = 'message'
var urlsToCache = [
  '/js/main.js',
  'index.html',
  '/',
  'css/main.css',
  'images/niwatori.png'
];



workbox.routing.registerRoute(
  new RegExp('\.css|\.js|\.png|\font-mfizz*'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "workbox-runtime-" + location.hostname,
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60,
        purgeOnQuotaError: true
      })
     ]
  })
)




self.addEventListener('install', (event) => {
  console.log('[Serviceworker]', 'Installing!', event);
  /*
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: 'hoge' }
  ])
  */
})


workbox.routing.setCatchHandler(({url, event, params}) => {
})
