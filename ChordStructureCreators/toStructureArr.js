
function toStructureArr(structObj){
    let structureArr = [];
    for(key in structObj){
        if(typeof structObj[key][0] === 'object'){
            for(let structure of structObj[key]){
                structureArr.push(structure)
            }
        }
    }
    // console.log(structureArr)
    return structureArr;
}

// const fetchJSON = require("./fetchJSON");
// let testArr = toStructureArr(fetchJSON("quarternary"));

module.exports = toStructureArr;