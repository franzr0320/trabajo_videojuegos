CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  contrasena VARCHAR(200) NOT NULL,
  genero VARCHAR(20),
  pais VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS videojuegos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  genero VARCHAR(50) NOT NULL,
  anio INT NOT NULL NOT NULL,
  historia_principal INT NOT NULL,
  descripcion VARCHAR(107) NOT NULL,
  portada VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS progreso (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuarios(id),
  videojuego_id INT NOT NULL REFERENCES videojuegos(id),
  plataforma VARCHAR(50) NOT NULL,
  estado_actual VARCHAR(50) NOT NULL,
  tiempo_acumulado INT NOT NULL,
  dificultad VARCHAR(20) NOT NULL
);
