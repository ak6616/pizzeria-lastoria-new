// sw.js

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const title = data.title || 'Nowe powiadomienie!';
  const options = {
    body: data.body || 'Masz nowe wiadomości ??',
    icon: '/icons/icon-192x192.png', // Ikona powiadomienia (dostosuj ścieżkę)
    badge: '/icons/badge-72x72.png', // Mała plakietka (też dostosuj)
    data: data.url || '/'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Obsługa kliknięcia w powiadomienie
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});
