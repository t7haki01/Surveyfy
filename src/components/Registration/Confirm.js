import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import moment from "moment";

import axios from "../../axios-survey";
import {connect} from 'react-redux';
import {
    asyncCreateNewAccount,
    asyncCreateNewUser
} from "../../store/actions";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    const newAccount = {
        id: this.props.account.id,
        account: this.props.values.username,
        password: this.props.values.password,
        expireDate: null,
        joinedDate: moment().format("YYYY-MM-DD hh:mm:ss"),
        modifiedDate: moment().format("YYYY-MM-DD hh:mm:ss")

    };
    const newUser = {
        id: null,
        firstname: this.props.values.firstName,
        lastname: this.props.values.lastName,
        accountFK: null,
        email: this.props.values.email,
        birthdate: this.props.values.birthdate,
        phone: this.props.values.phone,
        streetAddress: this.props.values.streetAddress,
        postalCode: this.props.values.postalCode,
        rewards: 0,
        modifiedDate: moment().format("YYYY-MM-DD hh:mm:ss"),
        type: "admin"
    };

    // PROCESS FORM //
    this.props.onCreateNewAccount(newAccount);
    this.props.onCreateNewUser(newUser);

    this.props.nextStep();
  };
  
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values: {username, firstName, lastName, email, birthdate, phone, streetAddress, postalCode } } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <List>
            <ListItem 
                style={{marginTop:75}}
                primaryText="Username"
                secondaryText={ username}
            />
            <ListItem 
                primaryText="First name"
                secondaryText={ firstName}
            />
            <ListItem 
                primaryText="Last name"
                secondaryText={ lastName }
            />
            <ListItem 
                primaryText="Email"
                secondaryText={ email }
            />
            <ListItem 
                primaryText="Date Of Birth"
                secondaryText={ birthdate }
            />
            <ListItem 
                primaryText="Phone"
                secondaryText={ phone }
            />
            <ListItem 
                primaryText="Street Address"
                secondaryText={ streetAddress }
            />
            <ListItem 
                primaryText="Postal Code"
                secondaryText={ postalCode }
            />
          </List>
          <br/>
          <RaisedButton
            label="Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

const mapStateToProps = (state) => {
    return {
        app: state.app,
        user: state.user,
        account: state.account
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateNewAccount: (account) => dispatch(asyncCreateNewAccount(account)),
        onCreateNewUser: (user) => dispatch(asyncCreateNewUser(user))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FormUserDetails, axios));