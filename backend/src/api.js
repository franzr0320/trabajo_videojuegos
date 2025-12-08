const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const {
  getAllVideojuegos
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

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});