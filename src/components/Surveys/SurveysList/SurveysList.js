/*
* SurveysList.js
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-survey';
import {
    asyncSurveyList,
    asyncGetSurveyAndQuestions,
    logoutUser
} from "../../../store/actions";

import classes from "./SurveysList.css";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Protected from "../../Login/Protected";
import Edit from '@material-ui/icons/Edit';

class ListSurveys extends Component {
    constructor(props) {
        super(props);
        this.takeTheSurvey = this.takeTheSurvey.bind(this);
    }
    
    componentDidMount() {

        this.props.onListSurveys();
    }

    takeTheSurvey(survey_id) {
        // alert(`You take survey #${id}`);
        this.props.onGetSurveyAndQuestions(survey_id);
        this.props.history.replace("/survey");
    }

    render() {
        const surveys = this.props.survey.surveys && this.props.survey.surveys.map(survey => {
            return (
                    <div onClick={() =>this.takeTheSurvey(survey.id)} className={classes.item}>
                        <div className={classes.text}>{`${survey.id}. ${survey.title}`}</div>
                        <Edit className={classes.check}/>
                    </div>
               
            );
        } )

        return (
            <div className={classes.surveysList}>
                <h1 style={{textAlign:" center", fontFamily: "Raleway", color: "#34495e"}}>List of Available Surveys</h1>
                {/*<h2>Surveys</h2>
                <Table className={classes.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Owner</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {/*{console.log("SurveysList, surveys", this.props.surveys)}*/}
                    {/*{this.props.survey.surveys && this.props.survey.surveys.map(survey => {
                        return (
                            <tr key={survey.id}>
                                <td>{survey.id}</td>
                                <td>{survey.title}</td>
                                <td>{survey.owner}</td>
                                <td>
                                    <Button onClick={() =>this.takeTheSurvey(survey.id)} bsStyle="primary">Take the Survey</Button>
                                </td>
                            </tr>
                        )
                    })}
                    {/*<tr>*/}
                        {/*<td></td>*/}
                        {/*<td><Button onClick={this.createUser} bsStyle="primary">Add New User</Button></td>*/}
                        {/*<td></td>*/}
                    {/*</tr>*/}
                    {/*</tbody>
                </Table>*/}
                
                <div className={classes.container}> {surveys} </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        survey: state.survey
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListSurveys: () => dispatch(asyncSurveyList()),
        onGetSurveyAndQuestions: (survey_id) => dispatch(asyncGetSurveyAndQuestions(survey_id)),
        onLogoutUser: () => dispatch(logoutUser())
    }
};

export default Protected(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ListSurveys, axios)));
