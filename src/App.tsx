import React, { useState } from 'react'
import { TaskTimer } from 'tasktimer';
import { generate1000Fibonacci, formatFrequencies, checkValidNumber } from './utils'

type timerState = 'IDLE' | 'RUNNING' | 'PAUSED'

export const App: React.FC = () => {
    const [input, setInput] = useState<string>('')
    const [inputError, setInputError] = useState<boolean>(false)
    const [frequencyMap, setFrequencyMap] = useState<Map<number, number>>(new Map())
    const [seconds, setSeconds] = useState<string>('')
    const [secondError, setSecondError] = useState<boolean>(false)
    const [outputLog, setOutputLog] = useState<string[]>([])
    const [tickCount, setTickCount] = useState<number>(0)
    const [timerState, setTimerState ] = useState<timerState>('IDLE')

    const timer = React.useRef(new TaskTimer())
    const fibonacciNumbers = React.useRef(generate1000Fibonacci())

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleNumberInputEnter = (e: React.FormEvent) => {
        e.preventDefault()
        const value = input.trim()
        setInputError(false)

        if (value === 'quit') {
            alert(`Thank you for playing`)
            window.location.reload()
        }
        else if (checkValidNumber(value)) {
            const num = Number(value);
            const currentFrequency = frequencyMap.get(num) || 0

            setFrequencyMap(new Map(frequencyMap.set(num, currentFrequency + 1)))

            if (fibonacciNumbers.current.findIndex((x) => x === num) > -1) {
                alert('FIB')
            }
        } else {
            setInputError(true)
        }

        setInput('')
    }

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSecondError(false)
        if (value === '') {
            setSeconds('')
            return
        }
        if (checkValidNumber(value)) {
            setSeconds(value)
        } else {
            setSecondError(true)
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
                setOutputLog([...outputLog, 'No values entered'])
            } else {
                setOutputLog([...outputLog, formatFrequencies(frequencyMap).toString()])
            }
        }

    }, [tickCount])

    const startTimer = () => {
        // set the timer to have a tick every x seconds (from the user input)
        timer.current.interval = Number(seconds) * 1000
        // every tick of the timer update the a state tick value 
        timer.current.on('tick', () => {
            setTickCount(timer.current.tickCount)
        }, [frequencyMap.size])
        setTimerState('RUNNING')
        timer.current.start()
    }

    const timerPause = () => {
        timer.current.pause()
        setTimerState('PAUSED')
    }

    const timerResume = () => {
        timer.current.resume()
        setTimerState('RUNNING')
    }


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
                    <span>{secondError && 'Please enter a valid input'}</span>
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
                <h4>Please enter the {frequencyMap.size == 0 ? 'first' : 'next'} number or quit to finish</h4>
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
                {outputLog.length == 0 && <div>Please enter a number</div> }
            </div>

        </div>
    )
}