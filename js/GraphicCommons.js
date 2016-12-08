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
