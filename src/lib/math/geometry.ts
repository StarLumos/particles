import { Vector } from "./Vector"

function pythagorean(a: number, b: number) {
    return Math.sqrt(a**2 + b**2)
}

function distance(a: Vector, b: Vector) {
    return pythagorean(b.x - a.x, b.y - a.y)
}

export { pythagorean, distance }
