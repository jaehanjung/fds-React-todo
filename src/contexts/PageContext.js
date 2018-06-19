import React from "react";

const { Provider, Consumer } = React.createContext();

class PageProvider extends React.Component {
  state = {
    page: "login"
  };
  goTodoPage = () => {
    this.setState({
      page: "todo"
    });
  };

  goToLoginPage = () => {
    this.setState({
      page: "login"
    });
  };
  render() {
    const value = {
      page: this.state.page,
      goTodoPage: this.goTodoPage,
      goToLoginPage: this.goToLoginPage
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { PageProvider, Consumer as PageConsumer };
