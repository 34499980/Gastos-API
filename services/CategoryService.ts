import { Category } from "../models/CategoryModel";

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
export async function add(req, res,): Promise<number>{
  
    
  
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
  
export async function edit(req, res): Promise<void>{
 
    var ref = db.collection(table);
    console.log(req.key)
    var upref = ref.doc(req.key);
            upref.update( {
                                    key: req.key,
                                    name: req.name,
                                    image: req.image,                                  
                                    modifiedDate: req.modifiedDate,
                                    createdDate: req.createdDate
                         })
     
    }
export async function remove(req){
     await db.collection(table).doc(req.body.key).delete();
    }
export async function getAll(): Promise<Category[]>{
    let list: Category[] = [];
     return  await db.collection(table).get().then(snap => {
        snap.forEach(doc => {
            console.log(doc.data());
           
            list.push(doc.data())
        });
        return list;
    });  
   // console.log(snapshot)
    //snapshot.docs.map(doc => console.log(doc.data()));
    
}
export async function getById(req): Promise<Category>{
    // return   await db.ref(table).on('name', req.body.name)
    
     return await db.collection(table).doc(req.body.key).get().then(snap => {
        return snap.data()
    });     
    // console.log(snapshot)
 }   
  
export async function getByName(req): Promise<Category>{
   // return   await db.ref(table).on('name', req.body.name)
    let entity: Category;
    return await db.collection(table).where("name", "==", req.body.name).get().then(snap => {
        snap.forEach(doc => {
            console.log(doc.data());
           
            entity = doc.data()
        });
        return entity;
    });     
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
