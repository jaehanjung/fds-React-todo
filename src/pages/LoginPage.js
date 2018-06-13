import React, { Component } from 'react';

export default class LoginPage extends Component {

  render() {
  
    return (
      <div>
        <button onClick={this.props.goTodoPage}>login</button>
      </div>
    )
  }
}