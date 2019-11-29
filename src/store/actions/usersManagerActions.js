import {
    DELETE_USER, DELETE_USER_FAILED,
    LIST_USERS, LIST_USERS_FAILED, SELECT_USER
} from "./actionsTypes";
import axios from "../../axios-survey";

const listUsers = (users) => {
    console.log("action, listUsers", users);
    return {type: LIST_USERS, users: users}
};

const listUsersFailed = (error) => {
    return {type: LIST_USERS_FAILED, error};
};

export const asyncListUsers = () => {
    return dispatch => {
        axios.get("/users")
        .then(response => {
            if (response.status === 200) {
                if (response.data.errno) {
                    dispatch(listUsersFailed(response.data.sqlMessage));
                } else {
                    console.log("asyncListUsers, response", response);
                    const users = response.data;
                    dispatch(listUsers(users));
                }
            }
        });
    }
};

export const selectUser = (user_id) => {
    return {type: SELECT_USER, id: user_id};
};

const deleteUser = (user_id) => {
    console.log("deleteUser");
    return {type: DELETE_USER, id: user_id}
};

const deleteUserFailed = (error) => {
    return {type: DELETE_USER_FAILED, error};
};

export const asyncDeleteUser = (user_id) => {
    console.log("asyncDeleteUser, user id", user_id);
    return dispatch => {
        axios.delete(`/users/${user_id}`)
        .then(response => {
            console.log("asyncDeleteUser, response", response);
            if (response.status === 200) {
                if (response.data.errno) {
                    console.log("ERROR",response.data.sqlMessage);
                    dispatch(deleteUserFailed(response.data.sqlMessage));
                } else {
                    dispatch(deleteUser(user_id));
                }
            }
        })
    }
};
