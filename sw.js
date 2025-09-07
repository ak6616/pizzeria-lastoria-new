import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

self.skipWaiting();
clientsClaim();

// ✅ Obsługa push (np. wiadomości i zamówienia)
self.addEventListener("push", event => {
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: "Notification", body: event.data?.text() || "" };
  }

  // Prosta logika rozróżniania typu powiadomienia
  let title = data.title || "Nowe powiadomienie";
  let options = {
    body: data.body || "",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
    data: data.url || "/"
  };

  // Możesz dopisać bardziej zaawansowaną logikę np:
  if (data.type === "order") {
    title = "📦 Nowe zamówienie!";
    options.body = data.body || "Masz nowe zamówienie w panelu.";
  } 

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ✅ Obsługa kliknięcia w powiadomienie
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(windowClients => {
      if (windowClients.length > 0) {
        const client = windowClients[0];
        client.focus();
      } else {
        clients.openWindow(event.notification.data || "/");
      }
    })
  );
});

// ✅ Precache – Workbox wstrzyknie tutaj listę plików
precacheAndRoute(self.__WB_MANIFEST);
