var btnTranslate = document.querySelector('#btn-translate')
var inputText = document.querySelector('#text-input')
var outputText = document.querySelector('#output')
// var url = "https://lessonfourapi.tanaypratap.repl.co/translate/yoda.json"
var url = "https://api.funtranslations.com/translate/minion.json"
//inputText gives an object -[object HTMLTextAreaElement]

function errorHandler(error) {
    console.log('error occured', error)
    alert('Server down. Try again later!')
}


function clickHandler() {

    // outputText.innerText = "Translation: "+ inputText.value 

    var serverURL = url + "?" + "text=" + inputText.value //input

    //calling server for processing
    fetch(serverURL)
        .then((promise) => promise.json())
        .then((json) => {
            // console.log(json.contents.translated)
            var translatedText = json.contents.translated;
            outputText.innerText = translatedText //output
        })
        .catch(errorHandler)
    // alternatively - .catch((error) => {
    //     console.log('error occured', error)
    //     alert('Server down. Try again later!')
    // })
};

btnTranslate.addEventListener("click", clickHandler);