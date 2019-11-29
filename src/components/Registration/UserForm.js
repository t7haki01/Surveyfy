import React, { Component } from 'react'

import {Redirect} from "react-router-dom";

import FormUserDetails from './FormUserDetails';
import FormUserRegister from './FormUserRegister';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
import Success from './Success';

import axios from "../../axios-survey";
import {connect} from 'react-redux';
import {
    // asyncFetchAccount,
    // asyncListAccounts,,
    asyncCreateAccount,
    // asyncSaveAccount,
    // asyncSaveNewAccount,
    // cancelEditAccount,
    // editAccount
} from "../../store/actions";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export class UserForm extends Component {
  state={
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    phone: '',
    streetAddress: '',
    postalCode: '', 
    username:'',
    password:'',
    passwordConfirm:'',
    type:''
  };
  
  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
    
  render() {
      const { step } = this.state;
      const { firstName, lastName, email, birthdate, phone, streetAddress, postalCode, username, password, passwordConfirm, type } = this.state;
      const values = { firstName, lastName, email, birthdate, phone, streetAddress, postalCode, username, password, passwordConfirm,type };
    switch(step) {
      case 1:
        return (
            <FormUserRegister
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );  
      case 2:
        return (
            <FormUserDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 3:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            />
        );
      case 4:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            />
        );
      case 5:
        return (<Success />);

        default:
        return (
            <Redirect to="/homepage"/>

        );
    }
  }
}

const mapStateToProps = (state) => {
    // console.log("Account, mapStateToProps, account", state.account);
    return {
        app: state.app,
        user: state.user,
        account: state.account
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // onFetchAccount: (account_id) => dispatch(asyncFetchAccount(account_id)),
        onCreateAccount: (account) => dispatch(asyncCreateAccount(account)),
        // onListAccounts: () => dispatch(asyncListAccounts()),
        // onEditAccount: (account) => dispatch(editAccount(account)),
        // onCancelEditAccount: (account) => dispatch(cancelEditAccount(account)),
        // onSaveAccount: (account) => dispatch(asyncSaveAccount(account)),
        // onSaveNewAccount: (account) => dispatch(asyncSaveNewAccount(account)),
        // onSetAccountId: (account_id) => dispatch(setAccountId(account_id)),
        // onResetAccount: () => dispatch(resetAccount())
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserForm, axios));
