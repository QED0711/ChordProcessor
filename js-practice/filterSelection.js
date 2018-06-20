const ChordFilter = require('./ChordFilter');
const fetchJSON = require('./fetchJSON');
const IntervalScheme = require('./IntervalScheme');

const prompt = require('prompt');


//Setup
let scheme = [6,3,2, 4]
let containsArr = [6, 1]
let notContainsArr = [2, 3]
let size = [2,8]

// set the scheme and return as an array of numbers (intervals)
// let scheme = [3,2];
// scheme = scheme.map(x => parseInt(x));

// map the chord type (based on the interval scheme length) to pitch sets. store in 'chords' variable
let test = new IntervalScheme(scheme);
let chords = test.mappedScheme();
// console.log(chords)

// create the parameters for the filter 
let filter = new ChordFilter();
// let containsArr = [1];
// let notContainsArr = [2];
// console.log(filter)

filter.setContainsFilter(containsArr)
filter.setNotContainsFilter(notContainsArr);

filter.setChordSize(...size)

// loop through each as of yet valid chord structure, and filter them based on user filter designations
let validChords = [];
for(let chord of chords){
	if(filter.passFilters(chord)){
		validChords.push(chord);
	}
}
// console.log(validChords.sort((a,b) => {a.length - b.length}).length);



