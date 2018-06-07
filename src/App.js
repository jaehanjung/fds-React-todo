import React, { Component } from 'react';

const todos = [
  {
    id:1,
    body: 'react 공부',
    complete: true
  },
  {
    id:2,
    body: 'redux 공부',
    complete: false
  }
]

class App extends Component {
  render() {
    return (
    <div>
      <h1>할 일 목록</h1>
      <ul>
        {
          todos.map(todo => (
            <li key={todo.id}>{todo.body}</li>
          ))
        }
      </ul>
    </div>
    );
  }
}

export default App;
