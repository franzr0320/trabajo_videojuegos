const express = require("express");
const router = express.Router();

const {
  getAllVideojuegosBase,
  getOneVideojuegoBase,
  createVideojuegoBase,
  deleteVideojuegoBase,
  updateVideojuegoBase
} = require("../db/db");

// get all videojuegos_base
router.get("/", async (req, res) => {
  const videojuegos = await getAllVideojuegosBase();
  res.json(videojuegos);
});

// get one videojuegos_base
router.get("/:id", async (req, res) => {
  const videojuego = await getOneVideojuegoBase(req.params.id);

  if (!videojuego) {
    return res.status(404).json({ error: "Videojuego not found" });
  }

  res.json(videojuego);
});

// insert videojuegos_base
router.post("/", async (req, res) => {

  if (!req.body.titulo ||
      !req.body.genero ||
      !req.body.anio ||
      !req.body.historia_principal ||
      !req.body.descripcion ||
      !req.body.portada) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (typeof req.body.genero !== "string" || req.body.genero.trim().length === 0) {
    return res.status(400).json({ error: "El género debe ser un texto válido" });
  }

  if (isNaN(req.body.anio)) {
    return res.status(400).json({ error: "El año debe ser un número" });
  }

  if (isNaN(req.body.historia_principal) || req.body.historia_principal < 0) {
    return res.status(400).json({ error: "La historia principal debe ser >= 0" });
  }

  if (req.body.descripcion.length > 108) {
    return res.status(400).json({ error: "La descripción no puede superar los 107 caracteres" });
  }

  const videojuego = await createVideojuegoBase(
    req.body.titulo,
    req.body.genero,
    req.body.anio,
    req.body.historia_principal,
    req.body.descripcion,
    req.body.portada
  );

  res.json({ status: "OK", videojuego });
});


// delete videojuegos_base
router.delete("/:id", async (req, res) => {

  if (req.params.id <= 60) {
    return res.status(403).json({ error: "No se puede eliminar videojuegos predeterminados" });
  }

  const videojuego = await deleteVideojuegoBase(req.params.id);

  if (!videojuego) {
    return res.status(404).json({ error: "Videojuego not found" });
  }

  res.json({ status: "OK", id: videojuego });
});

// update videojuegos_base
router.put("/:id", async (req, res) => {

  if (req.params.id <= 60) {
    return res.status(403).json({ error: "No se puede modificar videojuegos predeterminados" });
  }

  if (!req.body.titulo ||
      !req.body.genero ||
      !req.body.anio ||
      !req.body.historia_principal ||
      !req.body.descripcion ||
      !req.body.portada) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (typeof req.body.genero !== "string" || req.body.genero.trim().length === 0) {
    return res.status(400).json({ error: "El género debe ser un texto válido" });
  }

  if (isNaN(req.body.anio)) {
    return res.status(400).json({ error: "El año debe ser un número" });
  }

  if (isNaN(req.body.historia_principal) || req.body.historia_principal < 0) {
    return res.status(400).json({ error: "La historia principal debe ser >= 0" });
  }

  if (req.body.descripcion.length > 108) {
    return res.status(400).json({ error: "La descripción no puede superar los 107 caracteres" });
  }

  const videojuego = await updateVideojuegoBase(
    req.params.id,
    req.body.titulo,
    req.body.genero,
    req.body.anio,
    req.body.historia_principal,
    req.body.descripcion,
    req.body.portada
  );

  if (!videojuego) {
    return res.status(404).json({ error: "Videojuego not found" });
  }

  res.json({ status: "OK", videojuego });
});


module.exports = router;