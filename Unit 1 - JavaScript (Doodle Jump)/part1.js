// Define variables
let playerX = 180;
let playerY = 400;
let playerYVel = -12;
const playerYAcc = 0.5;

let platformXs = [150, 300];
let platformYs = [300, 300];
let platSpace = 20;
let groundLevel = 600;
const scrollSpeed = 2;

setup = () => {
  noStroke();
  createCanvas(400, 550);
  for (let i = 0; i < 500; i = i + 1){
    platformXs.push(random(0,360));
    platformYs.push(550 - platSpace * i + random(-20,0));
  }
}

draw = () => {
  // player graphics and movement
  background(255);
  fill(255,0,0);
  rect(playerX, playerY, 20, 20, 5);
  playerY = playerY + playerYVel;
  playerYVel = playerYVel + playerYAcc;
  if (playerX > 380) {
    playerX = 0;
  }
  if (playerX < 0) {
    playerX = 380;
  }
  
  // input
  if (keyIsPressed && keyCode === RIGHT_ARROW) {
    playerX = playerX + 5;
  }
  if (keyIsPressed && keyCode === LEFT_ARROW) {
    playerX = playerX - 5;
  }
  
  // platform rendering and collisions
  for (let i = 0; i < platformXs.length; i = i++) {
    fill(100, 200, 100);
    rect(platformXs[i], platformYs[i], 40, 6);
    ellipse(platformXs[i], platformYs[i] + 3, 5, 5);
    ellipse(platformXs[i] + 40, platformYs[i] + 3, 5, 5);

    if (rectCollide(platformXs[i] - 2, platformYs[i], 44, 5, playerX, playerY + 15, 20, 15) && playerYVel > 0) {
      playerY = platformYs[i] - 20;
      playerYVel = -12;
      groundLevel = playerY;
    }
  }
  
  // scrolling
  if (groundLevel < 300) {
    playerY = playerY + scrollSpeed * (3 - playerY / 100);
    for (let i = 0; i < platformXs.length; i = i++) {
      groundLevel = platformYs[i] + scrollSpeed * (3 - playerY / 100);   
      platformYs[i] = platformYs[i] + scrollSpeed * (3 - playerY / 100);
    }
  }
}

const rectCollide = (x1, y1, w1, h1, x2, y2, w2, h2) => {
  if (x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2){
    return true;
  }
  return false;
}
