// Taken from pieceup.js
var cloneDeep = require('lodash/cloneDeep');

const nestedUpdate = (path, value) => (obj) => {
    // Credits: bpmason1 https://stackoverflow.com/a/18937118

    let exp = cloneDeep(obj)
    let schema = exp
    let pList = path.split('.')

    for(var i = 0; i < pList.length - 1; i++){
        let elem = pList[i]
        if(!schema[elem]) schema[elem] = {}    
        schema = schema[elem]
    }
    schema[pList[pList.length - 1]] = value
    return exp
}

export default nestedUpdate