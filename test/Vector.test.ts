import { test, expect } from 'vitest'
import { Vector } from '../src/Vector'

test("Vector construction", () => {
    const v = new Vector(3, 4)
    expect(v.magnitude).toBe(5)
    expect(v.angle).toBeCloseTo(0.927)
})
