import React from 'react';
import "../styles/TodoItem.css"

function TodoItem(props) {
  
  return (
    <li className='TodoItem'>
      <span className={`Check ${props.completed && "Check-active"}`} onClick={props.onComplete}>√</span>
      <p className={`TodoItem-p ${props.completed && 'TodoItem-p-active'}`}> {props.text} </p>
      <span className={`Delete`} onClick={props.onDelete}>X</span>
    </li>
  )
}

export {TodoItem};