const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

// Crear conexión con la base de datos
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.port || 8889
});

// Abrir la conexión MySQL
connection.connect(error => {
  if (error) throw error;
  console.log('Conexión a la base de datos establecida con éxito.');
});

module.exports = connection;