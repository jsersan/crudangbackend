// Creamos las rutas para la API

module.exports = app => {
    const productos = require('../controllers/producto.controller');
  
    // Crear un nuevo producto
    app.post('/api/productos', productos.create);
  
    // Obtener todos los productos
    app.get('/api/productos', productos.findAll);
  
    // Obtener un solo producto por id
    app.get('/api/productos/:id', productos.findOne);
  
    // Actualizar un producto por id
    app.put('/api/productos/:id', productos.update);
  
    // Eliminar un producto por id
    app.delete('/api/productos/:id', productos.delete);
  
    // Eliminar todos los productos
    app.delete('/api/productos', productos.deleteAll);
  };