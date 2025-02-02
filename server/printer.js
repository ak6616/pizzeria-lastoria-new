import path from 'path';
import { fileURLToPath } from 'url';
import SftpClient from 'ssh2-sftp-client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs';

function formatDate(date) {
  return date.toLocaleString('pl-PL');
}

// Stałe konfiguracyjne
const OUTPUT_FILE = path.join(__dirname, 'order_receipt.txt');
const sftp = new SftpClient();

const komputerDocelowy = {
  host: '77.65.194.148',
  port: 22, // Port SSH
  username: 'Madzialena', // Nazwa użytkownika
  password: 'bjdp6tx-27', // Możesz użyć klucza SSH
  readyTimeout: 30000
};
await sftp.connect(komputerDocelowy);

export async function printToReceiptPrinter(orderData) {



  console.log('=== Rozpoczęcie zapisywania zamówienia ===');
  
  try {
    
    let receipt = '';
    // Header
    receipt += `Data: ${formatDate(new Date())}\n`;
    receipt += '------------------------------\n';
    // Customer data
    receipt += `Klient: ${orderData.imie} ${orderData.nazwisko}\n`;
    receipt += `Tel: ${orderData.numerTelefonu}\n`;
    receipt += `Adres: ${orderData.miejscowosc}${orderData.ulica ? `, ${orderData.ulica}` : ''} ${orderData.numerDomu}${orderData.numerMieszkania ? `/${orderData.numerMieszkania}` : ''}\n`;
    receipt += '------------------------------\n';
    // Ordered products
    receipt += 'ZAMÓWIENIE:\n';
    const items = JSON.parse(orderData.zamowioneProdukty);
    items.forEach(item => {
      receipt += `${item.name} x${item.quantity}\n`;
      if (item.removedIngredients?.length) {
        receipt += `  BEZ: ${item.removedIngredients.join(', ')}`;
      }
      if (item.addedIngredients?.length) {
        receipt += `  DODATKI: ${item.addedIngredients.map(i => i.name).join(', ')}`;
      }
    });
    receipt += '------------------------------\n';
    // Total
    receipt += `SUMA: ${orderData.suma} zł\n`;
    // Footer

    console.log('Zapisywanie zamówienia do pliku...');
    fs.writeFileSync(OUTPUT_FILE, receipt);
    console.log('Zamówienie zapisane do pliku:', OUTPUT_FILE);
    
    try {
      await sftp.put('../pizzeria-lastoria-new/server/order_receipt.txt', 'C:/Drukowanie/plik.txt');
      console.log('Plik przesłany pomyślnie');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
  } catch (err) {
      // if (err.code === 'ECONNRESET') {
      //     console.error('Błąd ECONNRESET - ignoruję i kontynuuję działanie');
      // } else {
          console.error('Inny błąd:', err);
      // }
  } 


  } catch (error) {
    console.error('Błąd podczas zapisywania zamówienia:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}
