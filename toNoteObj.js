const Vex = require('vexflow')
const VF = Vex.Flow;
// console.log(VF)

const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
function toPitchName(note){
    let octave = -1; //offset to -1 so that middle C is C/4
    while(!names[note]){
        note -= 12;
        octave += 1
    }
    return names[note] + "/" + octave;
}

function toNoteObj(chord){
    // make treble and bass arrays and fill with GhostNotes to the length of the input chord
    // let trebleStaff = [], bassStaff = [];
    chord.forEach((note)=>{
        trebleNotes.push(new VF.GhostNote({duration: "w"}));
        bassNotes.push(new VF.GhostNote({duration: "w"}));
    })
    
    const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    for(let i = 0; i < chord.length; i++){
        if(chord[i] < 60){
            let note = toPitchName(chord[i]);
            if(note.match("#")){
                bassNotes[i] = new VF.StaveNote({clef: "bass", keys: [note], duration: "w"}).addAccidental(0, new VF.Accidental("#"))
            } else {
                bassNotes[i] = new VF.StaveNote({clef: "bass", keys: [note], duration: "w"})
            }
        } else {
            let note = toPitchName(chord[i]);
            if(note.match("#")){
                trebleNotes[i] = new VF.StaveNote({clef: "treble", keys: [note], duration: "w"}).addAccidental(0, new VF.Accidental("#"))
            } else {
                trebleNotes[i] = new VF.StaveNote({clef: "treble", keys: [note], duration: "w"})
            }
        }
    } 
}

// let chord = [0, 1, 6];

// toNoteObj(chord.map(x => x+60));

module.exports = toNoteObj;