
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
    './js/main.js',
    './img/about-img.png',
    './img/b1.jpg',
    './img/b2.jpg',
    './img/b3.jpg',
    './img/hero-img.png',
    './img/l1.png',
    './img/l2.png',
    './img/l3.png',
    './img/l4.png',
    './img/l5.png',
    './img/logo.png',
    './img/p1.jpg',
    './img/p2.jpg',
    './img/p3.jpg',
    './img/p4.jpg',
    './img/p5.jpg',
    './img/p6.jpg',
    './img/preview.png',
    './img/user.png',
    './img/about/c-logo.png',
    './img/blog/ads-banner.jpg',
    './img/blog/blog-home-banner.jpg',
    './img/blog/c1.jpg',
    './img/blog/c2.jpg',
    './img/blog/c3.jpg',
    './img/blog/c4.jpg',
    './img/blog/c5.jpg',
    './img/blog/c6.jpg',
    './img/blog/cat-widget1.jpg',
    './img/blog/cat-widget2.jpg',
    './img/blog/cat-widget3.jpg',
    './img/blog/feature-img1.jpg',
    './img/blog/feature-img2.jpg',
    './img/blog/feature-img3.jpg',
    './img/blog/feature-img4.jpg',
    './img/blog/feature-img5.jpg',
    './img/blog/next.jpg',
    './img/blog/post-img1.jpg',
    './img/blog/post-img2.jpg',
    './img/blog/pp1.jpg',
    './img/blog/pp2.jpg',
    './img/blog/pp3.jpg',
    './img/blog/pp4.jpg',
    './img/blog/prev.jpg',
    './img/blog/s-img.jpg',
    './img/blog/user-info.png',
    './img/elements/a.jpg',
    './img/elements/a2.jpg',
    './img/elements/d.jpg',
    './img/elements/disabled-check.png',
    './img/elements/disabled-radio.png',
    './img/elements/f1.jpg',
    './img/elements/f2.jpg',
    './img/elements/f3.jpg',
    './img/elements/f4.jpg',
    './img/elements/f5.jpg',
    './img/elements/f6.jpg',
    './img/elements/f7.jpg',
    './img/elements/f8.jpg',
    './img/elements/g1.jpg',
    './img/elements/g2.jpg',
    './img/elements/g3.jpg',
    './img/elements/g4.jpg',
    './img/elements/g5.jpg',
    './img/elements/g6.jpg',
    './img/elements/g7.jpg',
    './img/elements/g8.jpg',
    './img/elements/primary-check.png',
    './img/elements/primary-radio.png',
    './img/elements/success-check.png',
    './img/elements/success-radio.png',
    './img/elements/user1.png',
    './img/elements/user2.png',
    './img/icons/icon-128x128.png',
    './img/icons/icon-144x144.png',
    './img/icons/icon-152x152.png',
    './img/icons/icon-180x180.png',
    './img/icons/icon-192x192.png',
    './img/icons/icon-384x384.png',
    './img/icons/icon-512x512.png',
    './img/icons/icon-72x72.png',
    './img/icons/icon-96x96.png',
    'https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2',
    'https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2',
    'https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLDz8Z1xlFd2JQEk.woff2',
    './fonts/Linearicons-Free.woff',
    './fonts/Linearicons-Free.ttf',
    './fonts/Linearicons-Free.eot',
    './fonts/Linearicons-Free.svg',
    './fonts/Linearicons-Free.woff2',
    './fonts/Linearicons-Free.woff?w118d',
    './fonts/Linearicons-Free.ttf?w118d',
    './fonts/fontawesome-webfont.ttf?v=4.7.0',
    './fonts/fontawesome-webfont.woff2?v=4.7.0',
    './fonts/fontawesome-webfont.woff?v=4.7.0',
    './about.html',
    './services.html',
    './contact.html',
    './blog-home.html',
    './elements.html',
    './blog-single.html',
    './price.html',    
    './index.html',
    './fallback.html'
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