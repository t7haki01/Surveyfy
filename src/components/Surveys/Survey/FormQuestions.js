import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';

const FormQuestions = ({question}) => {
  const styles = {
      InputLabel: {
        color: 'black',
        fontWeight: 700,
        fontSize: 20
      }
    };
    
  return (
    <React.Fragment>      
    <InputLabel
      id="standard-name"
      children={question}
      name="ans1"
      margin="dense"
      style={styles.InputLabel}
      variant="filled"
      />
    <br/>
      </React.Fragment>
  );
}

export default FormQuestions
