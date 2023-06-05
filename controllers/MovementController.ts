import { User } from '../models/UserModel';
import * as service from  '../services/MovementService';
import * as duesService from  '../services/DueService';
import {StatusCodes} from 'http-status-codes';
import { Movement } from '../models/MovementModel';
import { Due } from '../models/DuesModel';
var helper = require('../helpers/Time');
const res = require('express/lib/response');

export async function add(req, res,){
    let dueEntity: Due;
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
        createdBy: req.body.createdBy,
        dueBool: req.body.dueBool 
    }
    if(newEntity.dueBool != undefined) {
         dueEntity = {
            key: '',
            amount: req.body.due.amount,
            actualCount: 0,
            countDues: req.body.due.countDues,
            movementKey: ''
        }
        dueEntity.key = await duesService.add(dueEntity);
        newEntity.dueKey = dueEntity.key
    }
    dueEntity.key = await service.add(newEntity)
    await service.edit(dueEntity);
    
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
            createdBy: req.body.createdBy,
            dueBool: req.body.dueBool 
        }
        if(newEntity.dueBool != undefined) {
            let due = await duesService.getByMovementId(newEntity.key)
            due = {
                key: due.key,
                amount: req.body.amount?? due.amount,
                actualCount: due.key == undefined? 1 : due.actualCount,
                countDues: req.body.countDues?? due.countDues,
                movementKey: due.movementKey
            }            
            await duesService.edit(due);

        }
        service.edit(newEntity);
        res.status(StatusCodes.CREATED).send({
            menssage: 'Se actualizo el movimiento'
     });
    }
}
 export async function remove(req, res){
    const dbEntity = await service.getById(req.body.key);
    if(dbEntity.dueBool){
       const due = await duesService.getByMovementId(dbEntity.key);
       await duesService.remove(due);
    }
    if(dbEntity != undefined) {
        service.remove(req)
        res.status(StatusCodes.ACCEPTED).send({
            menssage: 'Se elimino el movimiento'
        });
    }
   
}
export async function getAllYears(req, res){       
   const list = await service.getAllYears(req)
   res.status(StatusCodes.ACCEPTED).json(list);

}
export async function getByMonth(req, res){
    const list = await service.getByMonth(req)
    let index: number;
    for(index = 0; index < list.length; index++){
        if(list[index].dueBool){
           list[index].due = await duesService.getByMovementId(list[index].key);
        }       
    }
    
    res.status(StatusCodes.ACCEPTED).json(list);
   
}
export async function getById(req, res){
   const entity = await service.getById(req);
   res.status(StatusCodes.ACCEPTED).json(entity);
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
