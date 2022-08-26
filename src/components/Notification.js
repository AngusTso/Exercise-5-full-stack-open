import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return (
      <div></div>
    )
  }
  //style for fail and sucess operations
  const successstyle = {
    border: '5px solid green',
    borderRadius: '5px',
    backgroundColor: 'grey',
    color: '#006400',
    fontSize: 24,
    padding: '5px',
  }
  const failedstyle = {
    border: '5px solid red',
    borderRadius: '5px',
    backgroundColor: 'grey',
    color:'#8B0000',
    fontSize: 24,
    padding: '5px',
  }
  //render based on status of notification
  if(message.status === 'success'){
    return (
      <div className="error" style={successstyle}>
        {message.message}
      </div>
    )
  }
  else if(message.status === 'fail'){
    return (
      <div className="error" style={failedstyle}>
        {message.message}
      </div>
    )
  }
  else{
    return (
      <div className="error">
        {message.message}
      </div>
    )
  }
}

export default Notification