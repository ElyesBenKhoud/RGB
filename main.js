

// run a random number between 0 and 256 for each Red/Green/Blue
function makeColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}
//run a generator to random a color and push it to an array to assign it to a colors of number of squares in the reset function
function genRandomColors(num) {
	var arr = [];
        //loop through the array and push a random color from the function makecolor
	for (var i = 0; i < num; i++) {
		arr.push(makeColor());
	}
	return arr;
}
// I selected the 6 squares and i declared empty array for colors so i can add and run randomly later
var numSquares = 6;
var colors = [];
var pickedColor;
//select the element and the buttons
  //i tried with jquery and was confused and most of them didn't worked so i gone straight to use js specified
  //and i put them as variable so i can call it later easily
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

//run a function to change the color looping through the squares and set to it a specify background color
function changeColors(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
		h1.style.backgroundColor = color;
	}
}

// a random function to pick a random color
function chooseColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}
// a class function that will run to test the logic after i invoke the functions 
//4 steps
//pick the color
//setup the squares to give a right chance
//setup the mode of game to match 1 of the right answer in 1 square
//reset in the end..and repeat
init();
function init() {
	colorDisplay.textContent = pickedColor;
	setupSquares();
	setupMode();
	reset();
}
 //here i had issue to select the reset button then i used the addEvenListener so whenever the target is calledwill do the job
//so i selected it directly with the variable resetButton that i declare it already
resetButton.addEventListener("click", function() {
	reset();
});
// $('#reset').click(function(){
// 	reset() ;
// })


//first of all i set up the squares with colors and check if the color picked is the same as the clicked
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
				this.style.backgroundColor = "#bd2222";
				//and display try again
				messageDisplay.textContent = "try again";
			}
		});
	}
}
// set up 3 squares for the hard mode and by default 6 squares of the easy mode
function setupMode() {
    //loop through the buttons
	for(var i = 0; i < modeButtons.length; i++) {
        //select the button and run function on click
		modeButtons[i].addEventListener("click", function() {
                //loop through the buttons again
			for (var i = 0; i < modeButtons.length; i++) {

				modeButtons[i].classList.remove("selected");
			}
            //if the context of button is easy then show 3 squares
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numSquares = 3;
			}
            //if the context of the button is hard then show 6 squares
			else {
				numSquares = 6;
			}
            //run the function reset 
			reset();
		});
	}
}


function reset(){
	// assign the squares to the colors and the pickedcolor to the choosen one 
	colors=genRandomColors(numSquares);
	pickedColor=chooseColor();
	//display the RGB(Random n) using chooseColor f
	colorDisplay.textContent=pickedColor ;
	//reset the background color of the h1 so whenever i press play again so it will reset to the grey color
	h1.style.backgroundColor = "#000000";
	resetButton.textContent = "New Colors";
	 // display an empty string between the newcolors && easy/hard
	 messageDisplay.textContent = "";
	 //loop through the squares
	 for (var i = 0; i < squares.length; i++) {
		 if(colors[i]) { 
			 //assign a block to the squares and set the colors background the same as the colors variable
			 squares[i].style.display = "block";
			 squares[i].style.backgroundColor = colors[i];
		 }
		 // otherwise assign none for the squares selected
		 else {
			 squares[i].style.display = "none";
		 }
	 }

}
