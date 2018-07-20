const GROUNDSPEED_DECAY_MULT = 0.97;
const DRIVE_POWER = 0.3;
const REVERSE_POWER = 0.3;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

function carClass(){
  // Car
  this.X = 75;
  this.Y = 75;
  this.Speed = 0;
  this.Ang = 0;

  this.reset = function(){
    for (var eachRow=0; eachRow<TRACK_ROWS; eachRow++) {
      for(var eachCol=0; eachCol<TRACK_COLS; eachCol++){
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if(trackGrid[arrayIndex] == TRACK_PLAYERSTART){
          trackGrid[arrayIndex] = TRACK_ROAD;
          // this.Ang = -Math.PI/2; //used to change faceing ang of car
          this.X = eachCol * TRACK_W + TRACK_W/2;
          this.Y = eachRow * TRACK_H + TRACK_H/2.8;
        } //end if statment
      }//end of col for
    }// end of row for
  }// end of carReset

  this.move = function(){
    // carMovement
    this.Speed *= GROUNDSPEED_DECAY_MULT;
    if (keyHeld_Gas) {
      this.Speed += DRIVE_POWER;
    }
    if (keyHeld_Reverse) {
      this.Speed -= REVERSE_POWER;
    }
    if (Math.abs(this.Speed) > MIN_SPEED_TO_TURN) {
      if (keyHeld_TurnLeft) {
        this.Ang -= TURN_RATE;
      }
      if (keyHeld_TurnRight) {
        this.Ang += TURN_RATE;
      }
    }

    this.X += Math.cos(this.Ang) * this.Speed;
    this.Y += Math.sin(this.Ang) * this.Speed;
  }

  this.draw = function(){
    drawBitmapCenteredWithRotations(carPic, this.X, this.Y, this.Ang);
  }
}
