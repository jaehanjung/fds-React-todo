import React, { Component } from "react";

import todoAPI from "../todoAPI";

export default class LoginForm extends Component {
  usernameRef = React.createRef();
  passwordRef = React.createRef();

  handleLoginClick = async e => {
    //로그인 요청
    const { onLogin } = this.props;
    onLogin(this.usernameRef.current.value, this.passwordRef.current.value);
  };

  render() {
    const { onLogin } = this.props;
    return (
      <div>
        <h1>로그인페이지</h1>
        <label>
          아이디:
          <input type="text" ref={this.usernameRef} />
        </label>
        <label>
          비밀번호:
          <input type="password" ref={this.passwordRef} />
        </label>
        <button onClick={this.handleLoginClick}>login</button>
      </div>
    );
  }
}
