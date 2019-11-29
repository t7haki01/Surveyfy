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
    handleRadioButtonChange = (answer_id) => {
        document.getElementById(answer_id).checked = true;
    };

    handleChange = (event, options) => {
        let Answer = Object.assign({}, this.state.Answer);

        Answer.AnswerOpt = event.target.value;
        Answer.questionId = this.props.questionId;
        Answer.answerId = event.target.id;
        let newOptions = options.Options.slice(0);
        newOptions.forEach(option => {
            const newOption = {...option};
            const props = {...newOption.props};
            if (props.name === Answer.answerId) {
                props.checked = true;
            } else {
                props.checked = null;
            }
            newOption.props = props;
            option = newOption;
        });

        this.setState({Answer});
        const answerElement = document.getElementById(Answer.answerId);
        if (answerElement && answerElement !== "undefined") {
            document.getElementById(Answer.answerId).checked = true;
        }
        this.props.onSave(Answer);
    };

    isAnswerSelected = (answer_id) => {
        if (this.props.Answer && this.props.Answer !== "undefined") {
            const answers = this.props.Answer;
            answers.forEach(answer => {
                if (+answer.answerId === answer_id) {
                    return true;
                }
            });
        }
        return null;
    };

  render() {
    const answerOption = this.props.AnswerOption;
    const Options = answerOption && answerOption.map( ans => {
        return <FormControlLabel
                key={ans.id}
                value={ans.answer_option}
                name={ans.id}
                control={<Radio
                    id={ans.id}
                    checked={this.isAnswerSelected(ans.id)}
                    color="primary"
                />}
                label={ans.answer_option}
                labelPlacement="top"
            />
    });

    return (
      <FormControl style={styles.RadioAnswer}>
        <RadioGroup
          aria-label="position"
          name="position"
          value={this.state.Answer.answer_option}
          onChange={(event) => this.handleChange(event, {Options})}
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
