import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import Axios from 'axios';
import setting from '../../assets/settings/setting';

class SurveyChart extends Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
    this.state = {
      optionArray: [],
      answerArray: [],
      question: [],
      values: [],
      data: [],
      isThereChoice: '',
      type: [],
      questionId: this.props.questionId,
      isClicked: false,
      buttonText: 'Show Chart',
      number: ''
    };
  }

  makeChart() {
    // First doing some css btn change and hiding/showing contents
    if (this.state.isClicked) {
      document.getElementById('chart' + this.state.questionId).style.display =
        'none';
      document.getElementById('number' + this.state.questionId).style.display =
        'none';
      document.getElementById('Cbtn' + this.state.questionId).className =
        'btn btn-success';
      this.setState({ isClicked: false });
      this.setState({ buttonText: 'Show Chart' });
    } else {
      document.getElementById('Cbtn' + this.state.questionId).className =
        'btn btn-warning';
      document.getElementById('chart' + this.state.questionId).style.display =
        'block';
      document.getElementById('number' + this.state.questionId).style.display =
        'block';
      this.setState({ isClicked: true });
      this.setState({ buttonText: 'Hide Chart' });
    }

    /**Here getting data(number) to show number of people who answered question based on question id*/
    var urlNumbers =
      setting.api.url + '/answers/question/count/' + this.state.questionId;
    Axios.get(urlNumbers).then(res => {
      this.setState({ number: res.data[0].number });
    });

    /**Here getting question information based on question id */
    var urlQuestion =
      setting.api.url + '/questions/' + this.state.questionId;
    Axios.get(urlQuestion).then(res => {
      this.setState({ question: res.data[0].question });
    });

    //Here some ways of converting object to array i could have used
    //Methods1
    //   for (const key of Object.keys(this.state)) {
    //     console.log(key, this.state[key]);
    //   }

    //Methods2
    //   for (var key in res.data) {
    //     arr.push(res.data[key]);
    //   }

    //Methods3
    //   var arr = Object.values(res.data);

    /**Because following two requests required to handle objects for the sorting so in here
     * easiest or familiar loop basic, for loop is used
     */

    /**Here getting answer options based on question id */
    var urlOptions =
      setting.api.url + '/answer_options/question/' + this.state.questionId;
    Axios.get(urlOptions).then(res => {
      var optionArray = [];

      for (var i = 0; i < res.data.length; i++) {
        optionArray.push(res.data[i].answer);
      }
      if (optionArray.length === 0) {
        /**In here if there were no any answer option, it means question is subjective which is not having multiple choice
         * and in that case, chart 'WordTree' is almost only available type to use
         */
        this.setState({ isThereChoice: false });
        this.setState({ type: ['WordTree'] });
      } else {
        /**In here, when question having multiple choices */
        this.setState({ isThereChoice: true });
        this.setState({ optionArray: optionArray });
        this.setState({
          type: ['PieChart', 'Bar', 'ScatterChart', 'BarChart']
        });
      }
    });

    /**until so far question, answer options have been defined in the state array so
     * following request would get people(?), client's answer so it will compare with answer options
     * then showing chart features
     */

    /**Here getting clients answers for the question based on question id */

    var urlAnswers =
      setting.api.url + '/answers/question/' + this.state.questionId;
    Axios.get(urlAnswers).then(res => {
      var answerArray = [];

      for (var i = 0; i < res.data.length; i++) {
        answerArray.push(res.data[i].answer);
      }
      this.setState({ answerArray: answerArray });
      var values = [];
      if (this.state.isThereChoice === true) {
        /**In here if question is having multiple choices then it would compare answer options and
         * clients answer so whenever it matches it would count then give it to values
         */
        for (var i = 0; i < this.state.optionArray.length; i++) {
          var count = 0;
          for (var j = 0; j < this.state.answerArray.length; j++) {
            if (this.state.optionArray[i] === this.state.answerArray[j]) {
              count++;
            }
          }
          values.push(count);
        }
        this.setState({ values: values });

        /**From here based on question/chart type, google react chart option is decided column title and values */
        var data = [['Answer Option', 'Number of Answers']];

        for (var k = 0; k < this.state.optionArray.length; k++) {
          var setOfData = [this.state.optionArray[k], this.state.values[k]];
          data.push(setOfData);
        }
      } else {
        var data = [['Phrases']];
        for (var i = 0; i < answerArray.length; i++) {
          data.push([answerArray[i]]);
        }
      }
      this.setState({ data: data });
    });
  }

  render() {
    return (
      <div className="text-left">
        <button
          className="btn btn-success"
          id={'Cbtn' + this.state.questionId}
          onClick={this.makeChart}
        >
          {this.state.buttonText}
        </button>
        <br />
        <div id={'number' + this.state.questionId} style={{ display: 'none' }}>
          Number of people who participated in this question:{' '}
          {this.state.number}
        </div>
        <div id={'chart' + this.state.questionId}>
          {this.state.type.map(type => (
            <td>
              <Chart
                width={'600px'}
                height={'300px'}
                chartType={type}
                loader={<div>Loading Chart</div>}
                data={this.state.data}
                options={{ title: this.state.question }}
              />
            </td>
          ))}
        </div>
      </div>
    );
  }
}

export default SurveyChart;
