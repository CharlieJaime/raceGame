//Car-Track Images
var carPic = document.createElement("img");
var roadImg = document.createElement('img');
var trackImg = document.createElement('img');

var picsToLoad =  3

function LoaderLaunchGameWhenReady(){
  picsToLoad--;
  if(picsToLoad == 0){
    ImagesLoadedStartGame();
  }
}

function carImageLoad(){
  carPic.onload = LoaderLaunchGameWhenReady();
  carPic.src = "img/Black_viper.png";
}

function trackImageLoad(){
  roadImg.onload = LoaderLaunchGameWhenReady();
  trackImg.onload = LoaderLaunchGameWhenReady();
  roadImg.src = 'img/roadImg.png';
  trackImg.src = 'img/trackImg.png';
}

function loadImages(){
  carImageLoad();
  trackImageLoad();
}
