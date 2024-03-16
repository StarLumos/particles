function pythagorean(a: number, b: number) {
    return Math.sqrt(a**2 + b**2)
}

class Vector{
    x: number
    y: number
    magnitude: number
    angle: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.magnitude = pythagorean(x, y)
        this.angle = Math.atan2(y, x)
    }
}

export { Vector }
