var words;
var pauseButton = document.getElementById("pause-button");
var startButton = document.getElementById("start-button");
var wordDisplay = document.getElementById("display-word");
var secondaryWordDisplay = document.getElementById("secondary-display-word");

//getting words from text-area
var textArea = document.getElementById("text-area");


var speed = 750;


var n = 0;
var myInterval = -1;


startButton.addEventListener("click", function (event) {
    //if paused start
    
    if (myInterval == -1) {
        var text = textArea.value;
        words = text.split(/\s+/);
        document.getElementById("intro-screen").style.display = "none";
        document.getElementById("main-screen").style.display = "block";
        startButton.innerHTML = "PAUSE";

        //getting saved speed from local storage
        if(localStorage.getItem("speed") == null){
            localStorage.setItem("speed","750");
        }
        else {
            speed = parseInt(localStorage.getItem("speed"));
        }

        //slider edits

        sliderNav.max = words.length;
        output.innerHTML = slider.value * 15;
        slider.value = speed / 15;

        myInterval = setInterval(function () {
            // if (n > 0) {

            //     secondaryWordDisplay.innerHTML = words[n - 1];
            // }
            var format = /[ `!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?~]/;
            if (words[n] == undefined) {
                clearInterval(myInterval);
            }
            else if (format.test(words[n].slice(-1)) && words[n].length > 1) {
                wordDisplay.innerHTML = words[n].slice(0, -1);
                var symbol = words[n].slice(-1);
                words[n] = symbol;
            }
            else if (words[n].length == 1) {

                wordDisplay.innerHTML = words[n];
                outputNav.innerHTML = n + 1;
                sliderNav.value = n + 1;
                n++;
            }
            else {

                wordDisplay.innerHTML = words[n];
                outputNav.innerHTML = n + 1;
                sliderNav.value = n + 1;
                n++;
            }


        }, speed);
    } else {
        startButton.innerHTML = "START";
        clearInterval(myInterval);
        myInterval = -1;
    }
});


//slider speed code

var slider = document.getElementById("myRange");
var output = document.getElementById("slider-speed");
output.innerHTML = slider.value * 15; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    if(startButton.innerHTML == "PAUSE"){
        startButton.click();
    }
    
    speed = slider.value * 15;
    output.innerHTML = slider.value * 15;
    localStorage.setItem("speed",speed.toString());

}



//slider navigation code

var sliderNav = document.getElementById("navigation-range");
var outputNav = document.getElementById("slider-nav");

// Update the current slider value (each time you drag the slider handle)
sliderNav.oninput = function () {
    clearInterval(myInterval);
    myInterval = -1;
    n = sliderNav.value - 1;

    startButton.click();
}



var optionsButton = document.getElementById("options-button");
//function for the more options button
optionsButton.addEventListener("click", function () {

    var butt = document.getElementById("options-button");
    var optionsDiv = document.getElementById("more-options");
    if (butt.innerHTML == "More") {
        butt.innerHTML = "Less";
        optionsDiv.style.display = "block";
    }
    else {
        butt.innerHTML = "More";
        optionsDiv.style.display = "none";
    }



});


window.onload = function () {
    if (localStorage.getItem("text") != "null") {
        textArea.value = localStorage.getItem("text");
        localStorage.setItem("text", null);
        startButton.click();
    }
    else if (localStorage.getItem("text") == "null") {
        textArea.value = "";
    }

}





