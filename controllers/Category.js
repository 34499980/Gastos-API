
const table = 'Category';
 const admin = require('firebase-admin')

 var serviceAccount = require("../gastosdiarios-e2f45-firebase-adminsdk-jesw0-d61e0f952c.json");
 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gastosdiarios-e2f45-default-rtdb.firebaseio.com"
  });
 const db = admin.database();

async function add(req, res,){
  const date = new Date();
  
    const category = {
        key: '',
        name: req.body.name,
        image: req.body.image,
        createdDate: date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
        modifiedDate: ''
    }
    /*
category.key = res;
    req.body.key = res;
    db.ref(table).update(category.key, {
        key: category.key,
        name: category.name,
        image: category.image,
        createdDate: category.createdDate,
        modifiedDate: date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
    })
    */
   const key = db.ref(table).push(category)
  

   
  
// Devolvemos una respuesta en JSON
    res.status(200). send({
        menssage: 'Se genero la key ' + key,
        
    });
    
}  
  
function edit(req, res){
 
     db.ref(table).update(req.key, {
                                    key: req.key,
                                    name: req.name,
                                    image: req.image

                                     })
        res.status(200).send({
            menssage: 'Esta ruta es de prueba en mi api restful con mongo y node'
        });
    }
function remove(req, res){

    // Devolvemos una respuesta en JSON
        res.status(200).send({
            menssage: 'Esta ruta es de prueba en mi api restful con mongo y node'
        });
    }
function getAll(req, res){

    // Devolvemos una respuesta en JSON
        res.status(200).send({
            menssage: 'Esta ruta es de prueba en mi api restful con mongo y node'
        });
    }
function getById(req, res){
    console.log('paso el get');
    // Devolvemos una respuesta en JSON
        res.status(200).send({
            menssage: 'Esta ruta es de prueba en mi api restful con mongo y node'
        });
    }
 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getById
};
