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
exports.getById = exports.getByName = exports.getByPrivate = exports.getAll = exports.remove = exports.edit = exports.add = void 0;
var service = require('../services/CategoryService');
var helper = require('../helpers/Time');
const res = require('express/lib/response');
function add(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield getByPrivate(req, res);
        if (list.length == 0) {
            req.body.createdDate = helper.getNowWithHours();
            const key = yield service.add(req, res);
            req.body.key = key;
            req.body.modifiedDate = helper.getNowWithHours();
            service.edit(req, res);
            res.status(200).send({
                menssage: 'Se genero la categoria ' + req.body.name
            });
        }
        else {
            res.status(500).send({
                menssage: 'La categoria ' + req.body.name + ' ya existe'
            });
        }
    });
}
exports.add = add;
function edit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield getByPrivate(req, res);
        if (list.length == 0) {
            req.body.modifiedDate = helper.getNowWithHours();
            yield service.edit(req, res);
            res.status(200).send({
                menssage: 'Se actualizo la categoria ' + req.body.name
            });
        }
        else {
            res.status(500).send({
                menssage: 'La categoria ' + req.body.name + ' ya existe'
            });
        }
    });
}
exports.edit = edit;
function remove(req, res) {
    // Devolvemos una respuesta en JSON
    res.status(200).send({
        menssage: 'Esta ruta es de prueba en mi api restful con mongo y node'
    });
}
exports.remove = remove;
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield service.getAll();
        res.status(200).json(list);
    });
}
exports.getAll = getAll;
function getByPrivate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield service.getByName(req);
        return list;
    });
}
exports.getByPrivate = getByPrivate;
function getByName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield service.getByName(req);
        res.status(200).json(list);
    });
}
exports.getByName = getByName;
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let entity = yield service.getById(req);
        res.status(200).json(entity);
    });
}
exports.getById = getById;
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    add,
    edit,
    remove,
    getAll,
    getByName,
    getById
};
