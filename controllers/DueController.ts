import { Due } from '../models/DuesModel';
import * as service from  '../services/DueService';
import * as movementService from  '../services/MovementService';
import {StatusCodes} from 'http-status-codes';
import { Movement } from '../models/MovementModel';
var helper = require('../helpers/Time');
const res = require('express/lib/response');

export async function processByMonth(){
   const list = await service.getAll();
   for(const element of list){
    element.actualCount++;
    const movement = await movementService.getById(element.movementKey)
    const newMovement: Movement = {
        key: '',
        description: movement.description,
        amount: movement.amount,
        typeKey: movement.typeKey,
        categoryKey: movement.categoryKey,
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        dueKey: movement.dueKey,
        createdDate: helper.getNowWithHours(),
        modifiedDate: '',
        createdBy: 'System',
        dueBool: true 
    }
    newMovement.key = await movementService.add(newMovement);
    await movementService.edit(newMovement);
    await service.edit(element);
   }
   res.send(StatusCodes.GONE)
}
export async function getAll(req, res){
    let list = await service.getAll()
    res.status(StatusCodes.ACCEPTED).json(list);
 }
module.exports = {
    processByMonth,
    getAll
};
