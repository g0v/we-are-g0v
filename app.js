(function(){
  var app, baseImg, dataURLtoBlob;
  app = angular.module('we-are-g0v', []);
  baseImg = new Image();
  baseImg.src = 'g0v1.png';
  baseImg.onload = function(){
    var inputArea;
    inputArea = document.getElementById('cover-name');
    return inputArea.style.display = 'block';
  };
  dataURLtoBlob = function(dataURL){
    var byteString, mimeString, ab, ia, i$, to$, i, bb;
    byteString = atob(dataURL.split(',')[1]);
    mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    ab = new ArrayBuffer(byteString.length);
    ia = new Uint8Array(ab);
    for (i$ = 0, to$ = byteString.length; i$ <= to$; ++i$) {
      i = i$;
      ia.i = byteString.charCodeAt(i);
    }
    bb = new BlobBuilder();
    bb.append(ab);
    return bb.getBlob(mimeString);
  };
  app.controller('coverCtrl', ['$scope', '$window'].concat(function($scope, $window){
    $scope.isDone = false;
    return $scope.generate = function(){
      var canvas, imgInstance, text, img;
      console.log($scope.name.length);
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
