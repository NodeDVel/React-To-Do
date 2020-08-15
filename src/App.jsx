import React, { useRef, useCallback, useReducer } from 'react';
import TodoTemplate from './components/ToDoTemplate/TodoTemplate';
import TodoInsert from './components/TodoInsert/TodoInsert';
import TodoList from './components/TodoList/TodoList';

const createBulkTodos = () => {
  const array = [];
  for(let i = 0; i <= 2500; i++) {
    array.push({
      id: 1,
      text: `할일 ${i}`,
      checked: false,
    });
  }
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE': 
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE': 
      return todos.map(todo => todo.id === action.id ? { ...todo, checked: !todo.checked }: todo );
    default: 
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  //고유값으로 사용될 Id & ref를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    // setTodos(todos => todos.concat(todo));
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(id => {
    // setTodos(todos => todos.filter(todo => todo.id !== id));
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback(id => {
    // setTodos(todos => 
    //   todos.map(todo => 
    //     todo.id === id ? { ...todo, checked: !todo.checked }: todo,
    //   ),
    // );
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;

//p283