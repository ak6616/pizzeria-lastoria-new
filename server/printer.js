import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRINTER_NAME = 'xprinter';

function formatDate(date) {
  return date.toLocaleString('pl-PL');
}

export async function printToReceiptPrinter(orderData) {
  console.log('=== Rozpoczęcie drukowania zamówienia ===');
  console.log('Dane zamówienia:', orderData);
  
  try {
    let receipt = '';
    // Header
    receipt += "\x1B\x21\x07"; // Ustawienie czcionki na wartość 7
    receipt += `Data: ${formatDate(new Date())}\n`;
    receipt += '--------------------------------\n';
    
    // Customer data
    receipt += `Klient: ${orderData.imie} ${orderData.nazwisko}\n`;
    receipt += `Tel: ${orderData.numerTelefonu}\n`;
    if (orderData.typ === 'delivery') {
      receipt += `Adres: ${orderData.miejscowosc}${orderData.ulica ? `, ${orderData.ulica}` : ''} ${orderData.numerDomu}${orderData.numerMieszkania ? `/${orderData.numerMieszkania}` : ''}\n`;
    }
    receipt += `Typ: ${orderData.typ === 'delivery' ? 'Dostawa' : 'Odbiór osobisty'}\n`;
    receipt += '--------------------------------\n';
    
    // Ordered products
    receipt += 'ZAMÓWIENIE:\n';
    let items = Array.isArray(orderData.zamowioneProdukty) 
      ? orderData.zamowioneProdukty 
      : [];

    items.forEach(item => {
      receipt += `${item.name} x${item.quantity}\n`;
      if (item.removedIngredients?.length) {
        receipt += `  BEZ: ${item.removedIngredients.join(', ')}\n`;
      }
      if (item.addedIngredients?.length) {
        receipt += `  DODATKI: ${item.addedIngredients.map(i => i.name).join(', ')}\n`;
      }
    });
    
    receipt += '--------------------------------\n';
    // Total
    receipt += `SUMA: ${orderData.suma} zł`;

    console.log('Zawartość paragonu:', receipt);

    // Wyślij do drukarki bezpośrednio
    return new Promise((resolve, reject) => {
      const lpProcess = exec(`echo "${receipt}" | lp -d ${PRINTER_NAME}`, (error, stdout, stderr) => {
        if (error) {
          console.error('Błąd drukowania:', error);
          reject(error);
          return;
        }
        console.log('Wydruk zakończony pomyślnie');
        resolve({ success: true });
      });
    });

  } catch (error) {
    console.error('Błąd podczas przygotowywania wydruku:', error);
    throw error;
  }
}
