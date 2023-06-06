
import express from 'express';
 
// Cargamos el módulo de express para poder crear rutas
const app = express();
const router = express.Router();
// Cargamos el controlador
import * as Controller from '../controllers/DueController';
 
// Llamamos al router

 
// Creamos una ruta de tipo GET para el método de pruebas
router.post('/processByMonth', Controller.processByMonth);
router.get('/getAll', Controller.getAll);
app.use(router);
// Exportamos la configuración
module.exports = router;
