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

async function createVideojuego(
  titulo,
  genero,
  anio,
  historia_principal,
  descripcion,
  portada
) {
  const result = await dbClient.query(
    'INSERT INTO videojuegos(titulo, genero, anio, historia_principal, descripcion, portada) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
    [titulo, genero, anio, historia_principal, descripcion, portada]);

  
  if (result.rowCount === 0) {
    return undefined;
  } 
  return result.rows[0];
}

async function deleteVideojuego(id) {
  const result = await dbClient.query('DELETE FROM videojuegos WHERE id = $1', [id]);
  
  if (result.rowCount === 0) {
      return undefined;
  }
  return id;
  
}

module.exports = {
  getAllVideojuegos,
  getOneVideojuego,
  createVideojuego,
  deleteVideojuego
}