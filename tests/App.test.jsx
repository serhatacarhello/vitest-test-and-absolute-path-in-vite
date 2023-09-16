import { render, screen } from '@testing-library/react'
import App from '../src/App'
import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('App', () => {
  it('renders headline', () => {
    render(<App />)
    const headline = screen.getByText(/Vite React/i)
    expect(headline).toBeInTheDocument()
  })

  it('renders counter', async () => {
    render(<App />)
    const user = userEvent.setup()
    const counterBtn = screen.getByRole('button')
    await user.click(counterBtn)

    // Expect counter to increment to '1'
    expect(counterBtn).toHaveTextContent('1')

    await user.dblClick(counterBtn)
    expect(counterBtn).toHaveTextContent('3')
  })
})
