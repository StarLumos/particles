const canvas = document.querySelector("canvas")!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext("2d")!

ctx.scale(1, -1)
ctx.translate(canvas.width / 2, -canvas.height / 2)

var xPosition = 0
var xDirection = -1
var xSpeed = 5
var yPosition = 0
var yDirection = 1
var ySpeed = 5

function frameloop() {
  ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
  
  ctx.fillStyle = 'red'
  ctx.fillRect(xPosition, yPosition, 50, 50)
  xPosition += xDirection * xSpeed
  yPosition += yDirection * ySpeed

  if (xPosition <= -canvas.width/2) {
    xDirection = 1
  } else if (xPosition >= canvas.width/2){
    xDirection = -1
  }

  if (yPosition <= -canvas.height/2){
    yDirection = 1
  } else if (yPosition >= canvas.height/2){
    yDirection = -1
  }

  requestAnimationFrame(frameloop)
}

frameloop()
