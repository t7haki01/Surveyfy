import {combineReducers} from 'redux';

import surveyBuilderReducers from "./surveyBuilderReducers";
import accountReducers from "./accountReducers";
import userReducers from "./userReducers";
import appReducers from "./appReducers";
import surveysManagerReducers from "./surveysManagerReducers";
import usersManagerReducers from "./usersManagerReducers";
import accounsManagerReducers from "./accountsManagerReducers";
import surveyReducers from "./surveyReducers";

const rootReducer = combineReducers({
    surveyBuilder: surveyBuilderReducers,
    account: accountReducers,
    user: userReducers,
    app: appReducers,
    surveysManager: surveysManagerReducers,
    usersManager: usersManagerReducers,
    accountsManager: accounsManagerReducers,
    survey: surveyReducers
});

const appReducer = (state, action) => {
    if (action.type === 'LOGOUT_USER') {
        state = undefined
    }

    return rootReducer(state, action)
};

export default appReducer;