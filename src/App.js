import React, { Component } from "react";
import TodoList from './components/TodoList';

let count = 0;

class App extends Component {
  // 클래스필드 사용 변경이될코드는 state에 넣어준다.
  state = {
    todos: [
      {
        id: count++,
        body: "react 공부",
        complete: true
      },
      {
        id: count++,
        body: "redux 공부",
        complete: false
      }
    ],
    newTodoBody: ""
  };

  // 이벤트 리스너로 사용될 메소드는 handl 을 사용하는게 관례
  handleInputChange = e => {
    this.setState({
      newTodoBody: e.target.value
    });
  };
  // 할일추가버튼
  handleButtonClick = e => {
    if (this.state.newTodoBody) {
      const newTodo = {
        body: this.state.newTodoBody,
        complete: false,
        id: count++
      };
      this.setState({
        todos: [...this.state.todos, newTodo],
        newTodoBody: ""
      });
    }
  };

  handleTodoItemComplete = id => {
    this.setState({
      todos: this.state.todos.map(t => {
        const newTodo = {
          ...t
        };
        if (t.id === id) {
          newTodo.complete = true;
        }
        return newTodo;
      })
    });
  };

  handleTodoItemDelete = id => {
    this.setState({
      todos: this.state.todos.filter(t => id !== t.id)
    });
  };

  render() {
    // 클래스필드를 사용하였으니 this.state에 넣어준다.
    const { todos, newTodoBody } = this.state;
    return (
      <div>
        <h1>할 일 목록</h1>
        <label>
          새로운 할일
          <input
            type="text"
            value={newTodoBody}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleButtonClick}>추가</button>
        </label>
      <TodoList todos={todos} handleTodoItemComplete={this.handleTodoItemComplete}
      handleTodoItemDelete={this.handleTodoItemDelete} />
      </div>
    );
  }
}



export default App;
