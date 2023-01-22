function setup() {
  //added no stroke to combine an Arc and a Rectagle seemlessly
  createCanvas(380, 180);
  noStroke();
  colorMode(HSB)
}

function draw() {
  background(0);

  //Making the yellow circle
  push(); 
  fill(60, 100, 100);
  ellipse(100,90,135,135);
  pop();

  //Adding a triangle that matches the background to make the mouth of a PacMan
  push(); 
  fill(0);
  triangle(105,90, 25,20, 25, 170);
  pop();

  //Making the PacMan character with an Arc and a Rectangle
  push();
  fill(0, 80, 90);
  arc(275, 90, 150, 150, PI, TWO_PI);
  rect(200, 90, 150, 75);
  pop();

  //Making the white outline for the Eyes
  ellipse(235, 85, 50, 50);
  ellipse(315, 85, 50, 50);

  //Making the blue color of the Eyes
  push();
  fill(240, 100, 100);
  ellipse(235, 85, 30, 30);
  ellipse(315, 85, 30, 30);
  pop();
}