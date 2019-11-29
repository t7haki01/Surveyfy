import React, { Component } from 'react'
import FormQuestions  from './FormQuestions';
import Button from '@material-ui/core/Button';

import AnswerOpt from './AnswerOpt';

import {asyncGetSurveyAndQuestions, asynRegisterAnswer, logoutUser} from "../../../store/actions";
import {connect} from "react-redux";
import axios from "../../../axios-survey";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Protected from "../../Login/Protected";
import classes from './SurveyForm.css';
class SurveyForm extends Component {

    state ={
        questions: [],
        AnswerOpt: [],
        Answer:[]
    };

    constructor(props){
        super(props);
        this.getSurvey = this.getSurvey.bind(this);
        this.logState = this.logState.bind(this);
        this.state={title: ""}
    }

    getSurvey(survey_id) {
        this.props.onGetSurveyAndQuestions(survey_id);
    }

  componentWillMount(){
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
        if (
            this.props.survey.survey && this.props.survey.survey.questions && this.props.survey.survey.questions[0] &&
            nextProps.survey.survey && nextProps.survey.survey.questions && nextProps.survey.survey.questions[0] &&
            this.props.survey.survey.questions[0].answers !== nextProps.survey.survey.questions[0].answers &&
            this.props.survey.survey.questions[0].answers !== "undefined" &&
            nextProps.survey.survey.questions[0].answers !== "undefined"
        ) {
            return true;
        }
  }

  componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.survey.survey && nextProps.survey.survey.questions) {
            this.setState({questions: nextProps.survey.survey.questions});
        }
  }

    handleSubmit = (e) => {
        console.log("!!!!SurveyForm, handleSubmit, HERE, e", e);
        e.preventDefault();
        const {Answer} = this.state;
        console.log("SurveyForm, handleSubmit, Answer", Answer);
        Answer.forEach( (val) => this.props.onRegisterAnswer(val.AnswerOpt, val.questionId, this.props.app.user_id));
        alert("Thank you for participating in this survey!");
        this.props.history.push("/surveys");
        alert("Thanks you for taking the survey");
        
    };

    onSave = val => {
        let newAnswer = null;
        if (this.state.Answer) {
            newAnswer = this.state.Answer.filter( ans => ans.questionId !== val.questionId);
        } else {
            newAnswer = [];
        }

        this.setState(prevState => ({
            Answer: [...newAnswer, val]
        }));
        const answerElement = document.getElementById(val.answerId);

        if (answerElement && answerElement !== "undefined") {
            document.getElementById(val.answerId).checked = "checked";
        }
    };

  render() {
      if (this.props.survey && this.props.survey.survey ) {
        const {Answer} = this.state;
        let questions = this.props.survey.survey.questions.slice(0);
            questions = questions.map( (q, idx) => {
                if (q.answers === undefined) {
                    return <div>Loading...</div>
                }
                return (
                    <div key={idx}>
                        <FormQuestions  {...q}/>
                        <AnswerOpt 
                            questionId={q.id}
                            AnswerOption={q.answers}
                            Answer={Answer}
                            onSave={this.onSave}
                            question={q}
                        />
                    </div>
                );
            });

        return (
            <div className={classes.survey_form}>
                <h1>{this.props.survey.survey.title}</h1>
                <form onSubmit={this.handleSubmit}>
                    {questions}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={styles.button}>
                        Submit
                    </Button>
                </form>
            </div>
        );

      } else {
          return (<div>Loading...</div>)
      }
    }
}

const styles = {
    button: {
      backgroundColor: '#2196f3',
      marginTop: 30,
      marginBottom: 30
    }
};

const maptStateToProps = (state) => {
    return {
        survey: state.survey,
        app: state.app
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetSurveyAndQuestions: (survey_id) => dispatch(asyncGetSurveyAndQuestions(survey_id)),
        onRegisterAnswer: (answer, question, user_id) => dispatch(asynRegisterAnswer(answer, question, user_id)),
        onLogoutUser: () => dispatch(logoutUser())
    }
};

export default Protected(connect(maptStateToProps, mapDispatchToProps)(withErrorHandler(SurveyForm, axios)));
