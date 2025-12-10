const express = require("express");
const router = express.Router();

const {
  getAllVideojuegosUsuario,
  getOneVideojuegoUsuario,
  createVideojuegoUsuario,
  updateVideojuegoUsuario,
  deleteVideojuegoUsuario
} = require("../db/videojuegosUsuario");

// get all videojuego_usuario
router.get('/:usuario_id', async (req, res) => {
  const videojuegos = await getAllVideojuegosUsuario(req.params.usuario_id);
  res.json(videojuegos);
});

// get one videojuego_usuario
router.get('/:usuario_id/:id', async (req, res) => {
  const videojuego = await getOneVideojuegoUsuario(req.params.id, req.params.usuario_id);

  if (!videojuego) {
    return res.status(404).json({ error: "Videojuego no encontrado" });
  }
  res.json(videojuego);
});

// create videojuego_usuario
router.post('/', async (req, res) => {

  if (
    !req.body.usuario_id ||
    !req.body.titulo ||
    !req.body.genero ||
    !req.body.anio ||
    !req.body.historia_principal ||
    !req.body.descripcion ||
    !req.body.portada
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Validación de género como string válido
  if (!isNaN(req.body.genero)) {
    return res.status(400).json({ error: "El género debe ser un texto válido" });
  }
  
  // Validación de año numérico
  if (isNaN(req.body.anio) || req.body.historia_principal < 1900) {
    return res.status(400).json({ error: "El año debe ser un número mayor a 1950" });
  }

  // Validación de historia principal numérica
  if (isNaN(req.body.historia_principal) || req.body.historia_principal < 0) {
    return res.status(400).json({ error: "La historia principal debe ser un número mayor o igual a 0" });
  }

  // Validación de longitud de descripción
  if (req.body.descripcion.length > 107) {
    return res.status(400).json({ error: "La descripción no puede superar los 107 caracteres" });
  }

  const videojuego = await createVideojuegoUsuario(
    req.body.usuario_id,
    req.body.titulo,
    req.body.genero,
    req.body.anio,
    req.body.historia_principal,
    req.body.descripcion,
    req.body.portada
  );

  res.json({ status: "OK", videojuego: videojuego });
});

// update videojuego_usuario
router.put('/:usuario_id/:id', async (req, res) => {

  if (
    !req.body.usuario_id ||
    !req.body.titulo ||
    !req.body.genero ||
    !req.body.anio ||
    !req.body.historia_principal ||
    !req.body.descripcion ||
    !req.body.portada
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Validación de género como string válido
  if (!isNaN(req.body.genero)) {
    return res.status(400).json({ error: "El género debe ser un texto válido" });
  }
  
  // Validación de año numérico
  if (isNaN(req.body.anio) || req.body.historia_principal < 1900) {
    return res.status(400).json({ error: "El año debe ser un número mayor a 1950" });
  }

  // Validación de historia principal numérica
  if (isNaN(req.body.historia_principal) || req.body.historia_principal < 0) {
    return res.status(400).json({ error: "La historia principal debe ser un número mayor o igual a 0" });
  }

  // Validación de longitud de descripción
  if (req.body.descripcion.length > 107) {
    return res.status(400).json({ error: "La descripción no puede superar los 107 caracteres" });
  }

  const videojuego = await updateVideojuegoUsuario(
    req.params.id,
    req.params.usuario_id,
    req.body.titulo,
    req.body.genero,
    req.body.anio,
    req.body.historia_principal,
    req.body.descripcion,
    req.body.portada
  );

  if (!videojuego) {
    return res.status(404).json({ error: "Videojuego no encontrado" });
  }

  res.json({ status: "OK", videojuego: videojuego });
});

// delete videojuego_usuario
router.delete('/:usuario_id/:id', async (req, res) => {
  const videojuego = await deleteVideojuegoUsuario(req.params.id, req.params.usuario_id);

  if (!videojuego) {
    return res.status(404).json({ error: "Videojuego no encontrado" });
  }

  res.json({ status: "OK", id: videojuego });
});

module.exports = router;
