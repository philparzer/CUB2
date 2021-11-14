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
      function: mainInject,
    });
  });
  
  //injected script TODO: refactor into seperate module?
  function mainInject() {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      
      //get selected text on page
    document.addEventListener('mouseup', event => {  
      if (window.getSelection().toString().length !== 0) { // TODO: implement some regex tests e.g. if string only contains spaces

        //check if string is only one word
        if (/^[a-zA-Z]+$/.test(window.getSelection().toString())) {
            let selectedText = window.getSelection().toString();  
            console.log(selectedText); 
          }
      }

      //TODO: get doc language
      //TODO: call wiktionary api
      //TODO: parse data from wiktionary api
      //TODO: think about how to display data
      
    })


  }

