import { PrinterConfig } from '../config/printers';
import { printer, types } from 'node-thermal-printer';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import type { CustomerData } from '../components/CustomerDataForm';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  removedIngredients?: string[];
  addedIngredients?: Array<{
    name: string;
    price: number;
  }>;
}

interface PrintOrderData {
  customerData: CustomerData;
  items: OrderItem[];
  totalPrice: number;
  deliveryCost: number;
}

interface PrinterSettings {
  [location: string]: {
    ip: string;
    port: number;
  }
}

const PRINTER_SETTINGS: PrinterSettings = {
  'miejsce-piastowe': {
    ip: '192.168.1.101',
    port: 9100
  }
};

export async function printOrderToLocation(orderData: any, location: string) {
  const printerConfig = PRINTER_SETTINGS[location];
  if (!printerConfig) {
    throw new Error(`Nie znaleziono konfiguracji drukarki dla lokalizacji: ${location}`);
  }

  const Printer = new printer({
    type: types.EPSON, // Typ drukarki
    interface: `tcp://${printerConfig.ip}:${printerConfig.port}`, // Adres IP i port
    options: {
      width: 57, // Szerokość papieru w mm
      characterSet: 'CP852', // Ustawienia kodowania
    }
  });

  try {
    const { printer, types } = require("node-thermal-printer");
const htmlToText = require("html-to-text"); // Biblioteka do konwersji HTML na tekst

// Konfiguracja drukarki
const myPrinter = new printer({
  type: types.ZPL, // Używamy protokołu ZPL
  interface: "tcp://192.168.0.100", // Adres IP drukarki
  options: {
    port: 9100, // Port standardowy dla drukarek sieciowych
  },
});

async function printFromHTML(htmlContent) {
  try {
    // Konwersja HTML na tekst
    const textContent = htmlToText.convert(htmlContent, {
      wordwrap: 130, // Opcjonalne łamanie linii
    });

    // Inicjalizacja drukarki
    myPrinter.alignCenter(); // Wyśrodkowanie tekstu
    myPrinter.println("=== Start Drukowania ===");
    myPrinter.alignLeft(); // Tekst z lewej
    myPrinter.println(textContent); // Wstawienie treści HTML jako tekstu
    myPrinter.alignCenter();
    myPrinter.println("=== Koniec Drukowania ===");
    myPrinter.cut(); // Cięcie papieru

    // Wykonanie polecenia drukowania
    let execute = await myPrinter.execute();
    console.log("Drukowanie zakończone:", execute);
  } catch (error) {
    console.error("Błąd podczas drukowania:", error);
  }
}

// Przykładowy kod HTML do drukowania
const sampleHTML = `
  <h1>Paragon</h1>
  <p>Produkt A - 10.00 PLN</p>
  <p>Produkt B - 15.00 PLN</p>
  <p><strong>Suma: 25.00 PLN</strong></p>
`;

printFromHTML(sampleHTML);

  } catch (error) {
    console.error('Błąd podczas drukowania:', error);
    throw new Error('Nie udało się wydrukować zamówienia');
  }
} 