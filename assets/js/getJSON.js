// An ajax request fuction to get the interval excryptions from the github page;

const JSONRequest = new XMLHttpRequest();

const getJSON = (type) => { // type = 'binary', 'ternary', etc.
    
    // let schemes // clear the schemes variable at the start of each request

    let schemes; // seta Window variable that is set by the JSON 

    function setSchemes(data){
        schemes = data;
    }

    let path = `https://raw.githubusercontent.com/QED0711/ChordProcessor/master/json/${type}-simplified.json`
    JSONRequest.open("GET", path, true);
    
    JSONRequest.onload = () => {
        setSchemes(JSON.parse(JSONRequest.responseText))
    }
    JSONRequest.send();
    
    while(!schemes){} // blocking from finishing
    return schemes;
    
}

