const fs = require('fs');
const prompt = require("prompt")
const fetchJSON = require("../fetchJSON");

prompt.start();

prompt.get(["type"], (err, results) => {
	let type = results.type;
	let json = fetchJSON(`../fetch/json/${type}-expanded.json`) //fix this for other uses of fetchJSON
})