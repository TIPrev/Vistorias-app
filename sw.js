const CACHE = 'vistoria-v43-origens-pwa';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css?v=34',
  '/css/js/calculadora.js?v=18',
  '/css/js/memoria.js?v=19',
  '/css/js/assistant.js?v=4',
  '/css/js/app.js?v=39',
  '/config.js?v=18',
  '/firebase.js?v=28',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon.png',
  '/img/hm-origens-logo.png',
  '/img/hm-origens-simbolo.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
});

self.addEventListener('activate', e => {
  // Caches anteriores sao mantidos: nenhum cache de dados e apagado na atualizacao.
  e.waitUntil(Promise.resolve());
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Recursos externos (como o SDK Firebase) seguem a politica normal do navegador.
  if (new URL(e.request.url).origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }))
  );
});
