import React, { Component } from 'react';
import AuthHandler from './AuthHandler';

/* A higher order component (HOC) is frequently written as a function that returns a class. */
export default function AdminOnly(AdminComponent) {
  return class ProtectionAdminComponent extends Component {
    AuthHandler = new AuthHandler();
    constructor() {
      super();
      this.state = {
        loaded: false,
        isAdmin: false
      };
    }

    componentDidMount() {
      if (!this.AuthHandler.loggedIn()) {
        this.props.history.replace('/login');
      } else {
        if (this.AuthHandler.isAdmin()) {
          try {
            this.setState({
              loaded: true,
              isAdmin: true
            });
          } catch (err) {
            /* if there's an error it will print it out and log the user out for security reasons. */
            console.log(err);
            AuthHandler.logout();
              this.props.onLogoutUser();
            this.props.history.push('/login');
          }
        } else {
          alert('Only Admin User can do! Please contact the admin');
          /**In here if user type is not admin then it will redirect to login page and logged out automatically */
          this.AuthHandler.logout();
            this.props.onLogoutUser();
          this.props.history.push('/login');
        }
      }
    }

    render() {
      if (this.state.loaded) {
        if (this.state.isAdmin) {
          return <AdminComponent history={this.props.history} />;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  };
}
