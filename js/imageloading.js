//Car-Track Images
var carPic = document.createElement("img");
var carPicLoaded = false;
var roadImg = document.createElement('img');
var trackImg = document.createElement('img');

function carImageLoad(){
  carPic.onload = function(){
    carPicLoaded = true;
  }
  carPic.src = "img/Black_viper.png";
}

function trackImageLoad(){
  roadImg.src = 'img/roadImg.png';
  trackImg.src = 'img/trackImg.png';
}

function loadImages(){
  carImageLoad();
  trackImageLoad();
}
