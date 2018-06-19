import React, { Component } from "react";


import {UserConsumer} from "../contexts/UserContext";
import {PageConsumer} from "../contexts/PageContext";

export default class LogoutBtnContainer extends Component {
  render() {
    return(
      <UserConsumer>
        {({logout}) => (
          <PageConsumer>
            {({goToLoginPage}) => (
              <button onClick={e=> {
                logout();
                goToLoginPage();
              }}>
              로그아웃
              </button>
            )}
          </PageConsumer>
         )
        }
      </UserConsumer>
    )
  }
}