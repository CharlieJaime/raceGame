//Car-Track Images
var carPic = document.createElement("img");
// var carPic2 = document.createElement('img');
var trackPics = [];
// var roadImg = document.createElement('img');
// var trackImg = document.createElement('img');
// var flagImg = document.createElement('img');
// var treeImg = document.createElement('img');
// var goalImg = document.createElement('img');

var picsToLoad =  0; // set automatically based on imagelist in loadImages()

function loaderLaunchGameWhenReady(){
  picsToLoad--;
  console.log(picsToLoad);
  if(picsToLoad == 0){
    ImagesLoadedStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = loaderLaunchGameWhenReady();
  imgVar.src = fileName;
}

function loadImageForTrackCode(trackCode, fileName){
  trackPics[trackCode] = document.createElement('img');
  beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages(){

  var imageList = [
    {varName: carPic, theFile: 'img/Black_viper.png'},
    {trackType: TRACK_ROAD, theFile: 'img/roadImg.png'},
    {trackType: TRACK_WALL, theFile: 'img/trackImg.png'},
    {trackType: TRACK_FLAG, theFile: 'img/flagImg.png'},
    {trackType: TRACK_GOAL, theFile: 'img/goalImg.png'},
    {trackType: TRACK_TREE, theFile: 'img/treeImg.png'}
    // {varName: carPic2, theFile: 'img/Audi.png'}
];

  picsToLoad = imageList.length;

  for (var i = 0; i<imageList.length; i++) {
    if (imageList[i].varName != undefined) {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } else {
      loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
    }
  }
}
