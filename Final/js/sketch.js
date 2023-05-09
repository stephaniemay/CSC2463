let xBall = 400;
let yBall = 400;
let xSpeed = 3;
let ySpeed = 3;
let player2 = 0;
let player1 = 0;
let p1place = 350; 
let p2place = 350;
let ballSound = new Tone.Player("assets/Ball_hit.wav");
let musictime = "5n";
let port;
let writer, reader; 
let sensorData = {};
const encoder = new TextEncoder();
const decoder = new TextDecoder();
let p1Left, p1Right, p2Left, p2Right;
let state;

const gameState = {
  Start: "Start", 
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = {score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, state: gameState.Start};

const synth = new Tone.Synth().toDestination();
synth.volume.value = -6;
const notes =  ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]];
const synthPart = new Tone.Sequence(
  function(time, note) {
    synth.triggerAttackRelease(note, "10hz", time);
  },
  notes, musictime);


function preload() {
  table = loadImage("assets/table.png");
  paddles = loadImage("assets/Paddles.png");
}

function setup() {
  ballSound.toDestination();
  createCanvas(800, 800);
  noLoop();

  if ("serial" in navigator) {
    let button = createButton("connect");
    button.position(0,0);
    button.mousePressed(connect);
  }
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

function draw() {
  moving()
  serialRead();
  p1Left = sensorData.player1Left;
  p1Right = sensorData.player1Right;
  p2Left = sensorData.player2Left;
  p2Right = sensorData.player2Right;
  switch(game.state) {
    case gameState.Start:
      background(65, 105, 225); 
      image(paddles, 120, 300, 200, 200);
      image(paddles, 480, 300, 200, 200);
      fill(255); 
      textSize(40); 
      textAlign(CENTER);
      text("Welcome to the Ping Pong Tournament!", 400, 200);
      textSize(20);
      text("Press On Screen to Start!", 400, 600);
    break;


    case gameState.Playing:
      synthPart.start();
      Tone.Transport.start();
      //keyPressed();
      background(255);
      image(table, 0, 25, 800, 800);
      xBall = xBall + xSpeed;
      yBall = yBall + ySpeed;
      fill('white');
      circle(xBall, yBall+30, 30);
      fill('red');
      rect(p2place, 780, 100, 10);
      fill('blue');
      rect(p1place,35,100,10);
      bounce();
      paddle1();
      paddle2();
      textSize(20);
      text("Player1:" + player1,200,20);
      fill('red');
      text("Player2:" + player2,600,20);
      let currentTime = game.maxTime - game.elapsedTime;
      text(ceil(currentTime), 400, 20);
      game.elapsedTime += deltaTime / 1000; 
      if (currentTime < 0 || yBall < 10 || yBall > 790) {
        game.state = gameState.GameOver;
      } 
    break;

    case gameState.GameOver: 
      background(150, 40, 58);
      noFill();
      stroke(255);
      rect(110, 360, 600, 100);
      line(400, 360, 400, 460);
      fill(255);
      textSize(80);
      textAlign(CENTER);
      text("Game Over!", 400, 100); 
      textSize(30);
      text("Click on screen to start a new round!",400,650);
      if (player1 > player2){
        state = 1; 
        serialWrite(state);
        text("Current Winner: Player 1",400,250);
        textSize(30);
        text("Player 1 score:  " + player1, 250, 420);
        text("Player 2 score:  " + player2, 550, 420);
      }
      if (player1 < player2){
        state = 2; 
        serialWrite(state);
        text("Current Winner: Player 2",400,250);
        textSize(30);
        text("Player 1 score:  " + player1, 250, 420);
        text("Player 2 score:  " + player2, 550, 420);
      }
      if (player1 == player2){
        state = 3; 
        serialWrite(state);
        text("Current Winner: There is currently a tie!",400,250);
        textSize(30);
        text("Player 1 score:  " + player1, 250, 420);
        text("Player 2 score:  " + player2, 550, 420);
      }
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

function serialWrite(jsonObject) {
  if (writer) {
    writer.write(encoder.encode(JSON.stringify(jsonObject)+"\n"));
  }
}



//Bounce back from sides of the canvas and game over
async function bounce() {
  if (xBall < 10 || xBall > 790) {
    xSpeed = -xSpeed;
  }
  if (yBall < 10) {
    game.state = gameState.GameOver;
    Tone.Transport.stop();
    player2 += 1;
  } else if (yBall > 790) {
    game.state = gameState.GameOver;
    Tone.Transport.stop();
    player1 += 1;
  }
}
//Bounce from player2 paddle
async function paddle1() {
  if ((xBall > p2place && xBall < p2place + 100) && (yBall >= 735)) {
    synthPart.playbackRate += .1;
    ySpeed = -ySpeed; 
    ballSound.start();
  }
}
//Bounce from player1 paddle
async function paddle2() {
  if ((xBall > p1place && xBall < p1place + 100) && yBall <= 30) {
    synthPart.playbackRate += .1;
    ySpeed = -ySpeed; 
    ballSound.start();
  }
}

//Restart game on mouse press
function reset() {
  synthPart.playbackRate = 1;
  xBall = 400;
  yBall = 400;
  p1place = 350; 
  p2place = 350;
  game.elapsedTime = 0;
  state = 0;
  loop();
}

async function moving() {
  if (p1Left == 1) {
    p1place = p1place - 7;
  }
  else if (p1Right == 1) {
    p1place = p1place + 7;
  }
  else if (p2Left == 1) {
    p2place = p2place - 7;
  } 
  else if (p2Right == 1) {
    p2place = p2place + 7;
  }
}

async function mousePressed() {
    switch(game.state) {
      case gameState.Start: 
        game.state = gameState.Playing;
      break; 
      case gameState.Playing:
        game.state = gameState.GameOver;
      case gameState.GameOver: 
        reset();
        game.state = gameState.Playing;
      break;
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
