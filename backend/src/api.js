const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const {
  getAllVideojuegos,
  getOneVideojuego
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

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});