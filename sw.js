
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_personal_site',
  urlsToCache = [
    './',
    'https://fonts.googleapis.com/css?family=Poppins:100,200,400,300,500,600,700',
    './css/linearicons.css',
    './css/font-awesome.min.css',
    './css/bootstrap.css',
    './css/magnific-popup.css',			
    './css/nice-select.css',
    './css/animate.min.css',
    './css/owl.carousel.css',
    './css/main.css',
    './js/vendor/jquery-2.2.4.min.js',
    './js/popper.min.js',
    './js/vendor/bootstrap.min.js',			
    './js/easing.min.js',			
    './js/hoverIntent.js',
    './js/superfish.min.js',	
    './js/jquery.ajaxchimp.min.js',
    './js/jquery.magnific-popup.min.js',	
    './js/jquery.tabs.min.js',						
    './js/jquery.nice-select.min.js',	
    './js/isotope.pkgd.min.js',			
    './js/waypoints.min.js',
    './js/jquery.counterup.min.js',
    './js/simple-skillbar.js',							
    './js/owl.carousel.min.js',							
    './js/mail-script.js',	
    './js/main.js'
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
      })
  )
})