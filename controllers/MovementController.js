"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getByMonth = exports.getAllYears = exports.remove = exports.edit = exports.add = void 0;
var helper = require('../helpers/Time');
const res = require('express/lib/response');
function add(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.add = add;
function edit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.edit = edit;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.remove = remove;
function getAllYears(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.getAllYears = getAllYears;
function getByMonth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.getByMonth = getByMonth;
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.getById = getById;
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    add,
    edit,
    remove,
    getAllYears,
    getByMonth,
    getById
};
