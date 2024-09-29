
// Generate Fibonacci numbers up to 1000
export const generate1000Fibonacci = (): number[] => {
    let fibonacciSet: number[] = [0]
    let a = 1
    let b = 1
    let c = a

    while (fibonacciSet.length < 1000) {
        fibonacciSet.push(a)
        c = a
        a = b
        b = c + b
    }
    return fibonacciSet
}

/**
 * Sorts a Map of numbers with their frequency count
 * in descending order based on frequency, and returns a formatted string representation.
 * 
 * @param frequencyMap 
 * @returns string of sorted frequencies
 */
export const formatFrequencies = (frequencyMap: Map<number, number>) => {
    const sortedEntries = Array.from(frequencyMap.entries()).sort((a, b) => b[1] - a[1])
    return sortedEntries.map(([num, freq]) => `${num}: ${freq}`).join(', ')
}

/**
 * Adds new number to the supplied frequency map
 * 
 * @param frequencyMap 
 * @param enteredNumber 
 * @returns new frequency map
 */
export const addToFrequencyMap = (frequencyMap: Map<number, number>, enteredNumber: number) => {
    const currentFrequency = frequencyMap.get(enteredNumber) || 0
    return new Map(frequencyMap.set(enteredNumber, currentFrequency + 1))
}


/**
 * Checks if a given string represents a valid positive number
 * and not an empty string or a string just containing just whitespace
 * 
 * @param value 
 * 
 * @returns true if the value is a positive number
 */
export const checkValidNumber = (value: string) => {
    if (!isNaN(Number(value)) && !!value && !/^\s*$/.test(value) && Number(value) > -1) {
        return true
    } else {
        return false
    }
}

/**
 * @param fibonacciNumbers 
 * @param enteredNumber 
 * @returns  if the supplied value is a fibonacci number or not
 */
export const isFibonacciNumber = (fibonacciNumbers: number[], enteredNumber: number) => {
    return fibonacciNumbers.findIndex((fibNumber) => fibNumber === enteredNumber) > -1
}

