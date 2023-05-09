#include <Arduino_JSON.h>

const int player1left = 2;
const int player1right = 3;
const int player2left = 5;
const int player2right = 7;

int redPin= 13;
int greenPin = 8;
int bluePin = 10;

int button1State1 = 0; //player 1 left
int button1State2 = 0; //player 1 right
int button2State1 = 0; //player 2 left
int button2State2 = 0; //player 2 right 

JSONVar serialOutput;


void setup() {
  Serial.begin(9600);
  pinMode(button1State1, INPUT); //player 1 left
  pinMode(button1State2, INPUT); //player 1 right
  pinMode(button2State1, INPUT); //player 2 left
  pinMode(button2State2, INPUT); //player 2 right 

  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  if (Serial.available()) {
    int state = Serial.parseInt();
    if(state == 1) {  //player 1 wins round
      analogWrite(redPin, 0);
      analogWrite(greenPin, 0);
      analogWrite(bluePin, 255);
    } else if (state == 2) { //player 2 wins
      analogWrite(redPin, 255);
      analogWrite(greenPin, 0);
      analogWrite(bluePin, 0);
    } else if (state == 3) { //its a tie
      analogWrite(redPin, 0);
      analogWrite(greenPin, 255);
      analogWrite(bluePin, 0);
    }
  }
  
  button1State1 = digitalRead(player1left);
  button1State2 = digitalRead(player1right);
  button2State1 = digitalRead(player2left);
  button2State2 = digitalRead(player2right);

  serialOutput["player1Left"] = button1State1;
  serialOutput["player1Right"] = button1State2;
  serialOutput["player2Left"] = button2State1;
  serialOutput["player2Right"] = button2State2;
  Serial.println(serialOutput);
}
