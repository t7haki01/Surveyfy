/*
 * Account.js
 *
 */

import React, {Component} from 'react';
import {
    FormControl,
    FormGroup,
    ControlLabel,
    PageHeader,
    Button,
    ButtonToolbar,
    Clearfix
} from 'react-bootstrap';
import {connect} from 'react-redux';

import classes from './Account.css';
import axios from '../../../axios-survey';
import {
    asyncFetchAccount,
    asyncCreateAccount,
    asyncListAccounts,
    editAccount,
    cancelEditAccount,
    asyncSaveAccount,
    asyncSaveNewAccount,
    setAccountId,
    resetAccount,
    logoutUser
} from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Protected from '../../Login/Protected';
import AuthHandler from '../../Login/AuthHandler';

class Account extends Component {
    AuthHandler = new AuthHandler();
    state = {
        id: '',
        accountName: '',
        password: '',
        confirmPassword: '',
        passwordsMatch: true,
        expireDate: null,
        joinedDate: null,
        modifiedDate: null,
        isExpired: null,
        //startDate: null,
        editing: false,
        newAccount: false,
        routing: false,
        unEditedState: {
            id: '',
            accountName: '',
            password: '',
            expireDate: null,
            joinedDate: null,
            modifiedDate: null
        }
    };

    constructor(props) {
        super(props);
        this.handleExpireDateChange = this.handleExpireDateChange.bind(this);
        // this.getDateString = this.getDateString.bind(this);
        this.getDateMoment = this.getDateMoment.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
            this
        );
        this.setExpires = this.setExpires.bind(this);
        // this.addNewAccount = this.addNewAccount.bind(this);
        // this.deleteAccount = this.deleteAccount.bind(this);
        // this.saveAccount = this.saveAccount.bind(this);
        // this.resetFields = this.resetFields.bind(this);
        this.getFormattedMoment = this.getFormattedMoment.bind(this);
        this.formatMoment = this.formatMoment.bind(this);
        this.editAccount = this.editAccount.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
        this.goBack = this.goBack.bind(this);
        this.updateState = this.updateState.bind(this);
        this.formatMomentForDatabaseSaving = this.formatMomentForDatabaseSaving.bind(
            this
        );
    }

    componentDidMount() {
        console.log('Passing props account' + this.props.account + " and props.id" + this.props.account.id);
        console.log('Account, componentDidMount, props', this.props);
        // if (this.props.app.account_id) {
        //     console.log("account_id");
        //     if (!this.props.account.id) {
        //         console.log("not account id");
        //     }
        // }
        console.log('componentDidMount, props new account', this.props.account.newAccount);
        // if (this.props.account && this.props.account.id) {
        //     console.log('Account, componentDidMount, account id', this.props.account.id);
        //     this.setState({editing: false, id: this.props.account.id});
        //     this.props.onFetchAccount(this.props.account.id);
        if (this.props.accountsManager.selectedAccount) {
            console.log('Account, componentDidMount, selectedAccount', this.props.accountsManager.selectedAccount);
            this.setState({editing: false, id: this.props.accountsManager.selectedAccount});
            this.props.onFetchAccount(this.props.accountsManager.selectedAccount);
        } else if (this.props.app.account_id) {
            console.log('Account, componentDidMount, app account_id', this.props.app.account_id);
            this.setState({editing: false, id: this.props.app.account_id});
            this.props.onFetchAccount(this.props.app.account_id);
        }
        //if (this.props.account && !this.props.account.routing && !this.state.newAccount) {
        // if (!this.props.account.newAccount) {
        //     console.log("componentDidMount, not new account");
        //         if (!this.props.account.id && this.props.app.account_id) {
        //             console.log("componentDidMount, setting account id, APP  account_id", this.props.app.account_id);
        //             this.props.onFetchAccount(this.props.app.account_id);
        //         } else if (this.props.account.id) {
        //             console.log("Account, componentDidMount, ACCOUNT id: ", this.props.account.id);
        //             this.props.onFetchAccount(this.props.account.id);
        //         }
        //
        // } else
        //     if (this.props.account.newAccount) {
        console.log('componentDidMount,AFTER, props', this.props);
        // this.updateState(this.props);
        // }
    }

    // componentDidUpdate() {
    //   console.log('componentDidUpdate, state', this.state);
    //   if (
    //     this.props.account &&
    //     this.props.account.id &&
    //     this.props.account.id !== this.state.id
    //   ) {
    //     this.updateState(this.props);
    //   }
    // }

    componentWillReceiveProps(nextProps) {
      console.log('Account, componentWillReceiveProps, nextProps', nextProps);
      if (!this.props.account.newAccount && this.props.account.fetchSuccess) {
        console.log('componentWillReceiveProps, not new account');
        if (!this.props.account.id && this.props.app.account_id) {
          console.log('componentWillReceiveProps, setting account id, APP  account_id', this.props.app.account_id);
          // this.props.onFetchAccount(this.props.app.account_id);
        } else if (this.props.account.id) {
          console.log('Account, componentWillReceiveProps, ACCOUNT id: ', this.props.account.id);
          // this.props.onFetchAccount(this.props.account.id);
        }
      }
      if (nextProps.account) {
        if (nextProps.account.id) {
          this.updateState(nextProps);
        }
        if (nextProps.account.newAccount) {
          this.setState({ newAccount: true });
        }
        if (nextProps.account.saveSuccess) {
          this.setState({ editing: false });
        }
        if (nextProps.account.editing) {
          this.setState({ editing: nextProps.account.editing });
        }
      }
      console.log('Account, componentWillReceiveProps, state', this.state);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate this.props', this.props, 'next props', nextProps);
        if (nextProps.account !== this.props.account || nextProps.account.componentShouldUpdate) {
            console.log('shouldComponentUpdate, YESS');
            nextProps.account.componentShouldUpdate = false;
            return true;
        }
        console.log('shouldComponentUpdate, no difference in account');
        return true;
    }

    updateState(someProps) {
        console.log('Account, updateState, props', someProps);
        console.log('updateState, account id', someProps.account.id);
        this.setState({
            id: someProps.account.id,
            accountName: someProps.account.account,
            password: '',
            confirmPassword: '',
            joinedDate: someProps.account.newAccount
                ? moment()
                : someProps.account.joinedDate, //this.getDateMoment(someProps.account.joinedDate),
            expireDate: someProps.account.expireDate, //this.getDateMoment(someProps.account.expireDate),
            modifiedDate: someProps.account.newAccount
                ? moment()
                : someProps.account.modifiedDate, //this.getDateMoment(someProps.account.modifiedDate),
            unEditedState: {
                id: someProps.account.id,
                accountName: someProps.account.account,
                password: someProps.account.password,
                joinedDate: someProps.account.newAccount
                    ? moment()
                    : someProps.account.joinedDate, //this.getDateMoment(someProps.account.joinedDate),
                expireDate: someProps.account.expireDate, //this.getDateMoment(someProps.account.expireDate),
                modifiedDate: someProps.account.newAccount
                    ? moment()
                    : someProps.account.modifiedDate //this.getDateMoment(someProps.account.modifiedDate),
            },
            isExpired: someProps.account.isExpired,
            routing: someProps.account.routing,
            editing: someProps.account.editing,
            newAccount: someProps.account.newAccount
            // newAccount: false
        });
        console.log('Account, updateState, state', this.state);
    }

    goBack() {
        this.props.onResetAccount();
        this.props.history.goBack();
    }

    editAccount = account => {
        this.props.onEditAccount(account);
    };

    cancelEditing = account => {
        const unEditedAccount = this.state.unEditedState;
        unEditedAccount.account = this.state.unEditedState.accountName;
        //   this.setState({
        //       id: this.state.unEditedState.id,
        //       account: this.state.unEditedState.account,
        //       password: "", //this.state.unEditedPassword,
        //       confirmPassword: "",
        //       expireDate: this.state.unEditedState.expireDate,
        //       joinedDate: this.state.unEditedState.joinedDate,
        //       modifiedDate: this.state.unEditedState.modifiedDate,
        //       editing: false
        //   });
        // console.log("cancelEditing, AFTER account", this.state.account,
        //     "password", this.state.password);
        // document.getElementById("username").value = this.state.account;
        // // document.getElementById("password").value = " ";

        this.props.onCancelEditAccount(unEditedAccount);
    };

    saveAccount = account => {
        const saveAccount = {
            id: this.state.id,
            account: this.state.accountName,
            password: this.state.password,
            isExpired: this.state.isExpired,
            joinedDate: this.state.joinedDate
                ? this.formatMomentForDatabaseSaving(this.state.joinedDate)
                : null,
            expireDate: this.state.expireDate
                ? this.formatMomentForDatabaseSaving(this.state.expireDate)
                : null,
            modifiedDate: this.state.modifiedDate
                ? this.formatMomentForDatabaseSaving(this.state.modifiedDate)
                : null
        };
        console.log('saveAccount, account', saveAccount);
        if (this.state.newAccount) {
            this.props.onSaveNewAccount(saveAccount);
        } else {
            this.props.onSaveAccount(saveAccount);
        }
    };

    setExpires(expireDate) {
        this.setState({expireDate: this.getDateMoment(expireDate)});
    }

    handleUsernameChange(el) {
        this.setState({accountName: el.target.value, editing: true});
        if (
            (this.state.confirmPassword &&
                this.state.password &&
                this.state.confirmPassword === this.state.password) ||
            (!this.state.password && !this.state.confirmPassword)
        ) {
            this.setState({passwordsMatch: true});
        } else {
            this.setState({passwordsMatch: false});
        }
    }

    handlePasswordChange(el) {
        this.setState({password: el.target.value, editing: true});
        if (
            (this.state.confirmPassword &&
                this.state.password &&
                this.state.confirmPassword === this.state.password) ||
            (!this.state.password && !this.state.confirmPassword)
        ) {
            this.setState({passwordsMatch: true});
        } else {
            this.setState({passwordsMatch: false});
        }
    }

    handleConfirmPasswordChange(el) {
        this.setState({confirmPassword: el.target.value, editing: true});
        if (
            (this.state.confirmPassword &&
                this.state.password &&
                this.state.confirmPassword === this.state.password) ||
            (!this.state.password && !this.state.confirmPassword)
        ) {
            this.setState({passwordsMatch: true});
        } else {
            this.setState({passwordsMatch: false});
        }
    }

    handleExpireDateChange(date) {
        console.log("Account, handleExpireDateChange, date", date);
        this.setState({
            editing: true,
            expireDate: date
        });
        if (
            (this.state.confirmPassword &&
                this.state.password &&
                this.state.confirmPassword === this.state.password) ||
            (!this.state.password && !this.state.confirmPassword)
        ) {
            this.setState({passwordsMatch: true});
        } else {
            this.setState({passwordsMatch: false});
        }
    }

    logState = () => {
      // console.log("getDateMoment, name of constructor of date string", dateString.constructor.name);
        // console.log("getMomentFromDateString, dateString", dateString);
        for (const key of Object.keys(this.state)) {
            console.log(key, this.state[key]);
        }
    };

    getDateMoment = dateString => {
        if (dateString) {
            // console.log("getDateMoment, name of constructor of date string", dateString.constructor.name);
            if (dateString.constructor.name == 'String') {
                // console.log("getMomentFromDateString, dateString", dateString);
                //dateString = "2020-12-20";
                //dateString = this.getDateString(dateString);
                const year = dateString.slice(0, 4);
                const month = dateString.slice(5, 7);
                const day = dateString.slice(8, 10);
                const hour = dateString.slice(11, 13);
                const min = dateString.slice(14, 16);
                const sec = dateString.slice(17, 19);
                const newDate =
                    year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
                return moment(newDate);
            }
            // return moment();
            return dateString;
        }
        return null;
    };

    getFormattedMoment = date => {
    // let dateMoment = dateString;
    // if (dateString && dateString.constructor.name === 'String') {
      // console.log("formatMoment, going for getDateMoment with", dateString)
        return this.getDateMoment(date)
            ? this.getDateMoment(date).format('DD.M.YYYY')
            : null;
    };

    formatMoment(dateString, withTime) {
        // console.log("formatMoment, dateString", dateString);
        let dateMoment = dateString;
        if (dateString && dateString.constructor.name == 'String') {
            // console.log("formatMoment, going for getDateMoment with", dateString)
            dateMoment = this.getDateMoment(dateString);
        }
        // console.log("formatMoment, dateMoment", dateMoment);
        if (withTime) {
            // console.log("formatMoment with Time", dateMoment);
            return dateMoment ? dateMoment.format('DD.M.YYYY h:mm:ss') : null;
        } else if (dateMoment) {
            // console.log("formatMoment just date", dateMoment);
            return dateMoment.format('DD.M.YYYY');
        }
    }

    formatMomentForDatabaseSaving(dateMoment) {
        if (dateMoment && dateMoment.constructor.name == 'String') {
            // console.log("formatMoment, going for getDateMoment with", dateString)
            dateMoment = this.getDateMoment(dateMoment);
        }
        if (dateMoment && dateMoment.constructor.name == 'Moment') {
            return dateMoment.format('YYYY-MM-DD hh:mm:ss');
        }
        return null;
    }

    render() {
        // console.log("account, render, props", this.props);
        // console.log("account, render, state", this.state);

        return (
            <div className={classes.account}>
                <PageHeader className={classes.pageHeader}>Account</PageHeader>
                {/*<label>ID</label>*/}
                {/*<p>state: {this.state.id} and props: {this.props.account.id}</p>*/}
                <Clearfix/>
                <form className={classes.form}>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="id">
                            ID
                        </ControlLabel>
                        <FormControl
                            className={classes.input}
                            type="text"
                            name="username"
                            id="username"
                            defaultValue={this.props.account.id}
                            disabled={true}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="username">
                            Username
                        </ControlLabel>
                        <FormControl
                            className={classes.input}
                            type="text"
                            name="username"
                            id="username"
                            defaultValue={this.state.accountName}
                            disabled={!this.state.editing}
                            onChange={this.handleUsernameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="password">
                            Password
                        </ControlLabel>
                        <FormControl
                            className={classes.input}
                            type="password"
                            name="password"
                            id="password"
                            defaultValue={this.state.password}
                            disabled={!this.state.editing}
                            onChange={this.handlePasswordChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="confirmPassword">
                            Confirm Password
                        </ControlLabel>
                        <FormControl
                            className={classes.input}
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            defaultValue=""
                            disabled={!this.state.editing}
                            onChange={this.handleConfirmPasswordChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="joined">
                            Joined Date
                        </ControlLabel>
                        <FormControl
                            className={classes.input}
                            disabled="disabled"
                            name="joined"
                            id="joined"
                            defaultValue={this.formatMoment(this.state.joinedDate)}
                        />
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                        <ControlLabel className={classes.label} htmlFor="expires">
                            Account Expires
                        </ControlLabel>
                        <DatePicker //https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md
                            //https://reactdatepicker.com
                            disabled={!this.state.editing}
                            id="expires"
                            className={classes.datePicker}
                            dropdownMode="select"
                            showYearDropdown
                            showMonthDropdown
                            selected={this.getDateMoment(this.state.expireDate)}
                            value={this.formatMoment(this.state.expireDate)}
                            openToDate={this.getDateMoment(this.state.expireDate)}
                            dateFormat="D.M.YYYY"
                            minDate={moment()}
                            onChange={this.handleExpireDateChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="lastEdited">
                            Account Last Edited
                        </ControlLabel>
                        <FormControl
                            className={classes.input}
                            disabled="disabled"
                            type="text"
                            name="lastEdited"
                            id="lastEdited"
                            defaultValue={this.formatMoment(this.state.modifiedDate, true)}
                        />
                    </FormGroup>

                    <ButtonToolbar className={classes.buttonToolbar}>
                        {/*<Button disabled={this.state.editing} bsStyle="success"*/}
                        {/*onClick={this.addNewAccount}>Add Account</Button>*/}
                        {/*<Button disabled={this.state.editing} bsStyle="danger"*/}
                        {/*onClick={this.deleteAccount}>Delete Account</Button>*/}
                        {/*<Button disabled={true} bsStyle="primary"*/}
                        {/*onClick={this.listAccounts}>List Accounts</Button>*/}
                        <Button
                            disabled={this.state.editing}
                            bsStyle="primary"
                            onClick={this.editAccount}
                        >
                            Edit
                        </Button>
                        <Button
                            disabled={!this.state.editing}
                            bsStyle="success"
                            onClick={this.saveAccount}
                        >
                            Save Account
                        </Button>
                        <Button disabled={!this.state.editing} onClick={this.cancelEditing}>
                            Cancel
                        </Button>
                        <Button
                            disabled={this.state.editing}
                            bsStyle="info"
                            onClick={this.goBack}
                        >
                            Go Back
                        </Button>
                    </ButtonToolbar>
                </form>

                {/*<button className="btn btn-success" onClick={this.logState}>Log</button>*/}
            </div>
        );
    }
}

const mapStateToProps = state => {
    // console.log("Account, mapStateToProps, account", state.account);
    return {
        app: state.app,
        user: state.user,
        account: state.account,
        accountsManager: state.accountsManager
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAccount: account_id => dispatch(asyncFetchAccount(account_id)),
        onCreateAccount: account => dispatch(asyncCreateAccount(account)),
        onListAccounts: () => dispatch(asyncListAccounts()),
        onEditAccount: account => dispatch(editAccount(account)),
        onCancelEditAccount: account => dispatch(cancelEditAccount(account)),
        onSaveAccount: account => dispatch(asyncSaveAccount(account)),
        onSaveNewAccount: account => dispatch(asyncSaveNewAccount(account)),
        onSetAccountId: account_id => dispatch(setAccountId(account_id)),
        onResetAccount: () => dispatch(resetAccount()),
        onLogoutUser: () => dispatch(logoutUser())
    };
};

export default Protected(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withErrorHandler(Account, axios))
);
