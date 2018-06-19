import React, { Component } from "react";

import LoginForm from "../components/LoginForm";
import {UserConsumer} from "../contexts/UserContext";
import {PageConsumer} from "../contexts/PageContext";

export default class LoginFormContainer extends Component {
  render() {
    return(
      <UserConsumer>
        {({login}) => (
          <PageConsumer>
            {({goTodoPage}) => (
              <LoginForm onLogin={async (username, password) => {
                await login(username, password);
                goTodoPage();
              }} />
            )}
          </PageConsumer>
         )
        }
      </UserConsumer>
    )
  }
}