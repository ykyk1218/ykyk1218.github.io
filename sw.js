importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js')

workbox.precaching.precacheAndRoute([
  { url: '/', revision: 'hoge' },
  { url: '/list.html', revision: 'fuga' }
])


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
})
