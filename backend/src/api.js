const express = require('express');
const cors = require('cors');   

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const {
  getAllVideojuegos,
  getOneVideojuego,
  createVideojuego,
  deleteVideojuego,
  updateVideojuego
} = require('./db/db')

app.get('/api/health', (req, res) => {
  res.json({ message: 'Hello from the API'});
});

//VIDEOJUEGOS
//get all videojuegos
app.get('/api/videojuegos', async (req, res) => {
  const videojuegos = await getAllVideojuegos();
  res.json(videojuegos);

});

//get one videojuego
app.get('/api/videojuegos/:id', async (req, res) => {
  const videojuego = await getOneVideojuego(req.params.id);
  console.log(videojuego);

  if (!videojuego) {
    return res.status(404).json({ error: 'Videojuego not found'})

  }
  res.json(videojuego);

});

//insert videojuego
app.post('/api/videojuegos/', async (req, res) => {

  if(!req.body.titulo ||
    !req.body.genero ||
    !req.body.anio ||
    !req.body.historia_principal ||
    !req.body.descripcion || 
    !req.body.portada) {
    return res.status(400).json({ error: 'Missing required fields'});
    
  }

  // Validar que genero sea un string no vacío
  if (typeof req.body.genero !== "string" || req.body.genero.trim().length === 0) {
    return res.status(400).json({ error: "El género debe ser un texto válido" });
  }

  // Validar que anio sea un número
  if (isNaN(req.body.anio)) {
    return res.status(400).json({ error: "El año debe ser un número" });
  }
  
  // Validar que historia_principal sea número y mayor o igual a 0
  if (isNaN(req.body.historia_principal) || req.body.historia_principal < 0) {
    return res.status(400).json({ error: "La historia principal debe ser un número mayor o igual a 0" });
  }

  // Validar que la descripción no pase los 103 caracteres
  if (req.body.descripcion.length > 108) {
    return res.status(400).json({ error: "La descripción no puede superar los 107 caracteres" });
  }

  const videojuego = await createVideojuego(
    req.body.titulo,
    req.body.genero,
    req.body.anio,
    req.body.historia_principal,
    req.body.descripcion,
    req.body.portada
  );

  if (!videojuego) {
    return res.status(500).json({ error: 'Failed ton create videojuego'});
  }
  res.json({videojuego});

});

//delete videojuego
app.delete('/api/videojuegos/:id', async (req, res) => {

  const videojuego = await deleteVideojuego(req.params.id);

  if (!videojuego) {
    return res.status(404).json({ error: 'Videojuego id: ' + req.params.id + ' not found'});
  }
  res.json({ status: 'OK', id: videojuego });
});

//update videojuego
app.put('/api/videojuegos/:id', async (req, res) => {

  if (!req.body.titulo ||
      !req.body.genero ||
      !req.body.anio ||
      !req.body.historia_principal ||
      !req.body.descripcion ||
      !req.body.portada) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validar que genero sea un string no vacío
  if (typeof req.body.genero !== "string" || req.body.genero.trim().length === 0) {
    return res.status(400).json({ error: "El género debe ser un texto válido" });
  }

  // Validar que anio sea un número
  if (isNaN(req.body.anio)) {
    return res.status(400).json({ error: "El año debe ser un número" });
  }
  
  // Validar que historia_principal sea número y mayor o igual a 0
  if (isNaN(req.body.historia_principal) || req.body.historia_principal < 0) {
    return res.status(400).json({ error: "La historia principal debe ser un número mayor o igual a 0" });
  }

  // Validar que la descripción no pase los 103 caracteres
  if (req.body.descripcion.length > 108) {
    return res.status(400).json({ error: "La descripción no puede superar los 107 caracteres" });
  }

  const videojuego = await updateVideojuego(
    req.params.id,
    req.body.titulo,
    req.body.genero,
    req.body.anio,
    req.body.historia_principal,
    req.body.descripcion,
    req.body.portada
  );

  if (!videojuego) {
    return res.status(404).json({ error: 'Videojuego not found' });
  }

  res.json({ status: 'OK', videojuego: videojuego });
});
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});