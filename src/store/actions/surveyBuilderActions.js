/*
* surveyBuilderActions.js
* */
import {
    CREATE_QUESTION,
    EDIT_QUESTION,
    DELETE_QUESTION,
    SAVE_QUESTION,
    CANCEL_EDIT_QUESTION,
    SHOW_ANSWERS,
    HIDE_ANSWERS,
    CREATE_SURVEY,
    FETCH_SURVEY_FAILED,
    FETCH_SURVEY,
    SAVE_SURVEY,
    EDIT_SURVEY_DATA,
    CREATE_ANSWER,
    SAVE_ANSWER,
    EDIT_ANSWER,
    DELETE_ANSWER,
    CANCEL_EDIT_ANSWER,
    CREATE_QUESTION_FAILED,
    SAVE_SURVEY_FAILED,
    CREATE_ANSWER_FAILED,
    SAVE_ANSWER_FAILED,
    DELETE_ANSWER_FAILED,
    DELETE_QUESTION_FAILED,
    SAVE_QUESTION_FAILED,
    SET_SURVEY_ID,
    CREATE_SURVEY_FAILED,
    SET_SURVEY_TITLE,
    SET_QUESTION_STRING, SET_ANSWER_STRING
} from "./actionsTypes";

import axios from "../../axios-survey";

export const editSurvey = (survey) => {
    return {type: EDIT_SURVEY_DATA, survey: survey};
};

export const setSurveyTitle = (survey, title) => {
    return {type: SET_SURVEY_TITLE, survey, title};
};

export const setQuestionString = (question_id, question_string) => {
    return {type: SET_QUESTION_STRING, id: question_id, question: question_string};
};

export const setAnswerString = (answer_id, answer_string) => {
    return {type: SET_ANSWER_STRING, id: answer_id, answer: answer_string};
};

const saveSurvey = (survey) => {
    return {type: SAVE_SURVEY, survey: survey};
};

const saveSurveyFailed = (error) => {
    console.log("saveSurveyFailed, error", error);
    return {type: SAVE_SURVEY_FAILED, error};
};

export const asyncSaveSurvey = (survey, newSurvey) => {
    return dispatch => {
        if (newSurvey) {
            axios.post(`/surveys`, survey)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.errno) {
                        console.log("asyncSaveSurvey, POST sql error", response.data.sqlMessage);
                        dispatch(saveSurveyFailed(response.data.sqlMessage));
                    } else {
                        dispatch(saveSurvey(survey));
                    }
                }
            })
            .catch(error => {
                console.log("asyncSaveSurvey, POST catch error", error);
                dispatch(saveSurveyFailed(error));
            });
        } else {
            const srvy = {
                title: survey.title,
                owner: survey.owner
            };
            axios.put(`/surveys/${survey.id}`, srvy)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.errno) {
                        console.log("asyncSaveSurvey, PUT sql error", response.data.sqlMessage);
                        dispatch(saveSurveyFailed(response.data.sqlMessage));
                    } else {
                        dispatch(saveSurvey(survey));
                    }
                }
            })
            .catch(error => {
                console.log("asyncSaveSurvey, PUT catch error", error);
                dispatch(saveSurveyFailed(error));
            });
        }
    }
};



const createAnswer = (answer) => {
    return {type: CREATE_ANSWER, answer: answer}
};

const createAnswerFailed = (error) => {
    return {type: CREATE_ANSWER_FAILED, error};
};

export const asyncCreateAnswer = (answer) => {
    return dispatch => {
        /*********** FETCH MAX ID *************/
        axios.get("/answer_options/maxId")
        .then(maxResponse => {
            if (maxResponse.status === 200) {
                if (maxResponse.data.errno) {
                    dispatch(createAnswerFailed(maxResponse.data.sqlMessage));
                } else {
                    answer.id = maxResponse.data[0].maxId + 1;
                    /*********** POST ANSWER *************/
                    axios.post("/answer_options", answer)
                    .then(response => {
                        if (response.status === 200) {
                            if (response.data.errno) {
                                dispatch(createAnswerFailed(response.data.sqlMessage));
                            } else {
                                dispatch(createAnswer(response.data));
                            }
                        }
                    })
                    .catch(error => {
                        dispatch(createAnswerFailed(error));
                    });
                }
            }
        })
        .catch(error => {
            dispatch(createAnswerFailed(error));
        });
    }
};

const saveAnswer = (answer) => {
    return {type: SAVE_ANSWER, answer: answer}
};

const saveAnswerFailed = (error) => {
    return {type: SAVE_ANSWER_FAILED, error};
};

export const asyncSaveAnswer = (answer) => {
    return dispatch => {
        axios.put(`/answer_options/${answer.id}`, answer)
        .then(response => {
            if (response.status === 200) {
                if (response.data.errno) {
                    dispatch(saveAnswerFailed(response.data.sqlMessage));
                } else {
                    dispatch(saveAnswer(answer));
                }
            }
        })
        .catch(error => {
            dispatch(saveAnswerFailed(error));
        });
    }
};

export const editAnswer = (answer) => {
    return {type: EDIT_ANSWER, answer}
};

const deleteAnswer = (answer) => {
    return {type: DELETE_ANSWER, answer: answer}
};

const deleteAnswerFailed = (error) => {
    return {type: DELETE_ANSWER_FAILED, error};
};

export const asyncDeleteAnswer = (answer) => {
    return dispatch => {
        axios.delete(`/answer_options/${answer.id}`)
        .then(response => {
            if (response.status === 200) {
                if (response.data.errno) {
                    dispatch(deleteAnswerFailed(response.data.sqlMessage));
                } else {
                    dispatch(deleteAnswer(answer));
                }
            }
        })
        .catch(error => {
            dispatch(deleteAnswerFailed(error));
        });
    }
};

export const cancelAnswer = (answer) => {
    return {type: CANCEL_EDIT_ANSWER, answer: answer}
};

export const editQuestion = (question) => {
    return {type: EDIT_QUESTION, question};
};

const deleteQuestion = (question_id) => {
    return {type: DELETE_QUESTION, id: question_id}
};

const deleteQuestionFailed = (error) => {
    console.log("action, deleteQuestionFailed, error", error);
    return {type: DELETE_QUESTION_FAILED, error};
};

export const asyncDeleteQuestion = (question_id) => {
    return dispatch => {
        axios.delete(`/questions/${question_id}`)
        .then(response => {
            if (response.status === 200) {
                if (response.data.errno) {
                    dispatch(deleteQuestionFailed(response.data.sqlMessage));
                } else {
                    dispatch(deleteQuestion(question_id));
                }
            }
        })
        .catch(error => {
            dispatch(deleteQuestionFailed(error));
        });
    }
};

const saveQuestion = (question, newQuestion) => {
    return {type: SAVE_QUESTION, question, newQuestion}
};

const saveQuestionFailed = (error) => {
    return {type: SAVE_QUESTION_FAILED, error};
};

export const asyncSaveQuestion = (question, newQuestion) => {
    return dispatch => {
        axios.put(`/questions/${question.id}`, question)
        .then(response => {
            if (response.status === 200) {
                if (response.data.errno) {
                    dispatch(saveQuestionFailed(response.data.sqlMessage));
                } else {
                    dispatch(saveQuestion(question, newQuestion));
                }
            }
        })
        .catch(error => {
            dispatch(saveQuestionFailed(error));
        })
    }
};

export const cancelQuestion = (id, value) => {
    return {type: CANCEL_EDIT_QUESTION, id: id, value: value}
};

export const showAnswers = (question) => {
    return {type: SHOW_ANSWERS, question: question}
};

export const hideAnswers = (question) => {
    return {type: HIDE_ANSWERS, question: question}
};

const fetchSurvey = (survey) => {
    return {type: FETCH_SURVEY, survey: survey}
};

export const fetchSurveyFailed = (error) => {
    return {type: FETCH_SURVEY_FAILED, error}
};

export const asyncFetchSurvey = (survey_id) => {
    return dispatch => {
        /*********** FETCH SURVEY *************/
        axios.get(`/surveys/${survey_id}`) //
        .then(response => {
            let survey = response.data[0];
            /*********** FETCH QUESTIONS *************/
            axios.get(`/surveys/${survey.id}/questions`)
            .then(response => {
                survey.questions = response.data;
                survey.questions.forEach(question => {
                    /*********** FETCH ANSWERS *************/
                    axios.get(`questions/${question.id}/options`)
                    .then(answerResponse => {
                        question.answers = answerResponse.data;
                    })//get answers
                    .catch(error => {
                        return dispatch(fetchSurveyFailed(error));
                    });//catch answers
                }); //for each question
                dispatch(fetchSurvey(survey));
            })//get questions then
            .catch(error => {
                dispatch(fetchSurveyFailed(error))
            });//catch questions
        })//get survey
        .catch(error => {
            dispatch(fetchSurveyFailed(error));
        });//catch survey
    }
};//fetchQuestion

const createQuestion = (question) => {
    return {type: CREATE_QUESTION, question: question};
};

const createQuestionFailed = (error) => {
    return {type: CREATE_QUESTION_FAILED, error};
};

export const asyncCreateQuestion = (question) => {
    return dispatch => {
        /*********** FETCH MAX ID *************/
        axios.get("questions/maxId")
        .then(maxResponse => {
            if (maxResponse.status === 200) {
                if (maxResponse.data.errno) {
                    console.log("ERROR", maxResponse.data.sqlMessage);
                    dispatch(createQuestionFailed(maxResponse.data.sqlMessage))
                } else {
                    question.id = maxResponse.data[0].maxId + 1;
                    /*********** POST QUESTION *************/
                    axios.post("/questions", question)
                    .then(response => {
                        if (response.status === 200) {
                            if (response.data.errno) {
                                console.log("ERROR", response.data.sqlMessage);
                                dispatch(createQuestionFailed(response.data.sqlMessage))
                            } else {
                                dispatch(createQuestion(response.data));
                            }
                        }
                    })
                    .catch(error => {
                        dispatch(createQuestionFailed(error));
                    });
                }
            }
        })
        .catch(error => {
            dispatch(createQuestionFailed(error));
        });
    }
};


export const setSurveyId = (survey_id) => {
    return {type: SET_SURVEY_ID, id: survey_id};
};

const createSurvey = (survey_id) => {
    return {type: CREATE_SURVEY, id: survey_id};
};

const createSurveyFailed = (error) => {
    return {type: CREATE_SURVEY_FAILED, error};
};

export const asyncCreateNewSurvey = () => {
    return dispatch => {
        axios.get("/surveys/maxId")
        .then(response => {
            if (response.status === 200) {
                if (response.data.errno) {
                    dispatch(createSurveyFailed(response.data.sqlMessage));
                } else {
                    dispatch(createSurvey(response.data[0].maxId + 1));
                }
            }
        })
        .catch(error => {
            dispatch(createSurveyFailed(error));
        });
    }
};