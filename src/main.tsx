import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Funkcja do konwersji klucza VAPID
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

// Rejestracja Service Workera i powiadomień push
async function registerServiceWorker() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      // Rejestracja Service Workera
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker zarejestrowany:', registration);

      // Sprawdź uprawnienia do powiadomień
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('Brak uprawnień do powiadomień');
        return;
      }

      // Pobierz klucz VAPID z serwera
      const vapidResponse = await fetch('/api/vapid-key');
      if (!vapidResponse.ok) {
        throw new Error('Nie udało się pobrać klucza VAPID');
      }
      const { publicKey } = await vapidResponse.json();

      // Subskrybuj do powiadomień push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      });

      console.log('Subskrypcja push zakończona sukcesem:', subscription);

      // Wyślij subskrypcję do serwera
      const subscribeResponse = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });

      if (!subscribeResponse.ok) {
        throw new Error('Nie udało się zapisać subskrypcji na serwerze');
      }

      console.log('Subskrypcja zapisana na serwerze');
    } catch (error) {
      console.error('Błąd podczas rejestracji Service Workera:', error);
    }
  }
}

// Uruchom rejestrację
registerServiceWorker();
