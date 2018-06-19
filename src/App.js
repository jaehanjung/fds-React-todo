import React, { Component } from "react";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import { PageProvider, PageConsumer } from "./contexts/PageContext";
import { UserProvider } from "./contexts/UserContext";
// import {TodoProvider} from "./contexts/TodoContext";

export default class App extends React.Component {
  render() {
    return (
      <PageProvider>
        {/* <TodoProvider> */}
        <UserProvider>
          <PageConsumer>
            {value =>
              value.page === "login" ? (
                <LoginPage />
              ) : (
                <TodoPage />
              )
            }
          </PageConsumer>
        </UserProvider>
        {/* </TodoProvider> */}
      </PageProvider>
    );
  }
}
