(function(){
  var app, baseImg;
  app = angular.module('we-are-g0v', []);
  baseImg = new Image();
  baseImg.src = 'g0v1.png';
  baseImg.onload = function(){
    var inputArea;
    inputArea = document.getElementById('cover-name');
    return inputArea.style.display = 'block';
  };
  app.controller('coverCtrl', ['$scope', '$window'].concat(function($scope, $window){
    $scope.isDone = false;
    return $scope.generate = function(){
      var canvas, imgInstance, text, img;
      $('#result').hide();
      if ($scope.name.length > 8) {
        return $scope.message = '需要小於8個字元長';
      }
      canvas = new fabric.StaticCanvas('c');
      imgInstance = new fabric.Image(baseImg, {
        scale: 0.5,
        opacity: 0.85
      });
      text = new fabric.Text($scope.name, {
        left: 900 - $scope.name.length,
        top: 488,
        fill: '#666965'
      });
      canvas.add(imgInstance);
      canvas.add(text);
      img = Canvas2Image.saveAsPNG(canvas, true);
      img.id = 'result';
      $(img).css('margin-top', '10px');
      $('#result').replaceWith(img);
      return $scope.isDone = true;
    };
  }));
}).call(this);
