// app/controllers/producto.controller.js

// Importa el modelo Producto para interactuar con la base de datos
const Producto = require('../models/producto.model');

/**
 * Controlador para manejar las operaciones relacionadas con los productos
 * Actúa como intermediario entre las rutas HTTP y el modelo de datos
 */

/**
 * Función para crear y guardar un nuevo producto
 * Maneja peticiones POST a /api/productos
 * @param {Object} req - Objeto de solicitud HTTP de Express
 * @param {Object} res - Objeto de respuesta HTTP de Express
 */
exports.create = (req, res) => {
  // Valida que el cuerpo de la petición no esté vacío
  if (!req.body) {
    res.status(400).send({
      message: 'El contenido no puede estar vacío!'
    });
    return;
  }

  // Crea un nuevo objeto Producto usando el constructor y los datos de la petición
  const producto = new Producto({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock
  });

  // Llama al método create del modelo para guardar en la base de datos
  Producto.create(producto, (err, data) => {
    if (err)
      // Si hay un error, envía una respuesta con código 500 (Error del servidor)
      res.status(500).send({
        message:
          err.message || 'Ocurrió un error al crear el producto.'
      });
    else 
      // Si la creación fue exitosa, envía los datos del producto creado
      res.send(data);
  });
};

/**
 * Función para obtener todos los productos de la base de datos
 * Opcionalmente puede filtrar por nombre si se proporciona un parámetro de consulta
 * Maneja peticiones GET a /api/productos y /api/productos?nombre=xxx
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
exports.findAll = (req, res) => {
  // Extrae el parámetro de consulta 'nombre' si existe
  const nombre = req.query.nombre;

  // Llama al método getAll del modelo para buscar productos
  Producto.getAll(nombre, (err, data) => {
    if (err)
      // Si hay un error, envía una respuesta con código 500
      res.status(500).send({
        message:
          err.message || 'Ocurrió un error al obtener los productos.'
      });
    else 
      // Si la búsqueda fue exitosa, envía los datos encontrados
      res.send(data);
  });
};

/**
 * Función para encontrar un único producto por su ID
 * Maneja peticiones GET a /api/productos/:id
 * @param {Object} req - Objeto de solicitud HTTP con parámetro id
 * @param {Object} res - Objeto de respuesta HTTP
 */
exports.findOne = (req, res) => {
  // Llama al método findById del modelo para buscar un producto específico
  Producto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        // Si no se encontró el producto, envía un código 404 (No encontrado)
        res.status(404).send({
          message: `No se encontró el producto con id ${req.params.id}.`
        });
      } else {
        // Para otros errores, envía un código 500
        res.status(500).send({
          message: 'Error al obtener el producto con id ' + req.params.id
        });
      }
    } else 
      // Si se encontró el producto, envía los datos
      res.send(data);
  });
};

/**
 * Función para actualizar un producto existente por su ID
 * Maneja peticiones PUT a /api/productos/:id
 * @param {Object} req - Objeto de solicitud HTTP con parámetro id y datos actualizados
 * @param {Object} res - Objeto de respuesta HTTP
 */
exports.update = (req, res) => {
  // Valida que el cuerpo de la petición no esté vacío
  if (!req.body) {
    res.status(400).send({
      message: 'El contenido no puede estar vacío!'
    });
    return;
  }

  // Llama al método updateById del modelo para actualizar el producto
  Producto.updateById(
    req.params.id,
    new Producto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          // Si no se encontró el producto, envía un código 404
          res.status(404).send({
            message: `No se encontró el producto con id ${req.params.id}.`
          });
        } else {
          // Para otros errores, envía un código 500
          res.status(500).send({
            message: 'Error al actualizar el producto con id ' + req.params.id
          });
        }
      } else 
        // Si la actualización fue exitosa, envía los datos actualizados
        res.send(data);
    }
  );
};

/**
 * Función para eliminar un producto por su ID
 * Maneja peticiones DELETE a /api/productos/:id
 * @param {Object} req - Objeto de solicitud HTTP con parámetro id
 * @param {Object} res - Objeto de respuesta HTTP
 */
exports.delete = (req, res) => {
  // Llama al método remove del modelo para eliminar el producto
  Producto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        // Si no se encontró el producto, envía un código 404
        res.status(404).send({
          message: `No se encontró el producto con id ${req.params.id}.`
        });
      } else {
        // Para otros errores, envía un código 500
        res.status(500).send({
          message: 'No se pudo eliminar el producto con id ' + req.params.id
        });
      }
    } else 
      // Si la eliminación fue exitosa, envía un mensaje de confirmación
      res.send({ message: `El producto fue eliminado con éxito!` });
  });
};

/**
 * Función para eliminar todos los productos de la base de datos
 * Maneja peticiones DELETE a /api/productos
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
exports.deleteAll = (req, res) => {
  // Llama al método removeAll del modelo para eliminar todos los productos
  Producto.removeAll((err, data) => {
    if (err)
      // Si hay un error, envía una respuesta con código 500
      res.status(500).send({
        message:
          err.message || 'Ocurrió un error al eliminar todos los productos.'
      });
    else 
      // Si la eliminación fue exitosa, envía un mensaje de confirmación
      res.send({ message: `Todos los productos fueron eliminados con éxito!` });
  });
};