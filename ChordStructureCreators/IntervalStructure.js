let permutations = require("get-unique-permutations");
let fs = require('fs');


function makeString(num, base){
    let convertString = '012345';
    if(num < base){
        return convertString[num];
    } else {
        return makeString(Math.floor(num/base), base) + convertString[num % base]
    }
}


// for(let i = 0; i < 500; i++){
//     console.log(makeString(i,4))
// }



// function returnSequences(min, max, minLength, maxLength, base){
//     minLength = minLength || 1;
//     maxLength = maxLength || 12;
//     base = base || 2;

//     let sequences = [];

//     for(let i = min; i <= max; i++){
//         let sequence = makeString(i, base).split('').sort().join('');
//         if(sequence.length >= minLength && sequence.length <= maxLength && !sequences.includes(sequence)){
//             sequences.push(sequence)
//         }
//     }
//     return sequences
// }

// console.log(returnSequences(0, 500, 0, 4, 3))

function returnEndString(base){
    return (base - 1).toString().repeat(11);
}

function returnSequences(base){
    return new Promise(function(resolve){
        let sequences = [];
        let endString = (base - 1).toString().repeat(11);

        let count = 0
        while(sequences[sequences.length-1] !== endString){
            let sequence = makeString(count, base).split('').sort().join('');
            if(!sequences.includes(sequence)){
                sequences.push(sequence);
                if(parseInt(sequence[0]) === base-1 && sequence !== endString){
                    sequences.push("0".repeat(sequence.length+1))
                }
            }
            count++;
        }
        resolve(sequences);
    })
}
 
// async function sequenceAnalyzer(base, min, max){
//     min = min || 1;
//     max = max || min;
//     if(max < min) max = min;
//     let list = await returnSequences(base);
//     list = list.filter(function(sequence){
//         return (sequence.length >= min && sequence.length <= max);
//     })
//     console.log(list.length);
// }

function sequenceAnalyzer(sequenceArr, min, max){
    min = min || 1;
    max = max || min;
    if(max < min) max = min;

    let list = sequenceArr.filter((seq) => {
        return (seq.length >= min && seq.length <= max);
    })
    return list
}

async function sequenceLengths(base){
    let seqArr = await returnSequences(base);
    for(let i = 1; i <= 11; i++){
        console.log(sequenceAnalyzer(seqArr, i).length);
    }
}

// sequenceLengths(5)

// binary(2) = f(x) = x + 1
// ternary(3) = f(x) = 0.5x**2 + (3/2)x + 1
// quadrary(4) = f(x) = 2x**2 + 2
// quindary(5) = f(x) = 5x**2 - 5x + 5



class IntervalSeries {
    constructor(base){
        this.base = base;
        this.ready = false;
        
        this.sequences = []

        let endString = (base - 1).toString().repeat(11);
        let count = 0
        while(this.sequences[this.sequences.length-1] !== endString){
            let sequence = makeString(count, base).split('').sort().join('');
            if(!this.sequences.includes(sequence)){
                this.sequences.push(sequence);
                if(parseInt(sequence[0]) === base-1 && sequence !== endString){
                    this.sequences.push("0".repeat(sequence.length+1))
                }
            }
            count++;
        }
        this.ready = true
    }

    print(index){
        while(!this.ready){} // this blocks the following code from executing until the current instance has created the full sequence list.

        if(index){
            console.log(this.sequences[index])
        } else {
            console.log(this.sequences)
        }
    }

    filterLength(min, max){
        while(!this.ready){};
        let seqs = this.sequences;
        
        let validSeqs = seqs.filter(seq => {
            return seq.length >= min && seq.length <= max;
        })

        console.log(validSeqs);
    }

    convertMap(){
        while(!this.ready){}

        let results = new Map();
        this.sequences.forEach(seq => {
            results.set(seq, [seq]);
        })
        return results;
    }

    toObject(){
        while(!this.ready){}

        let obj = {};
        for(let seq of this.sequences){
            obj[seq] = [seq];
        }
        // console.log(obj)
        return obj;
    }

}

// console.time("Set Generation Time");
let set = new IntervalSeries(2);
let data = set.toObject();
fs.writeFile("./json/binary.json", JSON.stringify(data), "utf8", function(err){
    if(err){
        console.log(error);
    }
});
// console.timeEnd("Set Generation Time")

let intervalSet = new IntervalSeries(2);
intervalSet.print();
