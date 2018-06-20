const IntervalScheme = require("./IntervalScheme");
const toVector = require('./toVector');

const setNums = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

function toPitches(chord){
	let pitches = [];
	for(let i = 0; i < chord.length; i++){
		pitches.push(setNums[parseInt(chord[i])]);
	}
	return pitches
}

// function setVectorInterval(type, value){
// 	return {'filterType' : type, 'value' : value}
// }

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
			// // console.log(i)
			// console.log(this[i].type)
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



// let vectorTest = new VectorFilter()
// console.log(vectorTest);
// vectorTest.setVector(2, 'greaterThan', 3)
// console.log(vectorTest.filter([0,1,3,3,2,1]));

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
		// console.log(this.chordSizeFilter(chord))
		return this.containsFilter(chord) && this.notContainsFilter(chord) && this.vectorFilter.filter(toVector(chord)) && this.chordSizeFilter(chord)
	}
}


// let testChord = ["0", "6", "7"];

// let test = new ChordFilter();
// test.setNotContainsFilter([1]);
// test.setContainsFilter([0, 6]);
// // console.log(test.vectorFilter);
// let vectFilter = [0, 'greaterThan', 1]
// test.setVectorFilter(...vectFilter)
// // console.log(test.vectorFilter);
// console.log(test.passFilters(testChord));


module.exports = ChordFilter;




