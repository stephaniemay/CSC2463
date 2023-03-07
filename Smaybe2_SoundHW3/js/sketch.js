let initTone = true;
let x = false;

let osc = new Tone.AMOscillator(1000, 'sine', 'sine').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.2,
  decay: 1,
  sustain: 0,
  release: 3
}).connect(pan);

osc.connect(ampEnv);

let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 2,
  decay: 0,
  sustain: 1,
  release: 1
}).connect(gain);

let noiseFilter = new Tone.Filter(400, "lowpass").connect(noiseEnv);
noise.connect(noiseFilter)

function setup() {
  createCanvas(600, 500);
  elevator = loadImage("js/Elevator.png");
}

function draw() {
  textSize(20);
  strokeWeight(2);
  text("First Press Space Bar to Initialize Audio!", 100, 20);
  text("Press on the Screen to Hear Noise", 100, 420);
}

function keyPressed() {
  image(elevator, 0,0,700,392);
  if (key = ' ' && initTone === true) {
    console.log("spacebar Pressed");
    Tone.start();
    initTone = false;
  }
}

function mousePressed() {
  console.log('pressed');
  x = true;
  if (x = true) {
    noiseEnv.triggerAttackRelease("3n");
    noiseEnv.triggerAttackRelease("3n", "+0.5");
    osc.frequency.setValueAtTime(1100); 
    osc.frequency.setValueAtTime(950, "+2"); 
    ampEnv.triggerAttackRelease("7n", "+1.5")
    ampEnv.triggerAttackRelease("6n", "+2");
    x = false;
  }
  
}

