const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var trackGrid = [ 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                  5, 5, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 1, 1, 0, 0, 4, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  5, 5, 1, 1, 1, 1, 4, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  5, 5, 1, 1, 1, 1, 4, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1,
                  1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_FLAG = 4;
const TRACK_TREE = 5;

function isObstacleAtColRow(col, row){
  if (col >= 0 && col < TRACK_COLS &&
      row >= 0 && row < TRACK_ROWS) {
    var trackIndexUnderCoord= rowColToArrayIndex(col, row);
    return (trackGrid[trackIndexUnderCoord] != TRACK_ROAD);
  } else{
    return false;
  }
}

function carTrackColl(whichCar){
  var carTrackCol = Math.floor(whichCar.X / TRACK_W);
  var carTrackRow = Math.floor(whichCar.Y / TRACK_H);
  var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
  if (carTrackCol >= 0 && carTrackCol < TRACK_COLS && carTrackRow >= 0 && carTrackRow < TRACK_ROWS){
    if (isObstacleAtColRow(carTrackCol, carTrackRow)) {
      whichCar.X -= Math.cos(whichCar.Ang) * whichCar.Speed;
      whichCar.Y -= Math.sin(whichCar.Ang) * whichCar.Speed;
      whichCar.Speed *= -0.5;
    }
  }
  // colorText(carTrackCol+","+carTrackRow+": "+trackIndexUnderCar, mouseX, mouseY, 'white');
}

function rowColToArrayIndex(col, row){
  return col + TRACK_COLS * row;
}

function drawtracks(){

  var arrayIndex = 0;
  var drawTileX = 0;
  var drawTileY = 0;


  for (var eachRow=0; eachRow<TRACK_ROWS; eachRow++) {
    for(var eachCol=0; eachCol<TRACK_COLS; eachCol++){
      var tileKind = trackGrid[arrayIndex];
      var useImg = trackPics[tileKind];

      canvasContext.drawImage(useImg, drawTileX, drawTileY);

      drawTileX += TRACK_W;
      arrayIndex++;
    }// each track col
    drawTileX = 0;
    drawTileY += TRACK_H;
  }// each trackrow
}// drawtracks
