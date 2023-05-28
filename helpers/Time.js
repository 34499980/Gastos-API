function getNowWithHours(){
    const date = new Date()
   return  date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getMinutes();
}

function getNowDate(){
    const date = new Date()
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
}
module.exports = {
    getNowDate,
    getNowWithHours
}