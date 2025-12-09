const express = require("express");
const router = express.Router();

const {
  getAllUsuarios,
  getOneUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario
} = require("../db/db");

// get all usuarios
router.get('/', async (req, res) => {
  const usuarios = await getAllUsuarios();
  res.json(usuarios);
});

// get one usuario
router.get('/:id', async (req, res) => {
  const usuario = await getOneUsuario(req.params.id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(usuario);
});

// create usuario
router.post('/', async (req, res) => {

  if (!req.body.nombre ||
      !req.body.username ||
      !req.body.email ||
      !req.body.contrasena) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (typeof req.body.username !== "string" || req.body.username.trim().length === 0) {
    return res.status(400).json({ error: "El username debe ser un texto válido" });
  }

  if (typeof req.body.email !== "string" || req.body.email.trim().length === 0) {
    return res.status(400).json({ error: "El email debe ser un texto válido" });
  }

  // VALIDACIÓN DE USUARIO EXISTENTE (POST)
  const listaUsuarios = await getAllUsuarios();
  const existe = listaUsuarios.find(u =>
    u.username === req.body.username || u.email === req.body.email
  );
  if (existe) {
    return res.status(400).json({ error: "El username o email ya está en uso" });
  }
  
  const usuario = await createUsuario(
    req.body.nombre,
    req.body.username,
    req.body.email,
    req.body.contrasena,
    req.body.genero,
    req.body.pais""
  );

  res.json({ status: "OK", usuario: usuario });
});

// update usuario
router.put('/:id', async (req, res) => {

  if (!req.body.nombre ||
      !req.body.username ||
      !req.body.email ||
      !req.body.contrasena) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (typeof req.body.username !== "string" || req.body.username.trim().length === 0) {
    return res.status(400).json({ error: "El username debe ser un texto válido" });
  }

  if (typeof req.body.email !== "string" || req.body.email.trim().length === 0) {
    return res.status(400).json({ error: "El email debe ser un texto válido" });
  }

  // VALIDACIÓN DE USUARIO EXISTENTE (PUT)
  const listaUsuariosPut = await getAllUsuarios();
  const existePut = listaUsuariosPut.find(u =>
    u.id != req.params.id &&
    (u.username === req.body.username || u.email === req.body.email)
  );
  if (existePut) {
    return res.status(400).json({ error: "El username o email ya está en uso" });
  }

  const usuario = await updateUsuario(
    req.params.id,
    req.body.nombre,
    req.body.username,
    req.body.email,
    req.body.contrasena,
    req.body.genero,
    req.body.pais
  );

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json({ status: "OK", usuario: usuario });
});

// delete usuario
router.delete('/:id', async (req, res) => {
  const usuario = await deleteUsuario(req.params.id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json({ status: "OK", id: usuario.id });
});

module.exports = router;