import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'sql7.freesqldatabase.com:3306/',
  user: 'sql7748578',
  password: 'taIVSCuIAz',
  database: 'sql7748578',
};

export async function getTableStructure(tableName) {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await connection.execute(`DESCRIBE ${tableName}`);
    return rows;
  } finally {
    await connection.end();
  }
}

export async function checkAllTables() {
  const tables = ['pizza', 'fastfood', 'dodatki', 'napoje', 'zamowienia'];
  const structures = {};

  for (const table of tables) {
    structures[table] = await getTableStructure(table);
  }

  return structures;
}
