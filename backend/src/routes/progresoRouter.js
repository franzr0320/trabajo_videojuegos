const express = require("express");
const router = express.Router();

const {
  getAllProgreso,
  getOneProgreso,
  createProgreso,
  updateProgreso,
  deleteProgreso
} = require("../db/db");

// get all progreso de un usuario
router.get('/:usuario_id', async (req, res) => {
  const progreso = await getAllProgreso(req.params.usuario_id);
  res.json(progreso);
});

// get one progreso
router.get('/:usuario_id/:id', async (req, res) => {
  const progreso = await getOneProgreso(req.params.id, req.params.usuario_id);

  if (!progreso) {
    return res.status(404).json({ error: "Progreso no encontrado" });
  }
  res.json(progreso);
});

// create progreso
router.post('/', async (req, res) => {

  if (!req.body.usuario_id ||
      !req.body.videojuego_id ||
      !req.body.tipo_videojuego ||
      !req.body.plataforma ||
      !req.body.estado_actual ||
      req.body.tiempo_acumulado === "" ||
      !req.body.dificultad) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!req.body.videojuego_id || isNaN(req.body.videojuego_id)) {
    return res.status(400).json({ error: "videojuego_id inválido" });
  }

  if (isNaN(req.body.tiempo_acumulado) || req.body.tiempo_acumulado < 0) {
    return res.status(400).json({ error: "El tiempo acumulado debe ser un número válido" });
  }

  const progreso = await createProgreso(
    req.body.usuario_id,
    req.body.videojuego_id,
    req.body.tipo_videojuego,
    req.body.plataforma,
    req.body.estado_actual,
    req.body.tiempo_acumulado,
    req.body.dificultad
  );

  res.json({ status: "OK", progreso: progreso });
});

// update progreso
router.put('/:usuario_id/:id', async (req, res) => {

  if (!req.body.videojuego_id ||
      !req.body.tipo_videojuego ||
      !req.body.plataforma ||
      !req.body.estado_actual ||
      req.body.tiempo_acumulado === "" ||
      !req.body.dificultad) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!req.body.videojuego_id || isNaN(req.body.videojuego_id)) {
    return res.status(400).json({ error: "videojuego_id inválido" });
  }

  if (isNaN(req.body.tiempo_acumulado) || req.body.tiempo_acumulado < 0) {
    return res.status(400).json({ error: "El tiempo acumulado debe ser válido" });
  }

  const progreso = await updateProgreso(
    req.params.id,
    req.params.usuario_id,
    req.body.videojuego_id,
    req.body.tipo_videojuego,
    req.body.plataforma,
    req.body.estado_actual,
    req.body.tiempo_acumulado,
    req.body.dificultad
  );

  if (!progreso) {
    return res.status(404).json({ error: "Progreso no encontrado" });
  }

  res.json({ status: "OK", progreso: progreso });
});

// delete progreso
router.delete('/:usuario_id/:id', async (req, res) => {
  const progreso = await deleteProgreso(req.params.id, req.params.usuario_id);

  if (!progreso) {
    return res.status(404).json({ error: "Progreso no encontrado" });
  }

  res.json({ status: "OK", id: progreso });
});

module.exports = router;