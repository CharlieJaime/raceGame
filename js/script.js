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

// Ball
var ballX = 75;
var ballSpeedX = 8;
var ballY = 75;
var ballSpeedY = 8;

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
  ballRest();
}

function updateAll(){
  // movement();
  playArea();
}

function ballRest(){
  for (var eachRow=0; eachRow<TRACK_ROWS; eachRow++) {
    for(var eachCol=0; eachCol<TRACK_COLS; eachCol++){
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if(trackGrid[arrayIndex] == 2){
        trackGrid[arrayIndex] = 0;
        ballX = eachCol * TRACK_W + TRACK_W/2;
        ballY = eachRow * TRACK_H + TRACK_H/2;
      }
    }
  }
}

function ballMove(){
  // ballMovement
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  // ballY
  if(ballY > canvas.height){
    // ballSpeedY = -ballSpeedY;
    ballRest();
    trackReset();
  } else if(ballY < 0 && ballSpeedY > 0.0){
    ballSpeedY = -ballSpeedY;
  }
  // ballx
  if(ballX > canvas.width && ballSpeedX > 0.0){
    ballSpeedX = -ballSpeedX;
  } else if(ballX < 0 && ballSpeedX < 0.0){
    ballSpeedX = -ballSpeedX;
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

function ballTrackColl(){
  var ballTrackCol = Math.floor(ballX / TRACK_W);
  var ballTrackRow = Math.floor(ballY / TRACK_H);
  var trackIndexUnderBall = rowColToArrayIndex(ballTrackCol, ballTrackRow);
  if (ballTrackCol >= 0 && ballTrackCol < TRACK_COLS && ballTrackRow >= 0 && ballTrackRow < TRACK_ROWS){
    if (isTrackAtColRow(ballTrackCol, ballTrackRow)) {

      var prevBallX = ballX - ballSpeedX;
      var prevBallY = ballY - ballSpeedY;
      var prevTrackCol = Math.floor(prevBallX / TRACK_W);
      var prevTrackRow = Math.floor(prevBallY / TRACK_H);


      var bothTestFailed = true;

      if(prevTrackCol != ballTrackCol){
        if(isTrackAtColRow(prevTrackCol, ballTrackRow) == false){
          ballSpeedX = -ballSpeedX;
          bothTestFailed = false;
        }
      }

      if(prevTrackRow != ballTrackRow){
        if (isTrackAtColRow(ballTrackCol, prevTrackRow) == false) {
          ballSpeedY = -ballSpeedY;
          bothTestFailed = false;
        }
      }

      if(bothTestFailed){
        ballSpeedX = -ballSpeedX;
        ballSpeedY = -ballSpeedY;
      }

    }
  }
  // colorText(ballTrackCol+","+ballTrackRow+": "+trackIndexUnderBall, mouseX, mouseY, 'white');
}



function movement(){
  ballMove();
  ballTrackColl();
}

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  //cheat to test ball in any position
  // ballX = mouseX;
  // ballY = mouseY;
  // ballSpeedY = 4;
  // ballSpeedY = -4;
}

/**********
GamePlay Draw functions
***********/
function playArea(){
  // gameCanvas
  colorRect(0,0,canvas.width, canvas.height, 'black');
  // ball
  colorCircle();

  drawtracks();
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

function colorCircle(){
  canvasContext.fillStyle = 'lightgrey';
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
  canvasContext.fill();
}
