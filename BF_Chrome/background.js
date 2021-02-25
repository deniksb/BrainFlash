var contextMenus = {};

contextMenus.startingBrainFlash = 

chrome.contextMenus.create(
    
    {
        "title":"BrainFlash",
        "contexts" : ["all"]
    },
    function (params) {
        if(chrome.runtime.lastError){
            console.error(chrome.runtime.lastError.message);
        }
    }

);

var highlightedText;
chrome.contextMenus.onClicked.addListener(contextMenuHandler);

function contextMenuHandler(info,tab) {
    if(info.menuItemId===contextMenus.startingBrainFlash){
       
        chrome.tabs.executeScript( {
            code: "window.getSelection().toString();"
          }, function(selection) {
                 highlightedText = selection[0];
               chrome.tabs.create({url : "popup.html"});
               localStorage.setItem("text", highlightedText);
            
          });
    }
}


