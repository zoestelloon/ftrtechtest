import { checkValidNumber, formatFrequencies, generate1000Fibonacci } from "./utils"

describe('generate1000Fibonacci', () => {
    it('should generate an array of 1000 Fibonacci numbers', () => {
        const fibonacciNumbers = generate1000Fibonacci()
        expect(fibonacciNumbers.length).toBe(1000)
    })

    it('should start with the correct Fibonacci sequence', () => {
        const fibonacciNumbers = generate1000Fibonacci()
        expect(fibonacciNumbers[0]).toBe(0)
        expect(fibonacciNumbers[1]).toBe(1)
        expect(fibonacciNumbers[2]).toBe(1)
        expect(fibonacciNumbers[3]).toBe(2)
        expect(fibonacciNumbers[4]).toBe(3)
        expect(fibonacciNumbers[5]).toBe(5)
    })

    it('should generate the correct Fibonacci numbers', () => {
        const fibonacciNumbers = generate1000Fibonacci()
        expect(fibonacciNumbers[10]).toBe(55) // 10th Fibonacci number
        expect(fibonacciNumbers[20]).toBe(6765) // 20th Fibonacci number
        expect(fibonacciNumbers[30]).toBe(832040) // 30th Fibonacci number
    })

    it('should not contain duplicates except 1', () => {
        const fibonacciNumbers = generate1000Fibonacci().slice(1,)
        const uniqueNumbers = new Set(fibonacciNumbers)
        expect(uniqueNumbers.size).toBe(998)
    })
})

describe('checkValidNumber', () => {
    it('should return true for valid positive numbers', () => {
        expect(checkValidNumber('1')).toBe(true)
        expect(checkValidNumber('13')).toBe(true)
        expect(checkValidNumber('1.5')).toBe(true)
        expect(checkValidNumber(' 5')).toBe(true)
    })

    it('should return false for negative numbers', () => {
        expect(checkValidNumber('-3')).toBe(false)
        expect(checkValidNumber('-1')).toBe(false)
    })

    it('should return false for non-numeric strings', () => {
        expect(checkValidNumber('abc')).toBe(false)
        expect(checkValidNumber('')).toBe(false)
        expect(checkValidNumber(' ')).toBe(false)
    })
})
describe('formatFrequencies', () => {
    it('should format frequencies in descending order', () => {
        const frequencyMap = new Map([
            [1, 5],
            [2, 3],
            [3, 8],
        ])

        const result = formatFrequencies(frequencyMap)
        expect(result).toBe('3: 8, 1: 5, 2: 3')
    })

    it('should return an empty string for an empty Map', () => {
        const frequencyMap = new Map()
        const result = formatFrequencies(frequencyMap)
        expect(result).toBe('')
    })

    it('should handle single entry correctly', () => {
        const frequencyMap = new Map([[1, 10]])
        const result = formatFrequencies(frequencyMap)
        expect(result).toBe('1: 10')
    })
})