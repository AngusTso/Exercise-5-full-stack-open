import { forwardRef, useState , useImperativeHandle } from 'react'
import React from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible , setVisibility] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} id={props.label}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility} >Cancel</button>
      </div>
    </div>)
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  label: PropTypes.string.isRequired
}
export default Togglable