import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CommentIcon from '@material-ui/icons/Comment';

class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };  

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };  

  render() {
    
    const { values: { ans1, ans2, ans3, ans4, ans5, ans6 } } = this.props;
    return (
      <MuiThemeProvider >
        <React.Fragment>
      <h1>Survey Confirm</h1>

            <List component="div" disablePadding>
              <ListItem button >
                <ListItemIcon>
                <CommentIcon /> What kind of music do you like to listen to? 
                </ListItemIcon>
                <br/>
                <ListItemText inset primary={ans1} />
              </ListItem>
              <ListItem button >
                <ListItemIcon>
                <CommentIcon /> What are your favorite TV shows? 
                </ListItemIcon>
                <br/>
                <ListItemText inset primary={ans2} />
              </ListItem>
              <ListItem button >
                <ListItemIcon>
                <CommentIcon /> Would you rather be the best player on a horrible team or the worst player on a great team? 
                </ListItemIcon>
                <br/>
                <ListItemText inset primary={ans3} />
              </ListItem>
              <ListItem button >
                <ListItemIcon>
                <CommentIcon /> What is your favorite food? 
                </ListItemIcon>
                <br/>
                <ListItemText inset primary={ans4} />
              </ListItem>
              <ListItem button >
                <ListItemIcon>
                <CommentIcon /> Do you prefer talking over the phone or face to face? 
                </ListItemIcon>
                <br/>
                <ListItemText inset primary={ans5} />
              </ListItem>
              <ListItem button >
                <ListItemIcon>
                <CommentIcon /> What kind of old person do you want to grow up to become? 
                </ListItemIcon>
                <br/>
                <ListItemText inset primary={ans6} />
              </ListItem>
            </List>
      <br/>
      
      <Button variant="contained" 
              color="default" 
              style={styles.button} 
              onClick={this.back}>
        Go Back
      </Button>
      <Button variant="contained" 
              color="primary" 
              style={styles.buttonPrimary} 
              onClick={this.continue}>
        Next Page
      </Button>
      </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

const styles = {
    button:{
        marginTop: 30
      },
      buttonPrimary: {
        backgroundColor: '#2196f3',
        marginTop: 30,
        marginLeft:30        
      }
};

Confirm.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default Confirm
