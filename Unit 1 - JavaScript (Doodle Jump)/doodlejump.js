//variables
let playerX = 180;
let playerY = 400;
let playerYVel = -12;
let playerYAcc = 0.5;
let scroller = 600;
let score = 0;
let playerLive = true;
let backgroundScroll = 0;

//platform attributes
let platformXs = [80, 180, 280];
let platformYs = [500, 450, 500];
let platformXVels = [0, 0, 0];
let platformBoosts = [false, false, false];

//master variables controlling the types of platforms spawned
let platSpace = 40;
let movePlatChance = 20;
let moveVariance = 2;
let springChance = 70;

//setup
function setup () {
  noStroke();
  createCanvas(400, 600);

  //adding individualized platform attributes with increased difficulty
  for(let i = 0; i < 500; i = i + 1){
    platformXs.push(random(0,360));
    platformYs.push(550 - platSpace * i + random(-20,0));
    if(random(0,100) < movePlatChance){
      platformXVels.push(random(-moveVariance, moveVariance));
    }else{
      platformXVels.push(0);        
    }
    if(random(0,100) < springChance){
      platformBoosts.push(true);
    }else{
      platformBoosts.push(false);        
    }
    platSpace = min(40 + i/10, 150);
    springChance = max(20 - i/30, 5);
    movePlatChance = min(10 + i/30, 100);
    moveVariance = min(2+i/20, 5);
  }
}

//draw
function draw () {

  //player graphics and updating
  background(255);

//colors!
  fill(240,240,250);
  for(let i = -50; i < 600; i = i + 50){
      rect(0, i + backgroundScroll, 400, 3);
  }

  fill(255,0,0);
  rect(playerX, playerY, 20, 20, 5);
  if(playerY > 600){
    playerLive = false; 
  }
  if(playerLive){
    playerY = playerY + playerYVel;
    playerYVel = playerYVel + playerYAcc;
  }
  //platform graphics

  //user input
  if (keyIsPressed && keyCode === RIGHT_ARROW){
    playerX = playerX + 7;
  }
  if (keyIsPressed && keyCode === LEFT_ARROW){
    playerX = playerX - 7;
  }

//platform rendering, position updates, and collisions
  for(let i = 0; i < platformXs.length; i = i + 1){
//fancy graphics
    fill(100,200,100);
    if(platformXVels[i] != 0){
      fill(150,150,250);
    }
    if(platformYs[i] > -20 && platformYs[i] < 600){
      rect(platformXs[i], platformYs[i], 40, 6);
      ellipse(platformXs[i], platformYs[i]+3, 5, 5);
      ellipse(platformXs[i] + 40, platformYs[i]+3, 5, 5);    
      if(platformBoosts[i] == true){
        fill(100, 100, 100);
        rect(platformXs[i] + 10, platformYs[i] - 3, 20, 3);
      }
    }
    if(playerY + 20 > platformYs[i] && playerY < platformYs[i] + 5 && playerX + 20 > platformXs[i] && playerX < platformXs[i] + 40 && playerYVel > 0){
      playerY = platformYs[i] - 20;
      if(platformBoosts[i] == true){
        playerYVel = -22;          
      }else{
        playerYVel = -12; 
      }
      scroller = platformYs[i];
    }
    if(platformXs[i] < 0 || platformXs[i] + 40 > 400){
      platformXVels[i] = platformXVels[i]*-1
    }
    platformXs[i] = platformXs[i] + platformXVels[i];
  }
  if(scroller < 400){
    for(let i = 0; i < platformXs.length; i = i + 1){
      platformYs[i] = platformYs[i] + 2 * (4-playerY/100);
      scroller = platformYs[i] + 2 * (4-playerY/100);  
    }
     backgroundScroll = backgroundScroll + 2 * (4-playerY/100);  
    playerY = playerY + 2 * (4-playerY/100);
    score = score + 2 * (4-playerY/100);
  }
  if(backgroundScroll > 50){
    backgroundScroll = 0;
  }
  if(playerLive == false){
    fill(255, 255, 255, 150);
    rect(0, 0, 400, 600); 
    fill(0, 0, 0);
    textSize(50);
    text("You are \n    die", 110, 300);
  }else{
    fill(0,0,0);
    textSize(20);
    text("Score: " + round(score), 20, 30);
  }
}
