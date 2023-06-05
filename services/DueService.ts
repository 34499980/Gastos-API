import { Due } from "../models/DuesModel";


const table = 'Due';

 const admin = require('firebase-admin');
 
 const db = admin.firestore()

export async function add(req): Promise<string>{
  
    
  
  return db.collection(table)
  
  .add({
    key: '',
    name: req.name,
    mail: req.mail,
    password: req.password,
    createdDate: req.createdDate,
    modifiedDate: ''
}).then(response => {
  
    return response.id;
   })
  

   
  

 
}  
  
export async function edit(req): Promise<void>{
 
    var ref = db.collection(table);   
    var upref = ref.doc(req.key);
            upref.update( {
                                    key: req.key,
                                    name: req.name,
                                    mail: req.mail,
                                    password: req.password,
                                    createdDate: req.createdDate,
                                    modifiedDate: req.modifiedDate
                         })
     
    }
export async function remove(req){
     await db.collection(table).doc(req.key).delete();
    }
export async function getAll(): Promise<Due[]>{
    let list: Due[] = [];
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
export async function getByMovementId(req): Promise<Due>{
    // return   await db.ref(table).on('name', req.body.name)
    
     return await db.collection(table).doc(req.body.key).get().then(snap => {
        return snap.data()
    });     
    // console.log(snapshot)
 }   
  

// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    add,
    edit,
    remove,
    getByMovementId
};
