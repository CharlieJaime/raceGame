/**********
Global Var
***********/
// Global
var canvas, canvasContext;

// Tracks
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var trackGrid = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
                  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
                  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
                  1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
                  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ];

// Keyboard arrows
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

//Car Image
var carPic = document.createElement("img");
var carPicLoaded = false;

// Car
var carX = 75;
var carY = 75;
var carSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.97;
const DRIVE_POWER = 0.3;
const REVERSE_POWER = 0.3;
const TURN_RATE = 0.06;

var carAng = 0;

// Mouse
var mouseX = 0;
var mouseY = 0;

/**********
General GamePlay
***********/
window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  carPic.onload = function(){
    carPicLoaded = true;
  }
  carPic.src = "Black_viper.png";
  carRest();
}

function updateAll(){
  movement();
  playArea();
}

function carRest(){
  for (var eachRow=0; eachRow<TRACK_ROWS; eachRow++) {
    for(var eachCol=0; eachCol<TRACK_COLS; eachCol++){
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if(trackGrid[arrayIndex] == 2){
        trackGrid[arrayIndex] = 0;
        // carAng = -Math.PI/2; used to change faceing ang of car
        carX = eachCol * TRACK_W + TRACK_W/2;
        carY = eachRow * TRACK_H + TRACK_H/2.8;
      }
    }
  }
}

function carMove(){
  // carMovement
  carSpeed *= GROUNDSPEED_DECAY_MULT;
  if (keyHeld_Gas) {
    carSpeed += DRIVE_POWER;
  }
  if (keyHeld_Reverse) {
    carSpeed -= REVERSE_POWER;
  }
  if (keyHeld_TurnLeft) {
    carAng -= TURN_RATE;
  }
  if (keyHeld_TurnRight) {
    carAng += TURN_RATE;
  }

  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
}

function isTrackAtColRow(col, row){
  if (col >= 0 && col < TRACK_COLS &&
      row >= 0 && row < TRACK_ROWS) {
    var trackIndexUnderCoord= rowColToArrayIndex(col, row);
    return (trackGrid[trackIndexUnderCoord] == 1);
  } else{
    return false;
  }
}

function carTrackColl(){
  var carTrackCol = Math.floor(carX / TRACK_W);
  var carTrackRow = Math.floor(carY / TRACK_H);
  var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
  if (carTrackCol >= 0 && carTrackCol < TRACK_COLS && carTrackRow >= 0 && carTrackRow < TRACK_ROWS){
    if (isTrackAtColRow(carTrackCol, carTrackRow)) {
      carX -= Math.cos(carAng) * carSpeed;
      carY -= Math.sin(carAng) * carSpeed;

      carSpeed *= -0.5;
    }
  }
  // colorText(carTrackCol+","+carTrackRow+": "+trackIndexUnderCar, mouseX, mouseY, 'white');
}



function movement(){
  carMove();
  carTrackColl();
}

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;
}


function keyPressed(evt){
  if (evt.keyCode == KEY_LEFT_ARROW) {
    keyHeld_TurnLeft = true;
  }
  if (evt.keyCode == KEY_RIGHT_ARROW) {
    keyHeld_TurnRight = true;
  }
  if (evt.keyCode == KEY_UP_ARROW) {
    keyHeld_Gas = true;
  }
  if (evt.keyCode == KEY_DOWN_ARROW) {
    keyHeld_Reverse = true;
  }
  evt.preventDefault();
}

function keyReleased(evt){
  if (evt.keyCode == KEY_LEFT_ARROW) {
    keyHeld_TurnLeft = false;
  }
  if (evt.keyCode == KEY_RIGHT_ARROW) {
    keyHeld_TurnRight = false;
  }
  if (evt.keyCode == KEY_UP_ARROW) {
    keyHeld_Gas = false;
  }
  if (evt.keyCode == KEY_DOWN_ARROW) {
    keyHeld_Reverse = false;
  }
  evt.preventDefault();
}

/**********
GamePlay Draw functions
***********/
function playArea(){
  // gameCanvas
  colorRect(0,0,canvas.width, canvas.height, 'black');
  // car

  if(carPicLoaded){
    drawBitmapCenteredWithRotations(carPic, carX, carY, carAng);
  }

  drawtracks();
}

function drawBitmapCenteredWithRotations(useBitmap, atX, atY, withAng){
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap,-useBitmap.width/2,-useBitmap.width/2);
  canvasContext.restore();
}

function colorRect(leftX, topY, width, height, color){
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorText(showWords, textX,textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}

function rowColToArrayIndex(col, row){
  return col + TRACK_COLS * row;
}

function drawtracks(){
  for (var eachRow=0; eachRow<TRACK_ROWS; eachRow++) {
    for(var eachCol=0; eachCol<TRACK_COLS; eachCol++){
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if(trackGrid[arrayIndex] == 1){
        colorRect(TRACK_W*eachCol , TRACK_H*eachRow,
          TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP, 'blue');
      } //   if track
    }// each track
  }// each trackrow
}// drawtracks
