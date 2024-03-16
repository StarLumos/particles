const canvas = document.querySelector("canvas")!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext("2d")!

ctx.scale(1, -1)
ctx.translate(canvas.width / 2, -canvas.height / 2)

class Cube {
  color: string
  xSpeed: number
  ySpeed: number
  xPosition: number
  xDirection: number
  yPosition: number
  yDirection: number
  width: number
  height: number
  
  constructor(color: string, xSpeed: number, ySpeed: number, xPosition: number, yPosition: number, xDirection: number, yDirection: number, width: number, height: number) {
    this.color = color
    this.xSpeed = xSpeed
    this.ySpeed = ySpeed
    this.xPosition = xPosition
    this.yPosition = yPosition
    this.xDirection = xDirection
    this.yDirection = yDirection
    this.width = width
    this.height = height
  }

  move() {
    this.xPosition += this.xDirection * this.xSpeed
    this.yPosition += this.yDirection * this.ySpeed
  }
  handle_bounce() {
    if (this.xPosition <= -canvas.width/2 || this.xPosition >= canvas.width/2) {
      this.xDirection = -this.xDirection
    }
    if (this.yPosition <= -canvas.height/2 || this.yPosition >= canvas.height/2){
      this.yDirection = -this.yDirection
    }
  }
  render() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.xPosition, this.yPosition, this.width, this.height)
  }
}

var cube1 = new Cube('red', 5, 5, 0, 0, -1, 1, 50, 50)
var cube2 = new Cube('blue', 5, 5, 0, 0, -1, 1, 50, 50)


function frameloop() {
  ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)

  cube1.render()
  cube1.move()
  cube1.handle_bounce()

  cube2.render()
  cube2.move()
  cube2.handle_bounce()

  requestAnimationFrame(frameloop)
}

frameloop()
