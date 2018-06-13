import React, { Component } from "react";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";

export default class App extends React.Component{
  state = {
    page: "login"
  }
  goTodoPage = () => {
    this.setState({
      page: "todo"
    });
  };
  render() {
    const {page} = this.state;
    return (
      <div>
        {page === 'login' ? (
          <LoginPage onLogin={this.goTodoPage} />
        ) : (
          <TodoPage />
        )}
    
      </div>
    )
  }
}