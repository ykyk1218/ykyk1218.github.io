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


self.addEventListener('sync', function(event) {
  console.log("start sync event")
  if(event.tag == 'send-talk') {
    event.waitUntil(
      getMessage(1).then(sendRequest).then(function() {
        //return deleteMessage(1)
        console.log("delete message")
      })
    ) 
  }
})

function sendRequest(request) {
  if(!request) {
    return Promise.resolve()
  }
  var formData = new FormData()
  formData.append("talk", request.talk)
  var url ="https://6ipk0tf0e5.execute-api.ap-northeast-1.amazonaws.com/prod"
  return fetch(new Request(url, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  }))
}


function getMessage(id) {
  return openIndexedDb("send_queue", 1).then(function(db) {
    return new Promise(function(resolve, reject) {
      var transaction = db.transaction(STORE_NAME, 'readonly')
      var store = transaction.objectStore(STORE_NAME)
      var req = store.get(id)
      req.onsuccess = function() {
        resolve(req.result)
      }
      req.onerror = reject
    })
  })
}
