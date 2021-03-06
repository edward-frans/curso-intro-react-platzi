import React, {useState, useEffect} from 'react';
import {TodoCounter} from './components/TodoCounter.js';
import {CreateTodoButton} from './components/CreateTodoButton.js';
import {TodoList} from './components/TodoList.js';
import {TodoSearch} from './components/TodoSearch.js';
import {TodoItem} from './components/TodoItem.js';

// const defaultTodos = [
//   { text: "Hacer ejercicio", completed: true},
//   { text: "Tomar agua ", completed: false},
//   { text: "Dormir", completed: false}
// ];

// import './App.css';

function useLocalStorage(itemName, initialValue){
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
  
        if(!localStorageItem){
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
  
        setItem(parsedItem);
        setLoading(false);  
      } catch (error) {
        setError(error);
      }

      
    }, 2000);
  })

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  }

  return {
    item,
    saveItem,
    loading,
    error,
  };
}

let loading
let error

function App() {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  }= useLocalStorage("TODOS_V1", []);

  

  const [searchValue, setSearchValue] = useState("");
  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;


  let searchedTodos = [];

  if(!searchValue.length >= 1){
    searchedTodos = todos
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText)

    })
  }

  
  



  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  }

  useEffect(() => {
    console.log("useEffect");
  }, [totalTodos]);


  return (
    <>
      <TodoCounter 
        total={totalTodos}
        completed={completedTodos}
      />
      <TodoSearch 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <TodoList>
        {error && <p>Hubo un error...</p>}
        {loading && <p>Cargando...</p>}
        {(!loading && !searchedTodos.length) && <p>Crea tu primer TODO!</p>}

        {searchedTodos.map(todo => (
          <TodoItem 
            key={todo.text} 
            text={todo.text} 
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      <CreateTodoButton />
    </>
    
  );
}

export default App;
