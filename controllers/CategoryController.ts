import { Category } from '../models/CategoryModel';
import * as service from  '../services/CategoryService'
//var service = require('../services/CategoryService');
var helper = require('../helpers/Time');
const res = require('express/lib/response');

export async function add(req, res,){
    const entity = await getByNamePrivate(req, res)
    if(entity == undefined) {
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
  
export async function edit(req, res){
    const dbEntity = await getByNamePrivate(req, res)   
    console.log(dbEntity)
    if(dbEntity == undefined || dbEntity.key == req.body.key) { 
       const entity: Category = {
        key: req.body.key,
        createdDate: req.body.createdDate,
        name: req.body.name,  
        image: req.body.image,          
        modifiedDate: helper.getNowWithHours()
        } 
      
        await service.edit(entity, res);
            res.status(200).send({
                menssage: 'Se actualizo la categoria ' + req.body.name
         });
    } else {
        res.status(500). send({
            menssage: 'La categoria ' + req.body.name + ' ya existe'
        });
    }
   
 }
 export function remove(req, res){

    // Devolvemos una respuesta en JSON
        res.status(200).send({
            menssage: 'Esta ruta es de prueba en mi api restful con mongo y node'
        });
    }
export async function getAll(req, res){
    let list = await service.getAll()
    res.status(200).json(list);
 }
 export async function getByNamePrivate(req, res){
    let list =  await service.getByName(req)
    return list;
 }
 export async function getByName(req, res){
    let list =  await service.getByName(req)
    res.status(200).json(list);
 }
export async function getById(req, res){
    let entity = await service.getById(req)
    res.status(200).json(entity);
 }
 export async function getByIdPrivate(req, res){
    return await service.getById(req)
    
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
