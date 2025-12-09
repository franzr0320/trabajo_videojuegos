const { Pool } = require('pg')

const dbClient = new Pool({
  user: 'postgres',
  port: 5432,
  host: 'localhost',
  database: 'videojuegos',
  password: 'postgres',

});

// get all videojuegos_base
async function getAllVideojuegosBase() {
  const result = await dbClient.query('SELECT * FROM videojuegos_base');
  return result.rows;
}

// get one vidoejuego_base
async function getOneVideojuegoBase(id) {
  const result = await dbClient.query('SELECT * FROM videojuegos_base WHERE id = $1 LIMIT 1', [id]);
  return result.rows[0];
  
}

// create videojuego_base
async function createVideojuegoBase(
  titulo,
  genero,
  anio,
  historia_principal,
  descripcion,
  portada
) {
  const result = await dbClient.query(
    'INSERT INTO videojuegos_base(titulo, genero, anio, historia_principal, descripcion, portada) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
    [titulo, genero, anio, historia_principal, descripcion, portada]);

  
  if (result.rowCount === 0) {
    return undefined;
  } 
  return result.rows[0];
}

// delete videojuego_base
async function deleteVideojuegoBase(id) {
  const result = await dbClient.query('DELETE FROM videojuegos_base WHERE id = $1', [id]);
  
  if (result.rowCount === 0) {
    return undefined;
  }
  return id;
  
}

//update videojuego_base
async function updateVideojuegoBase(
  id,
  titulo,
  genero,
  anio,
  historia_principal,
  descripcion,
  portada
) {
  const result = await dbClient.query( 'UPDATE videojuegos_base SET titulo = $1, genero = $2, anio = $3, historia_principal = $4, descripcion = $5, portada = $6 WHERE id = $7 RETURNING *',
    [titulo, genero, anio, historia_principal, descripcion, portada, id]);

  if (result.rowCount === 0) {
    return undefined;
  }

  return result.rows[0];
}

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
  updateVideojuegoUsuario,
  getAllUsuarios,
  getOneUsuario,
  createUsuario,
  deleteUsuario,
  updateUsuario,
  getAllProgreso,
  getOneProgreso,
  createProgreso,
  updateProgreso,
  deleteProgreso,
  getAllVideojuegosEnProgreso
}