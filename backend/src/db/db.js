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

async function getOneVideojuego(id) {
  const result = await dbClient.query('SELECT * FROM videojuegos WHERE id = $1 LIMIT 1', [id]);
  return result.rows[0];
  
}

module.exports = {
  getAllVideojuegos,
  getOneVideojuego
}