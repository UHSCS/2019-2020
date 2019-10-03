
//variables
{
let playerX = 180;
let playerY = 400;
let playerYVel = -12;
let playerYAcc = 0.5;
}

//setup
function setup() {
  createCanvas(400, 600);
}

function draw() {
  //player graphics and updating
  {
  background(255);
  rect(playerX, playerY, 20, 20, 5);
  playerY = playerY + playerYVel;
  playerYVel = playerYVel + playerYAcc;
  } 
}
