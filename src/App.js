import React, { Component } from "react";
import TodoList from "./components/TodoList";
import axios from "axios";

let count = 1;

const todoAPI = axios.create({
  baseURL: "https://tangible-fear.glitch.me/"
});
class App extends Component {
  // 클래스필드 사용 변경이될코드는 state에 넣어준다.
  state = {
    loading: false,
    todos: [
      // {
      //   id: count++,
      //   body: "react 공부",
      //   complete: true
      // },
      // {
      //   id: count++,
      //   body: "redux 공부",
      //   complete: false
      // }
    ],
    newTodoBody: ""
  };

  async componentDidMount() {
    await this.fetchTodos();
  }

  fetchTodos = async () => {
    this.setState({
      loading: true
    });
    const res = await todoAPI.get("/todos");
    this.setState({
      todos: res.data,
      loading: false
    });
  };

  // 이벤트 리스너로 사용될 메소드는 handl 을 사용하는게 관례
  handleInputChange = e => {
    this.setState({
      newTodoBody: e.target.value
    });
  };
  // 할일추가버튼
  handleButtonClick = async e => {
    if (this.state.newTodoBody) {
      const newTodo = {
        body: this.state.newTodoBody,
        complete: false
      };
      this.setState({
        loading: true
      });
      await todoAPI.post("/todos", newTodo);
      await this.fetchTodos();
      this.setState({
        newTodoBody: ""
      });
    }
  };

  // 완료기능
  handleTodoItemComplete = async id => {
    this.setState({
      loading: true
    });
    await todoAPI.patch(`/todos/${id}`, {
      complete: true
    });
    await this.fetchTodos();
  };
  // 삭제기능
  handleTodoItemDelete = async id => {
    this.setState({
      loading: true
    });
    await todoAPI.delete(`/todos/${id}`);
    await this.fetchTodos();
  };

  render() {
    // 클래스필드를 사용하였으니 this.state에 넣어준다.
    const { todos, newTodoBody, loading } = this.state;
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
        {loading ? (
          <div>loading...</div>
        ) : (
          <TodoList
            todos={todos}
            handleTodoItemComplete={this.handleTodoItemComplete}
            handleTodoItemDelete={this.handleTodoItemDelete}
          />
        )}
      </div>
    );
  }
}

export default App;
