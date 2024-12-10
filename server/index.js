process.noDeprecation = true;

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import session from 'express-session';

const app = express();
const port = 3000;
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://twoja-domena.vercel.app', 'http://localhost:5173']
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Dodaj obsługę sesji
app.use(session({
  secret: 'twoj-tajny-klucz',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}));

// Dodaj obsługę preflight requests
app.options('*', cors());

const dbConfig = {
  host: process.env.DB_HOST || 'sql7.freesqldatabase.com',
  user: process.env.DB_USER || 'sql7748578',
  password: process.env.DB_PASSWORD || 'taIVSCuIAz',
  database: process.env.DB_NAME || 'sql7748578',
  port: parseInt(process.env.DB_PORT || '3306'),
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
  const validCategories = [
    'pizza_mp', 'fastfood_mp', 'napoje_mp', 'dodatki_mp',
    'pizza_hacz', 'fastfood_hacz', 'napoje_hacz', 'dodatki_hacz'
  ];
  
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
  const validCategories = [
    'pizza_mp', 'fastfood_mp', 'napoje_mp', 'dodatki_mp',
    'pizza_hacz', 'fastfood_hacz', 'napoje_hacz', 'dodatki_hacz'
  ];

  // Dodaj suffix lokalizacji do kategorii
  const location = req.query.location || 'miejsce-piastowe';
  const suffix = location === 'miejsce-piastowe' ? '_mp' : '_hacz';
  const fullCategory = `${category}${suffix}`;

  if (!validCategories.includes(fullCategory)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      `INSERT INTO ${fullCategory} (nazwa, cena, skladniki) VALUES (?, ?, ?)`,
      [nazwa, cena, skladniki || null]
    );
    res.json(result);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  } finally {
    await connection.end();
  }
});

app.put('/api/menu/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const { nazwa, cena, skladniki } = req.body;
  const validCategories = [
    'pizza_mp', 'fastfood_mp', 'napoje_mp', 'dodatki_mp',
    'pizza_hacz', 'fastfood_hacz', 'napoje_hacz', 'dodatki_hacz'
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      `UPDATE ${category} SET nazwa = ?, cena = ?, skladniki = ? WHERE id = ?`,
      [nazwa, cena, skladniki || null, id]
    );
    res.json(result);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  } finally {
    await connection.end();
  }
});

app.delete('/api/menu/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const validCategories = [
    'pizza_mp', 'fastfood_mp', 'napoje_mp', 'dodatki_mp',
    'pizza_hacz', 'fastfood_hacz', 'napoje_hacz', 'dodatki_hacz'
  ];

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
  const validCategories = [
    'dostawaweekday_mp', 'dostawaweekend_mp',
    'dostawaweekday_hacz', 'dostawaweekend_hacz'
  ];
  
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
  const validCategories = [
    'dostawaweekday_mp', 'dostawaweekend_mp',
    'dostawaweekday_hacz', 'dostawaweekend_hacz'
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      `INSERT INTO ${category} (nazwa, ulica, ilosc, koszt) VALUES (?, ?, ?, ?)`,
      [nazwa, ulica || null, ilosc, koszt]
    );
    res.json(result);
  } catch (error) {
    console.error('Error adding delivery rule:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  } finally {
    await connection.end();
  }
});

app.put('/api/delivery/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const { nazwa, ulica, ilosc, koszt } = req.body;
  const validCategories = [
    'dostawaweekday_mp', 'dostawaweekend_mp',
    'dostawaweekday_hacz', 'dostawaweekend_hacz'
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await createConnection();

  try {
    const [result] = await connection.execute(
      `UPDATE ${category} SET nazwa = ?, ulica = ?, ilosc = ?, koszt = ? WHERE id = ?`,
      [nazwa, ulica || null, ilosc, koszt, id]
    );
    res.json(result);
  } catch (error) {
    console.error('Error updating delivery rule:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
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

app.get('/api/delivery-areas:location', async (req, res) => {
  const { location } = req.params;
  const validLocations = ['_mp', '_hacz'];
  
  if (!validLocations.includes(location)) {
    return res.status(400).json({ error: 'Invalid location' });
  }

  const connection = await createConnection();

  try {
    const [rows] = await connection.execute(`SELECT * FROM miejscowosci${location}`);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching delivery areas:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

/////////////////////// Koszt dostawy

app.get('/api/delivery-cost:location', async (req, res) => {
  const connection = await createConnection();
  const { city, street, pizzaCount } = req.query;
  const { location } = req.params;
  const validLocations = ['_mp', '_hacz'];
  
  if (!validLocations.includes(location)) {
    return res.status(400).json({ error: 'Invalid location' });
  }

  const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
  const table = isWeekend ? `dostawaweekend${location}` : `dostawaweekday${location}`;

  try {
    // Pobierz wszystkie reguły dla danej lokalizacji
    const [allRules] = await connection.execute(
      `SELECT * FROM ${table} WHERE nazwa = ? AND (ulica = ? OR ulica IS NULL) ORDER BY ilosc ASC`,
      [city, street]
    );

    if (allRules.length === 0) {
      return res.json({
        cost: null,
        message: 'Nie dowozimy do tej lokalizacji'
      });
    }

    const pizzaCountNum = parseInt(pizzaCount);
    const maxRule = allRules[allRules.length - 1];

    // Jeśli liczba pizz jest większa niż największa ilość w regułach, dostawa jest darmowa
    if (pizzaCountNum > maxRule.ilosc) {
      return res.json({
        cost: 0,
        message: null
      });
    }

    // Znajdź regułę z najniższą wymaganą ilością
    const minRule = allRules[0];

    if (pizzaCountNum < minRule.ilosc) {
      return res.json({
        cost: null,
        message: `Minimalna ilość pizz dla tej lokalizacji to ${minRule.ilosc}`
      });
    }

    // Znajd odpowiednią regułę dla ilości pizz
    // Sortujemy malejąco, aby znaleźć najwyższą pasującą ilość
    const sortedRules = allRules.sort((a, b) => b.ilosc - a.ilosc);
    const applicableRule = sortedRules.find(rule => pizzaCountNum >= rule.ilosc);

    if (!applicableRule) {
      return res.json({
        cost: null,
        message: 'Błąd w obliczaniu kosztu dostawy'
      });
    }

    return res.json({
      cost: applicableRule.koszt,
      message: applicableRule.koszt === 0 ? 'Darmowa dostawa!' : null
    });

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
    // Upewnij się, że items jest tablicą przed konwersją na JSON
    const items = Array.isArray(orderData.items) ? orderData.items : [];
    
    // Sanityzacja i walidacja każdego elementu
    const sanitizedItems = items.map(item => ({
      name: String(item.name || ''),
      quantity: Number(item.quantity) || 0,
      removedIngredients: Array.isArray(item.removedIngredients) ? item.removedIngredients : [],
      addedIngredients: Array.isArray(item.addedIngredients) ? item.addedIngredients : []
    }));

    // Konwersja do JSON z dodatkowym sprawdzeniem
    const itemsJson = JSON.stringify(sanitizedItems)
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');

    // Przygotuj dane z wartościami domyślnymi dla null/undefined
    const orderValues = [
      orderData.firstName || '',
      orderData.lastName || '',
      orderData.city || '',
      orderData.street || '',
      orderData.houseNumber || '',
      orderData.apartmentNumber || null, // null jest dozwolony w SQL
      orderData.phone || '',
      orderData.deliveryTime || null,    // null jest dozwolony w SQL
      orderData.orderDateTime || new Date().toISOString(),
      itemsJson,
      Number(orderData.totalPrice) || 0
    ];

    // Sprawdź czy nie ma undefined w wartościach
    if (orderValues.includes(undefined)) {
      console.error('Wykryto undefined w danych zamówienia:', orderValues);
      throw new Error('Invalid order data - contains undefined values');
    }

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
      orderValues
    );

    res.json(result);
  } catch (error) {
    console.error('Error submitting order:', error);
    console.error('Order data:', JSON.stringify(orderData, null, 2));
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  } finally {
    await connection.end();
  }
});

app.get('/api/orders', async (req, res) => {
  const connection = await createConnection();

  try {
    const [rows] = await connection.execute(
      'SELECT *, DATE_FORMAT(dataGodzinaZamowienia, "%Y-%m-%dT%H:%i:%s.000Z") as dataGodzinaZamowienia FROM zamowienia ORDER BY dataGodzinaZamowienia ASC'
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

// Endpoint dla zamówień z różnych lokalizacji
app.post('/api/orders/:location', async (req, res) => {
  const connection = await createConnection();
  const { location } = req.params;
  
  try {
    const orderData = req.body;
    const orderValues = [
      orderData.firstName,
      orderData.lastName,
      orderData.city,
      orderData.street || null,
      orderData.houseNumber,
      orderData.apartmentNumber || null,
      orderData.phone,
      orderData.deliveryTime || null,
      new Date().toISOString(),
      JSON.stringify(orderData.items),
      orderData.totalPrice
    ];

    const [result] = await connection.execute(
      `INSERT INTO zamowienia${location} (
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
      orderValues
    );

    res.json(result);
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  } finally {
    await connection.end();
  }
});

app.get('/api/orders/:location', async (req, res) => {
  const connection = await createConnection();
  const { location } = req.params;

  try {
    const [rows] = await connection.execute(
      `SELECT *, DATE_FORMAT(dataGodzinaZamowienia, "%Y-%m-%dT%H:%i:%s.000Z") as dataGodzinaZamowienia 
       FROM zamowienia${location} 
       ORDER BY dataGodzinaZamowienia ASC`
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.delete('/api/orders/:location/:id', async (req, res) => {
  const connection = await createConnection();
  const { location, id } = req.params;
  const suffix = location === 'haczow' ? '_hacz' : '_mp';

  try {
    const [result] = await connection.execute(
      `DELETE FROM zamowienia${suffix} WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

// Endpoint logowania
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const connection = await createConnection();
  
  try {
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Nieprawidłowy login lub hasło' });
    }

    req.session.isAuthenticated = true;
    res.json({ success: true });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

// Endpoint sprawdzania statusu autoryzacji
app.get('/api/check-auth', (req, res) => {
  if (req.session.isAuthenticated) {
    res.status(200).end();
  } else {
    res.status(401).end();
  }
});

// Endpoint wylogowania
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.get('/api/orders/:location/count', async (req, res) => {
  const connection = await createConnection();
  const { location } = req.params;
  const suffix = location === 'haczow' ? '_hacz' : '_mp';

  try {
    const [result] = await connection.execute(
      `SELECT COUNT(*) as count FROM zamowienia${suffix}`
    );
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Error counting orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

