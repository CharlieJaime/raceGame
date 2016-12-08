/**********
Global Var
***********/
// Global
var canvas, canvasContext;

/**********
General GamePlay
***********/
window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  setupInput();

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

function movement(){
  carMove();
  carTrackColl();
}

function clearScreen(){
  colorRect(0,0,canvas.width, canvas.height, 'black');
}

/**********
GamePlay Draw functions
***********/
function playArea(){
  // gameCanvas
  clearScreen();
  carDraw();
  drawtracks();
}
