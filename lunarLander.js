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

//indictor

function indicators() {
  push();
  fill(0, 0, 0);
  textSize(16);
  text("SPEED: " + Math.floor(speed * 10) + "km/h", 10, 20);
  text("FUEL: " + fuel, 10, 50);
  pop();
}

//----------------Game screens function---------------

function startScreen() {}
function gameScreen() {}
function endScreen() {}

//--------------set variables----------------

let y = height / 4;
let speed = 0.5;
let acceleration = 0.1;
let isGameActive = true;
let fuel = 200;

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

  //------------screens--------------
  // if(state==="start"){
  //   startScreen();
  // }else if(state==="game"){
  //   gameScreen();
  // }else if(state==="end"){
  //   endScreen();
  // }

  for (let meteor of meteors) {
    meteorMove(meteor.x, meteor.y);
    meteor.x -= 1;
    meteor.y += 0.2;

    if (meteor.x < -100) {
      meteor.x = meteor.startX;
      meteor.y = meteor.startY;
    }
  }

  //rocket mechanics

  rocket(width / 2, y);
  y = y + speed;
  speed = speed + acceleration;

  if (keyIsDown(38)) {
    //by pressing the up key, y is changed
    y = y - speed * 1.2;
    fuel = fuel - 3;
    speed = speed - 0.5;
    //flame only shows when pree the up key
    flame(width / 2, y);
  }

  if (isGameActive) {
    if (y > height - 200) {
      smoke(width / 2, height - 100);
    }

    if (y > height - 150) {
      x = width / 2;
      y = height - 150;
    }
  }
  ground();
  indicators();
}
