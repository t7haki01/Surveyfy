/*
* AddAnswer.js
*
*/

import React, {Component} from 'react';
import {NavLink, } from 'react-router-dom';
import {
    //Table,
    FormControl, FormGroup, ControlLabel, PageHeader,
    //Button, ButtonToolbar, Alert
    } from 'react-bootstrap';

// import AddQuestion from "./AddQuestion";

import classes from "./SurveyBuilder.css";

class AddAnswer extends Component {
    render() {
        return (
            <div>
                <PageHeader>Add an Answer</PageHeader>
                <form className={classes.form}>
                    <FormGroup>
                        <ControlLabel className={classes.label}>Answer</ControlLabel>
                        <FormControl className={classes.input}/>
                    </FormGroup>
                    <NavLink to="/addquestion" className="btn btn-success">Save</NavLink>
                </form>
            </div>
        );
    }
}

export default AddAnswer;