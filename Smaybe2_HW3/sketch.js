let greenGirl;
let greenMan;
let yellowGirl;
let animation1; 
let animation2; 
let animation3;
let animation4;
let animation5;
let animation6;
let animation7;
let animation8;

function preload() {
    greenMan = loadImage("assets/GreenMan.png");
    greenGirl = loadImage("assets/GreenGirl.png");
    yellowGirl = loadImage("assets/YellowGirl.png");
  }

function setup() {
    createCanvas(800, 400);
    animation1 = new animation(greenMan, 80, 80, 0, 0);
    animation2 = new animation(greenGirl, 80, 80, 50, 100);
    animation3 = new animation(yellowGirl, 80, 80, 120, 200);
    animation4 = new animation(greenMan, 80, 80, 200, 70);
    animation5 = new animation(greenGirl, 80, 80, 0, 300);
    animation6 = new animation(yellowGirl, 80, 80, 300, 20);
    animation7 = new animation(greenMan, 80, 80, 180, 320);
    animation8 = new animation(greenGirl, 80, 80, 270, 250);
}

function draw() {
    background(220);
    animation1.draw();
    animation2.draw();
    animation3.draw();
    animation4.draw();
    animation5.draw();
    animation6.draw();
    animation7.draw();
    animation8.draw();
}

function keyPressed() {
    animation1.keyPressed();
    animation2.keyPressed();
    animation3.keyPressed();
    animation4.keyPressed();
    animation5.keyPressed();
    animation6.keyPressed();
    animation7.keyPressed();
    animation8.keyPressed();
}

function keyReleased() {
    animation1.keyReleased(); 
    animation2.keyReleased();
    animation3.keyReleased();
    animation4.keyReleased();
    animation5.keyReleased();
    animation6.keyReleased();
    animation7.keyReleased();
    animation8.keyReleased();
}

class animation {

    constructor(character, width, height, x, y) {
        this.character = character;
        this.width = width; 
        this.height = height; 
        this.x = x;
        this.y = y;
        this.picture = 0;
        this.firstpicture = 0;
        this.animationLength = 9;
        this.currentFrame = 0;
        this.moving = 0;
        this.Direction = 1;
    }

    draw() {
        if (this.moving != 0) {
            this.picture = this.currentFrame % this.animationLength;
        } else {
            this.picture = 0;
        }

        push();
        translate(this.x,this.y);
        scale(this.Direction,1);
        image(this.character,0,0,this.width,this.height,this.picture*this.width,this.firstpicture*this.height,this.width,this.height);
        pop();

        if(frameCount % 6 == 0) {
            this.currentFrame++; 
        }
        this.x += this.moving;
    }

    keyPressed() {
        if (keyCode == RIGHT_ARROW) {
            this.moving = 1;
            this.Direction = 1;
            this.currentFrame = 0;
        } else if (keyCode == LEFT_ARROW) {
            this.moving = -1;
            this.Direction = -1;
            this.currentFrame = 0;
        }
    }

    keyReleased() {
        if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
            this.moving = 0;
        }
    }
}