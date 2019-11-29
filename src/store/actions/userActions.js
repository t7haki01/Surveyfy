/*
* userActions.js
* */

import {
    CREATE_USER,
    FETCH_USER,
    SAVE_USER,
    RESET_USER,
    SET_DEFAULT_USER_ACCOUNT_ID, CREATE_USER_FAILED, SET_DEFAULT_USER_ACCOUNT_ID_FAILED
} from "./actionsTypes";

import axios from "../../axios-survey";

const fetchUser = (user) => {
    return {
        type: FETCH_USER,
        user: user
    };
};

export const asyncFetchUser = (user) => {
    return dispatch => {
        if (user.accountFK) {
            const fetch = `/account/${user.accountFK}`;
            axios.get(`/users/account/${user.accountFK}`)
            .then(response => {
                const user = response.data[0];
                dispatch(fetchUser(user));
            })
            ;
        } else if (user.id) {
            axios.get(`/users/${user.id}`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.errno) {
                        console.log("ERROR", response.data.sqlMessage);
                    } else {
                        dispatch(fetchUser(response.data[0]));
                    }
                }
            })
        }
    }
};


export const resetUser = (routing, newUser) => {
    return {type: RESET_USER, routing, newUser};
};


export const setUserAccountFK = (account_id) => {
    return {type: SET_DEFAULT_USER_ACCOUNT_ID, accountId: account_id}
};

const setUserAccountFKFailed = (error) => {
    return {type: SET_DEFAULT_USER_ACCOUNT_ID_FAILED, error};
};

export const asyncSetUserAccountFK = (user, account_id) => {
    return dispatch => {
        user.accountFK = account_id;
        axios.put(`/users/${user.id}`, user)
        .then(response => {
            if(response.status === 200) {
                if (response.data.errno) {
                    console.log("userActions, asyncSetUserAccountFK, response ERROR", response.data.sqlMessage);
                    dispatch(setUserAccountFKFailed(response.data.sqlMessage));
                } else {
                    dispatch(setUserAccountFK(account_id));
                }
            }
        })
        .catch(error => {
            console.log("!!!userActions, asyncSetUserAccountFK, axios put ERROR¡¡¡", error);
            dispatch(setUserAccountFKFailed(error))
        })

    }
}

const createUser = (user_id) => {
    return {type: CREATE_USER, id: user_id}
};

export const asyncCreateUser = () => {
    return dispatch => {
        axios.get('/users/maxId')
        .then(maxResponse => {
            const user_id = maxResponse.data[0].maxId + 1;
                dispatch(createUser(user_id));
        })
    }
};

const createUserFailed = (error) => {
    return {type: CREATE_USER_FAILED, error}
};

export const asyncCreateNewUser = (user) => {
    return dispatch => {
        axios.get('/users/maxId')
        .then(maxResponse => {
            if (maxResponse.status === 200) {
                if (maxResponse.data.errno) {
                    console.log("ERROR", maxResponse.data.sqlMessage)
                    dispatch(createUserFailed(maxResponse.data.sqlMessage))
                } else {
                    user.id = maxResponse.data[0].maxId + 1;
                    axios.post(`/users`, user)
                    .then(response => {
                        if (response.status === 200) {
                            if (response.data.errno) {
                                console.log("ERROR",response.data.sqlMessage);
                                dispatch(createUserFailed(response.data.sqlMessage))
                            } else {
                                dispatch(saveUser(user));
                            }
                        }
                    })
                    .catch(error => {
                        dispatch(createUserFailed(error))
                    })
                }
            }
        })
        .catch(error => {
            dispatch(createUserFailed(error))
        })
    }
};

const saveUser = (user) => {
    return {type: SAVE_USER, user}
};

export const asyncSaveUser = (user) => {
    return dispatch => {
        axios.put(`/users/${user.id}`, user)
        .then(response => {
            if (response.status === 200) {
                if (response.errno) {
                    console.log("ERROR",response);
                } else {
                    dispatch(saveUser(user));
                }
            }

        })
    }
};

export const asyncSaveNewUser = (user, user_id) => {
    if (user_id) {
        user.id = user_id;
    }
    return dispatch => {
        axios.post("/users", user)
        .then(response => {
            if (response.status === 200) {
                if (response.errno) {
                    console.log("ERROR",response);
                } else {
                    dispatch(saveUser(user));
                }
            }
        })
    }
};
