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

export async function printToReceiptPrinter(orderData) {
  console.log('=== Rozpoczęcie drukowania zamówienia ===');
  console.log('Dane zamówienia:', orderData);
  
  try {
    for(let i = 0; i < 2; i++){
      let receipt1 = '';
      let receipt2 = '';
      let receipt3 = '';

    // Header
    
    receipt1 += `${formatDate(new Date())}\n`;
    
    // Customer data
    receipt1 += `${orderData.imie} ${orderData.nazwisko}\n`;
    receipt1 += `${orderData.numerTelefonu}\n`;
    if (orderData.typ === 'delivery') {
      receipt1 += `${orderData.miejscowosc}${orderData.ulica ? `, ${orderData.ulica}` : ''} ${orderData.numerDomu}${orderData.numerMieszkania ? `/${orderData.numerMieszkania}` : ''}\n`;
    }
    receipt1 += `Typ: ${orderData.typ === 'delivery' ? 'Dostawa' : 'Odbiór osobisty'}\n`;
    if (orderData.zamowienieNaGodzine) {
      receipt1 += `Na godzinę: ${orderData.zamowienieNaGodzine}\n`;
    }

     // Total
     receipt1 += `SUMA: ${orderData.suma} zł\n`;
         //////////////////////////////
    // Ordered products
    receipt2 += 'ZAMÓWIENIE:\n';
    let items = Array.isArray(orderData.zamowioneProdukty) 
      ? orderData.zamowioneProdukty 
      : [];

    items.forEach(item => {
      receipt2 += `${item.name} x${item.quantity}\n`;
      if (item.doughType) {
        receipt2 += `Ciasto: ${item.doughType}\n`;
      }
      if (item.removedIngredients?.length) {
        receipt2 += `  BEZ: ${item.removedIngredients.join(', ')}\n`;
      }
      if (item.addedIngredients?.length) {
        receipt2 += `  DODATKI: ${item.addedIngredients.map(i => i.name).join(', ')}\n`;
      }
    });
    //////////////
     if (orderData.notes){
        receipt3+= `Uwagi: ${orderData.notes}\n`
     }


    console.log('Zawartość paragonu:', receipt1, receipt2, receipt3);

    // Wyślij do drukarki bezpośrednio
    return new Promise((resolve, reject) => {
      if(orderData.notes){
        let lpProcess = exec(`echo "${receipt3}" | lp -d xprinter -o media=Custom.50x42mm -o fit-to-page -o font-size=5 -o print-quality=5 -o orientation-requested=6`, (error, stdout, stderr) => {
        if (error) {
          console.error('Błąd drukowania:', error);
          reject(error);
          return;
        }
        console.log('Wydruk uwag zakończony pomyślnie');
        resolve({ success: true });
      });
      };
      let lpProcess = exec(`echo "${receipt2}" | lp -d xprinter -o media=Custom.50x42mm -o fit-to-page -o font-size=5 -o print-quality=5 -o orientation-requested=6 && echo "${receipt1}" | lp -d xprinter -o media=Custom.50x42mm -o fit-to-page -o font-size=5 -o print-quality=5 -o orientation-requested=6`, (error, stdout, stderr) => {
        if (error) {
          console.error('Błąd drukowania:', error);
          reject(error);
          return;
        }
        console.log('Wydruk danych zakończony pomyślnie');
        resolve({ success: true });
      });
    });

    }
    
  } catch (error) {
    console.error('Błąd podczas przygotowywania wydruku:', error);
    throw error;
  }
}
