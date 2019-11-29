import axios from 'axios';
import React, { Component } from 'react';
import SurveyChart from './SurveyChart';

class Question extends Component {
  constructor(props) {
    super(props);
    this.getQuestions = this.getQuestions.bind(this);
    this.state = {
      questions: [],
      isClicked: false,
      buttonText: 'Show Question',
      surveyId: this.props.survey,
      numbers: ''
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:3000/answers/survey/count/' + this.props.survey)
      .then(res => {
        const numbers = res.data[0].number;
        this.setState({ numbers: numbers });
      });
  }
  getQuestions() {
    if (this.state.isClicked) {
      document.getElementById('survey' + this.state.surveyId).style.display =
        'none';
      document.getElementById('Qbtn' + this.state.surveyId).className =
        'btn btn-primary';
      this.setState({ isClicked: false });
      this.setState({ buttonText: 'Show Questions' });
    } else {
      document.getElementById('Qbtn' + this.state.surveyId).className =
        'btn btn-warning';
      document.getElementById('survey' + this.state.surveyId).style.display =
        'block';
      this.setState({ isClicked: true });
      this.setState({ buttonText: 'Hide Questions' });
    }
    axios
      .get('http://localhost:3000/surveys/' + this.props.survey + '/questions')
      .then(res => {
        const questions = res.data;
        this.setState({ questions });
      });
  }

  render() {
    return (
      <div>
        <div className="row justify-content-center">
          <button
            className="btn btn-primary"
            onClick={this.getQuestions}
            id={'Qbtn' + this.state.surveyId}
          >
            {this.state.buttonText}
          </button>
        </div>
        <br />
        <table className="table table-bordered table-condensed">
          <tr>
            <td>
              <div
                id={'numberText' + this.state.surveyId}
                className="text-left text-monospace"
              >
                <b>
                  Number of people who participated this survey:{' '}
                  {this.state.numbers}
                </b>
              </div>
              <br />
              <div id={'survey' + this.state.surveyId}>
                {this.state.questions.map(question => (
                  <table key={question.id}>
                    <tr>
                      <th className="text-left">{question.question}</th>
                    </tr>
                    <tr>
                      <td>
                        <SurveyChart
                          questionId={question.id}
                          survey={this.props.survey}
                        />
                      </td>
                    </tr>
                  </table>
                ))}
              </div>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Question;
