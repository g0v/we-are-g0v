(function(){
  var app, baseImg, paddPsace;
  app = angular.module('we-are-g0v', []);
  baseImg = new Image();
  baseImg.src = 'g0v1.png';
  baseImg.onload = function(){
    var inputArea;
    inputArea = document.getElementById('cover-name');
    return inputArea.style.display = 'block';
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
      var result, img, canvas, imgInstance, name, offset, text, dataURI;
      result = $('#result').hide();
      img = $('#result img');
      $scope.isDone = false;
      canvas = new fabric.StaticCanvas('c');
      imgInstance = new fabric.Image(baseImg, {
        scale: 0.5,
        opacity: 0.85
      });
      if ($scope.name.match(/[a-zA-Z]/)) {
        name = paddPsace($scope.name);
        offset = 7 - name.length;
      } else {
        name = $scope.name;
        offset = 3 - name.length;
      }
      text = new fabric.Text(name, {
        left: (900 + offset * 18) - name.length,
        top: 488,
        fill: '#666965'
      });
      canvas.add(imgInstance);
      canvas.add(text);
      dataURI = canvas.toDataURL('png');
      img.attr('src', dataURI);
      img.attr('width', '100%');
      $scope.blob = Util.dataURLToBlob(dataURI);
      result.show();
      return $scope.isDone = true;
    };
    return $scope.download = function(){
      return saveAs($scope.blob, 'cover.png');
    };
  }));
}).call(this);
