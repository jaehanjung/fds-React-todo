import React, { Component } from "react";


class App extends Component {
  // 클래스필드 사용 변경이될코드는 state에 넣어준다.
  state = {
    todos: [
      {
        id: 1,
        body: "react 공부",
        complete: true
      },
      {
        id: 2,
        body: "redux 공부",
        complete: false
      }
    ]
  };
  render() {
    // 클래스필드를 사용하였으니 this.state에 넣어준다.
    const {todos} = this.state;
    return (
      <div>
        <h1>할 일 목록</h1>
        <ul>
          {todos.map(todo => (
            <li className={todo.complete ? "complete" : ""} key={todo.id}>
              {todo.body}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
