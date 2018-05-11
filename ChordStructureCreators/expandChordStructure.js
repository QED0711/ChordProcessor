const fs = require("fs");
const prompt = require("prompt");
let permutations = require("get-unique-permutations");
// let Structure = require("../Structure");

function getPermutations(strcArr){
    return permutations(strcArr);

}

prompt.start();
let type;
let chordCodes;
prompt.get(['type'], (err, results) => {
    if(err) console.log(err);
    // console.time("Read Time");
    chordCodes = JSON.parse(fs.readFileSync(`../json/${results.type}.json`, 'utf8'))
    
    // console.log(getPermutations(chordCodes["01111111111"][0].split('')));
    for(let code in chordCodes){
        if(chordCodes[code][0].length < 11){
            chordCodes[code] = getPermutations(chordCodes[code][0].split(''));
            console.log(code)
        }
    }
    console.log(`Writing to ../json/${results.type}-expanded.json`);
    fs.writeFile(`../json/${results.type}-expanded.json`, JSON.stringify(chordCodes), "utf8", function(err){
        if(err){
            console.log(error);
        }
    });
    // chordCodes["0001"] = getPermutations(chordCodes["0001"][0].split(''));
    // console.log(chordCodes);
})





// prompt.start();
// let type;
// let chordCodes;

// let testStructure = new Structure([7, 8]);

// prompt.get(['type'], (err, results) => {
//     if(err) console.log(err);
//     // console.time("Read Time");
//     chordCodes = JSON.parse(fs.readFileSync(`../json/${results.type}.json`, 'utf8'))
    
//     // console.log(getPermutations(chordCodes["01111111111"][0].split('')));
//     for(let code in chordCodes){
//         if(chordCodes[code][0].length < 11){
//             console.log(testStructure.intervalMapper(code.split('')))
//         }
//     }
//     // chordCodes["0001"] = getPermutations(chordCodes["0001"][0].split(''));
//     // console.log(chordCodes);
// })