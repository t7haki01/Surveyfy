/*
* UsersManager.js
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-survey';
import {
    asyncListUsers,
    asyncCreateUser,
    asyncFetchUser,
    resetUser,
    asyncDeleteUser,
    selectUser,
    logoutUser
} from "../../../store/actions";
import { Table,Button, ButtonGroup,} from 'react-bootstrap';

import classes from "./UsersManager.css";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import AdminOnly from "../../Login/AdminOnly";


class UsersManager extends Component {
    constructor(props) {
        super(props);
        this.createUser = this.createUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }


    componentDidMount() {
        this.props.onListUsers();

    }

    createUser() {
        console.log("Users Manager, createUser");
        this.props.onResetUser(true, true);
        this.props.onCreateUser();
        this.props.history.push("/user");
    }

    editUser(user) {
        console.log("Users Manager, editUser, user accountFK", user);
        this.props.onResetUser(true, false);
        this.props.onSelectUser(user.id);
        // this.props.onFetchUser(user);
        this.props.history.push("/user");
    }

    deleteUser(user_id) {
        console.log("Users Manager, deleteUser, user id", user_id);
        this.props.onDeleteUser(user_id);
    }

    render() {
        return (
            <div className={classes.usersManager}>
                <h1>Users Manager</h1>
                <Table className={classes.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.usersManager.users && this.props.usersManager.users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button onClick={() => this.editUser(user)} className={classes.btnPrimary} bsStyle="primary btn-sm">Edit</Button>
                                        <Button onClick={() =>this.deleteUser(user.id)} className={classes.btnDanger} bsStyle="danger btn-sm">Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                <Button onClick={this.createUser} className={classes.btn}>Add New User</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        usersManager: state.usersManager
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListUsers: () => dispatch(asyncListUsers()),
        onCreateUser: () => dispatch(asyncCreateUser()),
        onFetchUser: (user) => dispatch(asyncFetchUser(user)),
        onResetUser: (routing, newUser) => dispatch(resetUser(routing, newUser)),
        onDeleteUser: (user_id) => dispatch(asyncDeleteUser(user_id)),
        onSelectUser: (user_kd) => dispatch(selectUser(user_kd)),
        onLogoutUser: () => dispatch(logoutUser())
    }
};

export default AdminOnly(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UsersManager, axios)));
