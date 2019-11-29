/*
* User.js
*
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-survey';

import {FormControl, FormGroup, ControlLabel, PageHeader, Button, ButtonToolbar} from 'react-bootstrap';

import classes from "./User.css";
import moment from 'moment';

import {
    asyncFetchUser,
    asyncSaveUser,
    asyncSaveNewUser,
    asyncCreateUser,
    resetUser,
} from "../../../store/actions";

import DatePicker from "react-datepicker/es";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Protected from "../../Login/Protected";

class User extends Component {

    state = {
        id: null,
        firstname: "",
        lastname: "",
        accountFK: null,
        type: "",
        email: "",
        birthdate: "",
        phone: "",
        streetAddress: "",
        postalCode: "",
        rewards: "",
        modifiedDate: "",
        editing: false,
        newUser: false,
        unEditedState: {
            id: null,
            firstname: "",
            lastname: "",
            accountFK: null,
            type: "",
            email: "",
            birthdate: null,
            phone: "",
            streetAddress: "",
            postalCode: "",
            rewards: "",
            modifiedDate: null
        }
    };

    constructor(props) {
        super(props);

        this.saveUser = this.saveUser.bind(this);
        this.goBack = this.goBack.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
        this.getMomentFromDateString = this.getMomentFromDateString.bind(this);
        this.getFormattedMoment = this.getFormattedMoment.bind(this);
        this.logState = this.logState.bind(this);
        this.handleBirthdateChange = this.handleBirthdateChange.bind(this);
        this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
        this.handleStreetAddressChange = this.handleStreetAddressChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleAccountFKChange = this.handleAccountFKChange.bind(this);
        this.handleAccountTypeChange = this.handleAccountTypeChange.bind(this);
    }

    componentDidMount() {
        if (this.props.usersManager.selectedUser) {
            const user = {id: this.props.usersManager.selectedUser};
            this.props.onFetchUser(user);

        } else if (this.props.app.account_id) {
            const user = {accountFK: this.props.app.account_id};
            this.props.onFetchUser(user);
        } else {
            this.goBack();
        }
        if (this.props.user) {
            this.updateState(this.props);
            if (this.props.user.newUser) {
                this.setState({newUser: true});
            }
        }
    }

    updateState(someProps) {
        this.setState({
            id: someProps.user.id,
            firstname: someProps.user.firstname,
            lastname: someProps.user.lastname,
            accountFK: someProps.user.accountFK,
            type: someProps.user.type,
            email: someProps.user.email,
            birthdate: this.getMomentFromDateString(someProps.user.birthdate),
            phone: someProps.user.phone,
            streetAddress: someProps.user.streetAddress,
            postalCode: someProps.user.postalCode,
            rewards: someProps.user.rewards,
            modifiedDate: this.getMomentFromDateString(someProps.user.modifiedDate),
            unEditedState: {
                id: someProps.user.id,
                firstname: someProps.user.firstname,
                lastname: someProps.user.lastname,
                accountFK: someProps.user.accountFK,
                type: someProps.user.type,
                email: someProps.user.email,
                birthdate: this.getMomentFromDateString(someProps.user.birthdate),
                phone: someProps.user.phone,
                streetAddress: someProps.user.streetAddress,
                postalCode: someProps.user.postalCode,
                rewards: someProps.user.rewards,
                modifiedDate: this.getMomentFromDateString(someProps.user.modifiedDate)
            }

        });
    }

    componentWillReceiveProps(nextProps, nextContent) {
        this.updateState(nextProps);
        if (nextProps.user.modifiedDate) {
            if (nextProps.user.newUser) {
                this.setState({newUser: true});
            }
        }
        if (nextProps.user.saveSuccess) {
            this.setState({
                saveSuccess: false,
                editing: false,
                newUser: false
            })
        }
    }

    getMomentFromDateString = (dateString, withTime) => {
        if (dateString) {
            const year = dateString.slice(0, 4);
            const month = dateString.slice(5, 7);
            const day = dateString.slice(8, 10);
            const hour = dateString.slice(11, 13);
            const min = dateString.slice(14, 16);
            const sec = dateString.slice(17, 19);
            const newDate = year + "-" + month + "-" + day + ' ' + hour + ':' + min + ':' + sec;
            return moment(newDate);
        }
        return null;
    };

    getFormattedMoment = (dateString, withTime) => {
        if (dateString && withTime) {
            return this.getMomentFromDateString(dateString).format("D.M.YYYY h.mm.ss");
        } else if (dateString) {
            return this.getMomentFromDateString(dateString).format("D.M.YYYY");
        }
    };

    cancelEditing = () => {
        this.setState({
            id: this.state.unEditedState.id,
            firstname: this.state.unEditedState.firstname,
            lastname: this.state.unEditedState.lastname,
            accountFK: this.state.unEditedState.accountFK,
            type: this.state.unEditedState.type,
            email: this.state.unEditedState.email,
            birthdate: this.state.unEditedState.birthdate,
            phone: this.state.unEditedState.phone,
            streetAddress: this.state.unEditedState.streetAddress,
            postalCode: this.state.unEditedState.postalCode,
            rewards: this.state.unEditedState.rewards,
            modifiedDate: this.state.unEditedState.modifiedDate,
            editing: false
        });

    };


    saveUser = () => {
        const saveUser = {
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            accountFK: this.state.accountFK,
            type: this.state.type,
            email: this.state.email,
            birthdate: this.state.birthdate ? this.state.birthdate.format("YYYY-MM-DD") : null,
            phone: this.state.phone,
            streetAddress: this.state.streetAddress,
            postalCode: this.state.postalCode,
            rewards: !this.state.rewards ? 0 : this.state.rewards,
            modifiedDate: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        if (this.state.newUser) {
            this.props.onSaveNewUser(saveUser);
        } else {
            this.props.onSaveUser(saveUser);
        }
    };

    goBack() {
        this.props.onResetUser();
        this.props.history.goBack();
    }

    handleFirstnameChange(el) {
        this.setState({firstname: el.target.value, editing: true});
    }

    handleLastnameChange(el) {
        this.setState({lastname: el.target.value, editing: true});
    }

    handleEmailChange(el) {
        this.setState({email: el.target.value, editing: true});
    }

    handlePhoneChange(el) {
        this.setState({phone: el.target.value, editing: true});
    }

    handleStreetAddressChange(el) {
        this.setState({streetAddress: el.target.value, editing: true});
    }

    handlePostalCodeChange(el) {
        this.setState({postalCode: el.target.value, editing: true});
    }

    handleBirthdateChange(date) {
        if (date) {
            this.setState({birthdate: date, editing: true});
        }
    }

    handleAccountFKChange(el) {
        if (el && el.target && el.target.value) {
            const accountFK = el.target.value;
            this.setState({accountFK: accountFK, editing: true})
        }
    }

    handleAccountTypeChange(el) {
        if (el && el.target && el.target.value) {
            const accountType = el.target.value;
            if (accountType !== "notSelected") {
                this.setState({type: accountType, editing: true});
            } else if (accountType === "notSelected") {
                this.setState({type: null});
            }
        }
    }

    render() {
        const formatMoment = (moment, withTime) => {
            if (withTime) {
                return moment ? moment.format("DD.M.YYYY h:mm") : null;
            } else if (moment) {
                return moment.format("DD.M.YYYY");
            }
        };

        return (
            <div className={classes.userComponent}>
                <PageHeader>Personal Data</PageHeader>

                <hr/>
                <form className={classes.Form}>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="id">First Name</ControlLabel>
                        <FormControl className={classes.Input} disabled={true}
                                     type="text" name="id" id="id"
                                     defaultValue={this.state.id}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="firstname">First Name</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="firstname" id="firstname"
                                     onChange={this.handleFirstnameChange}
                                     defaultValue={this.state.firstname}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="lastname">Last Name</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="lastname" id="lastname"
                                     onChange={this.handleLastnameChange}
                                     defaultValue={this.state.lastname}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="email">Email</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="email" id="email"
                                     onChange={this.handleEmailChange}
                                     defaultValue={this.state.email}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="email">Email</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="email" id="email"
                                     onChange={this.handleEmailChange}
                                     defaultValue={this.state.email}/>
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                        <ControlLabel className={classes.Label} htmlFor="dateofbirth">Date of Birth</ControlLabel>
                        <DatePicker  //https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md
                            //https://reactdatepicker.com
                            id="dateofbirth" className={classes.datePicker}
                            dropdownMode="select" showYearDropdown showMonthDropdown
                            selected={this.state.birthdate}
                            value={formatMoment(this.state.birthdate)}
                            openToDate={this.state.birthdate}
                            dateFormat="D.M.YYYY" maxDate={moment()}
                            onChange={this.handleBirthdateChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="phone">Phone</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="phone" id="phone"
                                     onChange={this.handlePhoneChange}
                                     defaultValue={this.state.phone}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="streetAddress">Street Address</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="streetAddress" id="streetAddress"
                                     onChange={this.handleStreetAddressChange}
                                     defaultValue={this.state.streetAddress}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="postalCode">Postal Code</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="postalCode" id="postalCode"
                                     onChange={this.handlePostalCodeChange}
                                     defaultValue={this.state.postalCode}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="rewards">Account ID</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="number" name="rewards" id="rewards"
                                     onChange={this.handleAccountFKChange}
                                     value={this.state.accountFK}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="rewards">User Account Type</ControlLabel>
                        <FormControl componentClass="select" className={classes.select}
                                     name="accountType" id="accountType"
                                     onChange={this.handleAccountTypeChange}>
                            <option  value="notSelected">Select...</option>
                            <option selected={this.state.type === "client"?"selected":false} value="client">Client</option>
                            <option selected={this.state.type === "company"?"selected":false} value="company">Company</option>
                            <option selected={this.state.type === "admin"?"selected":false} value="admin">Admin</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="rewards">Rewards</ControlLabel>
                        <FormControl className={classes.Input} readOnly={true}
                                     type="number" name="rewards" id="rewards"
                                     value={this.state.rewards}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="lastEdited">Account Last Edited</ControlLabel>
                        <FormControl className={classes.Input} readOnly={true}
                                     type="text" name="lastEdited" id="lastEdited"
                                     value={formatMoment(this.state.modifiedDate, true)}/>
                    </FormGroup>
                    <ButtonToolbar className={classes.buttonToolbar}>

                        <Button disabled={!this.state.editing} bsStyle="success" onClick={this.saveUser}>
                            Save User</Button>
                        <Button disabled={!this.state.editing} onClick={this.cancelEditing}>
                            Cancel</Button>
                        <Button disabled={this.state.editing} bsStyle="info" onClick={this.goBack}>Go Back</Button>
                    </ButtonToolbar>
                </form>
            </div>
        );
    }//render
}//class

const mapStateToProps = (state) => {
    return {
        app: state.app,
        user: state.user,
        usersManager: state.usersManager
    }
};

const mapDispatchToProp = (dispatch) => {
    return {
        onFetchUser: (id) => dispatch(asyncFetchUser(id)),
        onSaveUser: (user) => dispatch(asyncSaveUser(user)),
        onSaveNewUser: (user) => dispatch(asyncSaveNewUser(user)),
        onCreateUser: (user) => dispatch(asyncCreateUser(user)),
        onResetUser: () => dispatch(resetUser())
    }
};

export default Protected(connect(mapStateToProps, mapDispatchToProp)(withErrorHandler(User, axios)));
