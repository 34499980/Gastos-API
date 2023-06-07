"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtractMonths = exports.getNowDate = exports.getNowWithHours = void 0;
function getNowWithHours() {
    const date = new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getMinutes();
}
exports.getNowWithHours = getNowWithHours;
function getNowDate() {
    const date = new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
exports.getNowDate = getNowDate;
function subtractMonths(month) {
    const date = new Date();
    let index = date.getMonth();
    for (index; month > 0; month--) {
        if (index == 0) {
            index = 12;
        }
        index--;
    }
    console.log(index);
}
exports.subtractMonths = subtractMonths;
module.exports = {
    getNowDate,
    getNowWithHours,
    subtractMonths
};
