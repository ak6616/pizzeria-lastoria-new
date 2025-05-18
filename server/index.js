process.noDeprecation = true;
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { printToReceiptPrinter } from './printer.js';
import fs from 'fs';
import https from 'https';
import webpush from 'web-push';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import { concurrently } from 'concurrently';
import Redis from 'ioredis';
import { X509Certificate, createVerify } from 'crypto';
const MySQLSession = await import('express-mysql-session');
const MySQLStoreFn = MySQLSession.default || MySQLSession;
const MySQLStore = MySQLStoreFn(session);
const redis = new Redis();
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 1000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let tpayToken = null;
const app = express();
const port = process.env.PORT ;

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/zdjecia"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({storage});


app.use("/zdjecia", express.static(path.join(__dirname, "../public/zdjecia")));

app.use(cookieParser());

// Serwuj pliki statyczne z folderu dist
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));


app.use(cors({
  origin: ['https://www.pizza-lastoria.pl', 'https://pizza-lastoria.pl'], // Your frontend address
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true // Zezwól na przesyłanie ciasteczek
}));

app.use(express.json());


// Dodaj obsługę sesji
app.use(session({
  secret: 'twoj-tajny-klucz',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? 'pizza-lastoria.pl' : undefined,
    maxAge: 24 * 60 * 60 * 1000
  }
}));


// Upewnij się, że preflight requests są obsługiwane prawidłowo
app.options('*', cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 1000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

const DEBUG = true; // łatwe włączanie/wyłączanie logowania

// Middleware do logowania wszystkich zapytań
app.use((req, res, next) => {
  // if (!req.secure) {
  //   return res.redirect(301, `https://${req.headers.host}${req.url}`);
  // }
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  if (DEBUG) {
    console.log(`${new Date().toLocaleString('pl-PL')} ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    if (req.body && Object.keys(req.body).length > 0) {
      console.log('Body:', req.body);
    }
  }
  next();
});

async function getConnection() {
  try {
    if (DEBUG) {
      console.log('Pobieranie połączenia z puli');
    }
    return await pool.getConnection();
  } catch (error) {
    console.error('Błąd podczas pobierania połączenia:', error);
    throw error;
  }
}



//////////////////////menu

app.get('/api/menu/:category', async (req, res) => {
  const { category } = req.params;
  if (DEBUG) console.log(`Otrzymano zapytanie o kategorię: ${category}`);
  
  const validCategories = [
    'pizza_mp', 'fastfood_mp', 'napoje_mp', 'dodatki_mp',
    'pizza_hacz', 'fastfood_hacz', 'napoje_hacz', 'dodatki_hacz'
  ];
  
  if (!validCategories.includes(category)) {
    if (DEBUG) console.log(`Nieprawidłowa kategoria: ${category}`);
    return res.status(400).json({ error: 'Invalid category' });
  }

  try {
    const [rows] = await pool.execute(`SELECT * FROM ${category}`);
    if (DEBUG) console.log(`Znaleziono ${rows.length} rekordów`);
    
    res.json(rows);
  } catch (error) {
    console.error(`Błąd podczas pobierania ${category}:`, error);
    res.status(500).json({ error: 'Internal server error' });
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

  const connection = await getConnection();

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
    await connection.release();
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

  const connection = await getConnection();

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
    await connection.release();
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

  const connection = await getConnection();

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
    await connection.release();
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

  const connection = await getConnection();

  try {
    const [rows] = await connection.execute(`SELECT * FROM ${category}`);

    res.json(rows);
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.release();
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

  const connection = await getConnection();

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
    await connection.release();
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

  const connection = await getConnection();

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
    await connection.release();
  }
});

app.delete('/api/delivery/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const validCategories = [
    'dostawaweekday_mp', 'dostawaweekend_mp',
    'dostawaweekday_hacz', 'dostawaweekend_hacz'
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const connection = await getConnection();

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
    await connection.release();
  }
});

////////////////////////////////// Aktualności

app.get('/api/news', async (req, res) => {
  const connection = await getConnection();

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM aktualnosci ORDER BY data DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.release();
  }
});

app.post('/api/news', async (req, res) => {
  const { tytul, tekst, data } = req.body;
  const connection = await getConnection();

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
    await connection.release();
  }
});

app.put('/api/news/:id', async (req, res) => {
  const { id } = req.params;
  const { tytul, tekst } = req.body;
  const connection = await getConnection();

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
    await connection.release();
  }
});

app.delete('/api/news/:id', async (req, res) => {
  const { id } = req.params;
  const connection = await getConnection();

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
    await connection.release();
  }
});

////////////////////////Ustawienia

app.put('/api/settings:location/:id', async (req, res) => {
  const { location, id } = req.params;
  const { wartosc } = req.body;
  const suffix = location === '_hacz' ? '_hacz' : '_mp';

  const connection = await getConnection();

  try {
    const [result] = await connection.execute(
      `UPDATE ustawienia${suffix} SET wartosc = ? WHERE id = ?`,
      [wartosc, id]
    );
    res.json(result);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.release();
  }
});

app.get('/api/settings:location', async (req, res) => {
  const { location } = req.params;
  const suffix = location === '_hacz' ? '_hacz' : '_mp';
  const connection = await getConnection();

  try {
    const [rows] = await connection.execute(
      `SELECT * FROM ustawienia${suffix}`
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.release();
  }
});

app.get('/api/settings:location/:id', async (req, res) => {
  const { location, id } = req.params;
  const suffix = location === '_hacz' ? '_hacz' : '_mp';
  const connection = await getConnection();

  try {
    const [rows] = await connection.execute(
      `SELECT wartosc FROM ustawienia${suffix} WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Setting not found' });
    }

    res.json(rows[0]); // Return only the 'wartosc'
  } catch (error) {
    console.error('Error fetching setting:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.release();
  }
});

////////////////////////// Galeria

app.post('/api/gallery', async (req, res) => {
  const { link } = req.body;
  console.log(link);
  const connection = await getConnection();

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
    await connection.release();
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  const { id } = req.params;
  const connection = await getConnection();

  try {

    // Usuwanie grafiki z serwera

    const [filePathResult] = await connection.execute('SELECT link FROM galeria WHERE id = ?', [id]);
    const filePath = filePathResult[0]?.link; // Extract the 'link' field from the result

    if (!filePath) {
      return res.status(404).json({ error: "Nie znaleziono ścieżki do pliku." });
    }

    const absolutePath = path.join(__dirname, '../public/zdjecia', path.basename(filePath));

    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error("Błąd podczas usuwania pliku:", err);
        return res.status(500).json({ error: "Nie udało się usunąć pliku." });
      }

      console.log("Plik usunięty pomyślnie.");
    });

    // Usuwanie rekordu z bazy danych

    const [result] = await connection.execute(
      'DELETE FROM galeria WHERE id = ?',
      [id]
    );
    res.json(result);
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.release();
  }
});

app.get('/api/gallery', async (req, res) => {
  const connection = await getConnection();

  try {
    const [rows] = await connection.execute('SELECT * FROM galeria');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.release();
  }
});

app.post("/api/gallery/upload", upload.single("photo"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Brak przesłanego pliku." });
  }
  const fileUrl = `https://pizza-lastoria.pl/zdjecia/${req.file.filename}`;
  res.json({ fileUrl });

})

///////////////////// Obszar dostawy

app.get('/api/delivery-areas:location', async (req, res) => {
  const { location } = req.params;
  const validLocations = ['_mp', '_hacz'];
  
  if (!validLocations.includes(location)) {
    return res.status(400).json({ error: 'Invalid location' });
  }

  const connection = await getConnection();

  try {
    const [rows] = await connection.execute(`SELECT id, nazwa, ulica FROM dostawaweekday${location}`);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching delivery areas:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.release();
  }
});

/////////////////////// Koszt dostawy

app.get('/api/delivery-cost:location', async (req, res) => {
  const connection = await getConnection();
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
    await connection.release();
  }
});

// Endpoint dla zamówień z różnych lokalizacji
app.post('/api/orders/:location', async (req, res) => {
  const connection = await getConnection();
  const { location } = req.params;
  const suffix = location === 'haczow' ? '_hacz' : '_mp';
 
  try {

      const orderData = req.body;
    console.log('=== Nowe zamówienie otrzymane ===');
    console.log('Lokalizacja:', location);
    console.log('Dane zamówienia:', JSON.stringify(orderData, null, 2));

    // Zapisz zamówienie do bazy danych
    const orderValues = [
      orderData.firstName,
      orderData.lastName,
      orderData.type,
      orderData.city,
      orderData.street || null,
      orderData.houseNumber,
      orderData.apartmentNumber || null,
      orderData.phone,
      orderData.deliveryTime || null,
      new Date().toLocaleString('pl-PL'),
      JSON.stringify(orderData.items),  // Konwertuj tablicę na string dla bazy
      orderData.totalPrice,
      orderData.notes
    ];
     console.log(orderValues);
      const [result] = await connection.execute(
        `INSERT INTO zamowienia${suffix} (
          imie, nazwisko, typ, miejscowosc, ulica, numerDomu, numerMieszkania, 
          numerTelefonu, zamowienieNaGodzine, dataGodzinaZamowienia,
          zamowioneProdukty, suma, uwagi
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        orderValues
      );
  
      // Jeśli zapis do bazy się powiódł, drukuj zamówienie
      if (result.insertId) {
        console.log('Zamówienie zapisane w bazie, ID:', result.insertId);
        
        // Przygotuj dane do wydruku
        const printData = {
          imie: orderData.firstName,
          nazwisko: orderData.lastName,
          typ: orderData.type,
          miejscowosc: orderData.city,
          ulica: orderData.street,
          numerDomu: orderData.houseNumber,
          numerMieszkania: orderData.apartmentNumber,
          numerTelefonu: orderData.phone,
          zamowienieNaGodzine: orderData.deliveryTime,
          zamowioneProdukty: orderData.items,
          suma: orderData.totalPrice,
          notes: orderData.notes
        };
  
        try {
          console.log('Rozpoczynam proces drukowania...');
          console.log('Dane do wydruku:', JSON.stringify(printData, null, 2));
          const printResult = await printToReceiptPrinter(printData);
          console.log('Wynik drukowania:', printResult);
        } catch (printError) {
          console.error('Błąd podczas drukowania:', printError);
          console.error('Stack trace:', printError.stack);
        }
      // }
    } else {      
      console.error('Płatność nieudana:', transactionStatus);
      throw new Error('Płatność nieudana');
    }
  
      res.json({ success: true, orderId: result.insertId });
        
  } catch (error) {
    console.error('Błąd przetwarzania zamówienia:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  } finally {
    await connection.release();
  }
});

////////// Endpoint do pobierania zamówień

app.get('/api/orders/:location', async (req, res) => {
  const connection = await getConnection();
  const { location } = req.params;

  try {
    const [rows] = await connection.execute(
      `SELECT *
       FROM zamowienia${location} 
       ORDER BY dataGodzinaZamowienia DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.release();
  }
});

app.delete('/api/orders/:location/:id', async (req, res) => {
  const connection = await getConnection();
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
    await connection.release();
  }
});

////// Czyszczenie wszystkich zamówień
app.delete('/api/orders/:location', async (req, res) => {
  const connection = await getConnection();
  const { location } = req.params;
  const suffix = location === 'haczow' ? '_hacz' : '_mp';

  try {
    const [result] = await connection.execute(
      `TRUNCATE TABLE zamowienia${suffix}`
    );

    // if (result.affectedRows === 0) {
    //   return res.status(404).json({ error: 'Orders not found' });
    // }

    res.json({ message: 'Orders deleted successfully' });
  } catch (error) {
    console.error('Error deleting orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.release();
  }
});

// Endpoint logowania
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const connection = await getConnection();
  
  try {
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Nieprawidłowy login lub hasło' });
    }

    req.session.isAuthenticated = true;
    req.session.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.release();
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

/////Endpoint do zliczania aktywnych zamówień

app.get('/api/orders/:location/count', async (req, res) => {
  const connection = await getConnection();
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
    await connection.release();
  }
});




///////Funkcja do pobierania tokena TPay

async function getTpayToken() {
  try {
      const url = "https://api.tpay.com/oauth/auth";
      const data = new URLSearchParams({
          client_id: process.env.TPAY_CLIENT_ID,
          client_secret: process.env.TPAY_SECRET
      });

      const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: data
      });

      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

      const result = await response.json();
      tpayToken = result.access_token; // Zapisujemy nowy token
      
  } catch (error) {
      console.error("Błąd pobierania tokena:", error.message);
  }
}

// Pobieramy token na starcie aplikacji
getTpayToken();

// Automatyczne odświeżanie co 1h 55min (przed wygaśnięciem tokena)
setInterval(getTpayToken, 115 * 60 * 1000); // 115 minut w milisekundach



////// Endpoint do inicjalizacji płatności
app.post('/api/payment/init', async (req, res) => {
  try {

    async function initializePayment(paymentData) {
      // Tutaj implementacja integracji z API TPay
      const response = await fetch('https://api.tpay.com/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tpayToken}`
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          description: paymentData.description,
          hiddenDescription: paymentData.hiddenDescription,
          crc: paymentData.crc,
          payer: {
            email: paymentData.email,
            city: paymentData.city,
            name: paymentData.name,
            address: paymentData.address,
            phone: paymentData.phone,
          },
          country: paymentData.country,
          
          notification_url: process.env.TPAY_NOTIFICATION_URL,
          success_url: process.env.TPAY_RETURN_URL,
          error_url: process.env.TPAY_ERROR_URL
        })
        
      });
      
      return response.json();
    } 

    const transaction = await initializePayment(req.body);
    if (transaction.transactionId) {
      // Przechowaj dane zamówienia na 15 minut
      await redis.setex(`order:${transaction.transactionId}`, 900, JSON.stringify({
        orderData: req.body.orderData,
        location: req.body.location
      }));
    }
    res.json(transaction);
    
  } catch (error) {
    console.error('Błąd inicjalizacji płatności:', error);
    res.status(500).json({ error: 'Błąd inicjalizacji płatności' });
  }
});

// app.post('/api/payment/webhook', async (req, res) => {
//   try {
//     const { title, transactionId, status } = req.body;

//     console.log('Webhook od Tpay:', req.body);

//     if (status !== 'correct') {
//       return res.status(200).send('Płatność nie została zakończona poprawnie');
//     }

//     const orderInfoStr = await redis.get(`order:${transactionId}`);

//     if (!orderInfoStr) {
//       console.warn(`Brak danych zamówienia w Redis dla transakcji ${transactionId}`);
//       return res.status(404).send('Dane zamówienia nie znalezione');
//     }

//     const { orderData, location } = JSON.parse(orderInfoStr);

//     // Wywołanie zapisującego endpointu
//     const response = await fetch(`https://pizza-lastoria.pl:3000/api/orders/${location}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(orderData)
//     });

//     if (!response.ok) {
//       throw new Error('Błąd podczas zapisu zamówienia');
//     }

//     await redis.del(`order:${transactionId}`); // opcjonalne — sprzątanie po sobie

//     res.status(200).send('OK');
//     return res.end("TRUE")
//   } catch (err) {
//     console.error('Błąd obsługi webhooka:', err);
//     res.status(500).send('Błąd serwera');
//   }
// });


// ////// Endpoint do sprawdzania statusu płatności
// app.post('/api/payment/status', async (req, res) => {
//   try {
//     const { transactionId, location, orderData} = req.body;
//     if (!transactionId) {
//       return res.status(400).json({ error: 'Brak transactionId' });
//     }
//       for(let i = 0; i < 15; i++) {
//         try {
//           const response = await fetch(`https://api.tpay.com/transactions/${transactionId}`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${tpayToken}` // Zaktualizuj token
//             }
//           });
  
//           if (!response.ok) {
//             throw new Error(`Błąd HTTP! Status: ${response.status}`);
//           }
  
//           const data = await response.json();
//           console.log(`Odpowiedź z API:`, data);
  
//           if (data.status === "correct") {
//             console.log("Płatność zakończona sukcesem!");
            
//             // Jeśli płatność się powiedzie, wysyłamy zamówienie
//             const response = await fetch(`https://pizza-lastoria.pl:3000/api/orders/${location}`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(orderData)
              
//             });
//             i = 14;
//             if (!response.ok) {
//               throw new Error('Błąd podczas składania zamówienia');
//             }
//             return res.json({ status: "correct", data }); // Odpowiedź do klienta
//           } else if(data.status === "canceled") {
//             i = 14;
//             console.log(`Płatność została anulowana: ${data.status}`);
//           }
//            else {
//             console.log(`Płatność w trakcie: ${data.status}`);
//           }
//         } catch (error) {
//           console.error("Błąd podczas pobierania statusu transakcji:", error);
//         }
//         await new Promise(resolve => setTimeout(resolve, 64000)); // Czekaj 1 sekundę
//         console.log(`Czekam ${i + 1} minuty...`);
//       }
      
//     } catch (error) {
//     console.error('Błąd statusu płatności:', error);
//     res.status(500).json({ error: 'Błąd statusu płatności' });
//   }
// });

// Obsługa wszystkich pozostałych ścieżek - przekieruj do index.html
app.get('*', (req, res) => {
  // Nie przekierowuj żądań API
  if (!req.url.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../index.html'));
  }
});


////////Handler dla powiadomień push

webpush.setVapidDetails(
  'mailto:mp.lastoria@gmail.com',
  process.env.VAPID_PUBLIC_KEY, // Klucz publiczny
  process.env.VAPID_PRIVATE_KEY // Klucz prywatny
);

let subscriptions = [];

app.post('/api/subscribe', (req, res) => {
  const subscription = req.body;
  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'Invalid subscription object' });
  };
  subscriptions.push(subscription); // Upewnij się, że subskrypcja jest poprawnie zapisywana
  res.status(201).json({ message: 'Subscribed successfully' });
});

app.post('/api/notify', async (req, res) => {
  const payload = JSON.stringify({
    title: 'Nowe Zamówienie',
    body: 'Sprawdź szybko nowe zamówienie! 😁',
  })

  const results = await Promise.allSettled(
    subscriptions.map((sub) => 
    webpush.sendNotification(sub, payload).catch(err => {
      console.error("Błąd podczas wysyłania powiadomienia:", err);
    }))
  )
  res.json({ success: true, results })

});

async function notification() {
  let lastOrderCount = 0;
  
  while (true) {
    try {
      // Pobierz aktualną liczbę zamówień
      const response = await fetch('https://pizza-lastoria.pl:3000/api/orders/miejsce-piastowe/count', {
        credentials: 'include',
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error('Błąd podczas pobierania liczby zamówień');
      }
      
      const { count } = await response.json();
      
      // Jeśli liczba zamówień się zwiększyła, wyślij powiadomienie
      if (count > lastOrderCount) {
        console.log(`Wykryto nowe zamówienie! Liczba zamówień: ${count}`);
        
        // Wyślij powiadomienie do wszystkich subskrybentów
        const notifyResponse = await fetch('https://pizza-lastoria.pl:3000/api/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        
        if (!notifyResponse.ok) {
          console.error("Błąd podczas wysyłania powiadomienia:", notifyResponse.statusText);
        } else {
          console.log("Powiadomienie wysłane pomyślnie!");
        }
        
        lastOrderCount = count;
      }
      
      // Czekaj 5 minut przed następnym sprawdzeniem
      await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
      
    } catch (error) {
      console.error("Błąd w funkcji notification:", error);
      // W przypadku błędu czekaj 1 minutę przed ponowną próbą
      await new Promise(resolve => setTimeout(resolve, 60 * 1000));
    }
  }
}

// Uruchom funkcję notification
notification();

// Endpoint do pobierania klucza VAPID
app.get('/api/vapid-key', (req, res) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
});


async function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      resolve(body);
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
}

app.post('/api/payment/webhook', async (req, res) => {
  // Get the JWS signature from the request headers
  const jws = req.headers["x-jws-signature"];

  if (!jws) {
    return res.end("FALSE - Missing JWS header");
  }

  // Split the JWS into parts (header, payload, and signature)
  const jwsData = jws.split(".");
  const headerPart = jwsData[0];
  const signaturePart = jwsData[2];
  // Convert the body content of the request (which is typically an object) into a URL-encoded query string format
  // This is necessary for constructing the payload that will be used in the signature verification
  const bodyContent = await readBody(req);
  const rawBody = new URLSearchParams(JSON.parse(bodyContent)).toString();
  // Decode and parse the JWS header
  const headerDecoded = Buffer.from(headerPart.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("ascii");
  const headerJson = JSON.parse(headerDecoded);

  if (!headerJson.x5u) {
    return res.end("FALSE - Missing x5u header");
  }

  if (!headerJson.x5u.startsWith("https://secure.tpay.com")) {
    return res.end("FALSE - Wrong x5u URL");
  }

  // Fetch the JWS signing certificate and the trusted CA certificate
  const [signingCert, caCert] = await Promise.all([fetch(headerJson.x5u).then((res) => res.text()), fetch("https://secure.tpay.com/x509/tpay-jws-root.pem").then((res) => res.text())]);

  // Load certificates
  const x5uCert = new X509Certificate(signingCert);
  const caCertPublicKey = new X509Certificate(caCert).publicKey;

  // Verify that the signing certificate is signed by the CA certificate
  if (!x5uCert.verify(caCertPublicKey)) {
    return res.end("FALSE - Signing certificate is not signed by Tpay CA certificate");
  }

  // Prepare the payload (body content) in base64url encoding
  const payload = Buffer.from(rawBody, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  // Decode the signature from base64url
  const decodedSignature = Buffer.from(signaturePart.replace(/-/g, "+").replace(/_/g, "/"), "base64");

  // Verify the signature
  const verifier = createVerify("SHA256");
  verifier.update(`${headerPart}.${payload}`);
  verifier.end();

  const publicKey = x5uCert.publicKey;
  const isValid = verifier.verify(publicKey, decodedSignature);

  if (!isValid) {
    return res.end("FALSE - Invalid JWS signature");
  }

  // Here you can process transactions based on POST data
  // JWS signature verified successfully.
  res.status(200).json({ message: "TRUE" });
  return res.end("TRUE");
});

const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/pizza-lastoria.pl/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/pizza-lastoria.pl/fullchain.pem'),
};

const server = https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} jest już w użyciu. Upewnij się, że żaden inny proces nie używa tego portu.`);
  } else {
    console.error('Błąd podczas uruchamiania serwera:', err);
  }
  process.exit(1);
});

server.on('clientError', (err, socket) => {
  console.error('Client error:', err.message);
  socket.destroy(); // 👈 TO JEST KLUCZOWE
});

// Dodaj obsługę zamknięcia
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Serwer został zamknięty');
    process.exit(0);
  });
});



