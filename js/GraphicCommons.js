/**********
GamePlay Draw functions
***********/
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
      if(trackGrid[arrayIndex] == TRACK_WALL){
        colorRect(TRACK_W*eachCol , TRACK_H*eachRow,
          TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP, 'blue');
      } //   if track
    }// each track
  }// each trackrow
}// drawtracks
