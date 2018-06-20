const toVector = require('./toVector');

class CurrentChord {
    constructor(chordArr){
        this.chord = chordArr;
        this.expanded = this.expandChord()
        this.compressed = this.chord.map(x => x).sort((a,b) => a-b);
        this.vector = toVector(chordArr).join('');
        this.names = this.toNames();
    }

    expandChord(){
        let expanded = this.chord.map(x => x);
        
        for(let i = 1; i < expanded.length; i++){
            let curNote = expanded[i-1];
            while(expanded[i] < curNote){
                expanded[i] += 12
            }
        }
        return expanded
    }
    
    toNames(){
        let pitchNames = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']
        let names = [];
        this.chord.forEach(note =>{
            names.push(pitchNames[parseInt(note)]);
        })
        return names;
    }
    
    offset(num){
        this.chord = this.chord.map(x => x+(num*12))
        this.expanded = this.expanded.map(x => x+(num*12));
        this.compressed = this.compressed.map(x => x+(num*12)); 
    }
}

let test = new CurrentChord([0, 6, 1]);
test.offset(5)
console.log(test);