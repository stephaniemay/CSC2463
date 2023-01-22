function setup() {
  //added a 255 to the color mode to be able to edit transparancy
  createCanvas(400, 400);
  noStroke();
  colorMode(HSB, 255)
}

function draw() {
  background(255);

  //Making the salmon colored circle
  push();
  fill(260, 160, 250, 120);
  ellipse(150, 100, 150, 150);
  pop();

  //Making the purple colored circle
  push();
  fill(180, 180, 320, 120);
  ellipse(101, 170, 150, 150);
  pop();

  //Making the green colored circle
  push();
  fill(100, 180, 320, 120);
  ellipse(210, 170, 150, 150);
  pop();
}