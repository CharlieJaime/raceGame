/**********
Global Var
***********/
// Global
var canvas, canvasContext;

// Bricks
const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
var brickGrid = new Array(BRICK_COLS*BRICK_ROWS);
var brickCount = 0;

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
  brickReset();
  ballRest();
}

function updateAll(){
  movement();
  playArea();
}

function ballRest(){
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function brickReset(){
  brickCount = 0;
  var i;
  for (var i = 0; i < 3 * BRICK_COLS; i++) {
    brickGrid[i] = false;
  }
  for (; i<BRICK_COLS*BRICK_ROWS; i++) {
    if(Math.random()<0.5){
      brickGrid[i] = true;
    } else {
      brickGrid[i] = false;
    }
    brickGrid[i] = true;
    brickCount++;
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
    brickReset();
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

function isBrickAtColRow(col, row){
  if (col >= 0 && col < BRICK_COLS &&
      row >= 0 && row < BRICK_ROWS) {
    var brickIndexUnderCoord= rowColToArrayIndex(col, row);
    return brickGrid[brickIndexUnderCoord];
  } else{
    return false;
  }
}

function ballBrickColl(){
  var ballBrickCol = Math.floor(ballX / BRICK_W);
  var ballBrickRow = Math.floor(ballY / BRICK_H);
  var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
  if (ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS){
    if (isBrickAtColRow(ballBrickCol, ballBrickRow)) {
      brickGrid[brickIndexUnderBall] = false;
      brickCount--;

      var prevBallX = ballX - ballSpeedX;
      var prevBallY = ballY - ballSpeedY;
      var prevBrickCol = Math.floor(prevBallX / BRICK_W);
      var prevBrickRow = Math.floor(prevBallY / BRICK_H);


      var bothTestFailed = true;

      if(prevBrickCol != ballBrickCol){
        if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false){
          ballSpeedX = -ballSpeedX;
          bothTestFailed = false;
        }
      }

      if(prevBrickRow != ballBrickRow){
        if (isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
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
  // colorText(ballBrickCol+","+ballBrickRow+": "+brickIndexUnderBall, mouseX, mouseY, 'white');
}



function movement(){
  ballMove();
  ballBrickColl();
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

  drawbricks();
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
  return col + BRICK_COLS * row;
}

function drawbricks(){
  for (var eachRow=0; eachRow<BRICK_ROWS; eachRow++) {
    for(var eachCol=0; eachCol<BRICK_COLS; eachCol++){
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if(brickGrid[arrayIndex]){
        colorRect(BRICK_W*eachCol , BRICK_H*eachRow,
          BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP, 'blue');
      } //   if brick
    }// each brick
  }// each brickrow
}// drawbricks

function colorCircle(){
  canvasContext.fillStyle = 'lightgrey';
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
  canvasContext.fill();
}
