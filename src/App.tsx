import React, { useState } from 'react'
import useTimer from './timer'
import { generate1000Fibonacci, formatFrequencies, checkValidNumber, addToFrequencyMap, isFibonacciNumber } from './utils'

export const App: React.FC = () => {
    // use a ref as this should never change and then doesn't need to be regenerated
    const fibonacciNumbers = React.useRef(generate1000Fibonacci())

    const [input, setInput] = useState<string>('')
    const [inputError, setInputError] = useState<boolean>(false)
    const [seconds, setSeconds] = useState<string>('')
    const [frequencyMap, setFrequencyMap] = useState<Map<number, number>>(new Map())
    const [outputLog, setOutputLog] = useState<string[]>([])
    
    const { tickCount, timerState, startTimer, timerPause, timerResume } = useTimer(seconds)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleNumberInputEnter = (e: React.FormEvent) => {
        e.preventDefault()
        const enteredValue = input.trim()
        setInputError(false)

        if (enteredValue === 'quit') {
            alert(`${formatFrequencies(frequencyMap).toString()}\nThank you for playing`)
            window.location.reload()
        }
        else if (checkValidNumber(enteredValue)) {
            const enteredNumber = Number(enteredValue)
            setFrequencyMap(addToFrequencyMap(frequencyMap, enteredNumber))

            if (isFibonacciNumber(fibonacciNumbers.current, enteredNumber)) {
                alert('FIB')
            }
        } else {
            setInputError(true)
        }

        setInput('')
    }

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === '') {
            setSeconds('')
            return
        }
        if (checkValidNumber(value)) {
            setSeconds(value)
        }
    }

    /** 
     * This listens to the tick count and on every update
     * Format what is in the frequencyMap or add a null value
     * and update the outputLog value 
     */
    React.useEffect(() => {
        // don't add any values to the output map until the timer has started
        if (tickCount > 0) {
            if (frequencyMap.size === 0) {
                // NOTE: i would consult with a designer here on what is best for the product as to if it is better to 
                // have an output every tick, to indicate the timer is running or 
                // have a more static value that is just displayed 'No value entered' until there is an input 
                // or if there should be a timer countdown
                setOutputLog([...outputLog, 'No values entered'])
            } else {
                setOutputLog([...outputLog, formatFrequencies(frequencyMap).toString()])
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tickCount])


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2>Zoe Stelloon Test</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4>Please input the amount of time in seconds between emitting numbers and their frequency:</h4>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                    <input 
                        type="number" 
                        value={seconds} 
                        onChange={handleSecondsChange} 
                        placeholder="Enter seconds" 
                        required 
                        disabled={timerState !== 'IDLE'}
                    />
                    </div>

                    <div style={{ marginLeft: '10px', display: 'flex', gap: '10px' }} >
                        { timerState === 'IDLE' && 
                            <button type='button' disabled={!checkValidNumber(seconds)} onClick={startTimer}>Start</button>
                        }
                        { timerState !== 'IDLE' && <>
                            <button type='button' onClick={timerPause} disabled={timerState === 'PAUSED'}>Pause</button>
                            <button type='button' onClick={timerResume} disabled={timerState === 'RUNNING'}> Resume </button>
                        </>}
                    </div>

                </div>
            </div>
            <div>
                <h4>Please enter the {frequencyMap.size === 0 ? 'first' : 'next'} number or quit to finish</h4>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column',  gap: '5px' }}>
                        <div>
                            <input 
                                type="string" 
                                value={input} 
                                onChange={handleInputChange} 
                                placeholder="Enter value" 
                                required 
                                disabled={timerState === 'IDLE'}
                            />
                            <button 
                                type='button'
                                disabled={timerState === 'IDLE'}
                                onClick={handleNumberInputEnter}
                                style={{ marginLeft: '10px' }}
                            >
                                Enter
                            </button>
                        </div>
                        <span>{inputError && 'Please enter a valid input'}</span>
                    </div>

                </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column',  gap: '5px', whiteSpace: 'pre-line' }}>
                <h2>Outputs</h2>
                {outputLog.length > 0 && outputLog.join('\n')}
                {outputLog.length === 0 && <div>Please enter a number</div> }
            </div>

        </div>
    )
}
