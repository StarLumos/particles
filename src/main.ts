const canvas = document.querySelector("canvas")!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext("2d")!

ctx.scale(1, -1)
ctx.translate(canvas.width / 2, -canvas.height / 2)

var counter = 0

function frameloop() {
  ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
  
  ctx.fillStyle = 'red'
  ctx.fillRect(counter, 0, 50, 50)
  counter -= 1
  requestAnimationFrame(frameloop)
}

frameloop()
