import { pythagorean } from "./geometry"



class Vector{
    private _x: number
    private _y: number
    private _magnitude: number
    private _angle: number

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
        this._magnitude = pythagorean(x, y)
        this._angle = Math.atan2(y, x)
    }
    get x() { return this._x }
    get y() { return this._y }
    get magnitude() { return this._magnitude }
    get angle() { return this._angle }

    set x(value: number) {
        this._x = value
        this._magnitude = pythagorean(this._x, this._y)
        this._angle = Math.atan2(this._y, this._x)
    }
    set y(value: number) {
        this._y = value
        this._magnitude = pythagorean(this._x, this._y)
        this._angle = Math.atan2(this._y, this._x)
    }
    set magnitude(value: number) {
        if (value < 0)
            throw new Error("Magnitude cannot be negative")

        this._magnitude = value
        this._x = this._magnitude * Math.cos(this._angle)
        this._y = this._magnitude * Math.sin(this._angle)
    }
    set angle(value: number) {
        this._angle = value
        this._x = this._magnitude * Math.cos(this._angle)
        this._y = this._magnitude * Math.sin(this._angle)
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
