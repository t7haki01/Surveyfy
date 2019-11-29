/*
* surveyReducers.js
* */
import {
    GET_SURVEY_AND_QUESTIONS, GET_SURVEY_AND_QUESTIONS_FAILED, REGISTER_ANSWER, REGISTER_ANSWER_FAILED, SET_SURVEY_ID,
    SURVEY_LIST, SURVEY_LIST_FAILED
} from "../actions/actionsTypes";
import {updateObject} from "../utility";

const initialState = {
    surveys: null,
    survey: null,
    fetched: false
};

const surveyReducers= (state = initialState, action) => {
    switch (action.type) {
        case SURVEY_LIST: {
            return {surveys: action.surveys};
        }
        case SURVEY_LIST_FAILED: {
            return {...state, error: true, errorMessage: action.error}
        }
        case REGISTER_ANSWER: {
            return {...state, answerSavedSuccessfully: true};
        }
        case REGISTER_ANSWER_FAILED: {
            return {...state, error: true, errorMessage: action.error}
        }
        case SET_SURVEY_ID: {
            const survey  = {
                id: action.survey_id,
                title: "",
                questions: null,
                fetchData: true,
                fetched: false
            };
            return {...state, survey}
        }
        case GET_SURVEY_AND_QUESTIONS: {
            const questions = action.survey.questions.slice(0);
            questions.forEach((question, index) => {
                question.editing = false;
                question.showAnswers = false;
                const q = action.survey.questions[index];
                let answers = null;
                if (q.answers) {
                    answers = q.answers.slice(0);
                } else {
                }
                question.answers = answers;
            });
            const survey = {...action.survey};
            survey.questions = questions;
            survey.fetched = true;
            const newState = {...state, survey};
            return newState;
        }
        case GET_SURVEY_AND_QUESTIONS_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        default: {
            return state;
        }
    }
};

export default surveyReducers;