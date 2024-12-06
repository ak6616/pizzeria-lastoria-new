import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'sql7.freesqldatabase.com:3306/',
  user: 'sql7748578',
  password: 'taIVSCuIAz',
  database: 'sql7748578',
};

export async function createConnection() {
  try {
    return await mysql.createConnection(dbConfig);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

export async function getMenuItems(category: string) {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute(`SELECT * FROM ${category}`);
    return rows;
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    throw error;
  } finally {
    await connection.end();
  }
}

export async function submitOrder(orderData: any) {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      'INSERT INTO zamowienia (imie, nazwisko, miejscowosc, ulica, numerDomu, numerMieszkania, numerTelefonu, delivery_time, items, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        orderData.firstName,
        orderData.lastName,
        orderData.city,
        orderData.street || '',
        orderData.houseNumber,
        orderData.apartmentNumber || '',
        orderData.phone,
        orderData.deliveryTime || '',
        JSON.stringify(orderData.items),
        orderData.totalPrice,
      ]
    );
    return result;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  } finally {
    await connection.end();
  }
}
