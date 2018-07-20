// /**********
// Global Var
// ***********/
// // Global
var canvas, canvasContext;

var p1 = new carClass();
var p2 = new carClass();

// /**********
// General GamePlay
// ***********/
window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  colorRect(0,0, canvas.width, canvas.height, 'black');
  colorText("Loading Game....", canvas.width/2, canvas.height/2, 'white');

  loadImages();
}

function ImagesLoadedStartGame(){
  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);
  setupInput();
  p1.reset(carPic);
  p2.reset(carPic2);
}

function updateAll(){
  movement();
  playArea();
}

function movement(){
  p1.move();
  p2.move();
}

// /**********
// GamePlay Draw functions
// ***********/
function playArea(){
  // gameCanvas
  drawtracks();
  p1.draw();
  p2.draw();
}
