let fs = require('fs');

function fetchJSON(chordType){
    return JSON.parse(fs.readFileSync(`./json/${chordType}-expanded.json`, 'utf8'))
}

module.exports = fetchJSON;

// console.time("read time")
// fetchJSON('quaternary');
// console.timeEnd("read time")