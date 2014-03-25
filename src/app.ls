app = angular.module 'we-are-g0v', <[]>

base-img = new Image!
base-img.src = 'g0v1.png'

base-img.onload = ->
  input-area = document.get-element-by-id 'cover-name'
  input-area.style.display = 'block'

padd-psace = ->
  return it if it.length >= 7
  padd-psace '　' + it

app.controller 'coverCtrl' <[$scope $window]> ++ ($scope, $window) ->

  $scope.is-done =  false

  $scope.generate = ->
    result = $ '#result' .hide!
    img = $ '#result img'
    $scope.is-done = false
    canvas = new fabric.StaticCanvas 'c'
    img-instance = new fabric.Image base-img, do
      scale: 0.5
      opacity: 0.85
    if $scope.name.match /[a-zA-Z]/
      name = padd-psace $scope.name
      offset = 7 - name.length
    else 
      name = $scope.name
      offset = 0
    
    text = new fabric.Text name, do
      left: (900 + offset*18) - name.length
      top: 488
      fill: '#666965'

    canvas.add img-instance
    canvas.add text
    dataURI = canvas.toDataURL 'png'
    img.attr 'src', dataURI
    img.attr 'width', '100%'
    $scope.blob = Util.dataURLToBlob dataURI
    result.show!
    $scope.is-done = true
  $scope.download = ->
    saveAs $scope.blob, 'cover.png'
