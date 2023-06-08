import { User } from '../models/UserModel';
import * as service from  '../services/TotalService';
import * as movementService from  '../services/MovementService';
import * as dueService from  '../services/DueService';
import {StatusCodes} from 'http-status-codes';
import * as helper from '../helpers/Time';
import { Type } from '../enums/type';
import { Total } from '../models/TotalModal';

const res = require('express/lib/response');

export async function processTotals(req, res){
    
    const date = helper.subtractMonths(3);
    const movementEntities = await movementService.getByMonth(date);
    const dueEntities = (await dueService.getAll()).map(x => x.key);
   
    const input = movementEntities.filter(x => x.typeKey == Type.input?? 0)
                                   .map(q => q.amount)
                                   .reduce((result, value) => result + value, 0);
    const buy = movementEntities.filter(x => x.typeKey == Type.buy?? 0)
                                   .map(q => q.amount)
                                   .reduce((result, value) => result + value, 0);
    const total: Total = {
        input: input,
        buy: buy,
        balance: input - buy,
        year: date.year,
        month: date.month,
        key: ''        
    }
    total.key = await service.add(total);
    await service.edit(total);   
    
    let movementToRemoveAll = (await movementService.getAllYears()).filter(({key}) => !dueEntities.includes(key)).filter(x => x.month < date.month);
    const movementToRemove =  movementEntities.filter(({key}) => !dueEntities.includes(key));
    movementToRemoveAll = [...movementToRemoveAll, ...movementToRemove]
    for(const item of movementToRemoveAll){
        await movementService.remove(item);
    }
    
   res.send(StatusCodes.ACCEPTED)
}  
  
export async function edit(req, res){
    
   
 }
 export async function remove(req, res){
   
    }
export async function getAll(req, res){
    let list = await service.getAll()
    res.status(StatusCodes.ACCEPTED).json(list);
 }
export async function getById(req, res){
    let entity = await service.getById(req)
    res.status(StatusCodes.ACCEPTED).json(entity);
 }
 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    processTotals,
    edit,
    remove,
    getAll,
    getById
};
