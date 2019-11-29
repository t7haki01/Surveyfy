/*
* accountActions.js
* */
import {
    FETCH_ACCOUNT,
    FETCH_ACCOUNT_FAILED,
    CREATE_ACCOUNT,
    CREATE_ACCOUNT_FAILED,
    EDIT_ACCOUNT,
    RESET_ACCOUNT,
    SAVE_ACCOUNT,
    SAVE_ACCOUNT_FAILED,
    CANCEL_EDIT_ACCOUNT,
    SET_ACCOUNT_ID, CREATE_NEW_ACCOUNT
} from "./actionsTypes";

import axios from "../../axios-survey";

const fetchAccount = (account) => {
    // console.log("fetchAccount, user", user);
    return {type: FETCH_ACCOUNT, account: account}
};

export const fetchAccountFailed = (error) => {
    return {type: FETCH_ACCOUNT_FAILED, error}
};

export const asyncFetchAccount = (account_id) => {
    console.log("asyncFetchAccount, account id", account_id);
    return dispatch => {
        axios.get(`/accounts/${account_id}`)
        .then(response => {
            if (response.status === 200){
                if (response.data.errno) {
                    console.log("ERROR", response.data.sqlMessage)
                } else {
                    const accountResponse = response.data[0];
                    // console.log("asyncFetchAccount, response data", response.data[0]);
                    dispatch(fetchAccount(accountResponse));
                }
            }
        })//then
        .catch(error => {
            console.log("asyncFetchAccount error: ", error);
            dispatch(fetchAccountFailed(error));
        })
    }
};

export const setAccountId = (account_id) => {
    return {type: SET_ACCOUNT_ID/*, accountId: account_id*/}
};

const createAccount = (id) => {
    console.log("@@@ createAccount, account", id);
    return {type: CREATE_ACCOUNT, id}
};

export const createAccountFailed = (error) => {
    console.log("¡¡¡ createAccountFailed, error", error);
    return {type: CREATE_ACCOUNT_FAILED, error}
};

export const asyncCreateAccount = () => {
    // console.log("asyncCreateAccount, account", account);
    return dispatch => {
        axios.get("/accounts/maxId")
        .then(response => {
            console.log("asyncCreateAccount, maxId", response.data[0].maxId);
            if (response.status === 200){
                if (response.data.errno) {
                    console.log("ERROR", response.data.sqlMessage)
                } else {
                    dispatch(createAccount(response.data[0].maxId + 1));
                }
            }
        })
        .catch(error => {
            console.log("asyncCreateAccount error: ", error);
            dispatch(createAccountFailed(error));
        });

    }
};

const createNewAccount = (account) => {
    console.log("accountActions, createNewAccount, account");
    return {type: CREATE_NEW_ACCOUNT, account};
};

export const asyncCreateNewAccount = (account) => {
    // console.log("asyncCreateAccount, account", account);
    return dispatch => {
        axios.get("/accounts/maxId")
        .then(maxResponse => {
            console.log("asyncCreateAccount, maxId", maxResponse.data[0].maxId);
            if (maxResponse.status === 200){
                if (maxResponse.data.errno) {
                    console.log("asyncCreateNewAccount, ERROR", maxResponse.data.sqlMessage)
                } else {
                    // dispatch(createAccount(response.data[0].maxId + 1));
                    account.id = maxResponse.data[0].maxId + 1;
                    console.log("asyncCreateNewAccount, account with maxId", account);
                    axios.post(`/accounts/`, account)
                    .then(response => {
                        console.log("asyncCreateNewAccount, post account response", response);
                        if (response.status === 200){
                            if (response.data.errno) {
                                console.log("ERROR", response.data.sqlMessage)
                            } else {
                                account.saveSuccess = true;
                                console.log("!!!asyncCreateAccount, account with successful save", account);
                                dispatch(createNewAccount(account));
                            }
                        }
                    })
                    // .catch(error => {
                    //     console.log("asyncCreateNewAccount post account error: ", error);
                    //     dispatch(createAccountFailed(error));
                    // });

                }
            }
        })
        .catch(error => {
            console.log("asyncCreateAccount maxID error: ", error);
            dispatch(createAccountFailed(error));
        });

    }
};




export const editAccount = (account) => {
    return {type: EDIT_ACCOUNT, account: account};
};

// const listAccounts = (accounts) => {
//     console.log("listAccouints");
//     return {type: LIST_ACCOUNTS, accounts: accounts}
// };
//
// export const asyncListAccounts = () => {
//     console.log("asyncListAccounts");
//     return dispatch => {
//         axios.get("/accounts")
//         .then(response => {
//             const receivedAccounts = response.data;
//             console.log("asyncListAccounts, received data", receivedAccounts);
//             dispatch(listAccounts(receivedAccounts));
//         })
//     }
// };

export const cancelEditAccount = (account) => {
    return {type: CANCEL_EDIT_ACCOUNT, account};
};

export const resetAccount = (newAccount, routing) => {
    return {type: RESET_ACCOUNT, newAccount, routing}
};

const saveAccount = (account) => {
    console.log("saveAccount", account);
    return {type: SAVE_ACCOUNT, account}
};

export const saveAccountFailed = (error) => {
    return {type: SAVE_ACCOUNT_FAILED, error}
};

export const asyncSaveNewAccount = (account, account_id) => {
    if (account_id) {
        account.id = account_id;
    }
    console.log("asyncSaveNewAccouint, account", account);
    return dispatch => {
        axios.post(`/accounts/`, account)
        .then(response => {
            console.log("asyncSaveNewAccount, response", response);
            if (response.status === 200){
                if (response.data.errno) {
                    console.log("ERROR", response.data.sqlMessage)
                } else {
                    account.saveSuccess = true;
                    dispatch(saveAccount(account));
                }
            }
        })
        .catch(error => {
            console.log("asyncSaveNewAccount error: ", error);
            dispatch(saveAccountFailed(error));
        });
    }
};

export const asyncSaveAccount = (account) => {
    console.log("asyncSaveAccouint, account", account);
    return dispatch => {
        axios.put(`/accounts/${account.id}`, account)
        .then(response => {
            console.log("asyncSaveAccount, response", response);
            if (response.status === 200){
                if (response.data.errno) {
                    console.log("ERROR", response.data.sqlMessage)
                } else {
                    account.saveSuccess = true;
                    dispatch(saveAccount(account));
                }
            }
        })
        .catch(error => {
            console.log("asyncSaveAccount error: ", error);
            dispatch(saveAccountFailed(error));
        });
    }
};