import { Vector } from "./lib/math/Vector"

const canvas = document.querySelector("canvas")!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const graphics = canvas.getContext("2d")!

graphics.scale(1, -1)
graphics.translate(canvas.width / 2, -canvas.height / 2)

class Particle {
    position: Vector
    velocity: Vector
    acceleration: Vector

    constructor() {
        this.position = new Vector(0, 0)
        this.velocity = new Vector(0, 0)
        this.acceleration = new Vector(0, 0)
    }
    update() {
        this.position = this.position.add(this.velocity)
        this.velocity = this.velocity.add(this.acceleration)
        this.acceleration = new Vector(0, 0)
    }
    accelerate(force: Vector) {
        this.acceleration = this.acceleration.add(force)
    }
    render() {
        graphics.fillRect(this.position.x, this.position.y, 50, 50)
    }
}

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
    
    a.render()
    a.update()

    requestAnimationFrame(frameloop)
}

frameloop()
