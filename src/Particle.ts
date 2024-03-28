import { Vector } from "./lib/math/Vector"

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
        graphics.fillRect(this.position.x, this.position.y, 50, 50)
    }
}

export { Particle }