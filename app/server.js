var express = require('express') //llamamos a Express
var path = require('path')
var app = express()               

var port = process.env.PORT || 8080  // establecemos nuestro puerto
var category_routes = require('../routes/CategoryModule');
var movement_routes = require('../routes/MovementModule');

//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))
// Cargamos las rutas
app.use('/api', category_routes);
app.use('/api', movement_routes);
// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)