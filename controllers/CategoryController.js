
var service = require('../services/CategoryService');
var helper = require('../helpers/Time');
const res = require('express/lib/response');

async function add(req, res,){
    const list = await getByPrivate(req, res)
   
    
    if(list.length == 0) {
        req.body.createdDate = helper.getNowWithHours();
        const  key = await service.add(req,res);     
    
     req.body.key = key;
     req.body.modifiedDate = helper.getNowWithHours();
    
     service.edit(req, res)
       res.status(200). send({
         menssage: 'Se genero la categoria ' + req.body.name
         
         
     });
    } else {
        res.status(500). send({
            menssage: 'La categoria ' + req.body.name + ' ya existe'
            
            
        });
    }
    
}  
  
async function edit(req, res){
    const list = await getByPrivate(req, res)
   
    
    if(list.length == 0) {
        req.body.modifiedDate = helper.getNowWithHours();
        await service.edit(req, res);
            res.status(200).send({
                menssage: 'Se actualizo la categoria ' + req.body.name
         });
    } else {
        res.status(500). send({
            menssage: 'La categoria ' + req.body.name + ' ya existe'
            
            
        });
    }
   
 }
function remove(req, res){

    // Devolvemos una respuesta en JSON
        res.status(200).send({
            menssage: 'Esta ruta es de prueba en mi api restful con mongo y node'
        });
    }
async function getAll(req, res){
    let list = [];
     await service.getAll().then(snap => {
        snap.forEach(doc => {
            console.log(doc.data());
           
            list.push(doc.data())
        });
    });  
   
    res.status(200).json(list);
    
        
    
 }
 async function getByPrivate(req, res){
    let list =  await service.getByName(req)
    return list;
 }
async function getByName(req, res){
    let list =  await service.getByName(req)
    res.status(200).json(list);
 }
 async function getById(req, res){
    let enitty;
     await service.getById(req).then(snap => {
        this.entity = snap.data()
    });     
    res.status(200).json(this.entity);
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
