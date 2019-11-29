/*
* surveyBuilderReducers.js
* */

import {
    CREATE_QUESTION,
    // ADD_QUESTION,
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
    //FETCH_QUESTIONS, FETCH_QUESTIONS_FAILED,
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

// const getMaxId = (questions) => {
//     let maxId = 0;
//     questions.forEach(question => {
//         if (question.id > maxId) {
//             maxId = question.id;
//         }
//     });
//     return maxId;
// };

// const updateQuestionsState = (state, questions) => {
//     console.log("updateQuestionsState, state", state);
//     // let survey = state.surveyBuilder.survey;
//     // survey.questions = questions;
//     // console.log("updateQuestionsState, survey", survey);
//     // return updateObject(state, {...survey});
//     // return updateObject(state, {survey:{...survey, questions: questions}});
//     return updateObject(state, {questions: questions});
// };

const surveyBuilderReducers = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_SURVEY: {
            console.log("reducer, save survey, action survey", action.survey);
            const survey = {...action.survey};
            const questions = [...state.survey.questions];
            survey.saveSuccess = true;
            survey.editingSurvey = false;
            survey.newSurvey = false;
            survey.questions = questions;
            survey.saveSuccess = true;
            console.log("reducer, save survey, returned survey", survey);
            return {...state, survey};
        }
        case SAVE_SURVEY_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }

        case FETCH_SURVEY: {
            console.log("reducer, ffetch survey, survey", action.survey);
            const questions = action.survey.questions.slice(0);
            questions.forEach(question => {
                question.editing = false;
                question.showAnswers = false;
            });
            console.log("reducer fetch survey, questions", questions);
            console.log("reducer, fetch survey, action survey before update", action.survey);
            const survey = {...action.survey};
            console.log("reducer, fetch survey, state survey", survey);
            survey.questions = questions;
            return {...state, survey};
            // const newState = updateQuestionsState(action.survey, questions);
            // console.log("reducer, fetch survey, newState", newState);
            // return {
            //     survey: newState
            // };
        }
        case FETCH_SURVEY_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        case CREATE_SURVEY: {
            console.log("!!!reducer CreateSurvey");
            const survey = {
                id: action.id,
                title: "",
                questions: null,
                newSurvey: true
            };
            console.log("!!!reducer CreateSurvey, survey", survey);
            const createSurveyResponse = {...state, survey};
            console.log("!!!reducer CreateSurvey, response", createSurveyResponse);
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
            // else {
            //     survey.questions = [];
            // }
            console.log("reducer set survey title, edited survey", survey);
            return {...state, survey};
        }

        case EDIT_SURVEY_DATA: {
            const survey = {...action.survey};
            survey.editingSurvey = true;
            return {...state, survey};
        }
        case CREATE_ANSWER: {
            console.log("surveyBuilderReducers, create answer, state: ", state);
            console.log("surveyBuilderReducers, create answer, action: ", action);
            if (!Array.isArray(state.survey.questions) || !state.survey.questions.length) { // ||
                console.log("surveyBuilderReducers, create answer, no questions!!!");
                return state;
            } else {
                let questions = null;
                let newAnswers = null;
                let newAnswer = action.answer;
                newAnswer = {
                    ...newAnswer,
                    editing: true
                };
                console.log("surveyBuilderReducers, newAnswer", newAnswer);
                questions = state.survey.questions.slice(0);
                questions.forEach(question => {
                    if (question.id === newAnswer.questionFK) {
                        if (!Array.isArray(question.answers) || !question.answers.length) {
                            question.answers = [];
                        }
                        newAnswers = question.answers.slice(0);
                        if (!newAnswers.length) {
                            console.log("surveyBuilderReducers, create answer, no answers");
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
                // console.log("surveyBuilderReducers, question", questions);
                // const newState = updateQuestionsState(state, questions);
                // console.log("surveyBuilderReducers, newState", newState);
                // return {
                //     survey: newState
                // };
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
            // const newState = updateQuestionsState(state, questions);
            // console.log("surveyBuilderReducers, edit answer, newState", newState);
            // return {survey: newState.survey};
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
                    //newAnswers.push(newAnswer);
                }
                question.answers = newAnswers;
            });
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
            // const newState = updateQuestionsState(state, questions);
            // console.log("surveyBuilderReducers, save answer, newState", newState);
            // return {...newState.survey};
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
                            if (action.answer.answer_option) {//contains text
                                answer.editing = false;
                                canceledIndex = -1;
                            } else {//no text so delete
                                canceledIndex = index;
                            }
                        }
                    });
                    if (canceledIndex > -1) {//delete answer with no text
                        newAnswers.splice(canceledIndex, 1);
                    }
                    question.answers = newAnswers;
                }
            });
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
            // const newState = updateQuestionsState(state, questions);
            // console.log("reducer, cancel answer, newState", newState);
            // return {
            //     // user: newState.user,
            //     survey: newState.survey
            // }}
        }
        case DELETE_ANSWER: {
            // console.log("surveyBuilderReducers, delete question, state", state);
            let questions = state.survey.questions.slice(0);
            // console.log("surveyBuilderReducers, delete question, BEFORE newQuestions: ", questions);
            // console.log("surveyBuilderReducers, delete question, action id: ", action.id);
            questions.forEach((question) => {
                //console.log("surveyBuilderReducers, cancel question, index: ", index);
                if (question.id === action.answer.questionFK) {
                    console.log("surveyBuilderReducers, delete answer, questionFK", action.answer.questionFK);
                    let deletedIndex = null;
                    const newAnswers = question.answers.slice(0);
                    newAnswers.forEach((answer, index) =>{
                        if (answer.id === action.answer.id) {
                            deletedIndex = index;
                            console.log("surveyBuilderReducers, delete answer, delete index", deletedIndex);
                        }
                    });
                    newAnswers.splice(deletedIndex, 1);
                    question.answers = newAnswers;
                    console.log("surveyBuilderReducers, delete answer, question answers", question.answers);
                }
            });
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
            // const newState = updateQuestionsState(state, questions);
            // // console.log("surveyBuilderReducers, delete question, newState: ", newState);
            // return {
            //     survey: newState.survey
            // }
        }
        case DELETE_ANSWER_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }

        case CREATE_QUESTION: {
            console.log("surveyBuilderReducers, create question, state: ", state);
            //console.log("surveyBuilderReducers, add question, maxId: ", action.maxId);
            //const {type, ...maxId} = action;
            if (!Array.isArray(state.survey.questions)) { // || !state.survey.questions.length
                console.log("surveyBuilderReducers, create question, no questions!!!");
                return state;
            } else {
                //let oldQuestions = null;
                let questions = null;
                //const maxId = state.survey.questions.length;
                //const maxId = getMaxId(state.survey.questions);
                // console.log("surveyBuilderReducers, add question, maxId: ", maxId);
                //const maxId = action.maxId;
                // const newQuestion = {
                //     id: getMaxId(state.survey.questions) + 1,
                //     question: "",
                //     editing: true,
                //     answers: null
                // };
                let newQuestion = action.question;
                newQuestion = {
                    ...newQuestion,
                    editing: true,
                    answers: null
                };
                //console.log("surveyBuilderReducers, add question, newQuestion: ", newQuestion);
                //
                if (!state.survey.questions.length) {
                    // console.log("surveyBuilderReducers, add question, empty questions");
                    questions = [newQuestion];
                } else {
                    questions = state.survey.questions.slice(0);
                    // console.log("surveyBuilderReducers, add question, oldQuestions: ", oldQuestions);
                    questions.push(newQuestion);
                }
                console.log("surveyBuilderReducers, create question, state: ", state);
                console.log("surveyBuilderReducers, add question, questions: ", questions);
                const survey = {...state.survey};
                survey.questions = questions;
                // const newState = updateQuestionsState(state, survey);

                // const newState = {
                //     ...state,
                //     survey: {
                //         ...state.survey,
                //         questions: newQuestions
                //     }
                // };
                // console.log("surveyBuilderReducers, add question, newState: ", newState);
                console.log("surveyBuilderReducers, add question, survey: ", survey);
                return {
                    ...state, survey
                    // survey: newState.survey
                };
            }
        }
        case CREATE_QUESTION_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }

        // case ADD_QUESTION: {
        //     break;
        // }
        case SET_QUESTION_STRING: {
            console.log("set question string, question id", action.id, "string", action.question);
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
            console.log("reducer, save question, state", state);
            console.log("reducer, save question, question", action.question);
            if (!Array.isArray(state.survey.questions)) { // || !state.survey.questions.length
                // console.log("surveyBuilderReducers, save question, no questions!!!");
                return state;
            } else {
                let questions = null;
                // let oldQuestions = null;
                const newQuestion = action.question;
                // console.log("surveyBuilderReducers, save question, newQuestion", newQuestion);
                if (!state.survey.questions.length) {
                    // console.log("surveyBuilderReducers, save question, no old questions");
                    questions = [newQuestion];
                } else {
                    questions = state.survey.questions.slice(0);
                    // console.log("surveyBuilderReducers, save question, BEFORE newQuestions: ", newQuestions);
                    // console.log("surveyBuilderReducers, save question, action id: ", action.id);
                    questions.forEach(question => {
                       if (question.id === action.question.id) {
                           question.id = newQuestion.id;
                           question.question = newQuestion.question;
                           question.editing = false;
                           question.showAnswers = false;
                           question.answers = newQuestion.answers;
                       }
                    });
                    // console.log("surveyBuilderReducers, save question, AFTER newQuestions: ", newQuestions);
                    //newQuestions.push(newQuestion);

                }
                // console.log("surveyBuilderReducers, save question, newQuestions: ", newQuestions);
                const survey = {...state.survey};
                survey.questions = questions;
                // const newState = updateQuestionsState(state, questions);
                console.log("surveyBuilderReducers, save question, updated questions: ", questions);
                return {
                    ...state, survey
                    // user: newState.user,
                    // survey: newState.survey
                }
            }
        }
        case SAVE_QUESTION_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }

        case CANCEL_EDIT_QUESTION: {
            //let canceledQuestion = null;
            // alert(`cancel question, id ${action.id}`);
            let canceledIndex = null;
            let questions = state.survey.questions.slice(0);
            // console.log("surveyBuilderReducers, save question, BEFORE newQuestions: ", newQuestions);
            // console.log("surveyBuilderReducers, save question, action id: ", action.id);
            questions.forEach((question, index) => {
                //console.log("surveyBuilderReducers, cancel question, index: ", index);
                if (question.id === action.id) {
                    //canceledQuestion = question;
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
            // const newState = updateQuestionsState(state, questions);
            // console.log("reducer, fetch survey, newState", newState);
            return {
                ...state, survey
                // user: newState.user,
                // survey: newState.survey
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
            // const newState = updateQuestionsState(state, questions);
            // return {
            //     survey: newState.survey
            // }
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
            // const newState = updateQuestionsState(state, questions);
            // return {
            //     survey: newState.survey
            // }
        }
        case EDIT_QUESTION: {
            //let canceledQuestion = null;
            // alert(`cancel question, id ${action.id}`);
            //let editIndex = null;
            let questions = state.survey.questions.slice(0);
            // console.log("surveyBuilderReducers, save question, BEFORE newQuestions: ", newQuestions);
            // console.log("surveyBuilderReducers, save question, action id: ", action.id);
            questions.forEach((question, index) => {
                //console.log("surveyBuilderReducers, cancel question, index: ", index);
                if (question.id === action.question.id) {
                    //canceledQuestion = question;
                    //editIndex = index;
                    question.editing = true;
                    question.showAnswers = false;
                }
            });
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
            // newQuestions.splice(editIndex, 1);
            // const survey = state.survey;
            // survey.questions = questions;
            // console.log("reducer, editQuestion, updated questions", questions);
            // // const newState = updateQuestionsState(state, questions);
            // // const newState = {
            // //     ...state,
            // //     survey: {
            // //         ...state.survey,
            // //         questions: questions
            // //     }
            // // };
            // // console.log("surveyBuilderReducers, cancel question, newState: ", newState);
            // return {
            //     ...state, survey
            //     // user: newState.user,
            //     // survey: newState.survey
            // }
        }
        case DELETE_QUESTION:{
                //let canceledQuestion = null;
                // alert(`cancel question, id ${action.id}`);
            console.log("surveyBuilderReducers, delete question, state", state);
            let deletedIndex = null;
            let questions = state.survey.questions.slice(0);
            console.log("surveyBuilderReducers, delete question, BEFORE newQuestions: ", questions);
            // console.log("surveyBuilderReducers, delete question, action id: ", action.id);
            questions.forEach((question, index) => {
                //console.log("surveyBuilderReducers, cancel question, index: ", index);
                if (question.id === action.id) {
                    //canceledQuestion = question;
                    deletedIndex = index;
                }
            });
            questions.splice(deletedIndex, 1);
            console.log("surveyBuilderReducers, delete question, questions AFTER delete question: ", questions);
            const survey = {...state.survey};
            survey.questions = questions;
            return {...state, survey};
            // const survey = state.survey;
            // survey.questions = questions;
            // // const newState = updateQuestionsState(state, questions);
            // // const newState = {
            // //     ...state,
            // //     survey: {
            // //         ...state.survey,
            // //         questions: questions
            // //     }
            // // };
            // // console.log("surveyBuilderReducers, delete question, newState: ", newState);
            // console.log("surveyBuilderReducers, delete question, survey: ", survey);
            // return {
            //     ...state, survey
            //     // user: newState.user,
            //     // survey: newState.survey
            // }
        }
        case DELETE_QUESTION_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }

        default:
            return state;
    }
};

export default surveyBuilderReducers;