const { Pool } = require('pg')

const dbClient = new Pool({
  user: 'postgres',
  port: 5432,
  host: 'localhost',
  database: 'videojuegos',
  password: 'postgres',

});

async function getAllVideojuegos() {
  const result = await dbClient.query('SELECT * FROM videojuegos');
  return result.rows;
}

module.exports = {
  getAllVideojuegos
}