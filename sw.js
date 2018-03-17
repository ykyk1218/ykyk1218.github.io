var CACHE_NAME = 'my-site-cache-v12';
var urlsToCache = [
  '/js/main.js',
  'index.html',
  '/',
  'css/main.css',
  'images/niwatori.png'
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
        console.log(response)
        if(response) {
          console.log(caches)
          return response
        }
        return fetch(event.request)
      })
  )
})


//更新されると実行されるイベント
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

self.addEventListener('message', function(event) {
  fetch(new Request(event.data, {mode: 'no-cors'})).then(function(response) {
    caches.open(CACHE_NAME).then(function(cache) {
      cache.put(event.data, response)
    })
  }).then(function() {
    
  })
})
