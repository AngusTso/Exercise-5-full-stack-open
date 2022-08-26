import React from 'react'
import { useState } from 'react'

const LoginForm = (props) => {
  return(
    <div>
      <h3>Login</h3>
      <form onSubmit={props.handleLogin}>
        <span>username</span><input type="text" id="username" value={props.username} name="username" onChange={({ target }) => {props.setName(target.value)}}></input><br/>
        <span>password</span><input type="text" id="password" value={props.password} name="password" onChange={({ target }) => {props.setPassword(target.value)}}></input>
        <br/><button type="submit" id="login_button">login</button>
      </form>
    </div>)
}

const BlogsForm = ({ addBlog }) => {
  const [newblog , setBlog] = useState({ title: '' , author:'', url:'' })
  const handleChange = e => setBlog(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

  const createBlog = (event) => {
    event.preventDefault()
    const newObj = {
      title: newblog.title,
      author: newblog.author,
      url: newblog.url,
      likes:0
    }
    addBlog(newObj)}
  return(
    <div>
      <h3>Blog Upload</h3>
      <form onSubmit={createBlog}>
        <span>title</span><input type="text" value={newblog.title} name="title" onChange={handleChange} id="title"></input><br/>
        <span>author</span><input type="text" value={newblog.author} name="author" onChange={handleChange} id="author"></input><br/>
        <span>url</span><input type="text" value={newblog.url} name="url" onChange={handleChange} id="url"></input><br/>
        <br/><button type="submit" id="blogSubmit">create</button>
      </form>
    </div>)
}

export { LoginForm , BlogsForm }