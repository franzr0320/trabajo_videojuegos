const express = require('express');
const cors = require('cors');   

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Routes
const videojuegosBaseRouter = require('./routes/videojuegosBaseRouter');
const videojuegosUsuarioRouter = require('./routes/videojuegosUsuarioRouter');
const usuariosRouter = require('./routes/usuariosRouter');
const progresoRouter = require('./routes/progresoRouter');
const videojuegosProgresoRouter = require('./routes/videojuegosProgresoRouter');

app.get('/api/health', (req, res) => {
  res.json({ message: 'Hello from the API' });
});

// Rutas principales
app.use('/api/videojuegos-base', videojuegosBaseRouter);
app.use('/api/videojuegos-usuario', videojuegosUsuarioRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/progreso', progresoRouter);
app.use('/api/videojuegos-progreso', videojuegosProgresoRouter);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});