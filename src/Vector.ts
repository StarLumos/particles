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

    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y)
    }
    subtract(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y)
    }
    multiply(other: Vector): Vector {
        return new Vector(this.x * other.x, this.y * other.y)
    }
    divide(other: Vector): Vector {
        return new Vector(this.x / other.x, this.y / other.y)
    }
}

export { Vector }
