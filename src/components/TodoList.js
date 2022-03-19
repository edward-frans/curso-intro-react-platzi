import React from 'react';
// import { TodoItem } from "./TodoItem";
import "../styles/TodoList.css";

function TodoList(props) {
  return (
    <section className='TodoList' >
      <ul className='TodoList-ul'>
        {props.children}
      </ul>
    </section>
  )
}

export {TodoList};