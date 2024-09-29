
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
 * Checks if a given string represents a valid positive number. 
 * 
 * @param value 
 * 
 * @returns true if the value is a postive number
 */
export const checkValidNumber = (value: string) => {
    if (!isNaN(Number(value)) && Number(value) > 0) {
        return true
    } else {
        return false
    }
}

