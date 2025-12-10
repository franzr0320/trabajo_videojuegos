const dbClient = require("./db");

// get all videojuegos_usuario
async function getAllVideojuegosUsuario(usuario_id) {
  const result = await dbClient.query('SELECT * FROM videojuegos_usuario WHERE usuario_id = $1',
    [usuario_id]
  );
  return result.rows;

}

// get one videojuego_usuario
async function getOneVideojuegoUsuario(id, usuario_id) {
  const result = await dbClient.query(
    "SELECT * FROM videojuegos_usuario WHERE id = $1 AND usuario_id = $2",
    [id, usuario_id]
  );
  return result.rows[0];
}

// create videojuego_usuario
async function createVideojuegoUsuario(usuario_id, titulo, genero, anio, historia_principal, descripcion, portada) {
  const result = await dbClient.query(
    'INSERT INTO videojuegos_usuario (usuario_id, titulo, genero, anio, historia_principal, descripcion, portada) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [usuario_id, titulo, genero, anio, historia_principal, descripcion, portada]
  );
  return result.rows[0];
}

// delete videojuego_usuario
async function deleteVideojuegoUsuario(id, usuario_id) {
  const result = await dbClient.query(
    "DELETE FROM videojuegos_usuario WHERE id=$1 AND usuario_id=$2 RETURNING *",
    [id, usuario_id]
  );
  return result.rows[0];
}

// update videojuego_usuario
async function updateVideojuegoUsuario(id, usuario_id, titulo, genero, anio, historia_principal, descripcion, portada) {
  const result = await dbClient.query('UPDATE videojuegos_usuario SET titulo=$1, genero=$2, anio=$3, historia_principal=$4, descripcion=$5, portada=$6 WHERE id=$7 AND usuario_id=$8 RETURNING *',
    [titulo, genero, anio, historia_principal, descripcion, portada, id, usuario_id]
  );
  return result.rows[0];
}

module.exports = {
  getAllVideojuegosUsuario,
  getOneVideojuegoUsuario,
  createVideojuegoUsuario,
  deleteVideojuegoUsuario,
  updateVideojuegoUsuario
};