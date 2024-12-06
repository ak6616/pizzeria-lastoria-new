import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'sql7.freesqldatabase.com',
  port: 3306,
  user: 'sql7748578',
  password: 'taIVSCuIAz',
  database: 'sql7748578'
};

export async function getPizzaMenu() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await connection.execute('SELECT * FROM pizza');
    return rows;
  } catch (error) {
    console.error('Error fetching pizza menu:', error);
    throw error;
  } finally {
    await connection.end();
  }
}