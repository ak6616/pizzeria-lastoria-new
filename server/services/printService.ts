import { PrinterConfig } from '../config/printers';

interface PrinterSettings {
  [location: string]: {
    ip: string;
    port: number;
  }
}

const PRINTER_SETTINGS: PrinterSettings = {
  // 'haczow': {
  //   ip: '192.168.1.100',
  //   port: 9100
  // },
  'miejsce-piastowe': {
    ip: '193.192.177.167',
    port: 9100
  }
};

export async function printOrderToLocation(orderData: any, location: string) {
  const printerConfig = PRINTER_SETTINGS[location];
  if (!printerConfig) {
    throw new Error(`Nie znaleziono konfiguracji drukarki dla lokalizacji: ${location}`);
  }

  // Implementacja wysyłania do drukarki
  try {
    // Tutaj kod obsługujący drukarkę termiczną
    // np. używając biblioteki node-thermal-printer
    // lub innego rozwiązania odpowiedniego dla danej drukarki
  } catch (error) {
    console.error('Błąd podczas drukowania:', error);
    throw new Error('Nie udało się wydrukować zamówienia');
  }
} 