const fs = require('fs');
const prompt = require("prompt")
const fetchJSON = require("../fetchJSON");
const toStructureArr = require("./toStructureArr");

prompt.start();

prompt.get(["type"], (err, results) => {
	let path = `../json/${results.type}-expanded.json`;
	let json = fetchJSON(path);
	let simplifiedArr = toStructureArr(json);

	fs.writeFile(`../json/${results.type}-simplified.json`, JSON.stringify(simplifiedArr), 'utf8', (err) => console.log(err)); 
})

