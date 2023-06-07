var express = require('express'); //llamamos a Express
var path = require('path');
var app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
var port = process.env.PORT || 8080; // establecemos nuestro puerto
var category_routes = require('../routes/CategoryRoute');
var user_routes = require('../routes/UserRoute');
var movement_routes = require('../routes/MovementRoute');
var type_routes = require('../routes/TypeRoute');
var due_routes = require('../routes/DueRoute');
var total_routes = require('../routes/TotalRoute');
//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// Cargamos las rutas
app.use('/api/Category', category_routes);
app.use('/api/User', user_routes);
app.use('/api/Movement', movement_routes);
app.use('/api/Type', type_routes);
app.use('/api/Due', due_routes);
app.use('/api/Totals', total_routes);
// iniciamos nuestro servidor
app.listen(port);
console.log('API escuchando en el puerto ' + port);
