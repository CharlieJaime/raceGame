//Car-Track Images
var carPic = document.createElement("img");
var roadImg = document.createElement('img');
var trackImg = document.createElement('img');

var picsToLoad =  3;

function loaderLaunchGameWhenReady(){
  picsToLoad--;
  if(picsToLoad == 0){
    ImagesLoadedStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = loaderLaunchGameWhenReady();
  imgVar.src = fileName;
}

function loadImages(){
  beginLoadingImage(carPic, 'img/Black_viper.png');
  beginLoadingImage(roadImg, 'img/roadImg.png');
  beginLoadingImage(trackImg, 'img/trackImg.png');
}
