import { renderHook } from "@testing-library/react"
import { act } from 'react'
import useTimer from './timer'


describe('useTimer hook', () => {
  it('should initialize with IDLE state and 0 tickCount', () => {
    const { result } = renderHook(() => useTimer('1'))

    // Check initial state
    expect(result.current.timerState).toBe('IDLE')
    expect(result.current.tickCount).toBe(0)
  })

  it('should start the timer when startTimer is called', () => {
    const { result } = renderHook(() => useTimer('1'))

    // Call startTimer
    act(() => {
      result.current.startTimer()
    })

    // Check that timer state is "RUNNING"
    expect(result.current.timerState).toBe('RUNNING')
  })

  it('should update tickCount when the timer ticks', async () => {
    const { result } = renderHook(() => useTimer('1'))

    // Call startTimer
    act(() => {
      result.current.startTimer()
    })

    await act(async () => {
        await wait(3000)
    }) 

    // Check if tickCount updates after the tick
    expect(result.current.tickCount).toBe(3)
  })

  it('should pause the timer when timerPause is called', () => {
    const { result } = renderHook(() => useTimer('1'))

    // Start the timer first
    act(() => {
      result.current.startTimer()
    })

    // Pause the timer
    act(() => {
      result.current.timerPause()
    })

    // Check that timer state is "PAUSED"
    expect(result.current.timerState).toBe('PAUSED')
  })

  it('should resume the timer when timerResume is called', () => {
    const { result } = renderHook(() => useTimer('1'))

    // Start and pause the timer
    act(() => {
      result.current.startTimer()
    })
    act(() => {
      result.current.timerPause()
    })

    // Resume the timer
    act(() => {
      result.current.timerResume()
    })

    // Check that timer state is "RUNNING"
    expect(result.current.timerState).toBe('RUNNING')
  })
})

function wait(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds)
    })
  }
