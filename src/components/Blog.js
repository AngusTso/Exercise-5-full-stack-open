import { useState } from 'react'

const Blog = ({ blog , likeBlog , user, deleteOP }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible , setVisibility] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  let userCorrect = false

  try{
    if(user === null || blog.user._id === null) {
      userCorrect = false
    }else{
      userCorrect = user._id === blog.user._id ? true : false
    }
  }
  catch(err){
    userCorrect = false
  }

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  const Likes = () => {
    const newObj = {
      ...blog,
      likes: blog.likes + 1
    }
    likeBlog(newObj)
  }

  const deleteBlog = () => {
    if(window.confirm('Are you sure you want to delete this')){
      deleteOP(blog._id)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='title'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} id='view'>view</button>
      </div>
      <div style={showWhenVisible} className='show'>
        {blog.title}  <button onClick={toggleVisibility} >hide</button><br/>
        {blog.url} <br/>
        {blog.likes} <button onClick={Likes} id="likeButton">like</button> <br/>
        {blog.author} <br/>
        {userCorrect && <span><button onClick={deleteBlog} id="deleteButton">Delete</button> <br/></span>}
        <div>

        </div>
      </div>
    </div>
  )}


export default Blog