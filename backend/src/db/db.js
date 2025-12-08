const { Pool } = require('pg')

const dbClient = new Pool({
  user: 'postgres',
  port: 5432,
  host: 'localhost',
  database: 'videojuegos',
  password: 'postgres',

});

async function getAllVideojuegosBase() {
  const result = await dbClient.query('SELECT * FROM videojuegos');
  return result.rows;
}

async function getOneVideojuegoBase(id) {
  const result = await dbClient.query('SELECT * FROM videojuegos WHERE id = $1 LIMIT 1', [id]);
  return result.rows[0];
  
}

async function createVideojuegoBase(
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

async function deleteVideojuegoBase(id) {
  const result = await dbClient.query('DELETE FROM videojuegos WHERE id = $1', [id]);
  
  if (result.rowCount === 0) {
    return undefined;
  }
  return id;
  
}

async function updateVideojuegoBase(
  id,
  titulo,
  genero,
  anio,
  historia_principal,
  descripcion,
  portada
) {
  const result = await dbClient.query( 'UPDATE videojuegos SET titulo = $1, genero = $2, anio = $3, historia_principal = $4, descripcion = $5, portada = $6 WHERE id = $7 RETURNING *',
    [titulo, genero, anio, historia_principal, descripcion, portada, id]);

  if (result.rowCount === 0) {
    return undefined;
  }

  return result.rows[0];
}

async function getAllVideojuegosUsuario(usuario_id) {
  const result = await dbClient.query('SELECT * FROM videojuegos_usuario WHERE usuario_id = $1',
    [usuario_id]
  );
  return result.rows;

}

async function getOneVideojuegoUsuario(id, usuario_id) {
  const result = await dbClient.query(
    "SELECT * FROM videojuegos_usuario WHERE id = $1 AND usuario_id = $2",
    [id, usuario_id]
  );
  return result.rows[0];
}

async function getOneVideojuegoUsuario(id, usuario_id) {
  const result = await dbClient.query('SELECT * FROM videojuegos_usuario WHERE id = $1 AND usuario_id = $2',
    [id, usuario_id]
  );
  return result.rows[0];
}

async function createVideojuegoUsuario(usuario_id, titulo, genero, anio, historia_principal, descripcion, portada) {
  const result = await dbClient.query(
    'INSERT INTO videojuegos_usuario (usuario_id, titulo, genero, anio, historia_principal, descripcion, portada) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [usuario_id, titulo, genero, anio, historia_principal, descripcion, portada]
  );
  return result.rows[0];
}


async function deleteVideojuegoUsuario(id, usuario_id) {
  const result = await dbClient.query(
    "DELETE FROM videojuegos_usuario WHERE id=$1 AND usuario_id=$2 RETURNING *",
    [id, usuario_id]
  );
  return result.rows[0];
}

async function updateVideojuegoUsuario(id, usuario_id, titulo, genero, anio, historia_principal, descripcion, portada) {
  const result = await dbClient.query('UPDATE videojuegos_usuario SET titulo=$1, genero=$2, anio=$3, historia_principal=$4, descripcion=$5, portada=$6 WHERE id=$7 AND usuario_id=$8 RETURNING *',
    [titulo, genero, anio, historia_principal, descripcion, portada, id, usuario_id]
  );
  return result.rows[0];
}

module.exports = {
  getAllVideojuegosBase,
  getOneVideojuegoBase,
  createVideojuegoBase,
  deleteVideojuegoBase,
  updateVideojuegoBase,
  getAllVideojuegosUsuario,
  getOneVideojuegoUsuario,
  createVideojuegoUsuario,
  deleteVideojuegoUsuario,
  updateVideojuegoUsuario
}