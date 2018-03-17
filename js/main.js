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
  target.addEventListener('mousedown', function(event) {
    console.log("mouseover")
    navigator.serviceWorker.controller.postMessage('/list.html')
  })
}
