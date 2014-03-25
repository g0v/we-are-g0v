app = angular.module 'we-are-g0v', <[]>

base-img = new Image!
base-img.src = 'g0v1.png'

base-img.onload = ->
  input-area = document.get-element-by-id 'cover-name'
  input-area.style.display = 'block'

app.controller 'coverCtrl' <[$scope $window]> ++ ($scope, $window) ->

  $scope.is-done =  false

  $scope.generate = ->
    $ '#result' .hide!
    return $scope.message = '需要小於8個字元長' if $scope.name.length > 8
    canvas = new fabric.StaticCanvas 'c'
    img-instance = new fabric.Image base-img, do
      scale: 0.5
      opacity: 0.85
    text = new fabric.Text $scope.name, do
      left: 900 - $scope.name.length
      top: 488
      fill: '#666965'

    canvas.add img-instance
    canvas.add text
    img = Canvas2Image.saveAsPNG canvas, true
    img.id = 'result'
    $ img .css 'margin-top', '10px'
    $ '#result' .replaceWith img 
    $scope.is-done = true

