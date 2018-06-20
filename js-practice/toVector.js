
function toVector(chord){
	let vector = [0,0,0,0,0,0];

	for(let i = 0; i < chord.length-1; i++){
		for(let j = i+1; j< chord.length; j++){
			let interval = Math.abs(parseInt(chord[i]) - parseInt(chord[j]))
			if(interval > 6){
				vector[Math.abs(interval - 12)-1] += 1;	
			} else {
				vector[interval-1] += 1
			}
			
		}
	}
	return vector
}

// let testChord = ['3', '1', '8'];
// console.log(toVector(testChord));

module.exports = toVector;