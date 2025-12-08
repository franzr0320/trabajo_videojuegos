const express = require('express');
const cors = require('cors');   

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Routes
const videojuegosBaseRouter = require('./routes/videojuegosBaseRouter');
const videojuegosUsuarioRouter = require('./routes/videojuegosUsuarioRouter');

app.get('/api/health', (req, res) => {
  res.json({ message: 'Hello from the API'});
});


app.use('/api/videojuegos', videojuegosBaseRouter);


app.use('/api/videojuegos-usuario', videojuegosUsuarioRouter);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});