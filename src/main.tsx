import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);


if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker.register('/sw.js') // plik Service Worker
    .then(async (registration) => {
      console.log('Service Worker registered:', registration);

      // Pytamy użytkownika o zgodę na powiadomienia
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Permission not granted for Notification');
      }

      // Subskrybujemy użytkownika do Push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true, // Wymagane: każde push musi wyświetlić powiadomienie
        applicationServerKey: urlBase64ToUint8Array('<TWÓJ_PUBLICZNY_KLUCZ_VAPID>')
      });

      console.log('Got subscription:', subscription);

      // Wysyłamy subskrypcję do backendu
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });

    })
    .catch(err => console.error('Error during Service Worker registration:', err));
}

function urlBase64ToUint8Array(base64String: String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
