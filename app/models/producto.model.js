// app/models/producto.model.js

// Importa la conexión a la base de datos configurada en db.js
const sql = require('./db');

/**
 * Constructor para el modelo Producto
 * Define la estructura de un objeto Producto para la aplicación
 * @param {Object} producto - Objeto con las propiedades del producto
 */
const Producto = function(producto) {
  this.nombre = producto.nombre;       // Nombre del producto
  this.descripcion = producto.descripcion; // Descripción del producto
  this.precio = producto.precio;       // Precio del producto
  this.stock = producto.stock;         // Cantidad en stock
};

/**
 * Método para crear un nuevo producto en la base de datos
 * @param {Object} newProducto - Objeto con los datos del nuevo producto
 * @param {Function} result - Función callback para manejar el resultado
 */
Producto.create = (newProducto, result) => {
  // Ejecuta una consulta SQL INSERT para agregar un nuevo producto
  // El signo '?' es un marcador de posición que será reemplazado por newProducto
  sql.query('INSERT INTO productos SET ?', newProducto, (err, res) => {
    // Si hay un error durante la consulta
    if (err) {
      console.log('error:', err);
      result(err, null); // Devuelve el error al controlador
      return;
    }

    // Log de éxito y creación del producto
    console.log('Producto creado:', { id: res.insertId, ...newProducto });
    // Devuelve el producto creado con su ID asignado
    result(null, { id: res.insertId, ...newProducto });
  });
};

/**
 * Método para buscar un producto por su ID
 * @param {Number} id - ID del producto a buscar
 * @param {Function} result - Función callback para manejar el resultado
 */
Producto.findById = (id, result) => {
  // Ejecuta una consulta SQL SELECT para encontrar un producto específico por ID
  sql.query(`SELECT * FROM productos WHERE id = ${id}`, (err, res) => {
    // Si hay un error durante la consulta
    if (err) {
      console.log('error:', err);
      result(err, null);
      return;
    }

    // Si se encontró al menos un registro (debería ser solo uno)
    if (res.length) {
      console.log('Producto encontrado:', res[0]);
      result(null, res[0]); // Devuelve el primer resultado
      return;
    }

    // Si no se encontró ningún producto con ese ID
    result({ kind: 'not_found' }, null);
  });
};

/**
 * Método para obtener todos los productos, con filtro opcional por nombre
 * @param {String} nombre - Nombre (parcial) para filtrar productos (opcional)
 * @param {Function} result - Función callback para manejar el resultado
 */
Producto.getAll = (nombre, result) => {
  // Inicia con la consulta básica
  let query = 'SELECT * FROM productos';

  // Si se proporciona un nombre, agrega una cláusula WHERE para filtrar
  if (nombre) {
    // Usa LIKE para buscar coincidencias parciales (contiene)
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  // Ejecuta la consulta SQL
  sql.query(query, (err, res) => {
    if (err) {
      console.log('error:', err);
      result(err, null);
      return;
    }

    console.log('productos:', res);
    result(null, res); // Devuelve todos los productos encontrados
  });
};

/**
 * Método para actualizar un producto existente por su ID
 * @param {Number} id - ID del producto a actualizar
 * @param {Object} producto - Objeto con los nuevos datos del producto
 * @param {Function} result - Función callback para manejar el resultado
 */
Producto.updateById = (id, producto, result) => {
  // Ejecuta una consulta SQL UPDATE para modificar un producto
  // Usa múltiples marcadores de posición '?' para los valores
  sql.query(
    'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?',
    [producto.nombre, producto.descripcion, producto.precio, producto.stock, id],
    (err, res) => {
      if (err) {
        console.log('error:', err);
        result(err, null);
        return;
      }

      // Si no se actualizó ninguna fila (affectedRows = 0) significa que no se encontró el producto
      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('Producto actualizado:', { id: id, ...producto });
      result(null, { id: id, ...producto });
    }
  );
};

/**
 * Método para eliminar un producto por su ID
 * @param {Number} id - ID del producto a eliminar
 * @param {Function} result - Función callback para manejar el resultado
 */
Producto.remove = (id, result) => {
  // Ejecuta una consulta SQL DELETE para eliminar un producto
  sql.query('DELETE FROM productos WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error:', err);
      result(err, null);
      return;
    }

    // Si no se eliminó ninguna fila, significa que no se encontró el producto
    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Producto eliminado con ID:', id);
    result(null, res);
  });
};

/**
 * Método para eliminar todos los productos
 * @param {Function} result - Función callback para manejar el resultado
 */
Producto.removeAll = result => {
  // Ejecuta una consulta SQL DELETE sin cláusula WHERE para eliminar todos los productos
  sql.query('DELETE FROM productos', (err, res) => {
    if (err) {
      console.log('error:', err);
      result(err, null);
      return;
    }

    console.log(`${res.affectedRows} productos fueron eliminados`);
    result(null, res);
  });
};

// Exporta el modelo Producto para que pueda ser utilizado en otros archivos
module.exports = Producto;