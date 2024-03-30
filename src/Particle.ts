import { Vector } from "./lib/math/Vector"
import { random_range } from "./lib/math/stats"

let DEBUG = true

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
    render(graphics: CanvasRenderingContext2D) {
        graphics.fillRect(this.position.x, this.position.y, 5, 5)
    }
    wander(graphics: CanvasRenderingContext2D) {
        if (this.velocity.magnitude == 0)
            this.velocity = new Vector(1, 0)
        
        const endpoint1 = this.position
            .add(this.velocity
                .multiply(25))
            
        const copy = this.velocity.clone()
        copy.angle += random_range(-0.2, 0.2)

        const endpoint2 = this.position
            .add(copy
                .multiply(20))

        const difference = copy.subtract(this.velocity)

        const endpoint3 = endpoint1
            .add(difference
                .multiply(20))
        this.accelerate(difference)

        if (DEBUG == true)
            debug.wander.all(this, graphics, endpoint1, endpoint2, endpoint3)
    }
}

const debug = {
    wander: {
        original: function(particle: Particle, graphics: CanvasRenderingContext2D, endpoint: Vector) {
            graphics.beginPath()
            graphics.moveTo(particle.position.x, particle.position.y)
            graphics.strokeStyle = 'blue'
            graphics.lineWidth = 2
            graphics.lineTo(endpoint.x, endpoint.y)
            graphics.stroke()
            graphics.closePath()
        },
        copy: function(particle: Particle, graphics: CanvasRenderingContext2D, endpoint2: Vector) {
            graphics.beginPath()
            graphics.moveTo(particle.position.x, particle.position.y)
            graphics.strokeStyle = 'green'
            graphics.lineWidth = 2
            graphics.lineTo(endpoint2.x, endpoint2.y)
            graphics.stroke()
            graphics.closePath()
        },
        difference: function(graphics: CanvasRenderingContext2D, endpoint1: Vector, endpoint3: Vector) {
            graphics.beginPath()
            graphics.moveTo(endpoint1.x, endpoint1.y)
            graphics.strokeStyle = 'red'
            graphics.lineWidth = 2
            graphics.lineTo(endpoint3.x, endpoint3.y)
            graphics.stroke()
            graphics.closePath()
        },
        all: function(particle: Particle, graphics: CanvasRenderingContext2D, endpoint1: Vector, endpoint2: Vector, endpoint3: Vector) {
            this.original(particle, graphics, endpoint1)
            this.copy(particle, graphics, endpoint2)
            this.difference(graphics, endpoint1, endpoint3)
        }
    }
}

export { Particle }
