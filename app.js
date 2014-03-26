(function(){
  var app, baseImg, logo, paddPsace;
  app = angular.module('we-are-g0v', []);
  baseImg = new Image();
  baseImg.src = 'g0v5.png';
  baseImg.onload = function(){
    var inputArea;
    inputArea = document.getElementById('cover-name');
    return inputArea.style.display = 'block';
  };
  logo = new Image();
  logo.src = 'g0v-logo.png';
  logo.onload = function(){
    return console.log('logo loaded');
  };
  paddPsace = function(it){
    if (it.length >= 7) {
      return it;
    }
    return paddPsace('　' + it);
  };
  app.controller('coverCtrl', ['$scope', '$window'].concat(function($scope, $window){
    $scope.isDone = false;
    $scope.generate = function(){
      var result, img, canvas, imgInstance, rect, logoInstance, name, text, dataURI;
      result = $('#result').hide();
      img = $('#result img');
      $scope.isDone = false;
      if ($scope.name.length > 8) {
        return $scope.message = '字元長度請小於8';
      }
      canvas = new fabric.StaticCanvas('c');
      canvas.setWidth(baseImg.width);
      canvas.setHeight(baseImg.height);
      imgInstance = new fabric.Image(baseImg, {
        opacity: 0.85
      });
      rect = new fabric.Rect({
        left: baseImg.width - 380,
        top: baseImg.height - 60,
        width: 380,
        height: 60,
        opacity: 0.5,
        fill: 'white'
      });
      logoInstance = new fabric.Image(logo, {
        left: baseImg.width - logo.width * 0.38,
        top: baseImg.height - logo.height * 0.38,
        scaleX: 0.4,
        scaleY: 0.5
      });
      if ($scope.name.match(/[a-zA-Z]/)) {
        name = paddPsace($scope.name);
      } else {
        name = $scope.name;
      }
      text = new fabric.Text(name + ' @', {
        left: baseImg.width - 360,
        top: baseImg.height - 52.5,
        fill: '#666965',
        fontSize: 30
      });
      canvas.add(imgInstance);
      canvas.add(rect);
      canvas.add(logoInstance);
      canvas.add(text);
      dataURI = canvas.toDataURL('png');
      img.attr('src', dataURI);
      $scope.blob = Util.dataURLToBlob(dataURI);
      result.show();
      return $scope.isDone = true;
    };
    return $scope.download = function(){
      return saveAs($scope.blob, 'cover.png');
    };
  }));
}).call(this);
