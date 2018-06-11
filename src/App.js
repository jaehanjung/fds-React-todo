import React, { Component } from "react";
import TodoList from "./components/TodoList";
import axios from "axios";
import LoginPage from "./components/LoginPage"

let count = 1;

const todoAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});
class App extends Component {
  // 클래스필드 사용 변경이될코드는 state에 넣어준다.
  state = {
    page: 'login',
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

  goTodoPage = () =>{
    this.setState({
      page: 'todo'
    })
  }

  async componentDidMount() {
    await this.fetchTodos();
  }
// 로딩, 서버가져오는 코드
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
// 내용수정
handleTodoItemBodyUpdate = async (id, body) => {
  this.setState({
    loading: true
  });
  await todoAPI.patch(`/todos/${id}`, {
    body
  })
  await this.fetchTodos();
}

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
    const { todos, newTodoBody, loading,page } = this.state;
    return (
      <div>
      {page === "login" ? (
        <LoginPage goTodoPage={this.goTodoPage} />
      ) : (
        <React.Fragment>
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
            handleTodoItemBodyUpdate={this.handleTodoItemBodyUpdate}
          />
        )}
      </React.Fragment>
      )}
      </div>
    );
  }
}

export default App;
