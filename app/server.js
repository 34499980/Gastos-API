var express = require('express'); //llamamos a Express
var path = require('path');
var app = express();
var port = process.env.PORT || 8080; // establecemos nuestro puerto
var category_routes = require('../routes/CategoryRoute');
var user_routes = require('../routes/UserRoute');
var movement_routes = require('../routes/MovementRoute');
var type_routes = require('../routes/TypeRoute');
var due_routes = require('../routes/DueRoute');
//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// Cargamos las rutas
app.use('/api/Category', category_routes);
app.use('/api/User', user_routes);
app.use('/api/User', movement_routes);
app.use('/api/Type', type_routes);
app.use('/api/Due', due_routes);
// iniciamos nuestro servidor
app.listen(port);
console.log('API escuchando en el puerto ' + port);
