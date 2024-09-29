import React from 'react'
import { useState } from 'react'
import { TaskTimer } from 'tasktimer';

export type TimerState = 'IDLE' | 'RUNNING' | 'PAUSED'

const useTimer = (initialSeconds: string) => {
    const [tickCount, setTickCount] = useState<number>(0)
    const [timerState, setTimerState] = useState<TimerState>('IDLE')
    const timer = React.useRef(new TaskTimer())

    const startTimer = () => {
        // set the timer to have a tick every x seconds (from the user input)
        timer.current.interval = Number(initialSeconds) * 1000
        // every tick of the timer update the a state tick value 
        timer.current.on('tick', () => {
            setTickCount(timer.current.tickCount)
        }, [])
        setTimerState('RUNNING')
        timer.current.start()
    }

    const timerPause = () => {
        if (timerState === 'RUNNING') {
            timer.current.pause()
            setTimerState('PAUSED')
        }
    }

    const timerResume = () => {
        if (timerState === 'PAUSED') {
            timer.current.resume()
            setTimerState('RUNNING')
        }
    }

    return {
        tickCount,
        timerState,
        startTimer,
        timerPause,
        timerResume
    }
}

export default useTimer