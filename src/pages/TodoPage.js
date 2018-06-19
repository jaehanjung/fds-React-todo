import React, { Component } from "react";

import TodoContainer from "../containers/TodoContainer";
import { TodoProvider } from "../contexts/TodoContext";
import LogoutBtnContainer from "../containers/LogoutBtnContainer";

export default class TodoPage extends Component {
  render() {
    return (
      <TodoProvider>
        <TodoContainer />
        <LogoutBtnContainer />
      </TodoProvider>
    );
  }
}
