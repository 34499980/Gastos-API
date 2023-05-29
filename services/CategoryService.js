
const table = 'Category';
 const admin = require('firebase-admin')
 const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, collection } = require('firebase-admin/firestore');


 var serviceAccount = require("../gastosdiarios-e2f45-firebase-adminsdk-jesw0-d61e0f952c.json");
 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gastosdiarios-e2f45-default-rtdb.firebaseio.com"
  });
 const db = admin.database();
// const db = admin.firestore();
async function add(req, res,){
  const date = new Date();
  
    const category = {
        key: '',
        name: req.body.name,
        image: req.body.image,
        createdDate: req.body.createdDate,
        modifiedDate: ''
    }
  
  return db.ref(table).push(category).then(response => {
  
    return response.key;
   })
  

   
  

 
}  
  
async function edit(req, res){
 
    var ref = db.ref(table);
    console.log(req.body.key)
    var upref = ref.child(req.body.key);
            upref.update( {
                                    key: req.body.key,
                                    name: req.body.name,
                                    image: req.body.image,
                                    createdDate: req.createdDate,
                                    modifiedDate: req.body.modifiedDate
                                     })
     
    }
function remove(req, res){

    // Devolvemos una respuesta en JSON
        res.status(200).send({
            menssage: 'Esta ruta es de prueba en mi api restful con mongo y node'
        });
    }
async function getAll(req, res){
       return await db.ref(table).once('value', (snapshot) => {
        const data = snapshot.val();
        //console.log(data)
        return data;
       // res.render('index' , {Category: data})
       
    });
   // console.log(snapshot)
    //snapshot.docs.map(doc => console.log(doc.data()));
    
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
