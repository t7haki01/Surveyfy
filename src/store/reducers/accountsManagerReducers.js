/*
* accountsManagerReducers.js
* */
import {
    LIST_ACCOUNTS,
    EDIT_ACCOUNT,
    DELETE_ACCOUNT, LIST_ACCOUNTS_FAILED, DELETE_ACCOUNT_FAILED, SELECT_ACCOUNT
} from "../actions/actionsTypes";
import {updateObject} from "../utility";

const initialState = {
    accountsManager: null,
    selectedAccount: null
};

const accountsManagerReducers = (state = initialState, action) => {
    switch (action.type) {
        case LIST_ACCOUNTS: {
            console.log("accountsManagerReducers, action accounts", action.accounts);
            const accounts = action.surveys;
            console.log("accountsManagerReducers, accounts", accounts);
            return {
                accounts: accounts
            }
        }
        case LIST_ACCOUNTS_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        case EDIT_ACCOUNT: {
            return {selectedAccount: action.accountId}
        }
        case SELECT_ACCOUNT: {
            return {...state, selectedAccount: action.id}
        }
        case DELETE_ACCOUNT: {
            console.log("accountsManagerReducers, state accounts", state.accounts);
            const accounts = state.accounts.slice(0);
            let deleteIndex = null;
            accounts.forEach((account, index) => {
                if (account.id === action.accountId) {
                    deleteIndex =  index;
                }
            });
            accounts.splice(deleteIndex, 1);
            return {accounts};
        }
        case DELETE_ACCOUNT_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        default: {
            return state;
        }
    }
};

export default accountsManagerReducers;