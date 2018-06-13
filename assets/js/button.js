
let currentChord

const pitchNames = {
    "C" : 0,
    "C#" : 1,
    "Db" : 1,
    "D" : 2,
    "D#" : 3,
    "Eb" : 3,
    "E" : 4,
    "F" : 5,
    "F#" : 6,
    "Gb" : 6,
    "G" : 7,
    "G#" : 8, 
    "Ab" : 8,
    "A" : 9,
    "A#" : 10,
    "Bb" : 10,
    "B" : 11, 
}

$("#submit").click(function(){
    let scheme = $("#scheme").val().split(" ").map(x => parseInt(x));
    let chordLength = $("#chord-length").val().split(" ").map(x => parseInt(x));
    let contains = $("#contains").val().split(" ").map(x => pitchNames[x]);
    let notContains = $("#not-contains").val().split(" ").map(x => pitchNames[x]);
    
    let validChords = process(scheme, chordLength, contains, notContains)
    console.log(validChords);
    currentChord = validChords[0];
    renderNotes(currentChord.map(x => x + 60));
})