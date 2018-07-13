//Car-Track Images
var carPic = document.createElement("img");
var roadImg = document.createElement('img');
var trackImg = document.createElement('img');

var picsToLoad =  0; // set automatically based on imagelist in loadImages()

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

  var imageList = [
    {varName: carPic, theFile: 'img/Black_viper.png'},
    {varName: roadImg, theFile: 'img/roadImg.png'},
    {varName: trackImg, theFile: 'img/trackImg.png'}
  ];

  picsToLoad = imageList.length;

  for (var i = 0; i<imageList.length; i++) {
    beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  }
}
