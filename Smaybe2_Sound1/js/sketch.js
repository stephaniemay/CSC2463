let sounds = new Tone.Players({
    "Chicken": "sounds/Chickens.wav", 
    "Pig": "sounds/Pig.wav",
    "Dog": "sounds/Dog.wav",
    "Cat": "sounds/Cat.wav", 
    "Bird" : "sounds/Bird.wav"
  });

  const delay = new Tone.FeedbackDelay("8n", 0.5);

  let soundNames = ["Chicken", "Pig", "Dog", "Cat", "Bird"];
  let buttons = [];

  let dSlider;
  let fSlider;

function setup() {
  createCanvas(400, 360);
  sounds.connect(delay);
  delay.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(index, index*50);
    buttons[index].mousePressed( () => buttonSound(word) );
  })

  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })

  fSlider = createSlider(0., 1., 0.5, 0.05);
  fSlider.mouseReleased( () => {
    delay.feedback.value = fSlider.value();
  })
 
}

function draw() {
  background(220, 208, 255);
  textSize(20);
  text("Press any button to hear a sound", 100, 90);
  textSize(25);
  text("Editing the Sounds!", 100, 280);
  textSize(14);
  text(" Change 2nd slider to add lots off feedback to the sound!", 10, 330);
  text(" Change 1st slider to affect how fast or slow the feedback is!", 10, 350);
}

function buttonSound(whichSound) {
    sounds.player(whichSound).start();
}