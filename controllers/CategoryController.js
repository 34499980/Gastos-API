
var service = require('../services/CategoryService');
var helper = require('../helpers/Time');
const res = require('express/lib/response');

async function add(req, res,){
    const date = new Date();
    req.body.createdDate = helper.getNowWithHours();
       const  key = await service.add(req,res);
     
   
    req.body.key = key;
   // req.body.modifiedDate = helper.getNowWithHours();
   
    service.edit(req, res)
      res.status(200). send({
        menssage: 'Se genero la categoria ' + req.body.name
        
        
    });
}  
  
async function edit(req, res){
    req.body.modifiedDate = helper.getNowWithHours();
    await service.edit(req, res);
        res.status(200).send({
            menssage: 'Se actualizo la categoria ' + req.body.name
        });
    }
function remove(req, res){

    // Devolvemos una respuesta en JSON
        res.status(200).send({
            menssage: 'Esta ruta es de prueba en mi api restful con mongo y node'
        });
    }
async function getAll(req, res){
    const list = await (await service.getAll()).val();    
    res.status(200).json(list);
    
        
    
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
