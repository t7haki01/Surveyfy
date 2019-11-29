/*
* surveyBuilderReducers.js
* */

import {
    CREATE_QUESTION,
    SAVE_QUESTION,
    EDIT_QUESTION,
    DELETE_QUESTION,
    CANCEL_EDIT_QUESTION,
    SHOW_ANSWERS,
    HIDE_ANSWERS,
    CREATE_ANSWER,
    EDIT_ANSWER,
    CANCEL_EDIT_ANSWER,
    SAVE_ANSWER,
    DELETE_ANSWER,
    FETCH_SURVEY,
    SAVE_SURVEY,
    FETCH_SURVEY_FAILED,
    SAVE_SURVEY_FAILED,
    DELETE_QUESTION_FAILED,
    SAVE_QUESTION_FAILED,
    CREATE_QUESTION_FAILED,
    DELETE_ANSWER_FAILED,
    SAVE_ANSWER_FAILED,
    CREATE_ANSWER_FAILED,
    CREATE_SURVEY,
    CREATE_SURVEY_FAILED,
    SET_SURVEY_ID,
    EDIT_SURVEY_DATA,
    SET_SURVEY_TITLE, SET_ANSWER_STRING, SET_QUESTION_STRING
} from "../actions/actionsTypes";
import {updateObject} from "../utility";
const initialState = {
    survey: null,
    error: false
};

const surveyBuilderReducers = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_SURVEY: {
            const survey = {...action.survey};
            const questions = [...state.survey.questions];
            survey.saveSuccess = true;
            survey.editingSurvey = false;
            survey.newSurvey = false;
            survey.questions = questions;
            survey.saveSuccess = true;
            return {...state, survey};
        }
        case SAVE_SURVEY_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }

        case FETCH_SURVEY: {
            const questions = action.survey.questions.slice(0);
            questions.forEach(question => {
                question.editing = false;
                question.showAnswers = false;
            });
            const survey = {...action.survey};
            survey.questions = questions;
            return {...state, survey};
        }
        case FETCH_SURVEY_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        case CREATE_SURVEY: {
            const survey = {
                id: action.id,
                title: "",
                questions: null,
                newSurvey: true
            };
            const createSurveyResponse = {...state, survey};
            return {...state, survey};
        }
        case CREATE_SURVEY_FAILED: {
            return updateObject({error: true, errorMessage: action.error});
        }
        case SET_SURVEY_ID: {
            const survey = {
                id: action.id,
                newSurvey: false
            };
            return {...state, survey};
        }

        case SET_SURVEY_TITLE: {
            const survey = {...action.survey};
            survey.title = action.title;
            if (survey.questions) {
                survey.questions = [...state.survey.questions];
            }
            return {...state, survey};
        }

        case EDIT_SURVEY_DATA: {
            const survey = {...action.survey};
            survey.editingSurvey = true;
            return {...state, survey};
        }
        case CREATE_ANSWER: {
            if (!Array.isArray(state.survey.questions) || !state.survey.questions.length) {
                return state;
            } else {
                let questions = null;
                let newAnswers = null;
                let newAnswer = action.answer;
                newAnswer = {
                    ...newAnswer,
                    editing: true
                };

                questions = state.survey.questions.slice(0);
                questions.forEach(question => {
                    if (question.id === newAnswer.questionFK) {
                        if (!Array.isArray(question.answers) || !question.answers.length) {
                            question.answers = [];
                        }
                        newAnswers = question.answers.slice(0);
                        if (!newAnswers.length) {
                            newAnswers = [newAnswer];
                        } else {
                            newAnswers.push(newAnswer);
                        }
                        question.answers = newAnswers;
                    }
                });
                const survey = {...state.survey};
                survey.questions = questions;
                return {...state, survey};
            }
        }
        case CREATE_ANSWER_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        case EDIT_ANSWER: {
            const questions = state.survey.questions.slice(0);

            questions.forEach((question, index) => {
                if (question.id === action.answer.questionFK) {
                    const newAnswers = question.answers.slice(0);
                    newAnswers.forEach(answer => {
                        if (answer.id === action.answer.id) {
                            answer.editing = true;
                        }
                    });
                    questions.answers = newAnswers;
                }
            });
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
        }
        case SET_ANSWER_STRING: {
            const survey = {...state.survey};
            const questions = [...state.survey.questions];
            questions.forEach(question => {
                if (question.answers) {
                    const answers = [...question.answers];
                    answers.forEach(answer => {
                        if (answer.id === action.id) {
                            answer.answer = action.answer;
                        }
                    });
                    question.answers = answers;
                }
            });
            survey.questions = questions;
            return {...state, survey};
        }
        case SAVE_ANSWER: {
            const questions = state.survey.questions.slice(0);
            let newAnswers = null;
            let newAnswer = action.answer;
            newAnswer = {
                ...newAnswer,
                editing: false
            };
            questions.forEach(question => {
                if (question.id === newAnswer.questionFK) {
                    newAnswers = question.answers.slice(0);
                    newAnswers.forEach(answer => {
                        if (answer.id === action.answer.id) {
                            answer.editing = false;
                        }
                    })
                }
                question.answers = newAnswers;
            });
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
        }
        case SAVE_ANSWER_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        case CANCEL_EDIT_ANSWER: {
            let canceledIndex = null;
            let questions = state.survey.questions.slice(0);
            let newAnswers = null;
            questions.forEach((question) => {
                if (question.id === action.answer.questionFK) {
                    newAnswers = question.answers.slice(0);
                    newAnswers.forEach((answer, index) => {
                        if (answer.id === action.answer.id) {
                            if (action.answer.answer_option) {
                                answer.editing = false;
                                canceledIndex = -1;
                            } else {
                                canceledIndex = index;
                            }
                        }
                    });
                    if (canceledIndex > -1) {
                        newAnswers.splice(canceledIndex, 1);
                    }
                    question.answers = newAnswers;
                }
            });
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
        }
        case DELETE_ANSWER: {
            let questions = state.survey.questions.slice(0);
            questions.forEach((question) => {
                if (question.id === action.answer.questionFK) {
                    let deletedIndex = null;
                    const newAnswers = question.answers.slice(0);
                    newAnswers.forEach((answer, index) =>{
                        if (answer.id === action.answer.id) {
                            deletedIndex = index;
                        }
                    });
                    newAnswers.splice(deletedIndex, 1);
                    question.answers = newAnswers;
                }
            });
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
        }
        case DELETE_ANSWER_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }

        case CREATE_QUESTION: {
            if (!Array.isArray(state.survey.questions)) { // || !state.survey.questions.length
                return state;
            } else {
                let questions = null;
                let newQuestion = action.question;
                newQuestion = {
                    ...newQuestion,
                    editing: true,
                    answers: null
                };

                if (!state.survey.questions.length) {
                    questions = [newQuestion];
                } else {
                    questions = state.survey.questions.slice(0);
                    questions.push(newQuestion);
                }
                const survey = {...state.survey};
                survey.questions = questions;

                return {
                    ...state, survey
                };
            }
        }
        case CREATE_QUESTION_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        case SET_QUESTION_STRING: {
            const survey = {...state.survey};
            const questions = [...state.survey.questions];
            questions.forEach(question => {
                if (question.id === action.id) {
                    question.question = action.question;
                }
            });
            survey.questions = questions;
            return {...state, survey};
        }
        case SAVE_QUESTION: {
            if (!Array.isArray(state.survey.questions)) {
                return state;
            } else {
                let questions = null;
                const newQuestion = action.question;
                if (!state.survey.questions.length) {
                    questions = [newQuestion];
                } else {
                    questions = state.survey.questions.slice(0);
                    questions.forEach(question => {
                       if (question.id === action.question.id) {
                           question.id = newQuestion.id;
                           question.question = newQuestion.question;
                           question.editing = false;
                           question.showAnswers = false;
                           question.answers = newQuestion.answers;
                       }
                    });
                }
                const survey = {...state.survey};
                survey.questions = questions;
                return {
                    ...state, survey
                }
            }
        }
        case SAVE_QUESTION_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }

        case CANCEL_EDIT_QUESTION: {
            let canceledIndex = null;
            let questions = state.survey.questions.slice(0);
            questions.forEach((question, index) => {
                if (question.id === action.id) {
                    if (action.value) {
                        question.editing = false;
                        canceledIndex = -1;
                    } else {
                        canceledIndex = index;
                    }
                }
            });
            if (canceledIndex > -1) {
                questions.splice(canceledIndex, 1);
            }
            const survey = {...state.survey};
            survey.questions = questions;
            return {
                ...state, survey
            }
        }
        case SHOW_ANSWERS: {
            let questions = state.survey.questions.slice(0);
            questions.forEach(question => {
                if (question.id === action.question.id) {
                    question.showAnswers = true;
                }
            });
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
        }
        case HIDE_ANSWERS: {
            let questions = state.survey.questions.slice(0);
            questions.forEach(question => {
                if (question.id === action.question.id) {
                    question.showAnswers = false;
                }
            });
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
        }
        case EDIT_QUESTION: {
            let questions = state.survey.questions.slice(0);
            questions.forEach((question, index) => {
                if (question.id === action.question.id) {
                    question.editing = true;
                    question.showAnswers = false;
                }
            });
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
        }
        case DELETE_QUESTION:{
            let deletedIndex = null;
            let questions = state.survey.questions.slice(0);
            questions.forEach((question, index) => {
                if (question.id === action.id) {
                    deletedIndex = index;
                }
            });
            questions.splice(deletedIndex, 1);
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
        }
        case DELETE_QUESTION_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }

        default:
            return state;
    }
};

export default surveyBuilderReducers;