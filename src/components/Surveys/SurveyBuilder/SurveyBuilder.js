/*
* SurveyBuilder.js
*
*/

import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-survey';

import Aux from "../../../hoc/Auxiliary/Auxiliary";

import {
    Table, FormControl, FormGroup, ControlLabel, PageHeader, Button,
    ButtonGroup, Clearfix
} from 'react-bootstrap';

import classes from "./SurveyBuilder.css";

import {
    asyncCreateQuestion,
    cancelQuestion,
    asyncDeleteQuestion,
    editQuestion,
    showAnswers,
    hideAnswers,
    asyncCreateAnswer,
    asyncSaveAnswer,
    editAnswer,
    cancelAnswer,
    asyncDeleteAnswer,
    asyncSaveQuestion,
    asyncFetchSurvey,
    asyncSaveSurvey,
    editSurvey,
    setSurveyTitle,
    setQuestionString,
    setAnswerString,
    logoutUser
} from "../../../store/actions";

import Question from "../../Question/Question";
import NewQuestion from "./NewQuestion";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import CompanyOnly from "../../Login/CompanyOnly";


class SurveyBuilder extends Component {
    state = {
        id: null,
        title: "",
        questions: null,
        answer: null,
        editingSurvey: false,
        editingQuestion: false,
        editingAnswer: false,
        newSurvey: false,
        newQuestion: false,
        newAnswer: false,
        inputValue: "",
        inputId: -1
    };

    constructor(props) {
        super(props);

        this.updateInputValue = this.updateInputValue.bind(this);
        this.addNewQuestion = this.addNewQuestion.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.cancelQuestion = this.cancelQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.showAnswers = this.showAnswers.bind(this);
        this.saveAnswer = this.saveAnswer.bind(this);
        this.editAnswer = this.editAnswer.bind(this);
        this.cancelAnswer = this.cancelAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.addNewAnswer = this.addNewAnswer.bind(this);
        this.saveSurveyIdAndTitle = this.saveSurveyIdAndTitle.bind(this);
        this.updateSurveyTitle = this.updateSurveyTitle.bind(this);
        this.updateQuestionString = this.updateQuestionString.bind(this);
        this.updateAnswerString = this.updateAnswerString.bind(this);
        this.editSurvey = this.editSurvey.bind(this);
        this.updateState = this.updateState.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        const newSurveyBuilderSurvey = this.props.surveyBuilder && this.props.surveyBuilder.survey && this.props.surveyBuilder.survey.newSurvey;
        const newSurvey = this.props.survey && this.props.survey.id && this.props.survey.newSurvey;
        const oldSurveyBuilderSurvey = this.props.surveyBuilder && this.props.surveyBuilder.survey && this.props.surveyBuilder.survey.id && !this.props.surveyBuilder.survey.newSurvey;
        const oldSurvey = this.props.survey && this.props.survey.id && !this.props.survey.newSurvey;
        if (newSurveyBuilderSurvey) {
            this.updateState(this.props.surveyBuilder.survey);
        } else if (newSurvey) {
            this.updateState(this.props.survey);
        } else if (oldSurveyBuilderSurvey) {
            this.props.onFetchSurvey(this.props.surveyBuilder.survey.id);
        } else if (oldSurvey) {
            this.props.onFetchSurvey(this.props.survey.id);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.survey && nextProps.survey.saveSuccess) {
            this.setState({
                saveSuccess: nextProps.saveSuccess,
                editingSurvey: nextProps.editingSurvey
            })
        }
        this.updateState(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.survey !== this.props.survey) {
            return true;
        }
        if (nextProps.survey && this.props.survey &&
            nextProps.survey.title !== this.props.survey.title) {
            return true;
        }
        if (nextProps.survey && this.props.survey &&
            nextProps.survey.editingSurvey !== this.props.editingSurvey) {
            return true;
        }
        if (nextProps.survey && this.props.survey &&
            nextProps.survey.saveSuccess !== this.props.saveSuccess) {
            return true;
        }
        //Check if questions are different
        if (nextProps.survey && this.props.survey &&
            nextProps.survey.questions !== this.props.survey.questions) {
            return true;
        }
        //Check if answers are different
        if (nextProps.survey && nextProps.survey.questions &&
            this.props.survey && this.props.survey.questions) {
            nextProps.survey.questions.forEach(questionA => {
                this.props.survey.questions.forEach(questionB => {
                    if (questionA.id === questionB.id) {
                        if (questionA.answers !== questionB.answers) {
                            return true;
                        }
                    }
                })
            })
        }
        return true;
    }

    updateState(someProps) {
        if (someProps.survey) {
            const questions = {...someProps.survey.questions};
            this.setState({
                id: someProps.survey.id,
                title: someProps.survey.title,
                questions: questions,
                newSurvey: someProps.survey.newSurvey
            });
        }
    }

    goBack() {
        this.props.history.goBack();
    }

    editSurvey() {
        this.setState({
            id: this.props.survey.id,
            title: this.props.survey.title,
            editingSurvey: true
        });
        const survey = {
            id: this.props.survey.id,
            title: this.props.survey.title,
            questions: this.props.survey.questions,
            newSurvey: this.state.newSurvey
        };
        this.props.onEditSurvey(survey);
    };


    saveSurveyIdAndTitle() {
        const surveyId = this.state.id;
        const surveyTitle = this.state.title;
        const saveSurvey = {
            id: surveyId,
            title: surveyTitle,
            owner: this.props.app.user_id
        };
        if (this.state.newSurvey) {
            this.props.onSaveSurvey(saveSurvey, true);
        } else {
            this.props.onSaveSurvey(saveSurvey, false);
        }
    };

    updateInputValue = (evt) => {
        this.setState({
            inputValue: evt.target.value,
            inputId: +evt.target.id
        });
    };

    updateSurveyTitle = (evt) => {
        const title = document.getElementById("title").value;

        this.props.onSetSurveyTitle(this.props.survey, title);
    };

    updateQuestionString = (evt) => {
        this.setState({
            inputValue: evt.target.value,
            inputId: +evt.target.id
        });
        this.props.onSetQuestionString(this.state.inputId, this.state.inputValue);
    };

    updateAnswerString = (evt) => {
        this.setState({
            inputValue: evt.target.value,
            inputId: +evt.target.id
        });
        this.props.onSetAnswerString(this.state.inputId, this.state.inputValue);
    };

    saveAnswer(answer) {
        answer.answer_option = this.state.inputValue;
        this.props.onAnswerSaved(answer);
        this.setState({editingAnswer: false, newAnswer: false, answer: answer});
        this.setState({inputId: -1, inputValue: ""});
    }

    editAnswer(answer) {
        this.setState({answer: answer, inputValue: answer.answer_option});

        this.props.onAnswerEdited(answer);
        this.setState({editingAnswer: true, newAnswer: false});
    }

    cancelAnswer(answer) {
        this.props.onAnswerCanceled(answer);
        this.setState({editingAnswer: false, newAnswer: false, answer: answer});
    }

    deleteAnswer(answer) {
        this.setState({editingAnswer: false, newAnswer: false, answer: null});
        this.props.onAnswerDeleted(answer);

    }

    addNewAnswer(question) {
        this.setState({newAnswer: true, editingAnswer: true});
        const newAnswer = {
            id: null,
            answer_option: "",
            questionFK: question.id,
        };
        this.props.onAnswerCreated(newAnswer)
    }

    addNewQuestion() {
        this.setState({
            newQuestion: true,
            editingQuestion: true,
        });
        const question = {
            id: null,
            question: "",
            surveyFK: this.props.survey ? this.props.survey.id : null
        };
        this.props.onQuestionCreated(question);
    }

    saveQuestion(editedQuestion) {
        let savedQuestion = null;
        if (editedQuestion) {
            editedQuestion.question = this.state.inputValue;
            savedQuestion = editedQuestion;
        } else {
            savedQuestion = {
                id: this.state.inputId,
                question: this.state.inputValue,
                surveyFK: this.props.survey.id
            };
        }
        const newQuestion = this.state.newQuestion;
        this.props.onQuestionSaved(savedQuestion, newQuestion);
        this.setState({inputId: -1, inputValue: ""});

    };

    cancelQuestion(id, value) {
        this.props.onQuestionCanceled(id, value);
        this.setState({inputId: -1, inputValue: ""})
    };

    editQuestion(question) {
        this.setState({
            inputId: question.id,
            inputValue: question.question,
            newQuestion: false
        });
        this.props.onQuestionEdited(question);
    };


    deleteQuestion(id) {
        this.props.onQuestionDeleted(id);
    };

    showAnswers(question) {
        this.setState({question: question});
        if (question.showAnswers) {
            this.props.onHideAnswers(question);
        } else {
            this.props.onShowAnswers(question);
        }
    };

    render() {
        return (
            <div className={classes.surveyBuilder}>
                <PageHeader className={classes.pageHeader}>Survey Builder</PageHeader>
                <br/>
                <Clearfix/>
                <form className={classes.form}>
                    <br/>
                    <Clearfix/>
                    <FormGroup className={classes.group}>
                        <ControlLabel className={classes.label} htmlFor="id">Survey ID</ControlLabel>
                        <FormControl className={classes.input}
                                     type="text" name="id" id="id" disabled={true}
                            //onChange={props.updateId}
                                     value={this.state.id}/>
                    </FormGroup><br/>
                    <Clearfix/>
                    <FormGroup className={classes.group}>
                        <ControlLabel className={classes.label} htmlFor="title">Survey Name</ControlLabel>
                        <FormControl className={classes.input}
                                     disabled={!this.state.editingSurvey}
                                     type="text" name="title" id="title"
                                     onChange={() => this.updateSurveyTitle(this.state.title)}
                                     value={this.state.title}/>
                    </FormGroup>
                    <Clearfix/>
                    <ButtonGroup>
                        <Button onClick={this.editSurvey}
                                disabled={this.state.editingSurvey}
                                bsStyle="primary">Edit</Button>
                        <Button onClick={this.saveSurveyIdAndTitle}
                                disabled={!this.state.editingSurvey}
                                bsStyle="success">Save</Button>
                    </ButtonGroup>
                </form>
                <Clearfix/>
                <br/>
                <br/>
                <h2 className={classes.subheader}>Questions</h2>
                <br/>
                <Table className={classes.table}>
                    <thead>
                    <tr>
                        <th className={classes.tableId}>ID</th>
                        <th>Question</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!(this.props && this.props.survey && this.props.survey.questions) ? null :
                        this.props.survey.questions.map(question => {
                            if (question.editing) {
                                return (
                                    <Aux key="newQuestion">
                                        <NewQuestion
                                            key={question.id}
                                            id={question.id}
                                            question={question}
                                            inputValue={this.state.inputValue}
                                            onChange={this.updateQuestionString}
                                            save={this.saveQuestion}
                                            cancel={this.cancelQuestion}/>
                                        {!question.answers ? null : question.answers.map(answer => {
                                            return (
                                                <tr key={answer.answer_option}>
                                                    <td>&nbsp;&nbsp;</td>
                                                    <td>&ndash;</td>
                                                    <td>{answer.answer_option}</td>
                                                </tr>
                                            )
                                        })}

                                    </Aux>

                                );
                            } else {
                                return (
                                    <Aux key={question.id}>
                                        <Question
                                            key={question.id}
                                            question={question}
                                            edit={this.editQuestion}
                                            delete={this.deleteQuestion}
                                            answers={this.showAnswers}
                                        />

                                        {question.answers && question.answers.map(answer => {

                                            if (answer.editing) {
                                                return (
                                                    <Aux>
                                                        <tr key={answer.id}>
                                                            <td>{answer.id}</td>
                                                            <td>
                                                                <textarea
                                                                    onChange={evt => this.updateAnswerString(evt)}
                                                                    value={this.state.inputValue}
                                                                    id={answer.id}/>
                                                            </td>
                                                            <td>
                                                                <ButtonGroup>
                                                                    <Button bsStyle="success"
                                                                            onClick={() => this.saveAnswer(answer)}>
                                                                        Save</Button>
                                                                    <Button bsStyle="default"
                                                                            onClick={() => this.cancelAnswer(answer)}>
                                                                        Cancel</Button>
                                                                </ButtonGroup>
                                                            </td>
                                                        </tr>
                                                    </Aux>
                                                );
                                            } else {
                                                return (
                                                    <Aux>
                                                        <tr key={answer.id}
                                                            className={question.showAnswers ? classes.showAnswers : classes.hideAnswers}>
                                                            <td>{answer.id}</td>
                                                            <td>{answer.answer_option}</td>
                                                            <td>
                                                                <ButtonGroup>
                                                                    <Button onClick={() => this.editAnswer(answer)}
                                                                            bsStyle="success">Edit</Button>
                                                                    <Button onClick={() => this.deleteAnswer(answer)}
                                                                            bsStyle="danger">Delete</Button>
                                                                </ButtonGroup>
                                                            </td>
                                                        </tr>
                                                    </Aux>
                                                )
                                            }
                                        })}
                                        {!question.showAnswers ? null :
                                            <Aux>
                                                <tr key="addAnswer"
                                                    className={question.showAnswers ? classes.showAnswers : classes.hideAnswers}>
                                                    <td></td>
                                                    <td><Button onClick={() => this.addNewAnswer(question)}
                                                                bsStyle="primary">Add Answer</Button></td>
                                                    <td></td>
                                                </tr>
                                            </Aux>
                                        }
                                    </Aux>
                                );
                            }
                        })}
                    </tbody>
                </Table>

                <Button onClick={this.addNewQuestion} bsStyle="success">Add a Question</Button>


                <Button bsStyle="info" onClick={this.goBack}>Go Back</Button>
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        survey: state.surveyBuilder.survey,
        user: state.user,
        account: state.account,
        app: state.app,
        error: state.surveyBuilder.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchSurvey: (survey_id) => dispatch(asyncFetchSurvey(survey_id)),
        onSaveSurvey: (survey, newSurvey) => dispatch(asyncSaveSurvey(survey, newSurvey)),
        onEditSurvey: (survey) => dispatch(editSurvey(survey)),
        onQuestionCreated: (question) => dispatch(asyncCreateQuestion(question)),
        onQuestionEdited: (id, value) => dispatch(editQuestion(id, value)),
        onQuestionSaved: (question) => dispatch(asyncSaveQuestion(question)),
        onQuestionCanceled: (id, value) => dispatch(cancelQuestion(id, value)),
        onQuestionDeleted: (id) => dispatch(asyncDeleteQuestion(id)),
        onShowAnswers: (question) => dispatch(showAnswers(question)),
        onHideAnswers: (question) => dispatch(hideAnswers(question)),
        onAnswerCreated: (answer) => dispatch(asyncCreateAnswer(answer)),
        onAnswerEdited: (answer) => dispatch(editAnswer(answer)),
        onAnswerSaved: (answer) => dispatch(asyncSaveAnswer(answer)),
        onAnswerCanceled: (answer) => dispatch(cancelAnswer(answer)),
        onAnswerDeleted: (answer) => dispatch(asyncDeleteAnswer(answer)),
        onSetSurveyTitle: (survey, title) => dispatch(setSurveyTitle(survey, title)),
        onSetQuestionString: (question_id, question_string) => dispatch(setQuestionString(question_id, question_string)),
        onSetAnswerString: (answer_id, answer_string) => dispatch(setAnswerString(answer_id, answer_string)),
        onLogoutUser: () => dispatch(logoutUser())
    }
};

export default CompanyOnly(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SurveyBuilder, axios)));