import { checkAllTables } from './database.js';

async function main() {
  try {
    const structures = await checkAllTables();
    console.log(JSON.stringify(structures, null, 2));
  } catch (error) {
    console.error('Error checking database structure:', error);
  }
}

main();