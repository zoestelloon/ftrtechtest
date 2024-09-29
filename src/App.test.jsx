import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { App } from './App'
import { checkValidNumber } from './utils'

// Mock TaskTimer to control its behavior during tests
// jest.mock('@Containers/job-page/tabs/details/components/JobDetailsFormUtils', () => ({
//     ...(jest.requireActual('@Containers/job-page/tabs/details/components/JobDetailsFormUtils') as object),
// }))  
// jest.mock('tasktimer', () => {
//     return {
//         TaskTimer: jest.fn().mockImplementation(() => {
//             return {
//                 start: jest.fn(),
//                 pause: jest.fn(),
//                 resume: jest.fn(),
//                 on: () => { },
//                 interval: 1000,
//                 tickCount: 0,
//             }
//         }),
//     }
// })

describe('App Component', () => {

    let inputField, enterButton, secondsInput, startButton, pauseButton, resumeButton

    beforeEach(() => {
        render(<App />)
        inputField = screen.getByPlaceholderText('Enter value')
        enterButton = screen.getByText('Enter')
        secondsInput = screen.getByPlaceholderText('Enter seconds')
        startButton = screen.getByText('Start')
    })

    // test('should render initial elements', () => {
    //     expect(screen.getByPlaceholderText(/Enter seconds/i)).toBeInTheDocument()
    //     expect(screen.getByPlaceholderText(/Enter value/i)).toBeInTheDocument()
    // })

    test('should update seconds input', () => {
        fireEvent.change(secondsInput, { target: { value: '5' } })
        expect(secondsInput).toHaveValue(5)
    })

    test('should start the timer when valid seconds are entered and start outputting', async () => {
        expect(screen.getByText('Please enter a number')).toBeInTheDocument()

        act(() => {
            fireEvent.change(secondsInput, { target: { value: '3' } })
            fireEvent.click(startButton)
        })
        // Verify that the timer start method is called, by output log having value after 3 seconds

        // check immediately
        expect(screen.queryByText('No values entered')).not.toBeInTheDocument()

        // check after 3 seconds
        await wait(3000)
        expect(screen.getByText('No values entered')).toBeInTheDocument()
    })

    test.only('should pause and resume the timer', async () => {

        act(() => {
            fireEvent.change(secondsInput, { target: { value: '3' } })
            fireEvent.click(startButton)
        })

        await wait(3000)
        expect(screen.getByText('No values entered')).toBeInTheDocument()

        pauseButton = screen.getByText('Pause')
        resumeButton = screen.getByText('Resume')

        act(() => {   
            fireEvent.click(pauseButton)
        })

        waitFor(() => {
            expect(pauseButton).toBeDisabled()
            expect(resumeButton).toBeEnabled()
        }) 

        await wait(3000)
        expect(screen.getByText('No values entered')).toBeInTheDocument()

        fireEvent.click(resumeButton)
        waitFor(() => {
            expect(pauseButton).toBeEnabled()
            expect(resumeButton).toBeDisabled()
        })
        await wait(5000)
        expect(screen.getByText('No values entered')).toBeInTheDocument()
    })

    test('should log frequencies correctly when valid numbers are entered', () => {
        
        fireEvent.change(inputField, { target: { value: '0' } })
        fireEvent.click(enterButton)
        
        expect(screen.getByText(/Outputs/i)).toBeInTheDocument()
        expect(screen.getByText(/0: 1/i)).toBeInTheDocument()
    })

    test('should show error for invalid number input', () => {

        fireEvent.change(inputField, { target: { value: 'invalid' } })
        fireEvent.click(enterButton)
        
        expect(screen.getByText('Please enter a valid input')).toBeInTheDocument()
    })

    test('should handle quit command', () => {

        // Trigger quit command
        fireEvent.change(inputField, { target: { value: 'quit' } })
        fireEvent.click(enterButton)

        // Expect reload to be called
        expect(window.location.reload).toHaveBeenCalled()
    })
})

function wait(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds)
    })
  }
  
