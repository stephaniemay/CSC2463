let slider;

const synth = new Tone.PluckSynth();
const reverb = new Tone.JCReverb(0.4);
synth.connect(reverb);

let notes = {

  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'

}

function setup() {
  createCanvas(400, 400);

  slider = new Nexus.Slider("#slider");
  reverb.toDestination();

  synth.release = 2;
  synth.resonance = 0.98;

  slider.on('change', (v) =>  
  {
    reverb.roomSize.value = v;
  }); 

}

function draw() {
  background(230,230,250);
  text("Change the slider to affect the reverb of each sound.", 20, 20);
  text("Press letters a,s,d,f,g,h,j,k to hear noises from our synthesizer.", 20, 200);
}

function keyPressed() {
  let toPlay = notes[key];
  console.log(toPlay);
  synth.triggerAttackRelease(toPlay, 0.5);
}