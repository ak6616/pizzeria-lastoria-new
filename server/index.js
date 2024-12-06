import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'sql7.freesqldatabase.com',
  user: 'sql7748578',
  password: 'taIVSCuIAz',
  database: 'sql7748578',
  port: 3306,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

async function createConnection() {
  try {
    return await mysql.createConnection(dbConfig);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

//////////////////////menu

app.get('/api/menu/:category', async (req, res) => {
  const { category } = req.params;
  const validCategories = ['pizza', 'fastfood', 'napoje', 'dodatki'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await createConnection();

  try {
    const [rows] = await connection.execute(`SELECT * FROM ${category}`);
    res.json(rows);
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.post('/api/menu', async (req, res) => {
  const { category, nazwa, cena, skladniki } = req.body;

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      `INSERT INTO ${category} (nazwa, cena, skladniki) VALUES (?, ?, ?)`,
      [nazwa, cena, skladniki]
    );
    res.json(result);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.put('/api/menu/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const { nazwa, cena, skladniki } = req.body;

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      `UPDATE ${category} SET nazwa = ?, cena = ?, skladniki = ? WHERE id = ?`,
      [nazwa, cena, skladniki, id]
    );
    res.json(result);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.delete('/api/menu/:category/:id', async (req, res) => {
  const { category, id } = req.params;

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      `DELETE FROM ${category} WHERE id = ?`,
      [id]
    );
    res.json(result);
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});
/////////////////////////////////// Dostawa

app.get('/api/delivery/:category', async (req, res) => {
  const { category } = req.params;

  const validCategories = ['dostawaweekday', 'dostawaweekend'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await createConnection();

  try {
    const [rows] = await connection.execute(`SELECT * FROM ${category}`);

    res.json(rows);
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.post('/api/delivery', async (req, res) => {
  const { category, nazwa, ulica, ilosc, koszt } = req.body;

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      `INSERT INTO ${category} (nazwa, ulica, ilosc, koszt) VALUES (?, ?, ?, ?)`,
      [nazwa, ulica, ilosc, koszt]
    );
    res.json(result);
  } catch (error) {
    console.error('Error adding delivery record:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.put('/api/delivery/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const { nazwa, ulica, ilosc, koszt } = req.body;

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      `UPDATE ${category} SET nazwa = ?, ulica = ?, ilosc = ?, koszt = ? WHERE id = ?`,
      [nazwa, ulica, ilosc, koszt, id]
    );
    res.json(result);
  } catch (error) {
    console.error('Error updating delivery record:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.delete('/api/delivery/:category/:id', async (req, res) => {
  const { category, id } = req.params;

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      `DELETE FROM ${category} WHERE id = ?`,
      [id]
    );
    res.json(result);
  } catch (error) {
    console.error('Error deleting delivery record:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

////////////////////////////////// Aktualności

app.get('/api/news', async (req, res) => {
  const connection = await createConnection();

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM aktualnosci ORDER BY data DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.post('/api/news', async (req, res) => {
  const { tytul, tekst, data } = req.body;
  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      'INSERT INTO aktualnosci (tytul, tekst, data) VALUES (?, ?, ?)',
      [tytul, tekst, data]
    );
    res.json(result);
  } catch (error) {
    console.error('Error adding news:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.put('/api/news/:id', async (req, res) => {
  const { id } = req.params;
  const { tytul, tekst } = req.body;
  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      'UPDATE aktualnosci SET tytul = ?, tekst = ? WHERE id = ?',
      [tytul, tekst, id]
    );
    res.json(result);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.delete('/api/news/:id', async (req, res) => {
  const { id } = req.params;
  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      'DELETE FROM aktualnosci WHERE id = ?',
      [id]
    );
    res.json(result);
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

////////////////////////// Galeria

app.post('/api/gallery', async (req, res) => {
  const { link } = req.body;
  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      'INSERT INTO galeria (link) VALUES (?)',
      [link]
    );
    res.json(result);
  } catch (error) {
    console.error('Error adding image:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  const { id } = req.params;
  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      'DELETE FROM galeria WHERE id = ?',
      [id]
    );
    res.json(result);
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.get('/api/gallery', async (req, res) => {
  const connection = await createConnection();

  try {
    const [rows] = await connection.execute('SELECT * FROM galeria');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

///////////////////// Obszar dostawy

app.get('/api/delivery-areas', async (req, res) => {
  const connection = await createConnection();

  try {
    const [rows] = await connection.execute('SELECT * FROM miejscowosci');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching delivery areas:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

/////////////////////// Koszt dostawy

app.get('/api/delivery-cost', async (req, res) => {
  const connection = await createConnection();
  const { city, street, pizzaCount } = req.query;
  const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
  const table = isWeekend ? 'dostawaweekend' : 'dostawaweekday';
  // let lastPizzaCount = 0;

  try {
    const [rows] = await connection.execute(
      `SELECT * FROM ${table} WHERE nazwa = ? AND (ulica = ? OR ulica IS NULL) AND ilosc = ?`,
      [city, street, pizzaCount]
    );
    const deliveryInfo = rows[0];

    // Zapytania o maksymalną i minimalną wartość
    const [[{ max_ilosc: max }]] = await connection.execute(
      `SELECT MAX(ilosc) AS max_ilosc FROM ${table} WHERE nazwa = ? AND (ulica = ? OR ulica IS NULL)`,
      [city, street]
    );
    const [[{ min_ilosc: min }]] = await connection.execute(
      `SELECT MIN(ilosc) AS min_ilosc FROM ${table} WHERE nazwa = ? AND (ulica = ? OR ulica IS NULL)`,
      [city, street]
    );

    let cost = 0;

    if (rows.length === 0 && pizzaCount < min) {
      // Za mało pizz, nie dowozimy
      cost = null;
      res.json({
        cost,
        message: 'Nie dowozimy do tej lokalizacji przy tak małej ilości',
      });
    } else if (rows.length === 0 && pizzaCount > max) {
      // Za dużo pizz, dowóz darmowy
      cost = 0;
      res.json({ cost, message: null });
    } else {
      // Koszt zgodny z bazą danych
      console.log(deliveryInfo);
      cost = deliveryInfo.koszt;
      res.json({ cost, message: null });
    }

    // const cost =
    //   parseInt(pizzaCount) > deliveryInfo.ilosc ? 0 : deliveryInfo.koszt;
    return;
  } catch (error) {
    console.error('Error calculating delivery cost:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.post('/api/orders', async (req, res) => {
  const connection = await createConnection();
  const orderData = req.body;

  try {
    const [result] = await connection.execute(
      `INSERT INTO zamowienia (
        imie, 
        nazwisko, 
        miejscowosc, 
        ulica, 
        numerDomu, 
        numerMieszkania, 
        numerTelefonu, 
        zamowienieNaGodzine, 
        dataGodzinaZamowienia,
        zamowioneProdukty, 
        suma
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderData.firstName,
        orderData.lastName,
        orderData.city,
        orderData.street || '',
        orderData.houseNumber,
        orderData.apartmentNumber || '',
        orderData.phone,
        orderData.deliveryTime || '',
        orderData.orderDateTime,
        JSON.stringify(orderData.items),
        orderData.totalPrice,
      ]
    );
    res.json(result);
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.get('/api/orders', async (req, res) => {
  const connection = await createConnection();

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM zamowienia ORDER BY dataGodzinaZamowienia DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      'DELETE FROM zamowienia WHERE id = ?',
      [id]
    );
    res.json(result);
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
