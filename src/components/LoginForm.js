import React, { Component } from "react";

import todoAPI from "../todoAPI";
export default class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const { onLogin } = this.props;
    onLogin(username, password);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h1>로그인페이지</h1>
          <input type="checkbox" defaultChecked={true} />
          <label>
            아이디:
            <input defaultValue="fds" name="username" type="text" />
          </label>
          <label>
            비밀번호:
            <input name="password" type="password" />
          </label>
          <button>login</button>
        </div>
      </form>
    );
  }
}
