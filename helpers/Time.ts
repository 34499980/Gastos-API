export function getNowWithHours(){
    const date = new Date()
   return  date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getMinutes();
}

export function getNowDate(){
    const date = new Date()
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
}
export function subtractMonths(month: number){
    const date = new Date();
    let index = date.getMonth();
    for(index; month > 0; month--){
        if(index == 0) {
            index = 12
        }
        index--;      
    }
    console.log(index);

}
module.exports = {
    getNowDate,
    getNowWithHours,
    subtractMonths
}