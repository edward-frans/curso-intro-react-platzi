import React from 'react';
import "../styles/CreateTodoButton.css"

function CreateTodoButton() {
  const onClickButton = (msg) => {
    alert(msg);
  }


  return (
    <button 
      className='CreateTodoButton'
      onClick={() => onClickButton("Aquí se debería abrir el modal")}
    >
      <p className='p-button'>Añadir nuevo TODO</p>
    </button>
  )
}

export {CreateTodoButton};