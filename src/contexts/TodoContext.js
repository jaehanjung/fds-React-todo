import React from "react";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import todoAPI from "../todoAPI";
const { Provider, Consumer } = React.createContext();

class TodoProvider extends React.Component {
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
    // 프로바이더는 value를 밑으로 내려주려고 만드는거다.
    const value = {
      todos: this.state.todos,
      loading: this.state.loading,
      fetchTodos: this.fetchTodos,
      CreateTodo: this.CreateTodo,
      UpdateTodoBody:this.UpdateTodoBody,
      CompleteTodo:this.CompleteTodo,
      DeleteTodo:this.DeleteTodo
    }
    return <Provider value={value}>{this.props.children}</Provider>
  }
}
export { TodoProvider, Consumer as TodoConsumer };