'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var CategoryController = require('../controllers/Category');
 
// Llamamos al router
var api = express.Router();
 
// Creamos una ruta de tipo GET para el método de pruebas
api.post('/add', CategoryController.add);
api.put('/edit', CategoryController.edit);
api.delete('/remove', CategoryController.remove);
api.get('/getAll', CategoryController.getAll);
api.get('/getById', CategoryController.getById);
 
// Exportamos la configuración
module.exports = api;
