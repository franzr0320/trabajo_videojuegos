const dbClient = require("./db");

// get all progreso
async function getAllProgreso(usuario_id) {
  const result = await dbClient.query(
    'SELECT * FROM progreso WHERE usuario_id = $1',
    [usuario_id]
  );
  return result.rows;
}

// get one progreso
async function getOneProgreso(id, usuario_id) {
  const result = await dbClient.query(
    'SELECT * FROM progreso WHERE id = $1 AND usuario_id = $2 LIMIT 1',
    [id, usuario_id]
  );
  return result.rows[0];
}

// create progreso
async function createProgreso(
  usuario_id,
  videojuego_id,
  tipo_videojuego,
  plataforma,
  estado_actual,
  tiempo_acumulado,
  dificultad
) {
  const result = await dbClient.query(
    'INSERT INTO progreso (usuario_id, videojuego_id, tipo_videojuego, plataforma, estado_actual, tiempo_acumulado, dificultad) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [
      usuario_id,
      videojuego_id,
      tipo_videojuego,
      plataforma,
      estado_actual,
      tiempo_acumulado,
      dificultad
    ]
  );

  if (result.rowCount === 0) {
    return undefined;
  }

  return result.rows[0];
}


// delete progreso
async function deleteProgreso(id, usuario_id) {
  const result = await dbClient.query(
    'DELETE FROM progreso WHERE id = $1 AND usuario_id = $2 RETURNING *',
    [id, usuario_id]
  );

  if (result.rowCount === 0) {
    return undefined;
  }

  return result.rows[0];
}

// update progreso
async function updateProgreso(
  id,
  usuario_id,
  videojuego_id,
  tipo_videojuego,
  plataforma,
  estado_actual,
  tiempo_acumulado,
  dificultad
) {
  const result = await dbClient.query(
    'UPDATE progreso SET videojuego_id = $1, tipo_videojuego = $2, plataforma = $3, estado_actual = $4, tiempo_acumulado = $5, dificultad = $6 WHERE id = $7 AND usuario_id = $8 RETURNING *',
    [
      videojuego_id,
      tipo_videojuego,
      plataforma,
      estado_actual,
      tiempo_acumulado,
      dificultad,
      id,
      usuario_id
    ]
  );

  if (result.rowCount === 0) {
    return undefined;
  }

  return result.rows[0];
}

async function getAllVideojuegosEnProgreso(usuario_id) {
  const result = await dbClient.query(
    `SELECT v.*, p.plataforma, p.estado_actual, p.tiempo_acumulado, p.dificultad
    FROM progreso p, videojuegos_base v
    WHERE p.videojuego_id = v.id
    AND p.usuario_id = $1
    AND p.tipo_videojuego = 'base'

    UNION ALL

    SELECT vu.*, p.plataforma, p.estado_actual, p.tiempo_acumulado, p.dificultad
    FROM progreso p, videojuegos_usuario vu
    WHERE p.videojuego_id = vu.id
    AND p.usuario_id = $1
    AND p.tipo_videojuego = 'usuario'`,
    [usuario_id]
  );
  return result.rows;
}

module.exports = {
  getAllProgreso,
  getOneProgreso,
  createProgreso,
  deleteProgreso,
  updateProgreso,
  getAllVideojuegosEnProgreso
};