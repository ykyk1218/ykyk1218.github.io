var STORE_NAME = 'message'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // 登録成功
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    registration.update()
  }).catch(function(err) {
    // 登録失敗 :(
    console.log('ServiceWorker registration failed: ', err);
  });
}


window.onload = function() {
  target = document.querySelector(".next")
  if(target) {
    target.addEventListener('mousedown', function(event) {
      console.log("mouseover")
      navigator.serviceWorker.controller.postMessage('/list.html')
    })
  }
}

function addIndexedDb(data) {
  return openIndexedDb("send_queue", 1).then(function(db) {
    return new Promise(function(resolve, reject) {
      var transaction = db.transaction(STORE_NAME, 'readwrite')
      var store       = transaction.objectStore(STORE_NAME)
      var req         = store.add(data)
      req.onsuccess = function() {
        resolve(req.result)
      }
      req.onerror = reject
    })
  })
}

function openIndexedDb(dbName, version) {
  return new Promise(function(resolve, reject) {
    var request = window.indexedDB.open(dbName, version)

    request.onupgradeneeded = function(event) {
      var db = event.target.result
      var objectStore = db.createObjectStore(STORE_NAME, {keyPath: "id", autoIncrement: true})
    }
    request.onerror = reject
    request.onsuccess = function(event) {
      resolve(request.result)
    }
  })
}
