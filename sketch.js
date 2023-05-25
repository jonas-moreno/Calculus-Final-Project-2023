// Variable declarations and initialization
const xv = 10,    // Scaling factor for the x-axis
      yv = 10;    // Scaling factor for the y-axis

var xCord1;
var yCord1;
var xCord2;
var yCord2;
var xCord3;
var yCord3;

var score = 0;

hasWon = false;

//((w - canvasSize)/ 2)

var guessed = false;
var firstPointGuessed = false;
var secondPointGuessed = false;
var thirdPointGuessed = false;
var difficulty = 3;

// Function setup: Executed once at the beginning
function setup() {
  createCanvas(401, 401);   // Creates a canvas of size 401x401 pixels
  createSpan("x(t) = ");     // Creates a span element with the text "x(t) ="
  let int = createInput("7*cos(t)");    // Creates an input field with initial value "7*cos(t)"
  int.elt.id = "xOfT";      // Sets the ID of the input field to "xOfT"
  int.size(80);
  createSpan("  y(t) = ");     // Creates a span element with the text "y(t) ="
  let a = createInput("7*sin(t)");      // Creates an input field with initial value "7*sin(t)"
  a.elt.id = "yOfT";        // Sets the ID of the input field to "yOfT"
  a.size(80);
  createSpan("  difficulty (1-3): ")
  let diff = createInput("3");
  diff.elt.id = "diff1";
  diff.size(60);
  makeTwoPoints();

}

// Function draw: Executed continuously in a loop
function draw() {
  background(255);          // Clears the background with white color
  noFill();                 // Disables filling shapes
  stroke(157, 161, 166);    // Sets the stroke color to a light gray
  resetScore();
  graphAxis();              // Calls the graphAxis() function to draw the graph axes
  equation(select("#xOfT").value(), select("#yOfT").value());    // Calls the equation() function with values from the input fields to plot the curve
  if(guessed)
  {
    //makeTwoPoints();
    guessed = false;
    score += 1;
  }
  drawPoints();
  if (score == difficulty) {
    hasWon = true;
    textSize(40); 
    fill(0,0,255);
    text("Congrats!",20,150);
    text("You Win!",20,200);
    textSize(20);
    text("Press Control R to restart and play again",20,250);
  }
  try {
    difficulty = eval(select("#diff1").value());
  }
  catch (e)
  { }
}


// Function graphAxis: Draws the graph axes and grid lines
function graphAxis() {
  strokeWeight(1);
  line(width / 2, 0, width / 2, height);   // Draws a vertical line at the center of the canvas
  line(0, height / 2, width, height / 2);  // Draws a horizontal line at the center of the canvas

  var x = Math.floor(width / xv);         // Calculates the number of vertical grid lines based on canvas width and xv
  var y = Math.floor(height / yv);        // Calculates the number of horizontal grid lines based on canvas height and yv

  // Draws vertical grid lines
  for (var i = 0; i < x; i++) {
    line(i * xv, 0, i * xv, height);
  }

  // Draws horizontal grid lines
  for (var j = 0; j < x; j++) {
    line(0, j * yv, width, j * yv);
  }

  rect(0, 0, width - 1, height - 1);      // Draws a rectangle around the canvas
}

// Function equation: Plots the curve based on the given equations
function equation(str1, str2) {
  push();                   // Saves the current transformation settings
  stroke(114, 31, 173);     // Sets the stroke color to a purple shade
  strokeWeight(3);          // Sets the stroke weight to 3 (thickens the curve)
  translate(width / 2, height / 2);    // Translates the origin to the center of the canvas
  let w = width / xv / 2;   // Calculates the range of x values based on canvas width and xv

  beginShape();   // Begins drawing the curve
  try {
  // Iterates through the range of x values
  for (let i = -w; i < w; i += 0.01) {
      let x = eval(str1.replaceAll("t", i));    // Evaluates the x equation for the current value of t
      let y = eval(str2.replaceAll("t", i));    // Evaluates the y equation for the current value of t
      curveVertex(x * xv, -y * yv);             // Adds a curve vertex to the curve shape
      
      if ((x >= xCord1-0.1) && (x <= xCord1+0.1) && (y >= yCord1-0.1) && (y <= yCord1+0.1)) {
        if (firstPointGuessed == false) {
          firstPointGuessed = true;
          evalScore();
        }
      }
      else if ((x >= xCord2-0.1) && (x <= xCord2+0.1) && (y >= yCord2-0.1) && (y <= yCord2+0.1)) {
        if (secondPointGuessed == false) {
          secondPointGuessed = true;
          evalScore();
        }
      }
      else if ((x >= xCord3-0.1) && (x <= xCord3+0.1) && (y >= yCord3-0.1) && (y <= yCord3+0.1)) {
        if (thirdPointGuessed == false) {
          thirdPointGuessed = true;
          evalScore();
        }
      }
      else {
        evalScore();
      }
    }
  }
  catch (e) {
  }

  endShape();   // Ends drawing the curve
  pop();        // Restores the previous transformation settings
}

function makeTwoPoints() {
  var maxVal = 18;

  // Generate random coordinates for the first point
  xCord1 = Math.floor(Math.random() * maxVal) * Math.pow(-1,Math.floor(Math.random() * 2));
  yCord1 = Math.floor(Math.random() * maxVal) * Math.pow(-1,Math.floor(Math.random() * 2));

  // Generate random coordinates for the second point
  xCord2 = Math.floor(Math.random() * maxVal) * Math.pow(-1,Math.floor(Math.random() * 2));
  yCord2 = Math.floor(Math.random() * maxVal) * Math.pow(-1,Math.floor(Math.random() * 2));

  xCord3 = Math.floor(Math.random() * maxVal) * Math.pow(-1,Math.floor(Math.random() * 2));
  yCord3 = Math.floor(Math.random() * maxVal) * Math.pow(-1,Math.floor(Math.random() * 2));

  // Display the coordinates of the points
  pointsSpan = createSpan("<p>  Points are (" + xCord1 + ", " + yCord1 + ") and (" + xCord2 + ", " + yCord2 + ") and (" + xCord3 + "," + yCord3 + ")</p>");
  //pointsSpan.position(300,1685);

}

function drawPoints()
{
  noStroke(); //gets rid of outline
  fill(0,0,0); // sets fill color to black
  ellipse(200 + (xCord1 * xv), 200 + (-yCord1 * yv), 5, 5); //draws ellipse
  ellipse((width/2) + (xCord2 * xv), 200 + (-yCord2 * yv), 5, 5); //draws ellipse
  ellipse(200 + (xCord3 * xv), 200 + (-yCord3 * yv), 5, 5);
  noFill();
}


function resetScore() {
  var firstPointGuessed = false;
  var secondPointGuessed = false;
  var thirdPointGuessed = false;
  evalScore();
}

function evalScore() {
  var cScore = 0;
  if (firstPointGuessed == true) {
    cScore+=1;
  }
  if (secondPointGuessed == true) {
    cScore+=1;
  }
  if (thirdPointGuessed == true) {
    cScore+=1;
  }
  score = cScore;
}
