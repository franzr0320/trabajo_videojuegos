const express = require('express');

const app = express();
app.use(express.json());

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