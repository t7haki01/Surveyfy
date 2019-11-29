/*
* accountReducers.js
* */

import {
    FETCH_ACCOUNT,
    CREATE_ACCOUNT,
    EDIT_ACCOUNT,
    SAVE_ACCOUNT,
    RESET_ACCOUNT,
    SET_ACCOUNT_ID,
    CANCEL_EDIT_ACCOUNT,
    FETCH_ACCOUNT_FAILED,
    CREATE_ACCOUNT_FAILED,
    SAVE_ACCOUNT_FAILED,
    CREATE_NEW_ACCOUNT
} from "../actions/actionsTypes";

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

                return {...state, ...useraccount};
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
            return {...state, ...account};
        }

        case SET_ACCOUNT_ID: {
            return state;
        }

        default:
            return state;
    }
};

export default accountReducers;
