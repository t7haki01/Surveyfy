import {
    DELETE_SURVEY, DELETE_SURVEY_FAILED,
    LIST_SURVEYS, LIST_SURVEYS_FAILED,
} from "../actions/actionsTypes";
import {updateObject} from "../utility";

const initialState = {
    surveysManager: null
};

const surveysManagerReducers = (state = initialState, action) => {
    switch (action.type) {
        case LIST_SURVEYS: {
            const surveys = action.surveys;
            return {
                surveys: surveys
            }
        }
        case LIST_SURVEYS_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        case DELETE_SURVEY: {
            let deleteIndex = null;
            const surveys = state.surveys.slice(0);
            surveys.forEach((survey, index) => {
                if (survey.id === action.survey.id) {
                    deleteIndex = index;
                }
            });
            if (deleteIndex) {
                surveys.splice(deleteIndex, 1);
            }
            return {surveys};
        }
        case DELETE_SURVEY_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        default: {
            return state;
        }
    }
    };

export default surveysManagerReducers;