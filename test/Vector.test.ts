import { test, expect, describe, beforeEach } from 'vitest'
import { Vector } from '../src/lib/math/Vector'


test("construction", () => {
    const v = new Vector(3, 4)
    expect(v.magnitude).toBe(5)
    expect(v.angle).toBeCloseTo(0.927)
})
describe("arithmetic operations", () => {
    describe("addition", () => {
        const v1 = new Vector(3,4)
        const v2 = new Vector(2,3)
        const v3 = v1.add(v2)
    
        test("correct calculation", () => {
            expect(v3.x).toBe(5)
            expect(v3.y).toBe(7)
            expect(v3.magnitude).toBeCloseTo(8.6)
            expect(v3.angle).toBeCloseTo(0.95)    
        })
        test("immutability of operands preserved", () =>{ 
            expect(v1.x).toBe(3)
            expect(v1.y).toBe(4)
            expect(v1.magnitude).toBe(5)
            expect(v1.angle).toBeCloseTo(0.927)
            expect(v2.x).toBe(2)
            expect(v2.y).toBe(3)
            expect(v2.magnitude).toBeCloseTo(3.61)
            expect(v2.angle).toBeCloseTo(0.982)
        })
    })
    describe("subtraction", () => {
        const v1 = new Vector(3,4)
        const v2 = new Vector(2,3)
        const v3 = v1.subtract(v2)
        
        test("correct calculation", () => {
            expect(v3.x).toBe(1)
            expect(v3.y).toBe(1)
            expect(v3.magnitude).toBeCloseTo(1.41)
            expect(v3.angle).toBeCloseTo(Math.PI/4)   
        })
        test("immutability of operands preserved", () => {
            expect(v1.x).toBe(3)
            expect(v1.y).toBe(4)
            expect(v1.magnitude).toBe(5)
            expect(v1.angle).toBeCloseTo(0.927)
            expect(v2.x).toBe(2)
            expect(v2.y).toBe(3)
            expect(v2.magnitude).toBeCloseTo(3.61)
            expect(v2.angle).toBeCloseTo(0.982)
        })
    })
    describe("multiplication", () => {
        const v1 = new Vector(3,4)
        const v2 = new Vector(2,2)
        const v3 = v1.multiply(v2)
        
        test("correct calculation", () => {
            expect(v3.x).toBe(6)
            expect(v3.y).toBe(8)
            expect(v3.magnitude).toBeCloseTo(10)
            expect(v3.angle).toBeCloseTo(0.927)
        })
        test("immutability of operands preserved", () => {
            expect(v1.x).toBe(3)
            expect(v1.y).toBe(4)
            expect(v1.magnitude).toBe(5)
            expect(v1.angle).toBeCloseTo(0.927)
            expect(v2.x).toBe(2)
            expect(v2.y).toBe(2)
            expect(v2.magnitude).toBeCloseTo(2.83)
            expect(v2.angle).toBeCloseTo(0.785)
        })
    })
    describe("division", () => {
        const v1 = new Vector(3,4)
        const v2 = new Vector(1,1)
        const v3 = v1.divide(v2)
    
        test("correct calculation", () => {
            expect(v3.x).toBe(3)
            expect(v3.y).toBe(4)
            expect(v3.magnitude).toBeCloseTo(5)
            expect(v3.angle).toBeCloseTo(0.927)
        })
        test("immutability of operands preserved", () => {
            expect(v1.x).toBe(3)
            expect(v1.y).toBe(4)
            expect(v1.magnitude).toBe(5)
            expect(v1.angle).toBeCloseTo(0.927)
            expect(v2.x).toBe(1)
            expect(v2.y).toBe(1)
            expect(v2.magnitude).toBeCloseTo(1.41)
            expect(v2.angle).toBeCloseTo(0.785)
        })
    })    
})
describe("side effects", () => {
    let v1: Vector

    beforeEach(() => {
        v1 = new Vector(3,4)
    })

    test("set x synchronizes magnitude and angle", () => {
        v1.x += 1
        expect(v1.x).toBe(4)
        expect(v1.y).toBe(4)
        expect(v1.magnitude).toBeCloseTo(5.656)
        expect(v1.angle).toBeCloseTo(Math.PI/4)
    })
    test("set y synchronizes magnitude and angle", () => {
        v1.y += 1
        expect(v1.x).toBe(3)
        expect(v1.y).toBe(5)
        expect(v1.magnitude).toBeCloseTo(5.83)
        expect(v1.angle).toBeCloseTo(1.03)
    })
    test("set magnitude synchronizes x and y", () => {
        v1.magnitude += 1
        expect(v1.x).toBeCloseTo(3.6)
        expect(v1.y).toBeCloseTo(4.8)
        expect(v1.magnitude).toBeCloseTo(6)
        expect(v1.angle).toBeCloseTo(0.93)
    })
    test("set angle synchronizes x and y", () => {
        v1.angle += Math.PI/6
        expect(v1.x).toBeCloseTo(0.60)
        expect(v1.y).toBeCloseTo(4.96)
        expect(v1.magnitude).toBeCloseTo(5)
        expect(v1.angle).toBeCloseTo(1.45)
    })
})



