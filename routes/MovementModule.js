'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var Controller = require('../controllers/Movement');
 
// Llamamos al router
var api = express.Router();
 
// Creamos una ruta de tipo GET para el método de pruebas
api.post('/add', Controller.add);
api.put('/edit', Controller.edit);
api.delete('/remove', Controller.remove);
api.get('/getAll', Controller.getAll);
api.get('/getById', Controller.getById);
api.get('/getAll', Controller.getByMonth);
api.get('/getById', Controller.getByYears);
// Exportamos la configuración
module.exports = api;
