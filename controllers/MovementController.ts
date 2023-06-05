import { User } from '../models/UserModel';
import * as service from  '../services/UserService';
import {StatusCodes} from 'http-status-codes';
var helper = require('../helpers/Time');
const res = require('express/lib/response');

export async function add(req, res,){

}    
export async function edit(req, res){
  
}
 export async function remove(req, res){
   
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
