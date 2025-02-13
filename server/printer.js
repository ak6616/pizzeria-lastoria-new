import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import iconv from 'iconv-lite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRINTER_NAME = 'xprinter';
const ENCODING = 'CP852_LATIN2'; // Kodowanie dla polskich znaków

function formatDate(date) {
  return date.toLocaleString('pl-PL');
}

// Stałe konfiguracyjne
const OUTPUT_FILE = path.join(__dirname, 'order_receipt.txt');

export async function printToReceiptPrinter(orderData) {
  console.log('=== Rozpoczęcie drukowania zamówienia ===');
  
  try {
    let receipt = '';
    // Header
    receipt += '\x1B\x40'; // Initialize printer
    receipt += '\x1B\x61\x01'; // Center alignment
    receipt += 'PIZZERIA LASTORIA\n\n';
    receipt += `Data: ${formatDate(new Date())}\n`;
    receipt += '--------------------------------\n';
    
    // Customer data
    receipt += '\x1B\x61\x00'; // Left alignment
    receipt += `Klient: ${orderData.imie} ${orderData.nazwisko}\n`;
    receipt += `Tel: ${orderData.numerTelefonu}\n`;
    if (orderData.type === 'delivery') {
      receipt += `Adres: ${orderData.miejscowosc}${orderData.ulica ? `, ${orderData.ulica}` : ''} ${orderData.numerDomu}${orderData.numerMieszkania ? `/${orderData.numerMieszkania}` : ''}\n`;
    }
    receipt += `Typ: ${orderData.type === 'delivery' ? 'Dostawa' : 'Odbiór osobisty'}\n`;
    receipt += '--------------------------------\n';
    
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
    
    receipt += '--------------------------------\n';
    // Total
    receipt += '\x1B\x61\x02'; // Right alignment
    receipt += `SUMA: ${orderData.suma} zł`;
    
    // Cut paper
    // receipt += '\x1D\x56\x41\n';

    // Konwertuj tekst na odpowiednie kodowanie
    const buffer = iconv.encode(receipt, ENCODING);

    // Wyślij do drukarki używając lp
    return new Promise((resolve, reject) => {
      const lpProcess = exec(`lp -d ${PRINTER_NAME}`, (error, stdout, stderr) => {
        if (error) {
          console.error('Błąd drukowania:', error);
          reject(error);
          return;
        }
        console.log('Wydruk zakończony pomyślnie');
        resolve({ success: true });
      });

      lpProcess.stdin.write(buffer);
      lpProcess.stdin.end();
    });

  } catch (error) {
    console.error('Błąd podczas przygotowywania wydruku:', error);
    throw error;
  }
}
