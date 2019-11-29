import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
        this.props.onSetUserAccountFK(user, account.id);
        this.props.onSetApp(account, user);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const loggedInUndefined = (nextProps.app.logged_in === "undefined" &&
                                    nextProps.app.loggedIn === "undefined");
        const loggedIn = !loggedInUndefined && (nextProps.app.loggedIn || nextProps.app.logged_in);

        if (nextProps.user && nextProps.user.saveSuccess &&
            nextProps.account && nextProps.account.saveSuccess &&
            !loggedIn) {
            this.setAccountFK(nextProps.user, nextProps.account);
        }
        if (loggedIn && nextProps.user.accountFK && this.props && this.props.history) {
            this.autHandler.login(nextProps.account.account, nextProps.account.password);
            this.props.history.replace("/home");
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    {!this.props.app.loggedIn ? null :
                        <Redirect to="/home"/>
                    }
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
