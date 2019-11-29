import React, {Component} from 'react';
import classes from './Login.css';
import AuthHandler from './AuthHandler';
import UserForm from '../Registration/UserForm';
import {NavLink, Route} from 'react-router-dom';
import {connect} from "react-redux";
import {asyncUserLogin} from "../../store/actions";

class Login extends Component {
    AuthHandler = new AuthHandler();

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            account: '',
            password: ''
        };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onUserLogin(this.state.account, this.state.password);
        this.AuthHandler.login(this.state.account, this.state.password)
        .then(res => {
            if (res.status === false) {
                alert(res.message);
                this.props.history.push('/login');
            } else {
                localStorage.setItem('sec', this.AuthHandler.whenExpired());
                this.props.history.replace('/home');
            }
        })
        .catch(err => {
            alert(err);
        });
    };

    componentWillMount() {
        if (this.AuthHandler.loggedIn() && this.AuthHandler.tokenCheck()) {
            this.props.history.replace('/home');
        }
    }

    render() {
        return (
            <div>
                <div className={classes.body}>
                    <div className={classes.wrapper}>
                        <div className={classes.left}>
                            <div className={classes.signin}>
                                <form onSubmit={this.handleSubmit}>
                                    <div>
                                        <label>Email or username</label>
                                        <input
                                            type="text"
                                            id="account"
                                            name="account"
                                            autoComplete="false"
                                            autoFocus={true}
                                            onChange={this.onChange}
                                            className={classes.textInput}/>
                                    </div>
                                    <div>
                                        <label>Password</label>
                                        <input type="password"
                                               id="password"
                                               name="password"
                                               autoComplete="false"
                                               onChange={this.onChange}
                                               className={classes.textInput}/>
                                    </div>
                                    <button type="submit" className={classes.primaryBtn}>Sign In</button>
                                </form>
                                <div className={classes.links}>
                                    <NavLink to="#">Forgot Password</NavLink>
                                    <NavLink to="#">Sign in with company or school</NavLink>
                                </div>
                                <div className={classes.or}>
                                    <hr className={classes.bar}/>
                                    <span>OR</span>
                                    <hr className={classes.bar}/>
                                </div>

                                <NavLink to="/registration" className={classes.secondaryBtn}>Create
                                    an account</NavLink>
                                <Route path="/registration" component={UserForm}/>
                            </div>
                        </div>
                        <div className={classes.right}>
                            <div className={classes.showcase}>
                                <div className={classes.showcaseContent}>
                                    <h1 className={classes.show}>
                                        Let's survey <strong>the future</strong>
                                    </h1>
                                    <NavLink to="/Home" className={classes.secondaryBtn}>Start a
                                        FREE 10-day trial</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        onUserLogin: (username, password) => dispatch(asyncUserLogin(username, password))
    }
};

export default connect(null, mapDispathToProps)(Login);
