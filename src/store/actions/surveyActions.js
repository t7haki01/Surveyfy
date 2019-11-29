/*
* surveyActions.js
* */
import {

} from "./actionsTypes";

import axios from "../../axios-survey";
import {SURVEY_LIST, SURVEY_LIST_FAILED} from "./actionsTypes";
import {GET_SURVEY_AND_QUESTIONS} from "./actionsTypes";
import {GET_SURVEY_AND_QUESTIONS_FAILED} from "./actionsTypes";
import {SET_SURVEY_ID} from "./actionsTypes";
import {REGISTER_ANSWER_FAILED} from "./actionsTypes";
import {REGISTER_ANSWER} from "./actionsTypes";

const registerAnswer = (answer) => {
    return {type: REGISTER_ANSWER, answer};
};

const registerAnswerFailed = (error) => {
    return {type: REGISTER_ANSWER_FAILED, error};
};

export const asynRegisterAnswer = (answer, question, user_id) => {
    const userAnswer = {
        user_answer: answer,
        userFK: user_id,
        question: question
    };
    return dispatch => {
        axios.post("/answers", userAnswer)
        .then(response => {
            if (response.status === 200) {
                if (response.data.errno) {
                    dispatch(registerAnswerFailed(response.data.sqlMessage));
                } else {
                    dispatch(registerAnswer(userAnswer));
                }
            }
        })
        .catch(error => {
            dispatch(registerAnswerFailed(error));
        });
    }
};

const surveyList = (surveys) => {
    return {type: SURVEY_LIST, surveys: surveys}
};

const surveyListFailed = (error) => {
    console("surveyListFailed, error", error);
    return {type: SURVEY_LIST_FAILED, error};
};

export const asyncSurveyList = (user_id) => {
    return dispatch => {
        if (user_id > 0) {
            axios.get(`/surveys/owner/${user_id}`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.errno) {
                        console.log("asyncSurveyList, ERROR", response.data.sqlMessage);
                        dispatch(surveyListFailed(response.data.sqlMessage));
                    } else {
                        const surveys = response.data;
                        dispatch(surveyList(surveys));
                    }
                }
            })
            .catch(error => {
                dispatch(surveyListFailed(error));
            });
        } else {
            axios.get("/surveys")
            .then(response => {
                if (response.status === 200) {
                    if (response.data.errno) {
                        console.log("asyncSurveyList, ERROR", response.data.sqlMessage);
                        dispatch(surveyListFailed(response.data.sqlMessage));
                    } else {
                        const surveys = response.data;
                        dispatch(surveyList(surveys));
                    }
                }
            })
            .catch(error => {
                dispatch(surveyListFailed(error));
            });
        }
    }
};

export const setSurveyId = (survey_id) => {
    return {type: SET_SURVEY_ID, survey_id}
};

const getSurveyAndQuestions = (survey) => {
    return {type: GET_SURVEY_AND_QUESTIONS, survey: survey}
};

export const getSurveyAndQuestionsFailed = (error) => {
    return {type: GET_SURVEY_AND_QUESTIONS_FAILED, error}
};

export const asyncGetSurveyAndQuestions = (survey_id) => {
    return dispatch => {
            /*********** FETCH ALL SURVEYS *************/
            axios.get(`/surveys/${survey_id}`) //
            .then(response => {
                if (response.status === 200) {
                    if (response.data.errno) {
                        dispatch(getSurveyAndQuestionsFailed(response.data.sqlMessage));
                    } else {
                        let survey = response.data[0];
                        /*********** FETCH QUESTIONS *************/
                        axios.get(`/surveys/${survey.id}/questions`)
                        .then(questionsResponse => {
                            if (questionsResponse.status === 200) {
                                if (questionsResponse.data.errno) {
                                    dispatch(getSurveyAndQuestionsFailed(questionsResponse.data.sqlMessage));
                                } else {
                                    survey.questions = questionsResponse.data;
                                    let qCount = survey.questions.length;

                                    survey.questions.forEach(question => {
                                        /*********** FETCH ANSWERS *************/
                                        axios.get(`questions/${question.id}/options`)
                                        .then(answerResponse => {
                                            if (answerResponse.status === 200) {
                                                if (answerResponse.data.errno) {
                                                    qCount--;
                                                    dispatch(getSurveyAndQuestionsFailed(answerResponse.data.sqlMessage));
                                                } else {
                                                    qCount--;
                                                    question.answers = answerResponse.data;
                                                }
                                            }
                                            if (qCount === 0) {
                                                dispatch(getSurveyAndQuestions(survey));
                                            }
                                        })//get answers
                                        .catch(error => {
                                            dispatch(getSurveyAndQuestionsFailed(error));
                                        });//catch answers
                                    }); //for each question
                                }
                            }
                        })//get questions then
                        .catch(error => {
                            dispatch(getSurveyAndQuestionsFailed(error))
                        });//catch questions
                    }
                }
            })//get survey
            .catch(error => {
                dispatch(getSurveyAndQuestionsFailed(error));
            });//catch survey
        }//dispatch
};//asyncGetSurveyAndQuestions
