import { Movement } from "../models/MovementModel";


const table = 'Movement';

 const admin = require('firebase-admin');
 
 const db = admin.firestore()

export async function add(req): Promise<string>{
  
    
  
  return db.collection(table)
  
  .add({
    key: '',
    description: req.description,
    amount: req.amount,
    typeKey: req.typeKey,
    categoryKey: req.categoryKey,
    year: req.year,
    month: req.month,
    dueKey: req.dueKey,
    createdDate: req.createdDate,
    modifiedDate: '',
    createdBy: req.createdBy   
}).then(response => {
  
    return response.id;
   })
  

   
  

 
}  
  
export async function edit(req): Promise<void>{
 
    var ref = db.collection(table);   
    var upref = ref.doc(req.key);
            upref.update( {
                key: req.key,
                description: req.description,
                amount: req.amount,
                typeKey: req.typeKey,
                categoryKey: req.categoryKey,
                year: req.year,
                month: req.month,
                dueKey: req.dueKey,
                createdDate: req.createdDate,
                modifiedDate: req.modifiedDate,
                createdBy: req.createdBy   
                         })
     
    }
export async function remove(req){
     await db.collection(table).doc(req.body.key).delete();
    }
export async function getAllYears(): Promise<Movement[]>{
    let list: Movement[] = [];
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
export async function getById(req): Promise<Movement>{
    // return   await db.ref(table).on('name', req.body.name)
    
     return await db.collection(table).doc(req.body.key).get().then(snap => {
        return snap.data()
    });     
    // console.log(snapshot)
 }   
  
export async function getByMonth(req): Promise<Movement[]>{
   // return   await db.ref(table).on('name', req.body.name)
    let list: Movement[];
    return await db.collection(table).where("month", ">=", req.body.month)
                                     .where("month", "<=", req.body.month)
                                     .where("year", "==", req.body.year)
                                     .get().then(snap => {
        snap.forEach(doc => {
            console.log(doc.data());
           
            list.push(doc.data())
        });
        return list;
    });     
   // console.log(snapshot)
}
 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    add,
    edit,
    remove,
    getAllYears,
    getByMonth,
    getById
};
