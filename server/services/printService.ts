import net from 'net';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import type { CustomerData } from '../../src/components/CustomerDataForm.tsx';
import {htmlToText} from "html-to-text";

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

export async function printOrder(data: PrintOrderData) {

  const printerIP = '193.192.177.167';
  const printerPort = 9100; // Typowy port dla drukarek sieciowych

  const currentDate = format(new Date(), 'dd.MM.yyyy HH:mm', { locale: pl });

  async function printFromHTML(htmlContent: string) {
    try {
      const textContent = htmlToText(htmlContent, {
        wordwrap: 130,
      });

      const client = new net.Socket();
      client.connect(printerPort, printerIP, () => {
        console.log('Połączono z drukarką');
        client.write(textContent);
        client.end();
      });

      client.on('close', () => {
        console.log('Połączenie z drukarką zamknięte');
      });

      client.on('error', (err) => {
        console.error('Błąd połączenia z drukarką:', err);
      });
    } catch (error) {
      console.error('Błąd podczas drukowania:', error);
    }
  }
// Przykładowy kod HTML do drukowania
const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Zamówienie - ${currentDate}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          font-size: 12px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .section {
          margin-bottom: 15px;
        }
        .item {
          margin-bottom: 8px;
        }
        .total {
          margin-top: 15px;
          border-top: 1px solid #000;
          padding-top: 10px;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 10px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>Pizzeria Lastoria</h2>
        <p>Zamówienie z dnia ${currentDate}</p>
      </div>

      <div class="section">
        <h3>Dane klienta:</h3>
        <p>${data.customerData.firstName} ${data.customerData.lastName}</p>
        <p>
          ${data.customerData.city}
          ${data.customerData.street ? `, ul. ${data.customerData.street}` : ''}
          ${data.customerData.houseNumber}
          ${data.customerData.apartmentNumber ? `/${data.customerData.apartmentNumber}` : ''}
        </p>
        <p>Tel: ${data.customerData.phone}</p>
        ${data.customerData.deliveryTime ? `<p>Dostawa na godzinę: ${data.customerData.deliveryTime}</p>` : ''}
      </div>

      <div class="section">
        <h3>Zamówione produkty:</h3>
        ${data.items.map(item => `
          <div class="item">
            <strong>${item.name}</strong> x${item.quantity} - ${item.price * item.quantity} zł
            ${item.removedIngredients?.length ? `<br>Bez: ${item.removedIngredients.join(', ')}` : ''}
            ${item.addedIngredients?.length ? `<br>Dodatki: ${item.addedIngredients.map(i => `${i.name} (+${i.price} zł)`).join(', ')}` : ''}
          </div>
        `).join('')}
      </div>

      <div class="total">
        <p>Koszt dostawy: ${data.deliveryCost === 0 ? 'Gratis!' : `${data.deliveryCost} zł`}</p>
        <p><strong>Suma: ${data.totalPrice} zł</strong></p>
      </div>

      <div class="footer">
        <p>Dziękujemy za złożenie zamówienia!</p>
      </div>
    </body>
    </html>
  `;

  printFromHTML(html);
}