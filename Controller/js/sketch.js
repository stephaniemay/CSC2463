let ladybug;
let animations = [];
let musictime = "5n";
let sound = new Tone.Player("assets/gameover.wav");
let port;
let writer, reader; 
let sensorData = {};
const decoder = new TextDecoder();
let x, y, state;
let hcircle, wcircle;


const synth = new Tone.Synth().toDestination();
synth.volume.value = -6;
const notes =  ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]];
const synthPart = new Tone.Sequence(
  function(time, note) {
    synth.triggerAttackRelease(note, "10hz", time);
  },
  notes, musictime);

const plucky = new Tone.PluckSynth().toDestination();


const gameState = {
    Start: "Start", 
    Playing: "Playing",
    GameOver: "GameOver"
};

let game = {score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 30, state: gameState.Start};

function preload() {
    ladybug = loadImage("assets/LadyBug.png");
  }

function setup() {
    sound.toDestination();
    createCanvas(800, 400);
    angleMode(DEGREES);

    if ("serial" in navigator) {
        let button = createButton("connect");
        button.position(0,0);
        button.mousePressed(connect);
      }
    reset();
}
async function connect() {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
  
    writer = port.writable.getWriter();
  
    reader = port.readable
      .pipeThrough(new TextDecoderStream())
      .pipeThrough( new TransformStream(new LineBreakTransformer()))
      .getReader();
  }

function reset() {
    synthPart.playbackRate = 1;
    game.elapsedTime = 0; 
    game.score = 0;
    animations = []; 
    for (let i=0; i< game.totalSprites; i++) {
        animations[i] = new Animation(ladybug, 64, 55, random(100, 600), random(100, 300), random(1,5), random([0,1]));
    }
}

function draw() {
    hit();
    if (reader) {
        serialRead();
    }
    state = sensorData.Switch;
    x = sensorData.Xaxis;
    y = sensorData.Yaxis;
    switch(game.state) {
        case gameState.Playing: 
          Tone.Transport.start();
            background(220);
            for(let i = 0; i < animations.length; i++) {
                animations[i].draw();
            }
            textSize(30);
            text(game.score, 100 , 30);

            hcircle = map(y, 0, 255, 0, height);
            wcircle = map(x, 0, 255, 0, width);

            fill(200,255,100);
            circle(wcircle, hcircle, 20);

            let currentTime = game.maxTime - game.elapsedTime;
            text(ceil(currentTime), 700, 30);
            game.elapsedTime += deltaTime / 1000; 
            if (currentTime < 0) {
              game.state = gameState.GameOver;
              sound.start();
              Tone.Transport.stop();
              
            }
            break;

        case gameState.GameOver: 
            game.maxScore = max(game.score, game.maxScore);
            background(220);
            fill(0); 
            textSize(40);
            textAlign(CENTER);
            text("Game Over!", 400, 200); 
            textSize(30);
            text("Score: " + game.score, 400, 250); 
            text("Max Score: " + game.maxScore, 400, 300);
            textSize(20);
            text("Press any key to start new game!", 400, 350);
            break;
        case gameState.Start: 
            background(220); 
            fill(0); 
            textSize(50); 
            textAlign(CENTER);
            text("Bug Squish Game!", 400, 200);
            textSize(30);
            text("Press any key to Start!", 400, 300);
        break;
}    

}
async function serialRead() {
    while(true) {
      const { value, done } = await reader.read();
      if (done) {
        reader.releaseLock();
        break; 
      }
      console.log(value);
      sensorData = JSON.parse(value);
    }
  }  

async function hit() {
    if(state == 0) {
        hit2();
    }
}

function hit2() {
    plucky.triggerAttack("D6");
    switch(game.state) {
        case gameState.Playing: 
            for( let i=0; i < animations.length; i++) {
                let contains = animations[i].contains(wcircle, hcircle); 
                if (contains) {
                    if(animations[i].moving != 0){
                        animations[i].stop();
                        game.score += 1;
                        console.log("hit")
                        synth.triggerAttack("D5");
                        synthPart.playbackRate += .1;
                    } else {
                        if (animations[i].Direction === 1) {
                            animations[i].moveRight();
                        } else {
                            animations[i].moveLeft();
                        }
                    }
                } 
            }
        break; 
    }
}

function keyPressed() { 
    switch(game.state) {
        case gameState.Start: 
            game.state = gameState.Playing;
            synthPart.start();
            Tone.Transport.start();
        break; 
        case gameState.GameOver: 
            reset(); 
            game.state = gameState.Playing;
        break;
    }
}

class Animation {

    constructor(character, width, height, x, y, speed, vertical = false) {
        this.character = character;
        this.width = width; 
        this.height = height; 
        this.x = x;
        this.y = y;
        this.picture = 0;
        this.firstpicture = 0;
        this.animationLength = 5;
        this.currentFrame = 0;
        this.moving = 1;
        this.Direction = 1;
        this.speed = speed;
        this.vertical = vertical;
    }

    draw() {
        if (this.moving != 0) {
            this.picture = this.currentFrame % this.animationLength;
        } else {
            this.picture = this.picture;
        }
        push();
        translate(this.x,this.y);
        if (this.vertical) {
            rotate(90);
        }
        scale(this.Direction,1);
        image(this.character,0,0,this.width,this.height,this.picture*this.width,this.firstpicture*this.height,this.width,this.height);
        pop();
        if(frameCount % 6 == 0) {
            this.currentFrame++; 
        }
        if(this.vertical) {
            this.y += this.moving*this.speed;
            this.move(this.y, 0, 375);
        } else {
            this.x += this.moving*this.speed;
            this.move(this.x, 0, 775);
        }
    }

    move(position, lowerBounds, upperBounds) { 
        if (position > upperBounds) { 
            this.moveLeft();
        } else if (position < lowerBounds) {
            this.moveRight();

        }
    }

    moveRight() {
        this.moving = 1;
        this.Direction = 1;
    }

    moveLeft() {
        this.moving = -1;
        this.Direction = -1;
    }

    contains(x,y) {
        let insideX = x >= this.x - 30 && x <= this.x + 30;
        let insideY = y >= this.y - 30 && y <= this.y + 30;
        return insideX && insideY;
    }

    stop() { 
        this.moving = 0;
        this.picture = 5; 
        this.firstpicture = 0;
    }
}

class LineBreakTransformer {
    constructor() {
      // A container for holding stream data until a new line.
      this.chunks = "";
    }
  
    transform(chunk, controller) {
      // Append new chunks to existing chunks.
      this.chunks += chunk;
      // For each line breaks in chunks, send the parsed lines out.
      const lines = this.chunks.split("\n");
      this.chunks = lines.pop();
      lines.forEach((line) => controller.enqueue(line));
    }
  
    flush(controller) {
      // When the stream is closed, flush any remaining chunks out.
      controller.enqueue(this.chunks);
    }
  }
  