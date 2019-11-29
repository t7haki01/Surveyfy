import {
    FETCH_USER_FIRSTNAME,
    FETCH_USER_FIRSTNAME_FAILED, LOGIN_USER,
    LOGIN_USER_FAILED, LOGOUT_USER,
    SET_ACCOUNT_ID_NAME, USER_LOGIN, USER_LOGIN_FAILED
} from "./actionsTypes";

import axios from "../../axios-survey";
import decode from 'jwt-decode';

export const logoutUser = () => {
    return {type: LOGOUT_USER}
};

const loginUser = (account_id, user_id, user_name) => {
    return {type: LOGIN_USER, account_id, user_id, user_name}
};

const loginUserFailed = (error) => {
    return {type: LOGIN_USER_FAILED, error};
};

export const asyncLoginUser = (user_id) => {
    let account_id = null;
    let user_name = null;
    return dispatch => {
        axios.get(`/users/${user_id}/account`)
        .then(response => {
            if (response.status === 200) {
                if (response.data.errno) {
                    dispatch(loginUserFailed(response.data.sqlMessage));
                } else {
                    account_id = response.data[0].account_id;
                    axios.get(`/users/firstname/${account_id}`)
                    .then(nameResponse => {
                        if (response.status === 200) {
                            if (response.data.errno) {
                                console.log("ERROR", nameResponse.data.sqlMessage);
                                dispatch(loginUserFailed(nameResponse.data.sqlMessage));
                            } else {
                                user_name = nameResponse.data[0].firstname;
                                dispatch(loginUser(account_id, user_id, user_name));
                            }
                        }
                    })
                    .catch(error => {
                        dispatch(loginUserFailed(error));
                    });
                }
            }
        })
        .catch(error => {
            dispatch(loginUserFailed(error));
        });
    }
};

const userLogin = (logindata) => {
    return {type: USER_LOGIN, data: logindata, userType: logindata.type};
};

const userLoginFailed = (error) => {
    console.log("user login failed, error", error);
    return {type: USER_LOGIN_FAILED, error};
};


export const asyncUserLogin = (account, password) => {
    const login = {account: account, password: password};
    return dispatch => {
        axios.post("/login", login)
        .then(response => {
            if (response && response.status === 200) {
                if (response.data.errno) {
                    dispatch(userLoginFailed(response.data.sqlMessage))
                } else if (response.data.err && response.data.message) {
                    dispatch(userLoginFailed(response.data.message));
                } else {
                    if (response.data.status) {
                        const data = decode(response.data.token);
                        axios.get(`/users/firstname/${data.owner}`)
                        .then(nameResponse => {
                            if (nameResponse.status === 200) {
                                if (nameResponse.data.errno) {
                                    dispatch(fetchFirstNameFailed(nameResponse.data.sqlMessage));
                                } else {
                                    data.firstname = nameResponse.data[0].firstname;
                                    dispatch(userLogin(data));
                                }
                            }
                        })
                        .catch(error => {
                            fetchFirstNameFailed(error);
                        });
                    } else {
                        dispatch(userLoginFailed(response.data.status));
                    }
                }
            }
        })
    }
};

export const setAppUserAccountIdName = (account, user) => {
    return {type: SET_ACCOUNT_ID_NAME, account: account, user: user}
};

const fetchFirstname = (firstname, account_id) => {
    return {type: FETCH_USER_FIRSTNAME, firstname: firstname, account_id: account_id}
};

const fetchFirstNameFailed = (error) => {
    return {type: FETCH_USER_FIRSTNAME_FAILED, error};
}

export const asyncFetchFirstName = (account_id) => {
    const comp = `/users/firstname/${account_id}`;
    return dispatch => {
        axios.get(comp)
        .then(response => {
            if (response.status === 200) {
                if (response.data.errno) {
                    dispatch(fetchFirstNameFailed(response.data.sqlMessage));
                } else {
                    const firstname = response && response.data && response.data[0] && response.data[0].firstname;
                    dispatch(fetchFirstname(firstname, account_id));
                }
            }

        })
        .catch(error => {
            fetchFirstNameFailed(error);
        });
    }
};
