
const table = 'Category';
 //const admin = require('firebase-admin')
 const admin = require('firebase-admin');
 const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, collection } = require('firebase-admin/firestore');


 var serviceAccount = require("../gastosdiarios-e2f45-firebase-adminsdk-jesw0-d61e0f952c.json");
 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gastosdiarios-e2f45-default-rtdb.firebaseio.com"
  });
  const firebaseConfig = {
    apiKey: "AIzaSyAJBXrm_vFWN-zpjuY6EHCQVPfYWtWE740",
    authDomain: "gastosdiarios-e2f45.firebaseapp.com",
    projectId: "gastosdiarios-e2f45",
    storageBucket: "gastosdiarios-e2f45.appspot.com",
    messagingSenderId: "436280068960",
    appId: "1:436280068960:web:ad9f396c062286f4a8ac05",
    measurementId: "G-XL8PN6CYMJ"
  };

 //const db = admin.database();
 const db = admin.firestore()
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
  
  return db.collection(table)
  
  .add({
    key: '',
    name: req.body.name,
    image: req.body.image,
    createdDate: req.body.createdDate,
    modifiedDate: ''
}).then(response => {
  
    return response.id;
   })
  

   
  

 
}  
  
async function edit(req, res){
 
    var ref = db.collection(table);
    console.log(req.body.key)
    var upref = ref.doc(req.body.key);
            upref.update( {
                                    key: req.body.key,
                                    name: req.body.name,
                                    image: req.body.image,                                  
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
     return  await db.collection(table).get()
   // console.log(snapshot)
    //snapshot.docs.map(doc => console.log(doc.data()));
    
}
async function getById(req, res){
    // return   await db.ref(table).on('name', req.body.name)
    
     return await db.collection(table).doc(req.body.key).get()
    // console.log(snapshot)
 }   
  
async function getByName(req, res){
   // return   await db.ref(table).on('name', req.body.name)
   
    return await db.collection(table).where("name", "==", req.body.name).get()
   // console.log(snapshot)
}
 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getByName,
    getById
};
