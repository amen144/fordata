const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'amen',
  password: 'amen144144',
  port: 5432,
});

const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Contacts (
      id SERIAL PRIMARY KEY,
      nom VARCHAR(150) NOT NULL,
      prenom VARCHAR(150) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone_number VARCHAR(20) NOT NULL,
      Message VARCHAR(150) NOT NULL,
      subject VARCHAR(150) NOT NULL
    )`;

  try {
    await pool.query(createTableQuery);
    console.log('Table "Contacts" créée avec succès');
  } catch (err) {
    console.log(err)
    console.error('Erreur lors de la création de la table:', err.message);
  }
};

const checkDatabaseConnection = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Database connection successful');
  } catch (err) {
    console.log(err)
    console.error('Database connection error:', err);
  }
};

module.exports = {
  pool,
  createTable,
  checkDatabaseConnection,
};
