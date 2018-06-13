
// TEST: These cariables are set for testing purposes only
// =========================================
let globalScheme = [4, 5];
let globalContainsArr = [6, 1];
let globalNotContainsArr = [2, 3];
let globalSize = [2, 11];
// =========================================

const validChords = (chordsArr, filterObj) => {
    let validChords = [];
    for(chord of chordsArr){
        if(filterObj.passFilters(chord)){
            validChords.push(chord);
        }
    }
    return validChords
}

const process = (scheme, size, containsArr, notContainsArr) => {
  
    let intScheme = new IntervalScheme(scheme);
    let chords = intScheme.mappedScheme();
   
    let filter = new ChordFilter();
    filter.setContainsFilter(containsArr);
    filter.setNotContainsFilter(notContainsArr);
    filter.setChordSize(...size);

    return validChords(chords, filter).sort((a,b) => a.length - b.length);
    
}