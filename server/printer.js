import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
// import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRINTER_NAME = 'xprinter';

function formatDate(date) {
  return date.toLocaleString('pl-PL');
}

// Stałe konfiguracyjne
// const OUTPUT_FILE = path.join(__dirname, 'order.txt');



export async function printToReceiptPrinter(orderData) {
  console.log('=== Rozpoczęcie drukowania zamówienia ===');
  console.log('Dane zamówienia:', orderData);
  
  try {
    let receipt = '';
    // Header
    
    receipt += `${formatDate(new Date())}\n`;
    
    // Customer data
    receipt += `${orderData.imie} ${orderData.nazwisko}\n`;
    receipt += `${orderData.numerTelefonu}\n`;
    if (orderData.typ === 'delivery') {
      receipt += `${orderData.miejscowosc}${orderData.ulica ? `, ${orderData.ulica}` : ''} ${orderData.numerDomu}${orderData.numerMieszkania ? `/${orderData.numerMieszkania}` : ''}\n`;
    }
    receipt += `Typ: ${orderData.typ === 'delivery' ? 'Dostawa' : 'Odbiór osobisty'}\n`;
    if (orderData.zamowienieNaGodzine) {
      receipt += `Na godzinę: ${orderData.zamowienieNaGodzine}\n`;
    }
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
    // Total
    receipt += `SUMA: ${orderData.suma} zł`;
    // Zapisz do pliku i wydrukuj
    // fs.writeFileSync(OUTPUT_FILE, receipt);

    console.log('Zawartość paragonu:', receipt);

    // Wyślij do drukarki bezpośrednio
    return new Promise((resolve, reject) => {
      // const lpProcess = exec(`lp -d ${PRINTER_NAME} ${OUTPUT_FILE}`, (error, stdout, stderr) => {

      const lpProcess = exec(`echo "${receipt}" | lp -d xprinter -o media=Custom.50x42mm -o fit-to-page -o font-size=5 -o print-quality=5 -o orientation-requested=6`, (error, stdout, stderr) => {
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
