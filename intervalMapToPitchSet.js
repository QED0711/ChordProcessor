
const setNums = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

function hasDuplicates(arr){
    return (new Set(arr)).size !== arr.length
}

// console.time("Check hasDuplicates")
// console.log(hasDuplicates([0, 6, 5]))
// console.timeEnd("Check hasDuplicates")

function IntervalMapToPitchSet(structureArr){
    let results = []
    for(let i = 0; i < structureArr.length; i++){
        let curMap = [0];
        for(let j = 0; j< structureArr[i].length; j++){
            if(curMap[curMap.length-1] + structureArr[i][j] > 11){
                curMap[curMap.length] = curMap[curMap.length-1] + structureArr[i][j] - 12;
            } else {
                curMap[curMap.length] = curMap[curMap.length-1] + structureArr[i][j]
            }
        }
        if(hasDuplicates(curMap)){
            continue;
        } else {
            results.push(curMap);
        }
    }
    return results
}

// let test = [
//     [1, 3, 1, 6],
//     [1, 3, 6, 1],
//     [1, 7, 9],
//     [6, 6]
// ]

// console.log(IntervalMapToPitchSet(test))

module.exports = IntervalMapToPitchSet;
