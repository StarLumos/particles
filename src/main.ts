import { random_range } from "./lib/math/stats"
import { Vector } from "./lib/math/Vector"
import { Particle } from "./Particle"

const canvas = document.querySelector("canvas")!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const graphics = canvas.getContext("2d")!

graphics.scale(1, -1)
graphics.translate(canvas.width / 2, -canvas.height / 2)

const keys = { } as any
document.addEventListener("keydown", function(event) {
    keys[event.key] = true
})
document.addEventListener("keyup", function(event) {
    keys[event.key] = false
})

const mouse = {
    x: 0,
    y: 0
}

document.addEventListener("mousemove", function(event) {
    mouse.x = event.clientX - canvas.width / 2
    mouse.y = -event.clientY + canvas.height / 2
})

const particles: Particle[] = []
for (let i = 0; i < 400; i++) {
    const x = random_range(-canvas.width/2, canvas.width/2)
    const y = random_range(-canvas.height/2, canvas.height/2)
    const p = new Particle(50, new Vector(x, y))
    particles.push(p)
}

function contain(particles: Particle[]) {
    for (const particle of particles) {
        if (particle.position.x < -canvas.width/2 ||
            particle.position.x > canvas.width/2
        ) {
            particle.velocity.x = -particle.velocity.x
        }
        if (particle.position.y < -canvas.height/2 ||
            particle.position.y > canvas.height/2
        ) {
            particle.velocity.y = -particle.velocity.y
        }
    }
}

function frameloop() {
    graphics.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)

    const intensities = {
        wander: (document.getElementById('wander-slider') as HTMLInputElement).value,
        cohesion: (document.getElementById('cohesion-slider') as HTMLInputElement).value,
        separation: (document.getElementById('separation-slider') as HTMLInputElement).value,
        alignment: (document.getElementById('alignment-slider') as HTMLInputElement).value
    }

    if (keys["d"]) {
        // a.accelerate(new Vector(0.2, 0))
    }
    if (keys["a"]) {
        // a.accelerate(new Vector(-0.2, 0))
    }
    
    contain(particles)

    for (const particle of particles) {
        particle.wander(graphics, parseInt(intensities.wander))
        particle.perceive(particles.filter(
            other => other.position != particle.position))
        particle.cohesion(parseInt(intensities.cohesion))
        particle.separation(parseInt(intensities.separation))
        particle.alignment(parseInt(intensities.alignment))
        particle.render(graphics)
        particle.update()
    }

    // for (i = 0; i<100; i++)
    requestAnimationFrame(frameloop)
}

frameloop()
