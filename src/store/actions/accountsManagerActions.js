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

const listSurveys = (accounts) => {
    return {type: LIST_ACCOUNTS, surveys: accounts}
};

export const listAccountsFailed = (error) => {
    return {type: LIST_ACCOUNTS_FAILED, error}
};

export const asyncListAccounts = () => {
    return dispatch => {
        axios.get("/accounts")
        .then(response => {
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
    return {type: DELETE_ACCOUNT, accountId: account_id};
};

export const deleteAccountFailed = (error) => {
    return {type: DELETE_ACCOUNT_FAILED, error}
};

export const asyncDeleteAccount = (account_id) => {
    return dispatch => {
        axios.delete(`/accounts/${account_id}`)
        .then(response => {
            if (response.status === 200) {
                if (response.data.errno) {
                    console.log("asyncDeleteAccount, ERROR", response.data.sqlMessage);
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