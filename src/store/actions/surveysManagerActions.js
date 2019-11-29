import {
    // CREATE_SURVEY,
    // CREATE_SURVEY_FAILED,
    DELETE_SURVEY, DELETE_SURVEY_FAILED,
    // EDIT_SURVEY,
    // EDIT_SURVEY_DATA,
    LIST_SURVEYS, LIST_SURVEYS_FAILED,
    // SET_SURVEY_ID
} from "./actionsTypes";
import axios from "../../axios-survey";

const listSurveys = (surveys) => {
    console.log("action, listSurveys", surveys);
    return {type: LIST_SURVEYS, surveys: surveys}
};

const listSurveysFailed = (error) => {
    return {type: LIST_SURVEYS_FAILED, error};
};

export const asyncListSurveys = (user_id) => {
    return dispatch => {
        if (user_id > 0) {
            axios.get(`/surveys/owner/${user_id}`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.errno) {
                        dispatch(listSurveysFailed(response.data.sqlMessage));
                    } else {
                        // console.log("!!!asyncListSurveys, response", response);
                        const surveys = response.data;
                        dispatch(listSurveys(surveys));
                    }
                }
            });
        } else {
            axios.get("/surveys")
            .then(response => {
                if (response.status === 200) {
                    if (response.data.errno) {
                        dispatch(listSurveysFailed(response.data.sqlMessage));
                    } else {
                        // console.log("!!!asyncListSurveys, response", response);
                        const surveys = response.data;
                        dispatch(listSurveys(surveys));
                    }
                }
            });
        }
    }
};

const deleteSurvey = (survey) => {
    console.log("deleteSurvey, survey", survey);
    return {type: DELETE_SURVEY, survey: survey};
};

const deleteSurveyFailed = (error) => {
    console.log("deleteSurveyFailed, error", error);
    return {type: DELETE_SURVEY_FAILED, error};
};

export const asyncDeleteSurvey = (survey) => {
    console.log("asyncDeleteSurvey, survey", survey);
    return dispatch => {
        axios.delete(`/surveys/${survey.id}`)
        .then(response => {
            console.log("asyncDeleteSurvey, response", response);
            if (response.status === 200) {
                if (response.data.errno) {
                    dispatch(deleteSurveyFailed(response.data.sqlMessage));
                } else {
                    dispatch(deleteSurvey(survey));
                }
            }
        })
    }
};
//
// const editSurvey = (survey) => {
//     return {type: EDIT_SURVEY, survey};
// };

