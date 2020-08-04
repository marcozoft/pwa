
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache',
  urlsToCache = [
   // './registerSW.js'
  ];

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      }).catch(() => {
        if(e.request.url.indexOf('.html') > -1){
          return caches.match('fallback.html');
        }
      })
  )
})


self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: `);
  console.log(JSON.parse(event.data.text()));//modified from tutorial to make it more dynamic
  const notificationObject = JSON.parse(event.data.text());//modified from tutorial to make it more dynamic

  const title = notificationObject.title;//modified from tutorial to make it more dynamic
  const options = {
    body: notificationObject.msg,
    icon: notificationObject.icon,
    badge: notificationObject.badge
  };
  self.notificationURL = notificationObject.url;//modified from tutorial to make it more dynamic
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  //console.log(self.notificationURL);
  event.notification.close();

  event.waitUntil(
    clients.openWindow(self.notificationURL)//modified from tutorial to make it more dynamic
  );
});