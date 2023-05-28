
var service = require('../services/CategoryService');
var helper = require('../helpers/Time');

async function add(req, res,){
    const date = new Date();
    req.body.createdDate = helper.getNowWithHours();
       const  key = await service.add(req,res);
     
   
    req.body.key = key;
    req.body.modifiedDate = helper.getNowWithHours();
// Devolvemos una respuesta en JSON
   
      service.edit(req, res)
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
