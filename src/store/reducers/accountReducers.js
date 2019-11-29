/*
* accountReducers.js
* */

import {
    FETCH_ACCOUNT,
    CREATE_ACCOUNT,
    EDIT_ACCOUNT,
    // DELETE_ACCOUNT,
    // LIST_ACCOUNTS,
    SAVE_ACCOUNT,
    RESET_ACCOUNT,
    SET_ACCOUNT_ID,
    CANCEL_EDIT_ACCOUNT,
    FETCH_ACCOUNT_FAILED,
    CREATE_ACCOUNT_FAILED,
    SAVE_ACCOUNT_FAILED,
    CREATE_NEW_ACCOUNT
} from "../actions/actionsTypes";

// import {updateObject} from "../utility";
import moment from 'moment';
import {updateObject} from "../utility";

const initialState = {
    id: null,
    account: "",
    expireDate: "",
    isExpired: null,
    joinedDate: "",
    modifiedDate: "",
    password: "",
};

const accountReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCOUNT: {
            if (action.account) {
                // console.log("accountReducer, account", action.account);
                const acnt = action.account;
                const useraccount = {
                    id: acnt.id,
                    account: acnt.account,
                    password: acnt.password,
                    joinedDate: acnt.joinedDate,
                    expireDate: acnt.expireDate,
                    isExpired: acnt.isExpired,
                    modifiedDate: acnt.modifiedDate,
                    newAccount: false,
                    editing: false,
                    fetchSuccess: true
                };

                //const newState = updateObject(state, user_account);
                //console.log("accountReduces, newState", newState);
                return {...state, ...useraccount};
                // return updateObject(state, {account: action.account});
            }
            return state;
        }
        case FETCH_ACCOUNT_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        case CREATE_ACCOUNT: {
            const account = {
                id: action.id,
                account: "",
                expireDate: null,
                isExpired: null,
                joinedDate: moment(),
                modifiedDate: moment(),
                password: "",
                newAccount: true,
                routing: true,
                editing: true
            };
            // const acnt = action.account;
            console.log("uaccountrReducers, create account, account", account);
            // console.log("accountrReducers, create account, useraccount", account);
            return {...state, ...account};
        }
        case CREATE_ACCOUNT_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }

        case CREATE_NEW_ACCOUNT: {
            const newAccount = {
                id: action.account.id,
                account: action.account.account,
                expireDate: action.account.expireDate,
                joinedDate: action.account.joinedDate,
                password: action.account.password,
                newAccount: false,
                editing: false,
                saveSuccess: true
            };
            console.log("accountReducers, create new account, return action.account", {...newAccount});
            return {...newAccount};
        }

        case EDIT_ACCOUNT: {
            let account = action.account;
            account = {
                ...account,
                newAccount: false,
                editing: true
            };
            return {...state, ...account};
        }

        case CANCEL_EDIT_ACCOUNT: {
            let account = {...action.account};
            account = {
                ...account,
                newAccount: false,
                editing: false
            };
            return {...state, ...account};
        }

        case SAVE_ACCOUNT: {
            let account = action.account;
            account = {
                ...account,
                saveSuccess: true,
                editing: false,
                newAccount: false,
                componentShouldUpdate: true
            };
            return {...state, ...account};
        }
        case SAVE_ACCOUNT_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        case RESET_ACCOUNT: {
            const account = {
                id: action.id,
                account: "",
                expireDate: null,
                isExpired: null,
                joinedDate: moment(),
                modifiedDate: moment(),
                password: "",
                routing: action.routing,
                newAccount: action.newAccount,
                editing: false,
                componentShouldUpdate: true
            };
            const newState = {...state, ...account};
            console.log("accountReducers, reset account, newState", newState);
            return {...state, ...account};
            // return {...initialState};
        }

        case SET_ACCOUNT_ID: {
            // const account = {id: action.accountId};
            // const newState = {...state, ...account};
            // console.log("accountReducers, set account id, newState", newState);
            // return {...state, ...account};
            return state;
        }

        default:
            return state;
    }
};

export default accountReducers;
