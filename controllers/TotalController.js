"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getById = exports.getAll = exports.remove = exports.edit = exports.processTotals = void 0;
const service = __importStar(require("../services/TotalService"));
const movementService = __importStar(require("../services/MovementService"));
const dueService = __importStar(require("../services/DueService"));
const http_status_codes_1 = require("http-status-codes");
const helper = __importStar(require("../helpers/Time"));
const type_1 = require("../enums/type");
const res = require('express/lib/response');
function processTotals(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let monthReduce = 1;
        for (let im = 0; im < 3; im++) {
            const date = helper.subtractMonths(monthReduce);
            monthReduce++;
            console.log(date);
            const movementEntities = yield movementService.getByMonth(date);
            const dueEntities = (yield dueService.getAll()).map(x => x.key);
            const inputArray = movementEntities.filter(x => x.typeKey == type_1.Type.input);
            //    .map(q => q.amount);
            const buyArray = movementEntities.filter(x => x.typeKey == type_1.Type.buy);
            // .map(q => q.amount);
            const input = inputArray.reduce((result, value) => result + value.amount, 0);
            const buy = buyArray.reduce((result, value) => result + value.amount, 0);
            const total = {
                input: input,
                buy: buy,
                balance: input - buy,
                year: date.year,
                month: date.month,
                key: ''
            };
            total.key = yield service.add(total);
            yield service.edit(total);
            let movementToRemoveAll = (yield movementService.getAllYears()).filter(({ key }) => !dueEntities.includes(key)).filter(x => x.month < date.month);
            const movementToRemove = movementEntities.filter(({ key }) => !dueEntities.includes(key));
            movementToRemoveAll = [...movementToRemoveAll, ...movementToRemove];
            console.log(movementToRemoveAll);
            for (const item of movementToRemoveAll) {
                yield movementService.remove(item);
            }
        }
        res.send(http_status_codes_1.StatusCodes.ACCEPTED);
    });
}
exports.processTotals = processTotals;
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
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield service.getAll();
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(list);
    });
}
exports.getAll = getAll;
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let entity = yield service.getById(req);
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(entity);
    });
}
exports.getById = getById;
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    processTotals,
    edit,
    remove,
    getAll,
    getById
};
