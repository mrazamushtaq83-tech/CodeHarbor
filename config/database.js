const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.JSON_DB_PATH || path.join(__dirname, '..', 'database.json');

// Initialize database if it doesn't exist
function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    const initialData = {
      users: [],
      images: [],
      transactions: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    console.log('Initialized JSON Database at', DB_PATH);
  }
}

// Read a table from the JSON file
function readTable(tableName) {
  if (!fs.existsSync(DB_PATH)) {
    initDB();
  }
  const dataRaw = fs.readFileSync(DB_PATH, 'utf-8');
  const db = JSON.parse(dataRaw);
  return db[tableName] || [];
}

// Write a table back to the JSON file
function writeTable(tableName, tableData) {
  if (!fs.existsSync(DB_PATH)) {
    initDB();
  }
  const dataRaw = fs.readFileSync(DB_PATH, 'utf-8');
  const db = JSON.parse(dataRaw);
  db[tableName] = tableData;
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

module.exports = {
  initDB,
  readTable,
  writeTable
};
