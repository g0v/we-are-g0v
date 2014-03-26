app = angular.module 'we-are-g0v', <[]>

base-img = new Image!
base-img.src = 'g0v5.png'

base-img.onload = ->
  input-area = document.get-element-by-id 'cover-name'
  input-area.style.display = 'block'

logo = new Image!
logo.src = 'g0v-logo.png'
logo.onload = ->
  console.log 'logo loaded'

padd-psace = ->
  return it if it.length >= 7
  padd-psace '　' + it

app.controller 'coverCtrl' <[$scope $window]> ++ ($scope, $window) ->

  $scope.is-done =  false

  $scope.generate = ->
    result = $ '#result' .hide!
    img = $ '#result img'
    $scope.is-done = false
    return $scope.message = '字元長度請小於8' if $scope.name.length > 8 
    canvas = new fabric.StaticCanvas 'c'
    canvas.setWidth base-img.width
    canvas.setHeight base-img.height

    img-instance = new fabric.Image base-img, do
      opacity: 0.85

    rect = new fabric.Rect do
      left: base-img.width - 380
      top: base-img.height - 60
      width: 380
      height: 60
      opacity: 0.5
      fill: 'white'

    logo-instance = new fabric.Image logo, do
      left: base-img.width - logo.width*0.38
      top: base-img.height - logo.height*0.38
      scaleX: 0.4
      scaleY: 0.5
    if $scope.name.match /[a-zA-Z]/
      name = padd-psace $scope.name
    else
      name = $scope.name

    text = new fabric.Text name + ' @', do
      left: base-img.width - 360
      top: base-img.height - 52.5
      fill: '#666965'
      fontSize: 30

    canvas.add img-instance
    canvas.add rect
    canvas.add logo-instance
    canvas.add text

    dataURI = canvas.toDataURL 'png'
    img.attr 'src', dataURI
    $scope.blob = Util.dataURLToBlob dataURI
    result.show!
    $scope.is-done = true

  $scope.download = ->
    saveAs $scope.blob, 'cover.png'
