let startButton = document.getElementById("start");

// get stuff from storage
// chrome.storage.sync.get("TODO:", ({ TODO: }) => {
//   TODO: language
// });

startButton.addEventListener("click", async () => {
    //get current tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    //inject script into current tab
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: mainInject
    });
  });
  


  //injected script TODO: refactor into seperate module?
  function mainInject() {
      document.body.style.backgroundColor = "red";
      document.body.style.color = "white";
      
      //get selected text on page
    document.addEventListener('mouseup', event => {  
      if (window.getSelection().toString().length !== 0) {

        //check if string is unicode word with one space at end or no space at end
        if (window.getSelection().toString().match(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]+$/) || window.getSelection().toString().match(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]\s+$/) ) {
            let selectedText = window.getSelection().toString();
            console.log(selectedText);
            //TODO: try replacing whitespace in string
            //get wiktionary data
            fetch("https://en.wiktionary.org/wiki/" + selectedText) //TODO: CORS?
            .then(response => response.text())
            .then(html => {
                console.log(html);

                //parse string to get en definition
                let defRegex = /\<ol\>\<li\>.*\<\/ol\>/; //this doesn't work for verbs
                let anchorDef = /\<a href=\"\/wiki\/[\u00C0-\u1FFF\u2C00-\uD7FF\w]+(\"|#).*/;

                let regMatch = html.match(defRegex);
                console.log("HTML MATCH " + regMatch);
                let matchedAnchor = regMatch[0].match(anchorDef)[0];
                console.log("Matched Anchor" + matchedAnchor);


                let startIndex = matchedAnchor.indexOf('wiki\/') + 5;
                let endIndex = startIndex;

                for (let i = startIndex; i < matchedAnchor.length; i++) {
                    if (matchedAnchor[i] === '"' || matchedAnchor[i] === '#') {
                        endIndex = i;
                        break;
                    }
                }

                let wiktionaryDefResult = matchedAnchor.substring(startIndex, endIndex);
                console.log("Result: " + wiktionaryDefResult);

            })
            .catch(error => console.error(error));



            let selectedParentElement = window.getSelection().getRangeAt(0).startContainer.parentNode;            
            //TODO: create a popover element at selectedParentElement

          }
      }

      //TODO: get doc language
      //TODO: call wiktionary api
      //TODO: parse data from wiktionary api
      //TODO: think about how to display data
      
    })


  }

