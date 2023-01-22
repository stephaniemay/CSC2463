function setup() {
  createCanvas(200, 200);
  colorMode(HSB)
}

function draw() {
  //Setting the background to blue
  background(250, 120, 60);

  //Making the green circle with the white outline
  push();
  stroke(255);
  strokeWeight(3);
  fill(120, 100, 50);
  ellipse(100, 100, 100, 100);
  pop();

  //Making the red star with the white outline
  push();
  stroke(255);
  strokeWeight(3);
  fill(0, 100, 100);
  beginShape();
  vertex(148,85)
  vertex(113,85)
  vertex(100,50)
  vertex(87,85)
  vertex(52,85)
  vertex(80,105)
  vertex(70,140)
  vertex(100,118)
  vertex(130,140)
  vertex(120,105)
  endShape(CLOSE);
  pop();
}
