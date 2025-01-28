import net from 'net';

export async function printToReceiptPrinter(orderData) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    const PRINTER_IP = '192.168.100.200';
    const PRINTER_PORT = 9100; // Standardowy port dla drukarek sieciowych
    const TIMEOUT = 5000; // 5 sekund timeout

    // Dodajemy timeout
    const timeout = setTimeout(() => {
      client.destroy();
      reject(new Error('Timeout podczas połączenia z drukarką'));
    }, TIMEOUT);

    client.connect(PRINTER_PORT, PRINTER_IP, () => {
      clearTimeout(timeout); // Czyścimy timeout po udanym połączeniu
      try {
        // Formatowanie tekstu do wydruku
        const printContent = formatOrderForPrinting(orderData);
        
        // Wysyłanie danych do drukarki
        client.write(printContent, 'utf8', () => {
          client.end();
          resolve();
        });
      } catch (error) {
        client.destroy();
        reject(error);
      }
    });

    client.on('error', (error) => {
      clearTimeout(timeout);
      client.destroy();
      reject(new Error(`Błąd połączenia z drukarką: ${error.message}`));
    });

    client.on('close', () => {
      clearTimeout(timeout);
    });
  });
}

function formatOrderForPrinting(orderData) {
  const date = new Date().toLocaleString('pl-PL');
  const items = JSON.parse(orderData.zamowioneProdukty);
  
  let printText = '\x1B\x40'; // Initialize printer
  printText += '\x1B\x61\x01'; // Center alignment
  
  // Nagłówek
  printText += 'Pizzeria Lastoria\n';
  printText += `Data: ${date}\n\n`;
  
  // Dane klienta
  printText += '\x1B\x61\x00'; // Left alignment
  printText += `Klient: ${orderData.imie} ${orderData.nazwisko}\n`;
  printText += `Tel: ${orderData.numerTelefonu}\n`;
  printText += `Adres: ${orderData.miejscowosc}`;
  if (orderData.ulica) printText += `, ${orderData.ulica}`;
  printText += ` ${orderData.numerDomu}`;
  if (orderData.numerMieszkania) printText += `/${orderData.numerMieszkania}`;
  printText += '\n\n';
  
  // Zamówione produkty
  printText += 'ZAMÓWIENIE:\n';
  printText += '--------------------------------\n';
  items.forEach(item => {
    printText += `${item.name} x${item.quantity}\n`;
    if (item.removedIngredients?.length) {
      printText += `  Bez: ${item.removedIngredients.join(', ')}\n`;
    }
    if (item.addedIngredients?.length) {
      printText += `  Dodatki: ${item.addedIngredients.map(i => i.name).join(', ')}\n`;
    }
  });
  printText += '--------------------------------\n';
  
  // Suma
  printText += `\x1B\x61\x02`; // Right alignment
  printText += `SUMA: ${orderData.suma} zł\n`;
  
  // Zakończenie
  printText += '\x1B\x61\x01'; // Center alignment
  printText += '\nDziękujemy za zamówienie!\n';
  printText += '\x1B\x64\x05'; // 5 line feeds
  printText += '\x1D\x56\x41'; // Cut paper
  
  return printText;
} 