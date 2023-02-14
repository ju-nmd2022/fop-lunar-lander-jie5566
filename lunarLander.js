function setup() {
  createCanvas(width, height);
}

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

//draw the flame
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

//draw the smoke
function smoke(x, y) {
  push();
  translate(x, y);
  scale(1);

  fill(200);
  noStroke();

  ellipse(-50, 0, 60);
  ellipse(-100, 0, 100);
  ellipse(-150, 0, 140);

  ellipse(50, 0, 60);
  ellipse(100, 0, 100);
  ellipse(150, 0, 140);

  pop();
}

//draw the background
function scen() {
  fill(137, 148, 153);
  noStroke();
  rect(0, height - 100, width, 100);

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

//draw meteor

function meteor(meteorX, meteorY) {
  noStroke();
  fill(255);
  ellipse(meteorX, meteorY, 16);
  triangle(
    meteorX,
    meteorY + 8,
    meteorX,
    meteorY - 8,
    meteorX + 130,
    meteorY - 20
  );
}

// draw stars
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

//indictor

function indicators() {
  push();
  fill(0, 0, 0);
  textSize(18);
  text("Speed:", 20, 20);
  text("Coordinate:", 20, 40);
  text("Fuel:", 20, 60);
  pop();
}

let meteorX = 400;
meteorY = 150;

function draw() {
  background(211, 211, 211);

  smoke(width / 2, height - 100);
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

  indicators();

  meteor(meteorX, meteorY);
  meteorX -= 1;
  meteorY += 0.2;

  if (meteorX < 0) {
  }

  rocket(width / 2, height / 2);
  flame(width / 2, height / 2);
}
