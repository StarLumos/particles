import { Vector } from "./lib/math/Vector"
import { Particle } from "./Particle"

const canvas = document.querySelector("canvas")!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const graphics = canvas.getContext("2d")!

graphics.scale(1, -1)
graphics.translate(canvas.width / 2, -canvas.height / 2)

const a = new Particle()
a.position = new Vector(-200,0)

const keys = { } as any
document.addEventListener("keydown", function(event) {
    keys[event.key] = true
})
document.addEventListener("keyup", function(event) {
    keys[event.key] = false
})

function frameloop() {
    graphics.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)

    if (keys["d"]) {
        a.accelerate(new Vector(0.2, 0))
    }
    if (keys["a"]) {
        a.accelerate(new Vector(-0.2, 0))
    }
    
    a.render(graphics)
    a.update()

    requestAnimationFrame(frameloop)
}

frameloop()
