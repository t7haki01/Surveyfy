import React, { Component } from 'react';
import AuthHandler from '../Login/AuthHandler';
// import {connect} from "react-redux";
// import {logoutUser} from "../../store/actions";

/* A higher order component (HOC) is frequently written as a function that returns a class. */
export default function CompanyOnly(CompanyComponent) {

  return class ProtectionCompanyComponent extends Component {
    AuthHandler = new AuthHandler();
      state = {
          loaded: false,
          isCompany: false
      }


    componentDidMount() {
      if (!this.AuthHandler.loggedIn()) {
        this.props.history.replace('/login');
      } else {
        if (this.AuthHandler.isCompany()) {
          try {
            this.setState({
              loaded: true,
              isCompany: true
            });
          } catch (err) {
            /* if there's an error it will print it out and log the user out for security reasons. */
            console.log(err);
            this.AuthHandler.logout();
              this.props.onLogoutUser();
            this.props.history.push('/login');
          }
        } else {
          alert('Only Company User can see this features!');
          /**In here if user type is not company then it will redirect to login page and logged out automatically */
          this.AuthHandler.logout();
            this.props.onLogoutUser();
          this.props.history.push('/login');
        }
      }
    }

    render() {
      if (this.state.loaded) {
        if (this.state.isCompany) {
          return <CompanyComponent history={this.props.history} />;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  };
}