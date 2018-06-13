import React, { Component } from "react";

import todoAPI from "../todoAPI";
export default class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  handleUserNameChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleLoginClick = async e => {
    //로그인 요청
    const res = await todoAPI.post("/users/login", {
      username: this.state.username,
      password: this.state.password
    });
    // localStorage에 토큰 저장
    localStorage.setItem("token", res.data.token);
    // 페이지 전환
    this.props.onLogin();
  };

  render() {
    const { onLogin } = this.props;
    const { username, password } = this.state;
    return (
      <div>
        <h1>로그인페이지</h1>
        <label>
          아이디:
          <input
            type="text"
            value={username}
            onChange={this.handleUserNameChange}
          />
        </label>
        <label>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </label>
        <button onClick={this.handleLoginClick}>login</button>
      </div>
    );
  }
}
