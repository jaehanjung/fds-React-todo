import React, { Component } from "react";
import axios from "axios";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

const todoAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export default class TodoPage extends Component {
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
    ]
  };



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

  // 할일추가버튼
  CreateTodo = async newTodoBody => {
    if (newTodoBody) {
      const newTodo = {
        body: newTodoBody,
        complete: false
      };
      this.setState({
        loading: true
      });
      await todoAPI.post("/todos", newTodo);
      await this.fetchTodos();
    }
  };
  // 내용수정
  UpdateTodoBody = async (id, body) => {
    this.setState({
      loading: true
    });
    await todoAPI.patch(`/todos/${id}`, {
      body
    });
    await this.fetchTodos();
  };

  // 완료기능
  CompleteTodo = async id => {
    this.setState({
      loading: true
    });
    await todoAPI.patch(`/todos/${id}`, {
      complete: true
    });
    await this.fetchTodos();
  };
  // 삭제기능
  DeleteTodo = async id => {
    this.setState({
      loading: true
    });
    await todoAPI.delete(`/todos/${id}`);
    await this.fetchTodos();
  };

  render() {
    // 클래스필드를 사용하였으니 this.state에 넣어준다.
    const { todos, loading } = this.state;
    return (
      <div>
        <h1>할 일 목록</h1>
        <TodoForm onCreate={this.CreateTodo}/>
        {loading ? (
          <div>loading...</div>
        ) : (
          <TodoList
            todos={todos}
            onTodoComplete={this.CompleteTodo}
            onTodoDelete={this.DeleteTodo}
            onTodoBodyUpdate={this.UpdateTodoBody}
          />
        )}
      </div>
    );
  }
}

