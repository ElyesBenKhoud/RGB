
//first of all i will select all the element 
// declare number of squares as a suggestions
var numSquares = 6;
var colors = [];
var pickedColor;
//select the element and the buttons
  //i tried with jquery and was confused and some of them didn't worked so i gone straight to use js specified
  //select the square 
var squares = document.querySelectorAll(".square");
//select the div with buttons
var colorDisplay = document.querySelector("#color-display");
var messageDisplay = document.querySelector("#message");
//select where i will run the function randomly to test the logic
var h1 = document.querySelector("h1");
//select button of new colors
var resetButton = document.querySelector("#reset");
// select the easy button
var modeButtons = document.querySelectorAll(".mode");
var easyButton = document.querySelector(".mode");

init();

//declare a class of function that will run to test the logic
//pick the color
//setup the squares
//setup the mode of game
//reset in the end..and repeat

function init() {
	colorDisplay.textContent = pickedColor;
	setupSquares();
	setupMode();
	reset();
}
 
//here i had issue to select the reset button then i used the addEvenListener so whenever the target is calling will do the job
resetButton.addEventListener("click", function() {
	reset();
});

//first of all i set up the squares
function setupSquares() {
	//loop through the squares
	for (var i = 0; i < squares.length; i++) {
		//select the background with same color of squares
		squares[i].style.backgroundColor = colors[i];
		//select the button of 1 square when it's click will run function to check
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			//to check if the clicked color is the same as the input color or no
			if(clickedColor === pickedColor) {
				//if true return correct
				messageDisplay.textContent = "Correct";
				//then ask to play again
				resetButton.textContent = "Play Again";
				changeColors(pickedColor);
			}
			//if not the same color then reset the color of background 
			else {
				this.style.backgroundColor = "#232323";
				//and display try again
				messageDisplay.textContent = "try again";
			}
		});
	}
}

function setupMode() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			for (var i = 0; i < modeButtons.length; i++) {
				modeButtons[i].classList.remove("selected");
			}
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numSquares = 3;
			}
			else {
				numSquares = 6;
			}
			reset();
		});
	}
}

function reset() {
	colors = genRandomColors(numSquares);
	pickedColor = chooseColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "#2C8E99";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]) { 
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
}

function changeColors(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
		h1.style.backgroundColor = color;
	}
}

function chooseColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function genRandomColors(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(makeColor());
	}
	return arr;
}

function makeColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}




