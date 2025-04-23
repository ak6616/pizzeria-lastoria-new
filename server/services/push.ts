export async function registerPush(publicKey: string) {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const sw = await navigator.serviceWorker.ready
  
      const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      })
  
      await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      console.log('Użytkownik zapisany do powiadomień')
    }
  };

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64)
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)))
  };