import { User } from '../models/UserModel';
import * as service from  '../services/MovementService';
import {StatusCodes} from 'http-status-codes';
import { Movement } from '../models/MovementModel';
var helper = require('../helpers/Time');
const res = require('express/lib/response');

export async function add(req, res,){
 const newEntity: Movement = {
    key: '',
    description: req.body.description,
    amount: req.body.amount,
    typeKey: req.body.typeKey,
    categoryKey: req.body.categoryKey,
    year: req.body.year,
    month: req.body.month,
    dueKey: req.body.dueKey,
    createdDate: helper.getNowWithHours(),
    modifiedDate: '',
    createdBy: req.body.createdBy   
    }
    const key = await service.add(newEntity);
    newEntity.key = key;   
    service.edit(newEntity)
    res.status(StatusCodes.CREATED). send({
        menssage: 'Se genero el movimiento'
    });
}    
export async function edit(req, res){
    const dbEntity = await getById(req, res)   
    console.log(dbEntity)
    if(dbEntity != undefined){
        const newEntity: Movement = {
            key: req.body.key,
            description: req.body.description,
            amount: req.body.amount,
            typeKey: req.body.typeKey,
            categoryKey: req.body.categoryKey,
            year: req.body.year,
            month: req.body.month,
            dueKey: req.body.dueKey,
            createdDate: req.body.createdDate,
            modifiedDate: helper.getNowWithHours(),
            createdBy: req.body.createdBy   
        }
        service.edit(newEntity);
        res.status(StatusCodes.CREATED).send({
            menssage: 'Se actualizo el movimiento'
     });
    }
}
 export async function remove(req, res){
    const dbEntity = service.getById(req.body.key);
    if(dbEntity != undefined) {
        service.remove(req)
        res.status(StatusCodes.ACCEPTED).send({
            menssage: 'Se elimino el movimiento'
        });
    }
   
}
export async function getAllYears(req, res){
   
}
export async function getByMonth(req, res){
   
}
export async function getById(req, res){
   
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
