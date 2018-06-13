import React from "react";
// app.js 에 있는걸 컴포넌트로 만들기 그럴려면 app.js에있는 이벤트함수들도 가지고 와야한다.
export default class TodoForm extends React.Component {
  state = {
    newTodoBody:''
  }
 // 이벤트 리스너로 사용될 메소드는 handl 을 사용하는게 관례
  handleInputChange = e =>{
    this.setState ({
      newTodoBody: e.target.value
    });
  }

  handleButtonClick = e =>{
    this.props.onCreate(this.state.newTodoBody)
    this.setState({
      newTodoBody:''
    })
  }
  render() {
    const {newTodoBody} = this.state;
    return (
      <label>
        새로운 할일
        <input
          type="text"
          value={newTodoBody}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleButtonClick}>추가</button>
      </label>
    );
  }
}
