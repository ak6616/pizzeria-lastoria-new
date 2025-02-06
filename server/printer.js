import { ThermalPrinter, PrinterTypes, CharacterSet } from 'node-thermal-printer';
import path from 'path';
import { fileURLToPath } from 'url';
const electron = typeof process !== 'undefined' && process.versions && !!process.versions.electron;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function formatDate(date) {
  return date.toLocaleString('pl-PL');
}

// Stałe konfiguracyjne
// const PRINTER_IP = '77.65.194.148';
const PRINTER_IP = '192.168.100.200';
const PRINTER_PORT = 9100;
const DRIVER_PATH = path.join(__dirname, 'xprinter/ExpressDelivery/2023.4 M-1/Common/Defaults[ED]_2023.4.1.0.sds');

export async function printToReceiptPrinter(orderData) {
  console.log('=== Rozpoczęcie drukowania zamówienia ===');
  console.log('Konfiguracja drukarki:', { PRINTER_IP, PRINTER_PORT, DRIVER_PATH });
  
  try {
    let printer = new ThermalPrinter({
      type: PrinterTypes.EPSON, // Xprinter XP-410b is compatible with EPSON commands
      interface: `tcp://${PRINTER_IP}:${PRINTER_PORT}`,
      characterSet: CharacterSet.PC852_LATIN2,
      driver: DRIVER_PATH,
      options: {
        timeout: 5000
      },
      width: 50,
      removeSpecialCharacters: false,
      lineCharacter: "-",
    });

    console.log('Sprawdzanie połączenia z drukarką...');
    const isConnected = await printer.isPrinterConnected();
    console.log('Status połączenia:', isConnected);

    if (!isConnected) {
      throw new Error('Nie można połączyć się z drukarką');
    }

    // Header
    printer.alignCenter();
    printer.bold(true);
    printer.setTextSize(1, 1);
    printer.println('Pizzeria Lastoria');
    printer.bold(false);
    printer.setTextNormal();
    printer.println(`Data: ${formatDate(new Date())}`);
    printer.drawLine();

    // Customer data
    printer.alignLeft();
    printer.println(`Klient: ${orderData.imie} ${orderData.nazwisko}`);
    printer.println(`Tel: ${orderData.numerTelefonu}`);
    printer.println(`Adres: ${orderData.miejscowosc}${orderData.ulica ? `, ${orderData.ulica}` : ''} ${orderData.numerDomu}${orderData.numerMieszkania ? `/${orderData.numerMieszkania}` : ''}`);
    printer.drawLine();

    // Ordered products
    printer.bold(true);
    printer.println('ZAMÓWIENIE:');
    printer.bold(false);
    
    const items = JSON.parse(orderData.zamowioneProdukty);
    items.forEach(item => {
      printer.println(`${item.name} x${item.quantity}`);
      if (item.removedIngredients?.length) {
        printer.println(`  BEZ: ${item.removedIngredients.join(', ')}`);
      }
      if (item.addedIngredients?.length) {
        printer.println(`  DODATKI: ${item.addedIngredients.map(i => i.name).join(', ')}`);
      }
    });

    printer.drawLine();

    // Total
    printer.bold(true);
    printer.alignRight();
    printer.println(`SUMA: ${orderData.suma} zł`);
    printer.bold(false);

    // Footer
    printer.alignCenter();
    printer.println('\n');
    printer.println('Dziękujemy za zamówienie!');
    printer.println('\n\n\n');

    console.log('Wysyłanie zamówienia do drukarki...');
    await printer.execute();
    printer.println("\x0C"); // Add end character
    console.log('Drukowanie zamówienia zakończone');

    return { success: true };
  } catch (error) {
    console.error('Błąd podczas drukowania:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}