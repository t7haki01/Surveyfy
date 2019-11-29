import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import HomePage from "../HomePage/HomePage";
// import Login from "../Login/Login";
import {asyncSetUserAccountFK, setAppUserAccountIdName} from "../../store/actions"
import connect from "react-redux/es/connect/connect";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-survey";
import AuthHandler from "../Login/AuthHandler";

export class FormUserDetails extends Component {

    autHandler = new AuthHandler();

    constructor(props) {
        super(props);
        this.setAccountFK = this.setAccountFK.bind(this);

    }


    setAccountFK(user, account) {
        console.log("setAccountFK, user", this.props.user, "account", this.props.account);
        // this.props.onSetApp(account, user);
        this.props.onSetUserAccountFK(user, account.id);
        this.props.onSetApp(account, user);
        // this.autHandler.login(account.account, account.password);

    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("Success, componentWillReceiveProps, nextProps", nextProps);
        const loggedInUndefined = (nextProps.app.logged_in === "undefined" &&
                                    nextProps.app.loggedIn === "undefined");
        const loggedIn = !loggedInUndefined && (nextProps.app.loggedIn || nextProps.app.logged_in);
        console.log("Success componentWillReceiveProps, logged in", loggedIn);
        console.log("Success componentWillReceiveProps, user is saved", nextProps.user.saveSuccess);
        console.log("Success componentWillReceiveProps, account is saved", nextProps.account.saveSuccess);
        if (nextProps.user && nextProps.user.saveSuccess &&
            nextProps.account && nextProps.account.saveSuccess &&
            !loggedIn) {
            console.log("@@@ Success, componentWillReceiveProps, nextProps when logged in", nextProps);
            this.setAccountFK(nextProps.user, nextProps.account);
        }
        if (loggedIn && nextProps.user.accountFK) {
            console.log("Success, componentWillReceiveProps, logged in and accountFK", nextProps);
            this.autHandler.login(nextProps.account.account, nextProps.account.password);
            console.log("Success, componentWillReceiveProps, logged in and accountFK, GO HOME");
            this.props.history.replace("/home");

        }
    }

    render() {
        return (

            <MuiThemeProvider>

                <React.Fragment>
                    {/*<Redirect to={HomePage}/>*/}
                    {!this.props.app.loggedIn ? null :
                        <Redirect to="/home"/>
                        // < h1 > Please, log in next</h1>
                    }
                    {/*<h1>Thanks You For Your Submission</h1>*/}
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        user: state.user,
        account: state.account
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetUserAccountFK: (user, account_id) => dispatch(asyncSetUserAccountFK(user, account_id)),
        onSetApp: (account, user) => dispatch(setAppUserAccountIdName(account, user))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FormUserDetails, axios));
