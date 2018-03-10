var CACHE_NAME = 'my-site-cache-v4';
var urlsToCache = [
  '/styles/main.css',
  '/js/main.js',
  'index.html'
];

self.addEventListener('install', function(event) {
  // インストール処理
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


// キャッシュを利用する
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if(response) {
          console.log("return response")
          return response
        }
        return fetch(event.request)
      })
  )
})


//activate
var whitelist = [CACHE_NAME]
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          console.log(key)
          if (whitelist.indexOf(key) === -1) {
            return caches.delete(key)
          }
        })
      )
    })
  )
})
