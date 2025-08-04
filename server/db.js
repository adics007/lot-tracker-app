const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./lottracker.db");

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS lots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lot_id TEXT,
    product_type TEXT,
    current_stage TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lot_id TEXT,
    stage TEXT,
    weight REAL,
    timestamp TEXT,
    operator_id INTEGER
  )`);
});

module.exports = db;
