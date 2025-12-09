const express = require("express");
const router = express.Router();

const {
  getAllVideojuegosEnProgreso
} = require("../db/progreso");

// get all videojuegos en progreso de un usuario
router.get("/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;

  getAllVideojuegosEnProgreso(usuario_id)
    .then((juegos) => {
      if (!juegos || juegos.length === 0) {
        return res.status(404).json({ error: "El usuario no tiene videojuegos en progreso" });
      }
      return res.json(juegos);
    })
    .catch((error) => {
      console.error("Error al obtener videojuegos en progreso:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    });
});

module.exports = router;