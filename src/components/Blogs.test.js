import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../../../../bloglist-frontend/src/components/Blog'
import userEvent from '@testing-library/user-event'

test('renders content and check if the content shown is right', () => {
  const user = '62fa07ef1a0ae2453125b719'
  const blog = {
    id:'62fba2961d4bf7f104904a72',
    title:'Login in frontend',
    url:'https://fullstackopen.com/en/part5/login_in_frontend',
    author:'Angus',
    likes:4,
    user:'62fa07ef1a0ae2453125b719'
  }
  const likeBlog = jest.fn()
  const deleteBlog = jest.fn()

  const { container } =  render(<Blog key={blog.id} user={user} blog={blog} likeBlog={likeBlog} deleteOP={deleteBlog}/>)
  const div = container.querySelector('.title')
  expect(div).toHaveTextContent('Login in frontend')
}
)

test('user pressed show button should show the correct detail' , async () => {
  const user = '62fa07ef1a0ae2453125b719'
  const blog = {
    id:'62fba2961d4bf7f104904a72',
    title:'Login in frontend',
    url:'https://fullstackopen.com/en/part5/login_in_frontend',
    author:'Angus',
    likes:4,
    user:'62fa07ef1a0ae2453125b719'
  }
  const likeBlog = jest.fn()
  const deleteBlog = jest.fn()
  const { container } = render(<Blog key={blog.id} user={user} blog={blog} likeBlog={likeBlog} deleteOP={deleteBlog}/>)

  const dummy = userEvent.setup()
  const button = screen.getByText('view')
  dummy.click(button)

  const div = container.querySelector('.show')
  expect(div).toHaveTextContent('https://fullstackopen.com/en/part5/login_in_frontend')
  expect(div).toHaveTextContent('4')
})

test('user pressed show button should show the correct detail' , async () => {
  const user = '62fa07ef1a0ae2453125b719'
  const blog = {
    id:'62fba2961d4bf7f104904a72',
    title:'Login in frontend',
    url:'https://fullstackopen.com/en/part5/login_in_frontend',
    author:'Angus',
    likes:4,
    user:'62fa07ef1a0ae2453125b719'
  }
  const handleClick = jest.fn()
  render(<Blog key={blog.id} user={user} blog={blog} Likes={handleClick} likeBlog={handleClick} deleteOP={handleClick}/>)
  const dummy = userEvent.setup()
  const button = screen.getByText('view')
  dummy.click(button)
  dummy.click(screen.getByText('like'))
  dummy.click(screen.getByText('like'))
  expect(handleClick).toHaveBeenCalledTimes(2)
})

