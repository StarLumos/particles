import { Vector } from "./lib/math/Vector"
import { distance } from "./lib/math/geometry"
import { random_range } from "./lib/math/stats"

let DEBUG = false

class Particle {
    position: Vector
    velocity: Vector
    acceleration: Vector
    vision: number
    knowledge: Particle[]
    
    constructor(vision: number, position: Vector, velocity: Vector = new Vector(0, 0), acceleration: Vector = new Vector(0, 0)) {
        this.position = position
        this.velocity = velocity
        this.acceleration = acceleration
        this.vision = vision
        this.knowledge = []
    }
    update() {
        this.position = this.position.add(this.velocity)
        this.velocity = this.velocity.add(this.acceleration)
        this.acceleration = new Vector(0, 0)
        this.knowledge = []
    }
    accelerate(force: Vector) {
        this.acceleration = this.acceleration.add(force)
    }
    render(graphics: CanvasRenderingContext2D) {
        graphics.fillRect(this.position.x, this.position.y, 5, 5)
    }
    wander(graphics: CanvasRenderingContext2D, intensity: number = 1) {
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

        const force = difference.multiply(intensity)
        
        this.accelerate(force)

        if (DEBUG == true)
            debug.wander.all(this, graphics, endpoint1, endpoint2, endpoint3)
    }
    seek(target: Vector, speed: number, steering: number, intensity: number = 1){
        const force = target.subtract(this.position)
            .limit(speed)
            .subtract(this.velocity)
            .multiply(intensity)
            .limit(steering)
        this.accelerate(force)
    }
    findCursor() {
        // const cursor = new Vector(0, 0)
        // this.position = cursor
    }
    perceive(particles: Particle[]) {
        for (const particle of particles)
            if (!this.knowledge.includes(particle))
                if (distance(particle.position, this.position) <= this.vision)
                    this.knowledge.push(particle)           
    }
    cohesion(intensity: number = 1) {
        let sum = new Vector(0, 0)
        for (const particle of this.knowledge) {
            sum = sum.add(particle.position)
        }
        if (sum.magnitude == 0)
            return
        const average = sum.divide(this.knowledge.length)
        // this.seek(average, intensity /2, intensity*10)
        const difference = average.subtract(this.position)
        const force = difference.multiply(1/difference.magnitude)
        this.accelerate(force.multiply(intensity))
    }
    separation(intensity: number = 1) {
        let forces = new Vector(0, 0)
        for (const particle of this.knowledge) {
            const difference = this.position.subtract(particle.position)
            forces = forces.add(difference.multiply(1/difference.magnitude))
        }
        if (forces.magnitude == 0)
            return
        const average = forces.divide(this.knowledge.length)
        this.accelerate(average.multiply(intensity))
    }
    alignment(intensity: number = 1) {
        let directions = new Vector(0, 0)
        for (const particle of this.knowledge) {
            directions = directions.add(particle.velocity)
        }
        if (directions.magnitude == 0)
            return
        const average = directions.divide(this.knowledge.length)
        const difference = average.angle - this.velocity.angle 
        this.velocity.angle += (difference / 2) * intensity
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
