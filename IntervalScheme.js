let fetchJSON = require("./fetchJSON");
let intervalMapToPitchSet = require("./intervalMapToPitchSet");
let toVector = require('./toVector');


class IntervalScheme {
    constructor(scheme){        
        // these three lines allow us to remove repeats from the scheme input
        scheme = new Set(scheme)
        scheme = [...scheme]
        this.encryption = scheme

        scheme.length <= 6 ? this.size = scheme.length : this.size = 6;
        this.type(); // sets the type as binary, ternary, quarternary, quinary or senary
        this.__intervalStructure = fetchJSON(`./json/${this.structureType}-simplified.json`);
    }

    type(){
        switch(this.size){
            case(2):
                this.structureType = "binary"
                break;
            case(3):
                this.structureType = "ternary"
                break;
            case(4):
                this.structureType = "quarternary"
                break;
            case(5):
                this.structureType = "quinary"
                break;
            case(6):
                this.structureType = "senary"
        }
    }

    mapper(structureArr){
        let decoded;
        if(structureArr){
            decoded = structureArr.map(x => x);
        } else {
            return;
        }
            for(let i = 0; i < decoded.length; i++){
                switch(decoded[i]){
                    case("0"):
                        decoded[i] = this.encryption[0] 
                        break;
                    case("1"):
                        decoded[i]  = this.encryption[1] 
                        break;
                    case("2"):
                        decoded[i]  = this.encryption[2] 
                        break;
                    case("3"):
                        decoded[i]  = this.encryption[3] 
                        break;
                    case("4"):
                        decoded[i]  = this.encryption[4] 
                        break;
                    case("5"):
                        decoded[i]  = this.encryption[5] 
                        break;
                }
            }
        return decoded;
    }

    mappedScheme(){
        let mapped = []
        for(let i = 0; i < this.__intervalStructure.length; i++){
            mapped.push(this.mapper(this.__intervalStructure[i]));
        }
        return intervalMapToPitchSet(mapped);
    }

}

// console.time("Fetch & Convert")

// let test = new IntervalScheme([5, 4, 6, 2]);
// test.mappedScheme().forEach(chord => console.log(toVector(chord)));

// console.timeEnd("Fetch & Convert")


module.exports = IntervalScheme;



