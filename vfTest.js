const VF = Vex.Flow;
// const toNoteObj = require('./toNoteObj');

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.getElementById("boo")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(600, 300); // width, height
var context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

// Create a stave of width 400 at position 10, 40 on the canvas.
var topStaff = new VF.Stave(0,0, 500); // x, y, width
var bottomStaff = new VF.Stave(0, 75, 500)
// Add a clef and time signature.
topStaff.addClef("treble")
bottomStaff.addClef("bass")
var brace = new Vex.Flow.StaveConnector(topStaff, bottomStaff).setType(1);

// Connect it to the rendering context and draw!
topStaff.setContext(context).draw();
bottomStaff.setContext(context).draw();
brace.setContext(context).draw();



// var bassNotes = [
//     // A quarter-note C.
//     new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "w" }),
//     new VF.StaveNote({clef: "bass", keys: ["b/3"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["eb/2"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["e/2"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["f#/2"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "w"}),
//     new VF.GhostNote({duration: "w"}),
  
//     // A quarter-note D.
//     // new VF.StaveNote({clef: "bass", keys: ["d/4"], duration: "h" }),
  
//     // A quarter-note rest. Note that the key (b/4) specifies the vertical
//     // position of the rest.
//     // new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  
//     // A C-Major chord.
//     // new VF.StaveNote({clef: "bass", keys: ["c/4", "e/4", "g/4"], duration: "q" })
//   ];

  // let trebleNotes = [
  //   new VF.GhostNote({duration: "w"}),
  //   new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   new VF.StaveNote({clef: "treble", keys: ["C/4"], duration: "w"}).addAccidental(0, new VF.Accidental("#")),
  // ]
  
  // Create a voice in 4/4 and add above bassNotes
  // var bassVoice = new VF.Voice({num_beats: numOfPitches,  beat_value: 1});
  // bassVoice.addTickables(bassNotes);
  // let trebleVoice = new VF.Voice({num_beats: numOfPitches,  beat_value: 1});
  // trebleVoice.addTickables(trebleNotes);
  
  // Format and justify the notes to 400 pixels.
  // var formatter = new VF.Formatter().joinVoices([bassVoice, trebleVoice]).format([bassVoice, trebleVoice], 400);
  
  // Render voice
  // trebleVoice.draw(context,topStaff);
  // bassVoice.draw(context, bottomStaff);
  let bassNotes = []
  let trebleNotes = [];
  function renderNotes(chord){
    let numOfPitches = chord.length
    
    toNoteObj(chord);
    console.log(bassNotes, trebleNotes)

    let bassVoice = new VF.Voice({num_beats: numOfPitches,  beat_value: 1});
    bassVoice.addTickables(bassNotes);
    let trebleVoice = new VF.Voice({num_beats: numOfPitches,  beat_value: 1});
    trebleVoice.addTickables(trebleNotes);
    
    let formatter = new VF.Formatter().joinVoices([bassVoice, trebleVoice]).format([bassVoice, trebleVoice], 400);

    trebleVoice.draw(context,topStaff);
    bassVoice.draw(context, bottomStaff);
  }

  renderNotes([36, 52])

  /* 
  toDo:
  create a function toNoteObj(chord) 
  - this function should take a chord array (e.g. [0,1,6]) and convert it to a note object that VF understands. 
  - based on the range of the given note in the chord, it should be assigned to either bass or treble staves.
  - any notes not assiged to bass/treble staves should have the placeholder of new VF.GhostNote({duration: "w"})
  - if a note requies an eccidental, it should place the .addAccidental method on the note object

    1. make two arrays: BassNotes & trebleNotes
    2. for the length of the chord, fill each of these arrays with new VF.GhostNote({duration: "w"}).
    3. iterate through the chord and. For each pitch, assign it to either the bass or treble arrays based on its range
      - below middle C goes to bass, middle C and above goes to treble. 
    4. if a note comes through with an accidental, append .addAccidental(0, new VF.Accidental("#")) to the note object
  
  */


 const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

 function toPitchName(note){
    const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']   
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
