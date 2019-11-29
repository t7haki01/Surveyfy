import {
    DELETE_SURVEY, DELETE_SURVEY_FAILED,
    LIST_SURVEYS, LIST_SURVEYS_FAILED,
} from "./actionsTypes";
import axios from "../../axios-survey";

const listSurveys = (surveys) => {
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
                        const surveys = response.data;
                        dispatch(listSurveys(surveys));
                    }
                }
            });
        }
    }
};

const deleteSurvey = (survey) => {
    return {type: DELETE_SURVEY, survey: survey};
};

const deleteSurveyFailed = (error) => {
    console.log("deleteSurveyFailed, error", error);
    return {type: DELETE_SURVEY_FAILED, error};
};

export const asyncDeleteSurvey = (survey) => {
    return dispatch => {
        axios.delete(`/surveys/${survey.id}`)
        .then(response => {
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
