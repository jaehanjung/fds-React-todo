import React, { Component } from "react";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import { TodoConsumer } from "../contexts/TodoContext";

export default class TodoContainer extends Component {
  render() {
    return (
      <TodoConsumer>
        {({
          todos,
          loading,
          CreateTodo,
          DeleteTodo,
          CompleteTodo,
          UpdateTodoBody
        }) => (
          <React.Fragment>
            <h1>할 일 목록</h1>
            <TodoForm onCreate={CreateTodo} />
            {loading ? (
              <div>loading...</div>
            ) : (
              <TodoList
                todos={todos}
                onTodoComplete={CompleteTodo}
                onTodoDelete={DeleteTodo}
                onTodoBodyUpdate={UpdateTodoBody}
              />
            )}

            
          </React.Fragment>
        )}
      </TodoConsumer>
    );
  }
}
