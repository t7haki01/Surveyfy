import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

class AnswerOpt extends React.Component {
  state = {
    value: "",
      Answer: {}
  };

  // handleChange = event => {
  //     console.log("AnswerOpt, handleChange, event.target.value", event.target.value);
  //     console.log("AnswerOpt, handleChange, this.state.value BEFORE", this.state.value);
  //   this.setState({ value: event.target.value });
  //     console.log("AnswerOpt, handleChange, this.state.value", this.state.value);
  // };

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.log("AnswerOpt, shouldComponentUpdate");
    //     return true;
    // }

    handleRadioButtonChange = (answer_id) => {
        console.log("AnswerOpt, handleRadioButtonChange");
        document.getElementById(answer_id).checked = true;
        console.log("AnswerOpt, handleRadioButtonChange, radiobuttons", document.getElementById(answer_id));
    };

    handleChange = (event, options) => {
        console.log("AnswerOpt, handleChange, this.state BEFORE", this.state);
        console.log("AnswerOpt, handleChange, event target", event.target);
        console.log("AnswerOpt, handleChange, options", options);
        let Answer = Object.assign({}, this.state.Answer);

        Answer.AnswerOpt = event.target.value;
        Answer.questionId = this.props.questionId;
        Answer.answerId = event.target.id;
        let newOptions = options.Options.slice(0);
        newOptions.forEach(option => {
            const newOption = {...option};
            // const props = option.props.slice(0);
            const props = {...newOption.props};
            console.log("AnswerOpt, handleChange, option", option);
            if (props.name === Answer.answerId) {
                props.checked = true;
            } else {
                props.checked = null;
            }
            newOption.props = props;
            option = newOption;
            // option.props = props;
           // return option;
           // return newOption;
            // option.props = props;
        });


        console.log("AnswerOpt, handleChange, Answer", Answer);
        this.setState({Answer});
        console.log("AnswerOpt, handleChange, this.state AFTER", this.state);
        // console.log("SurveyForm, onSave, answer Element", answerElement);
        const answerElement = document.getElementById(Answer.answerId);
        if (answerElement && answerElement !== "undefined") {
            console.log("!!!AnswerOpt, handleChange, answer Element SET");
            document.getElementById(Answer.answerId).checked = true;
        }
        console.log("AnswerOpt, handleChange, answer Element AFTER",  document.getElementById(Answer.answerId));
        this.props.onSave(Answer);
    };

    // handleChange = (event) => {
    //     // console.log("AnswerOpt, handleChange, this.state BEFORE", this.state);
    //     // console.log("AnswerOpt, handleChange, event target", event.target);
    //     let Answer = Object.assign({}, this.state.Answer);
    //
    //     Answer.AnswerOpt = event.target.value;
    //     Answer.questionId = this.props.questionId;
    //     Answer.answerId = event.target.id;
    //     // console.log("AnswerOpt, handleChange, Answer", Answer);
    //     this.setState({Answer});
    //     // console.log("AnswerOpt, handleChange, this.state AFTER", this.state);
    //     const answerElement = document.getElementById(Answer.answerId);
    //     if (answerElement && answerElement !== "undefined") {
    //         // console.log("!!!AnswerOpt, handleChange, answer Element SET");
    //         document.getElementById(Answer.answerId).checked = true;
    //     }
    //     // console.log("AnswerOpt, handleChange, answer Element AFTER",  document.getElementById(Answer.answerId));
    //     this.props.onSave(Answer);
    // };

    isAnswerSelected = (answer_id) => {
        // console.log("AnswerOpt, isAnswerSelected, this.props.Answer", this.props.Answer, "answer_id", answer_id);
        if (this.props.Answer && this.props.Answer !== "undefined") {
            const answers = this.props.Answer;//.slice(0);
            // console.log("AnswerOpt, isAnswerSelected, answers", answers, "answer_id", answer_id);
            // console.log("AnswerOpt, isAnswerSelected, answers forEach", answers.forEach);
            answers.forEach(answer => {
                // console.log("!!!AnswerOpt, isAnswerSelected, forEach, answer.id", answer.answerId, "answer_id", answer_id);
                if (+answer.answerId === answer_id) {
                    // console.log("BINGO!!! AnswerOpt, isAnswerSelected, forEach, answer.id", answer.answerId, "answer_id", answer_id);
                    // this.shouldComponentUpdate();
                    return true;
                }
            });
        }
        // console.log("AnswerOpt, isAnswerSelected, return FALSE");
        return null;
    };

  render() {
      // console.log("AnswerOpt, props", this.props);
    const answerOption = this.props.AnswerOption;//.filter( ans => ans.questionFK === this.props.questionId );
      // console.log("AnswerOpt, question", this.props.question);
    const Options = answerOption && answerOption.map( ans => {
        return <FormControlLabel
                key={ans.id}
                value={ans.answer_option}
                // valueSelected={() => this.isAnswerSelected(ans.id)}
                // onChange={() => this.handleRadioButtonChange(ans.id)}
                name={ans.id}
                // checked={this.isAnswerSelected(ans.id)}
                control={<Radio
                    id={ans.id}
                    // checked={null}
                    checked={this.isAnswerSelected(ans.id)}
                    // valueSelected={() => this.isAnswerSelected(ans.id)}
                    // onChange={() => this.handleRadioButtonChange(ans.id)}
                    color="primary"
                />}
                label={ans.answer_option}
                labelPlacement="top"
            />
    });

    return (
      <FormControl style={styles.RadioAnswer} /* component="fieldset" */>
        <RadioGroup
          aria-label="position"
          name="position"
          value={this.state.Answer.answer_option}
          onChange={(event) => this.handleChange(event, {Options})}
          // onChange={this.handleChange}
          row
        >
          {Options}
        </RadioGroup>
      </FormControl>
    );
  }
}
const colorText = {'gray': '#000d11'}

const styles = {
  RadioAnswer: {
      marginTop:10,
      marginBottom:40,
      color: colorText.gray
  }
};


export default AnswerOpt;
