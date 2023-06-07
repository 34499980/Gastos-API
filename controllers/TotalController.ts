import { User } from '../models/UserModel';
import * as service from  '../services/TotalService';
import * as movementService from  '../services/MovementService';
import {StatusCodes} from 'http-status-codes';
import * as helper from '../helpers/Time';

const res = require('express/lib/response');

export async function processTotals(req, res){
    const date = new Date();
    helper.subtractMonths(3);
    
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
