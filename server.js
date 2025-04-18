const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:4200' // URL de tu aplicación Angular
}));

// Parsear requests como JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta simple para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de productos.' });
});

// Importar rutas de productos
require('./app/routes/producto.routes')(app);

// Establecer puerto y escuchar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});
