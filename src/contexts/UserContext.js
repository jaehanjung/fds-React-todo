import React from "react";
import todoAPI from "../todoAPI";

const { Provider, Consumer } = React.createContext();

class UserProvider extends React.Component {
  login = async (username, password) => {
    try {
      //로그인 요청
      const res = await todoAPI.post("/users/login", {
        username: username,
        password: password
      });
      // localStorage에 토큰 저장
      localStorage.setItem("token", res.data.token);
      // 페이지 전환
      this.props.onLogin();
    } catch (e) {
      if (e.response) {
        if (e.response.status === 400) {
          alert("아이디 혹은 비밀번호를 다시 입력하세요.");
          console.log(e.response.data);
          console.log(e.response.status);
          console.log(e.response.headers);
        }
      }
    }
  };
  render() {
    const value = {
      login: this.login
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer };
