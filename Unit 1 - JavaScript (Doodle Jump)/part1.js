// Define variables for Player Control
let playerX = 180;
let playerY = 400;
let playerYVel = -12;
const playerYAcc = 0.5;

setup = () => {
  createCanvas(400, 600);
}

draw = () => {
  // player graphics and movement
  background(255);
  rect(playerX, playerY, 20, 20, 5);
  playerY = playerY + playerYVel;
  playerYVel = playerYVel + playerYAcc;
}
