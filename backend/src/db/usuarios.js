const dbClient = require("./db");

// get all usuarios
async function getAllUsuarios() {
  const result = await dbClient.query('SELECT * FROM usuarios');
  return result.rows;
}

// get one usuario
async function getOneUsuario(id) {
  const result = await dbClient.query(
    'SELECT * FROM usuarios WHERE id = $1 LIMIT 1',
    [id]
  );
  return result.rows[0];
}

// create usuario
async function createUsuario(
  nombre,
  username,
  email,
  contrasena,
  genero,
  pais
) {
  const result = await dbClient.query(
    'INSERT INTO usuarios (nombre, username, email, contrasena, genero, pais) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [nombre, username, email, contrasena, genero, pais]
  );

  if (result.rowCount === 0) {
    return undefined;
  }

  return result.rows[0];
}

// delete usuario
async function deleteUsuario(id) {
  const result = await dbClient.query(
    'DELETE FROM usuarios WHERE id = $1 RETURNING *',
    [id]
  );

  if (result.rowCount === 0) {
    return undefined;
  }

  return result.rows[0];
}

// update usuario
async function updateUsuario(
  id,
  nombre,
  username,
  email,
  contrasena,
  genero,
  pais
) {
  const result = await dbClient.query(
    'UPDATE usuarios SET nombre = $1, username = $2, email = $3, contrasena = $4, genero = $5, pais = $6 WHERE id = $7 RETURNING *',
    [nombre, username, email, contrasena, genero, pais, id]
  );

  if (result.rowCount === 0) {
    return undefined;
  }

  return result.rows[0];
}

module.exports = {
  getAllUsuarios,
  getOneUsuario,
  createUsuario,
  deleteUsuario,
  updateUsuario
};