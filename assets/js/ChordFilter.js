
const setNums = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

// TO VECTOR
// ===============================================================================
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
// ===============================================================================

// VECTOR CLASS 
// ===============================================================================

function toPitches(chord){
	let pitches = [];
	for(let i = 0; i < chord.length; i++){
		pitches.push(setNums[parseInt(chord[i])]);
	}
	return pitches
}

class VectorFilter {
	constructor(){
		this["0"] = {'type' : null, 'value' : 0};
		this["1"] = {'type' : null, 'value' : 0};
		this["2"] = {'type' : null, 'value' : 0};
		this["3"] = {'type' : null, 'value' : 0};
		this["4"] = {'type' : null, 'value' : 0};
		this["5"] = {'type' : null, 'value' : 0};
	}

	setVector(intervalNum, type, num){
		this[intervalNum] = {'type' : type, 'value' : num}
	}

	filter(chordVector){
		for(let i = 0; i < 6; i++){
			if(this[i].type){
				switch(this[i].type){
					case('lessThan'):
						if(!(chordVector[i] < this[i].value)){
							return false;
						}
						break;
					case('greaterThan'):
						if(!(chordVector[i] > this[i].value)){
							return false;
						}
						break;
					case('exactly'):
						if(!(chordVector[i] === this[i].value)){
							return false;
						}
				}	
			} 
		}
		return true;
	}
}

// ChordFilter CLASS
// =================================================================================

class ChordFilter {
	constructor(){
		this.contains;
		this.notContains;
		this.chordSize = [2, 11];
		this.vectorFilter = new VectorFilter;
	}

	setContainsFilter(containsArr){
		this.contains = containsArr;
	}

	setNotContainsFilter(notContainsArr){
		this.notContains = notContainsArr;
	}

	setVectorFilter(intervalNum, type, value){
		this.vectorFilter.setVector(intervalNum, type, value);
	}

	containsFilter(chord){
		for(let pitch of this.contains){
			if(!chord.includes(pitch/*.toString()*/)){
				return false;
			}
		}
		return true;
	}

	notContainsFilter(chord){
		for(let pitch of this.notContains){
			if(chord.includes(pitch/*.toString()*/)){
				return false;
			}
		}
		return true;	
	}
	setChordSize(min, max){
		if(min < 2 || min > 11 || max < 2 || max > 11){
			console.err("Invalid Chord Size");
			return;
		}
		if(min > max){
			this.chordSize = [max, min];
		} else {
			this.chordSize = [min, max];
		}
	}

	chordSizeFilter(chord){
		return (this.chordSize[0] <= chord.length+1 && this.chordSize[1] >= chord.length+1)
	}

	passFilters(chord){
		return this.containsFilter(chord) && this.notContainsFilter(chord) && this.vectorFilter.filter(toVector(chord)) && this.chordSizeFilter(chord)
	}
}