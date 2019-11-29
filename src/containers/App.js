import React, {Component} from 'react';
import {Route, withRouter, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from '../axios-survey';

import {
    asyncFetchFirstName,
    setUserAccountFK,
    setAccountId,
    asyncLoginUser,
    logoutUser
} from "../store/actions";
import classes from './App.css';


// import Auxiliary from "../hoc/Auxiliary/Auxiliary";
// import Registration from "../components/Registration/UserForm";
import Account from '../components/Accounts/Account/Account';
import User from '../components/Users/User/User';
import HomePage from '../components/HomePage/HomePage';
import SurveyBuilder from '../components/Surveys/SurveyBuilder/SurveyBuilder';
import SurveysManager from '../components/Surveys/SurveysManager/SurveysManager';
import AccountsManager from '../components/Accounts/AccountsManager/AccountsManager';
import UsersManager from '../components/Users/UsersManager/UsersManager';
import UserForm from '../components/Registration/UserForm';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import SurveysList from '../components/Surveys/SurveysList/SurveysList';
import Result from '../components/Chart/Result';
import Login from '../components/Login/Login';
import AuthHandler from '../components/Login/AuthHandler';
import SurveyForm from '../components/Surveys/Survey/SurveyForm';
import Header from './Header';


class App extends Component {
    AuthHandler = new AuthHandler();

    constructor() {
        super();
        this.state = {
            id: ''
        };
      }      


    componentDidMount() {
        if (this.AuthHandler.loggedIn() && this.AuthHandler.tokenCheck()) {
            this.props.onLoginUser(this.AuthHandler.getData().id);
            this._setInfo();
        }
    }

    _setInfo() {
        this.setState({id: this.AuthHandler.getData().id}, function () {
        });
    }

    _handleLogout = () => {
        this.AuthHandler.logout();
        this.props.onLogoutUser();
        this.props.history.replace('/login');
    };

    componentDidUpdate() {
        if (this.AuthHandler.isTokenExpired(localStorage.getItem('id_token'))) {
            alert('token has expired');
            this._handleLogout();
        }
    }

    render() {

        const footerStyle= {
            padding: "1.5rem 0",
            background: "#2d343a",
            color: "white",
            fontSize:"1.5rem",
          }

    return (
      <div className={classes.App}>
          <Header history={this.props.history}/>
          <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/account" component={Account}/>
          <Route path="/user" component={User} />
          <Route path="/surveybuilder" component={SurveyBuilder} />
          <Route path="/surveysmanager" component={SurveysManager} />
          <Route path="/accountsmanager" component={AccountsManager} />
          <Route path="/usersmanager" component={UsersManager} />
          <Route path="/registration" component={UserForm} />
          <Route path="/surveys" component={SurveysList} />
          <Route path="/survey" component={SurveyForm} />
          <Route path="/result" component={Result} />
          <Route path="/login" component={Login}/>
          <Redirect to="/home"/>
        </Switch>
        <footer style={{...footerStyle}}>&copy; Survey Inc</footer>
</div>
);
}//this is end of render
}//This is end of class


const mapStateToProps = state => {
    return {
        app: state.app,
        account: state.account
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchFirstname: account_id => dispatch(asyncFetchFirstName(account_id)),
        onSetAccountId: account_id => dispatch(setAccountId(account_id)),
        onSetUserAccountFK: accountId => dispatch(setUserAccountFK(accountId)),
        onLoginUser: user_id => dispatch(asyncLoginUser(user_id)),
        onLogoutUser: () => dispatch(logoutUser())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withErrorHandler(App, axios))
);
