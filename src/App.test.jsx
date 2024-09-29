import React, { act } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { App } from './App'

describe('App Component', () => {

    let inputField, enterButton, secondsInput, startButton, pauseButton, resumeButton
    window.alert = jest.fn()
    delete window.location;
    window.location = { reload: jest.fn() }

    beforeEach(() => {
        render(<App />)
        inputField = screen.getByPlaceholderText('Enter value')
        enterButton = screen.getByText('Enter')
        secondsInput = screen.getByPlaceholderText('Enter seconds')
        startButton = screen.getByText('Start')
    })

    test('should render initial elements', () => {
        expect(screen.getByPlaceholderText(/Enter seconds/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Enter value/i)).toBeInTheDocument()
    })

    test('should update seconds input', () => {
        fireEvent.change(secondsInput, { target: { value: '5' } })
        expect(secondsInput).toHaveValue(5)
    })

    test('should start the timer when valid seconds are entered and start outputting', async () => {
        expect(screen.getByText('Please enter a number')).toBeInTheDocument()

        act(() => {
            fireEvent.change(secondsInput, { target: { value: '2' } })
            fireEvent.click(startButton)
        })

        // check immediately
        expect(screen.queryByText(/No values entered/i)).not.toBeInTheDocument()

        // check after 2 seconds
        await act(async () => {
            await wait(2100)
        })  
        expect(screen.getByText(/No values entered/i)).toBeInTheDocument()
    })

    test('should pause and resume the timer', async () => {

        await act(async () => {
            fireEvent.change(secondsInput, { target: { value: '1' } })
            fireEvent.click(startButton)
            await wait(1100)
        })
        // every tick that the user hasn't entered a value 'No valued entered' will be added to the output array
        expect(screen.getByText(/No values entered/i)).toBeInTheDocument()

        pauseButton = screen.getByText('Pause')
        resumeButton = screen.getByText('Resume')

        act(() => {   
            fireEvent.click(pauseButton)
        })

        waitFor(() => {
            expect(pauseButton).toBeDisabled()
            expect(resumeButton).toBeEnabled()
        }) 

        await act(async () => {
            await wait(1100)
        })        
        // should still only have 1 'No values entered' in the document as the timer is paused
        expect(screen.getByText(/No values entered/i)).toBeInTheDocument()

        fireEvent.click(resumeButton)
        waitFor(() => {
            expect(pauseButton).toBeEnabled()
            expect(resumeButton).toBeDisabled()
        })

        await act(async () => {
            await wait(1200)
        }) 
        // after resuming the times, another line of 'No values entered' is added
        expect(screen.getByText(/No values entered No values entered/i)).toBeInTheDocument()
    })

    test('should log frequencies correctly when valid numbers are entered', async () => {
        await act(async () => {
            fireEvent.change(secondsInput, { target: { value: '1' } })
            fireEvent.click(startButton)
            fireEvent.change(inputField, { target: { value: "7" } })
            fireEvent.click(enterButton)
            await wait(1200)
        })
        
        expect(screen.getByText(/Outputs/i)).toBeInTheDocument()
        expect(screen.getByText(/7: 1/i)).toBeInTheDocument()
    })

    test('should log frequencies correctly when multiple valid numbers are entered', async () => {
        await act(async () => {
            fireEvent.change(secondsInput, { target: { value: '1' } })
            fireEvent.click(startButton)
            fireEvent.change(inputField, { target: { value: "7" } })
            fireEvent.click(enterButton)
            fireEvent.change(inputField, { target: { value: "7" } })
            fireEvent.click(enterButton)
            fireEvent.change(inputField, { target: { value: "6" } })
            fireEvent.click(enterButton)
            fireEvent.change(inputField, { target: { value: "9" } })
            fireEvent.click(enterButton)
            fireEvent.change(inputField, { target: { value: "14" } })
            fireEvent.click(enterButton)
            await wait(1200)
        })
        
        expect(screen.getByText(/Outputs/i)).toBeInTheDocument()
        expect(screen.getByText(/7: 2, 6: 1, 9: 1, 14: 1/i)).toBeInTheDocument()
    })

    test('should show error for invalid number input', async () => {
        await act(async () => {
            fireEvent.change(secondsInput, { target: { value: '1' } })
            fireEvent.click(startButton)
            fireEvent.change(inputField, { target: { value: 'invalid' } })
            fireEvent.click(enterButton)
            await wait(1200)
        })
        
        expect(screen.getByText('Please enter a valid input')).toBeInTheDocument()
    })

    test('should show an alert when a fibonacci number is entered', async () => {
        await act(async () => {
            fireEvent.change(secondsInput, { target: { value: '1' } })
            fireEvent.click(startButton)
            fireEvent.change(inputField, { target: { value: '3' } })
            fireEvent.click(enterButton)
            await wait(1200)
        })

        expect(window.alert).toHaveBeenCalledWith('FIB')
    })

    test('should handle quit command', async () => {
        await act(async () => {
            fireEvent.change(secondsInput, { target: { value: '1' } })
            fireEvent.click(startButton)
            fireEvent.change(inputField, { target: { value: "7" } })
            fireEvent.click(enterButton)
            // Trigger quit command
            fireEvent.change(inputField, { target: { value: 'quit' } })
            fireEvent.click(enterButton)
            await wait(1200)
        })

        expect(window.alert).toHaveBeenCalledWith(`7: 1\nThank you for playing`)
        expect(window.location.reload).toHaveBeenCalled()
    })
})

function wait(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds)
    })
  }
  
