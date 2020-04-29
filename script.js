// variables to store the textbox and button
let input, button;
// variable to store the number input
let num;

// run only once it
function setup() {
    createCanvas(innerWidth , 300);
    textSize(25);
    // add textbox to canvas
    input = createInput('').attribute("id", "numInput");
    input.attribute("placeholder", "Enter number");
    // add button to canvas
    button = createButton("Convert").attribute("id", "convertBtn");
    // add mouse press function to button
    button.mousePressed(getNumber);
}

// continuous loop
function draw() {
    // set canvas background
    background(220);
    // check input is a valid positive number 
    if (!isNaN(num) && num >= 0) {
        fill(0);
        // show information about number on canvas
        text("Number: " + num, 10, 30);
        text("Binary: " + convertToBinary(num), 10, 60);
        text("Hex: " + convertToHex(num), 10, 90);
        fill(255, 0, 0);
        // represent the number in binary and hexadecimal
        drawBinary();
        drawHex();
    }
}

// function that gets the number input
function getNumber() {
    // store the input as an integer in num
    num = parseInt(input.value());
}

// function that converts number to binary
function convertToBinary(n) {
    return Number(n).toString(2);
}

// function that converts number to hexadecimal
function convertToHex(n) {
    return Number(n).toString(16);
}

// function that draws a binary representantion of number on canvas
function drawBinary() {
    // variable to store the x position of the rectangle
    let x = 10;
    // draw rectangle for each time 2 divides into number
    for (let i = 1; i <= num / 2; i++) {
        rect(x, 110, 20, 20);
        x = x + 20;
    }
    // if there is a remainder draw half of rectangle
    if (num % 2 > 0) {
        // rectangle width
        let w = map(num % 2, 0, 2, 0, 20);
        rect(x, 110, w, 20);
    }
}

// function that draws a hexadecimal representantion of number on canvas
function drawHex() {
    // variable to store the x position of the rectangle
    let x = 10;
    // draw rectangle for each time 16 divides into number
    for (let i = 1; i <= num / 16; i++) {
        rect(x, 140, 160, 20);
        x = x + 160;
    }
    // if there is a remainder draw it as proportion of rectangle
    if (num % 16 > 0) {
        // rectangle width
        let w = map(num % 16, 0, 16, 0, 160);
        rect(x, 140, w, 20);
    }
}


// wait until page has fully loaded
$(document).ready(function() {

    // function that changes the class of div
    function changeClass() {
        $("#myDiv").toggleClass("showText hideText");
    }

    // function that changes the text of button depending on the class of div
    function changeButtonText() {
        if ($("#myDiv").hasClass("showText")) {
            $("#btnShowText").text("Hide Text");
        } 
        else {
            $("#btnShowText").text("Show Text");
        }
    }

    // function that changes the position of the textbox and button
    function updatePositions(canvasTop) {
        // set positions using parameter
        $("#numInput").css({
            top: canvasTop + 180
        });
        $("#convertBtn").css({
            top: canvasTop + 210
        });
    }

    // if button is pressed
    $("#btnShowText").click(function() {
        changeClass();

        // run every 0.2 of a second
        setInterval(function() {
            // call function passing in the position of the top of canvas as a parameter
            updatePositions(round($("canvas").offset().top));
        }, 200);

        // wait 5 seconds then run
        setTimeout(function() {
            changeButtonText();
        }, 5000);
    });
});