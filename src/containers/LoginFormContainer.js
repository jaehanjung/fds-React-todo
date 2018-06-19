import React, { Component } from "react";

import LoginForm from "../components/LoginForm";
import {UserConsumer} from "../contexts/UserContext";
import {PageConsumer} from "../contexts/PageContext";
import OnMount from "../components/OnMount";


export default class LoginFormContainer extends Component {
  render() {
    return(
      <UserConsumer>
        {({login}) => (
          <PageConsumer>
            {({goTodoPage}) => (
              <React.Fragment>
               <LoginForm onLogin={async (username, password) => {
                await login(username, password);
                goTodoPage();
                }} />
                {localStorage.getItem("token") && <OnMount onMount={goTodoPage} />}
              </React.Fragment>
            )}
          </PageConsumer>
         )
        }
      </UserConsumer>
    )
  }
}
