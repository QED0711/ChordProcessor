let fs = require('fs');

function fetchJSON(path){
    return JSON.parse(fs.readFileSync(path, 'utf8'))
}

module.exports = fetchJSON;

// console.time("read time")
// fetchJSON('quaternary');
// console.timeEnd("read time")