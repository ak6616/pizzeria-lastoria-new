import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs';

function formatDate(date) {
  return date.toLocaleString('pl-PL');
}

// Stałe konfiguracyjne
const OUTPUT_FILE = path.join(__dirname, 'order_receipt.txt');




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


  } catch (error) {
    console.error('Błąd podczas zapisywania zamówienia:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}
