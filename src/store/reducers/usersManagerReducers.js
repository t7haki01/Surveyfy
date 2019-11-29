import {
    DELETE_USER, DELETE_USER_FAILED,
    LIST_USERS, LIST_USERS_FAILED, SELECT_USER
} from "../actions/actionsTypes";
import {updateObject} from "../utility";

const initialState = {
    usersManager: null,
    selectedUser: null
};

const usersManagerReducers = (state = initialState, action) => {
    switch (action.type) {
        case LIST_USERS: {
            const users = action.users;
            return {
                    users: users
            }
        }
        case LIST_USERS_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        case SELECT_USER: {
            return {...state, selectedUser: action.id}
        }
        case DELETE_USER: {
            const users = state.users.slice(0);
            let deleteIndex = null;
            users.forEach((user, index) => {
                if (user.id === action.id) {
                    deleteIndex =  index;
                }
            });
            users.splice(deleteIndex, 1);
            return {users};
        }
        default: {
            return state;
        }
        case DELETE_USER_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
    }
};

export default usersManagerReducers;