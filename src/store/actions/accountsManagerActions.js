/*
* accountsManagerActions.js
* */
import {
    LIST_ACCOUNTS,
    LIST_ACCOUNTS_FAILED,
    DELETE_ACCOUNT,
    DELETE_ACCOUNT_FAILED, SELECT_ACCOUNT
} from "./actionsTypes";
import axios from "../../axios-survey";

// export const editAccount = (account_id) => {
//     return {type: EDIT_ACCOUNT, accountId: account_id}
// };

const listSurveys = (accounts) => {
    console.log("action, listSurveys", accounts);
    return {type: LIST_ACCOUNTS, surveys: accounts}
};

export const listAccountsFailed = (error) => {
    return {type: LIST_ACCOUNTS_FAILED, error}
};

export const asyncListAccounts = () => {
    return dispatch => {
        axios.get("/accounts")
        .then(response => {
            console.log("!!!asyncListAccounts, response", response);
            if (response.status === 200) {
                if (response.errno) {
                    console.log("ERROR", response.data.sqlMessage);
                } else {
                    const accounts = response.data;
                    dispatch(listSurveys(accounts));
                }
            }
        })
        .catch(error => {
            dispatch(listAccountsFailed(error))
        });
    }
};


export const selectAccount = (account_id) => {
    return {type: SELECT_ACCOUNT, id: account_id}
};

const deleteAccount = (account_id) => {
    console.log("deleteAccount");
    return {type: DELETE_ACCOUNT, accountId: account_id};
};

export const deleteAccountFailed = (error) => {
    return {type: DELETE_ACCOUNT_FAILED, error}
};

export const asyncDeleteAccount = (account_id) => {
    console.log("asyncDeleteAccount, account id", account_id);
    return dispatch => {
        axios.delete(`/accounts/${account_id}`)
        .then(response => {
            console.log("asyncDeleteAccount, response", response);
            if (response.status === 200 /*&& !response.data.errno*/) {
                if (response.data.errno) {
                    console.log("asyncDeleteAccount, ERROR", response.data.sqlMessage);
                    // dispatch(deleteAccountFail(response.data.sqlMessage));
                } else {
                    dispatch(deleteAccount(account_id));
                }
            }
        })
        .catch(error => {
            dispatch(deleteAccountFailed(error))
        });
    }
};