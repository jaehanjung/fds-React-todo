import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../contexts/UserContext";

export default class LogoutBtnContainer extends Component {
  state = {
    success: false
  };
  render() {
    if (this.state.success) {
      return <Redirect to="login" />;
    } else {
      return (
        <UserConsumer>
          {({ logout }) => (
            <button
              onClick={e => {
                logout();
               this.setState({success:true});
              }}
            >
              로그아웃
            </button>
          )}
        </UserConsumer>
      );
    }
  }
}
