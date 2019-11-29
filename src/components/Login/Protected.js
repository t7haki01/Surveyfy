import React, { Component } from 'react';
import AuthHandler from './AuthHandler';

/* A higher order component (HOC) is frequently written as a function that returns a class. */
export default function Protected(ProtectedComponent) {
  const authHandler = new AuthHandler();

  return class Protection extends Component {
    constructor() {
      super();
      this.state = {
        loaded: false
      };
    }

    /* In the componentDidmount, 
    perfomring couple of important tasks in order to verify the current users authentication status
    prior to granting them enterance into the component. */
    componentDidMount() {
      // if user is not logged in then redirect to somewhere, normally to login page
      if (!authHandler.loggedIn() || !authHandler.tokenCheck()) {
        this.props.history.push('/login');
      } else {
        try {
          this.setState({
            loaded: true
          });
        } catch (err) {
          /* if there's an error it will print it out and log the user out for security reasons. */
          console.log(err);
          authHandler.logout();
            this.props.onLogoutUser();
          this.props.history.push('/login');
        }
      }
    }

    render() {
      if (this.state.loaded) {
        return <ProtectedComponent history={this.props.history} />;
      } else {
        return null;
      }
    }
  };
}
