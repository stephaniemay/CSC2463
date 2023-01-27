function setup() {
  createCanvas(800, 500);
  background(240, 240, 240);
  red = 0;
  green = 0;
  blue = 0;
}

function draw() {
  strokeWeight(1)
  stroke(255,255,255)
  noFill()

  fill(255, 0, 0) //Red
  square(2, 5, 40)
  
  fill(255, 125, 0) //Orange
  square(2, 45, 40)

  fill(255, 255, 0) //Yellow
  square(2, 85, 40)
  
  fill(0, 255, 0) //Green
  square(2, 125, 40)

  fill(0, 255, 255) //Cyan
  square(2, 165, 40)

  fill(0, 0, 255) //Blue
  square(2, 205, 40)

  fill(255, 0, 255) //Magenta
  square(2, 245, 40)

  fill(150, 75, 0) //Brown
  square(2, 285, 40)

  fill(255, 255, 255) //White
  square(2, 325, 40)

  fill(0, 0, 0) //Black
  square(2, 365, 40)

}
function mouseDragged() {
  strokeWeight(5)
  stroke(red, green, blue); //Changing the color if a different color has been pressed
  if (mouseX >= 42) {
    line(mouseX, mouseY, pmouseX, pmouseY); //drawing the lines
  }
}

function mousePressed() {
   if (mouseX <= 40 & mouseY <= 45 ) { //Red
    red = 255;
    green = 0;
    blue = 0;
  } else if (mouseX <= 40 && mouseY > 45 && mouseY < 85) { //Orange
    red = 255;
    green = 125;
    blue = 0;
  } else if (mouseX <= 40 && mouseY > 85 && mouseY < 125) { //Yellow
    red = 255;
    green = 255;
    blue = 0;
  } else if (mouseX <= 40 && mouseY > 125 && mouseY < 165) { //Green
    red = 0;
    green = 255;
    blue = 0;
  } else if (mouseX <= 40 && mouseY > 165 && mouseY < 205) { //Cyan
    red = 0;
    green = 255;
    blue = 255;
  } else if (mouseX <= 40 && mouseY > 205 && mouseY < 245) { //Blue
    red = 0;
    green = 0;
    blue = 255;
  } else if (mouseX <= 40 && mouseY > 245 && mouseY < 285) { //Magenta
    red = 255;
    green = 0;
    blue = 255;
  } else if (mouseX <= 40 && mouseY > 285 && mouseY < 325) { //Brown
    red = 150;
    green = 75;
    blue = 0;
  } else if (mouseX <= 40 && mouseY > 325 && mouseY < 365) { //White
    red = 255;
    green = 255;
    blue = 255;
  } else if (mouseX <= 40 && mouseY > 365 && mouseY < 405) { //Black
    red = 0;
    green = 0;
    blue = 0;
  }
}