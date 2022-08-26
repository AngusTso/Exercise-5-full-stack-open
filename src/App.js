import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import React from 'react'
import { LoginForm , BlogsForm } from './components/Form'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
  const [user , setUser] = useState(null)
  const [message , setMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await blogService.Login({ username, password })
      const newMessage = { status:'success' , message:'Login successful' }
      setMessage(newMessage)
      setTimeout(() => {setMessage(null)}, 5000)
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    }
    catch(err){
      const newMessage = { status: 'fail' , message:'wrong username or password' }
      setMessage(newMessage)
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }
  const addBlog = async (blogObj) => {
    try{
      const response = await blogService.Create(blogObj)
      console.log(response)
      const newBlog = {
        ...blogObj,
        user: response.user,
        _id: response._id,
      }
      const newList = blogs.concat(newBlog).sort((a,b) => b.likes - a.likes)
      setBlogs(newList)
      console.log(newList)
      const newMessage = { status: 'success' , message:'Blogs Created' }
      setMessage(newMessage)
      setTimeout(() => {setMessage(null)}, 5000)
    }
    catch(err){
      const newMessage = { status: 'fail' , messsage:'Internal server error' }
      setMessage(newMessage)
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }
  const likeBlog = async (blogObj) => {
    try{
      await blogService.Update(blogObj , blogObj._id)
      const newBlog = {
        ...blogObj,
      }
      const newList = blogs.filter(blog => blog._id !== blogObj._id).concat(newBlog).sort((a,b) => b.likes - a.likes)
      setBlogs(newList)
      const newMessage = { status: 'success' , message:'Liked Blog' }
      setMessage(newMessage)
      setTimeout(() => {setMessage(null)}, 5000)
    }
    catch(err){
      const newMessage = { status: 'fail' , messsage:'Like failed' }
      setMessage(newMessage)
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }
  const FullBlog = () => {
    return(
      <Togglable label="Create_Blog">
        <BlogsForm addBlog={addBlog}/>
      </Togglable>
    )
  }
  const logout = () => {
    window.localStorage.clear()
    const newMessage = { status: 'success' , message:'Logged out' }
    setMessage(newMessage)
    setTimeout(() => {setMessage(null)}, 5000)
    setUser(null)
  }
  const deleteBlog = async (id) => {
    try{
      await blogService.Delete(id)
      const newList = blogs.filter(blog => blog._id !== id).sort((a,b) => b.likes - a.likes)
      setBlogs(newList)
      const newMessage = { status: 'success' , message:'Deleted Blog' }
      setMessage(newMessage)
      setTimeout(() => {setMessage(null)}, 5000)
    }
    catch(err){
      const newMessage = { status: 'fail' , messsage:'Delete operation failed' }
      setMessage(newMessage)
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }
  useEffect(() => {
    try{
      blogService.getAll().then(blogs =>
      {
        const bloglist = blogs.sort((a,b) => b.likes - a.likes)
        console.log(bloglist)
        setBlogs(bloglist)
      }
      )
      const newMessage = { status: 'success' , message:'Blog loaded' }
      setMessage(newMessage)
      setTimeout(() => {setMessage(null)}, 5000)
      const loggedUserJSON = window.localStorage.getItem('user')
      if(loggedUserJSON){
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    }
    catch (err){
      const newMessage = { status: 'fail' , message:'Can\'t load Resource' }
      setMessage(newMessage)
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      {user === null ?
        <LoginForm handleLogin={handleLogin} setPassword={setPassword} setName={setUsername} username={username} password={password} /> :
        <div>
          <p>{user.username} is logged in</p>
          <button onClick={() => logout()}>Log out</button>
          <FullBlog />
        </div>
      }
      {blogs.map(blog =>
        <span key={blog._id}><Blog  user={user} blog={blog} likeBlog={likeBlog} deleteOP={deleteBlog}/></span>
      )}
    </div>
  )
}

export default App
