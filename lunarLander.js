//add sound effect to the game, learn from https://www.youtube.com/watch?v=40Me1-yAtTc&t=383s
// let boostSound;
// let crashSound;
// let cheerSound;

// function preload() {
//   boostSound = loadSound("sound/boost.wav");
//   crashSound = loadSound("sound/crash.wav");
//   cheerSound = loadSound("sound/cheer.wav");
// }

//draw the rocket
function rocket(x, y) {
  push();
  translate(x, y);
  scale(0.5);

  fill(105, 105, 105);
  noStroke();
  triangle(0, -100, -23, -25, 23, -25);
  ellipse(0, 0, 50, 120);
  rect(-20, 30, 40);
  quad(-20, 70, -10, 100, 10, 100, 20, 70);
  quad(-20, 50, -40, 70, -50, 120, -35, 120);
  quad(20, 50, 40, 70, 50, 120, 35, 120);

  stroke(0, 0, 0);
  strokeWeight(3);
  line(-15, -50, 15, -50);
  line(-22, -24, 22, -24);
  ellipse(0, 0, 25);
  ellipse(0, 0, 20);
  line(-18, 40, 18, 40);
  line(-18, 45, 18, 45);
  line(-18, 70, 18, 70);

  pop();
}

//draw the flame, it will show if you press the up key.
function flame(x, y) {
  push();
  translate(x, y);
  scale(0.5);

  noStroke();
  beginShape();
  vertex(-10, 100);
  bezierVertex(-50, 120, -10, 180, -10, 220);
  vertex(10, 100);
  bezierVertex(50, 120, 10, 180, 10, 220);
  endShape();
  pop();
}

//draw the smoke, only show if the rocket is close to the ground
function smoke(x, y) {
  push();
  translate(x, y);
  scale(1);

  fill(180);
  noStroke();

  ellipse(-50, 0, 60);
  ellipse(-100, 0, 100);
  ellipse(-150, 0, 140);

  ellipse(50, 0, 60);
  ellipse(100, 0, 100);
  ellipse(150, 0, 140);

  pop();
}

//draw the ground, it doesn't change
function ground() {
  fill(137, 148, 153);
  noStroke();
  rect(0, height - 100, width, 100);
}

//draw the galaxy background, it doesn't change
function scen() {
  fill(137, 148, 153);
  noStroke();

  push();
  rotate(0.2);
  ellipse(300, 150, 80);

  push();
  noFill();
  stroke(137, 148, 153);
  ellipse(300, 160, 150, 20);
  ellipse(300, 160, 200, 20);
  pop();
  pop();

  ellipse(600, 100, 60);
  ellipse(600, 100, 120, 10);
  ellipse(500, 150, 30);
  ellipse(150, 300, 20);

  push();
  stroke(137, 148, 153);
  line(420, 220, 450, 250);
  line(450, 250, 470, 230);
  line(470, 230, 500, 280);
  line(500, 280, 560, 260);

  ellipse(420, 220, 5);
  ellipse(450, 250, 5);
  ellipse(470, 230, 5);
  ellipse(500, 280, 5);
  ellipse(560, 260, 5);
  pop();
}
// draw stars, it doesn't change
function star(x, y) {
  push();
  translate(x, y);
  stroke(137, 148, 153);
  line(-15, 0, 15, 0);
  line(0, -25, 0, 25);
  line(10, -10, -10, 10);
  line(-10, -10, 10, 10);
  pop();
}

//draw meteor
//in each meteor, the x, y position changed as it is defined in the draw function.
//startX, startY is the star point, when meteor outside of the screen, it will come to the start point.
//it is an object in a array with 4 parameters

let meteors = [
  { x: 500, y: 150, startX: 500, startY: 150 },
  { x: 400, y: 250, startX: 400, startY: 250 },
  { x: 800, y: 300, startX: 800, startY: 300 },
];

function meteorMove(x, y) {
  noStroke();
  fill(230);
  ellipse(x, y, 12);
  triangle(x, y + 6, x, y - 6, x + 100, y - 20);
}

//crash to pieces
// let crashPieces = [];
// function crash(){

// }

//indictor

function indicators() {
  push();
  fill(80);
  textSize(16);
  text("SPEED: " + Math.floor(speed * 10) + "km/h", 10, 20);
  text("FUEL: " + fuel, 10, 50);
  pop();
}

//--------------set variables----------------

let y = height / 4;
let speed = 0.5;
let acceleration = 0.1;
let fuel = 150;
let gameState = "start";

//-------------draw function------------------
function draw() {
  background(211, 211, 211);

  scen();
  star(400, 100);
  star(300, 300);
  star(700, 150);
  star(620, 300);
  push();
  scale(0.6);
  star(820, 350);
  scale(0.8);
  star(560, 150);
  pop();

  for (let meteor of meteors) {
    meteorMove(meteor.x, meteor.y);
    meteor.x -= 1;
    meteor.y += 0.2;

    if (meteor.x < -100) {
      meteor.x = meteor.startX;
      meteor.y = meteor.startY;
    }
  }

  //------------screens--------------
  if (gameState === "start") {
    startScreen();
  } else if (gameState === "play") {
    indicators();
    playScreen();

    if (y > height - 160 && fuel > 0 && speed * 10 > 0 && speed * 10 <= 20) {
      gameState = "win";
      y = height / 4;
      fuel = 150;
      speed = 0.5;
    } else if (
      y > height - 160 &&
      (fuel < 0 || speed * 10 < 0 || speed * 10 > 20)
    ) {
      gameState = "lose";
      y = height / 4;
      fuel = 150;
      speed = 0.5;
    }
  } else if (gameState === "lose") {
    loseGame();
    // crashSound.play();
  } else if (gameState === "win") {
    winGame();
    // cheerSound.play();
  }

  //draw ground in the end to cover the smoke
  ground();
}

function keyPressed() {
  if (keyCode === 13 && gameState === "start") {
    gameState = "play";
  } else if (keyCode === 13 && gameState === "lose") {
    gameState = "play";
  } else if (keyCode === 13 && gameState === "win") {
    gameState = "play";
  }
}
//----------------Game screens ---------------

function startScreen() {
  push();
  translate(0, 0);
  fill(80);
  textSize(22);
  textAlign(CENTER);
  push();
  textSize(35);
  textStyle(BOLD);
  text("Lunar Lander", width / 2, height / 2 - 90);
  pop();
  text(
    "You need to land the rocket in the speed between 0-20 km/h,",
    width / 2,
    height / 2 - 30
  );
  text("before the fuel is finished.", width / 2, height / 2);
  push();
  textStyle(BOLD);
  text("Press enter to star playing", width / 2, height / 2 + 40);
  pop();
  pop();
}

function playScreen() {
  //rocket mechanics
  rocket(width / 2, y);
  y = y + speed;
  speed = speed + acceleration;

  if (keyIsDown(38)) {
    //by pressing the up key, y is changed
    y = y - speed * 1.2;
    fuel = fuel - 3;
    speed = speed - 0.4;
    //flame only shows when press the up key
    flame(width / 2, y);
  }

  if (y > height - 200 && y < height - 150) {
    smoke(width / 2, height - 100);
  }

  if (y > height - 150) {
    x = width / 2;
    y = height - 150;
  }
  // boostSound.play();
}

function loseGame() {
  push();
  translate(0, 0);
  fill(80);
  textSize(22);
  textAlign(CENTER);
  text("Sorry, you lose the game", width / 2, height / 2 - 30);
  text("Press enter to play again", width / 2, height / 2);
  pop();
}

function winGame() {
  push();
  translate(0, 0);
  fill(80);
  textSize(22);
  textFont();
  textAlign(CENTER);
  text("Congratulation, you win the game", width / 2, height / 2 - 30);
  text("Press enter to play again", width / 2, height / 2);
  pop();
  rocket(width / 2, height - 150);
}
//------------------fireworks--------------------
