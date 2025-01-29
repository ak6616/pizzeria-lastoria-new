import { ThermalPrinter, PrinterTypes, CharacterSet} from 'node-thermal-printer';


function formatDate(date) {
  return date.toLocaleString('pl-PL');
}

// Stałe konfiguracyjne
const PRINTER_IP = '77.65.194.148';
// const PRINTER_IP = '192.168.100.200';

const PRINTER_PORT = 9100;

export async function printToReceiptPrinter(orderData) {
  console.log('=== Rozpoczęcie drukowania zamówienia ===');
  console.log('Konfiguracja drukarki:', { PRINTER_IP, PRINTER_PORT });
  
  try {
    let printer = new ThermalPrinter({
      type: PrinterTypes.STAR,
      interface: `tcp://${PRINTER_IP}:${PRINTER_PORT}`,
      characterSet: CharacterSet.PC852_LATIN2,
      options: {
        timeout: 5000
      },
      width: 42,
      removeSpecialCharacters: false,
      lineCharacter: "-",
    });
    // new webpack.IgnorePlugin({
    //   resourceRegExp: /^fs$|^net$/,
    // }),

    console.log('Sprawdzanie połączenia z drukarką...');
    const isConnected = await printer.isPrinterConnected();
    console.log('Status połączenia:', isConnected);

    if (!isConnected) {
      throw new Error('Nie można połączyć się z drukarką');
    }
    // Nagłówek
    // printer.setCharacterSet('PC852_LATIN2');
    printer.alignCenter();
    printer.bold(true);
    printer.setTextSize(1, 1);
    printer.println('Pizzeria Lastoria');
    printer.bold(false);
    printer.setTextNormal();
    printer.println(`Data: ${formatDate(new Date())}`);
    printer.drawLine();

    // Dane klienta
    printer.alignLeft();
    printer.println(`Klient: ${orderData.imie} ${orderData.nazwisko}`);
    printer.println(`Tel: ${orderData.numerTelefonu}`);
    printer.println(`Adres: ${orderData.miejscowosc}${orderData.ulica ? `, ${orderData.ulica}` : ''} ${orderData.numerDomu}${orderData.numerMieszkania ? `/${orderData.numerMieszkania}` : ''}`);
    printer.drawLine();

    // Zamówione produkty
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

    // Suma
    printer.bold(true);
    printer.alignRight();
    printer.println(`SUMA: ${orderData.suma} zł`);
    printer.bold(false);

    // Zakończenie
    printer.alignCenter();
    printer.println('\n');
    printer.println('Dziękujemy za zamówienie!');
    printer.println('\n\n\n');
    printer.cut();
    printer.println("\x0C"); // Dodanie znaku końca


    console.log('Wysyłanie zamówienia do drukarki...');
    await printer.execute();
    console.log('Drukowanie zamówienia zakończone');

    return { success: true };
  } catch (error) {
    console.error('Błąd podczas drukowania:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
} 