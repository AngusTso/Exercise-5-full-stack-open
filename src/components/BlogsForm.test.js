import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { LoginForm , BlogsForm} from './Form'
import userEvent from '@testing-library/user-event'

test('test blog form' , async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()
  render(<BlogsForm addBlog={createBlog}/>)
  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'testing a form...')
  await user.type(inputs[1], 'testing a form...')
  await user.type(inputs[2], 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
})