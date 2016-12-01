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


//Car Image
var carPic = document.createElement("img");
var carPicLoaded = false;

// Car
var carX = 75;
var carY = 75;
var carSpeed = 2;

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
        carX = eachCol * TRACK_W + TRACK_W/2;
        carY = eachRow * TRACK_H + TRACK_H/2;
      }
    }
  }
}

function carMove(){
  // carMovement
  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;

  carAng += 0.02;
  // carY
  if(carY > canvas.height){
    // carSpeedY = -carSpeedY;
    carRest();
    trackReset();
  } else if(carY < 0 && carSpeedY > 0.0){
    carSpeedY = -carSpeedY;
  }
  // carx
  if(carX > canvas.width && carSpeedX > 0.0){
    carSpeedX = -carSpeedX;
  } else if(carX < 0 && carSpeedX < 0.0){
    carSpeedX = -carSpeedX;
  }
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

      var prevCarX = carX - carSpeedX;
      var prevCarY = carY - carSpeedY;
      var prevTrackCol = Math.floor(prevCarX / TRACK_W);
      var prevTrackRow = Math.floor(prevCarY / TRACK_H);


      var bothTestFailed = true;

      if(prevTrackCol != carTrackCol){
        if(isTrackAtColRow(prevTrackCol, carTrackRow) == false){
          carSpeedX = -carSpeedX;
          bothTestFailed = false;
        }
      }

      if(prevTrackRow != carTrackRow){
        if (isTrackAtColRow(carTrackCol, prevTrackRow) == false) {
          carSpeedY = -carSpeedY;
          bothTestFailed = false;
        }
      }

      if(bothTestFailed){
        carSpeedX = -carSpeedX;
        carSpeedY = -carSpeedY;
      }

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

  //cheat to test car in any position
  // carX = mouseX;
  // carY = mouseY;
  // carSpeedY = 4;
  // carSpeedY = -4;
}

/**********
GamePlay Draw functions
***********/
function playArea(){
  // gameCanvas
  colorRect(0,0,canvas.width, canvas.height, 'black');
  // car
  // colorCircle();

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

// function colorCircle(){
//   canvasContext.fillStyle = 'lightgrey';
//   canvasContext.beginPath();
//   canvasContext.arc(carX, carY, 10, 0, Math.PI*2, true);
//   canvasContext.fill();
// }
