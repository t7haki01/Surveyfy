/*
* NewAnswer.js
*
*/

import React from 'react';
import {Button, ButtonGroup} from "react-bootstrap";
// import {Table, FormControl, FormGroup, ControlLabel, PageHeader, Button,
//     //ButtonToolbar,
//     ButtonGroup,
//     //Alert
// } from 'react-bootstrap';

const newAnswer = props => {
    return (
        <tr key={props.id}>
            <td>{props.id}</td>
            <td><textarea
                    onChange={evt => props.onChange(evt)}
                    value={props.inputValue}
                    id={props.id}/></td>
            {/**/}
            <td>
                <ButtonGroup>
                    <Button bsStyle="success" onClick={() => props.save(props.id,  props.inputValue)}>Save</Button>
                    <Button bsStyle="default" onClick={() => props.cancel(props.id, props.inputValue)}>Cancel</Button>
                </ButtonGroup>
            </td>
        </tr>
    );
};

export default newAnswer;
// import {NavLink} from 'react-router-dom';
// import {
//     Table,
//     FormControl,
//     FormGroup,
//     ControlLabel,
//     // PageHeader,
//     Button,
//     // ButtonToolbar,
//     // Alert,
//     ButtonGroup
// } from 'react-bootstrap';
//
// // import AddAnswer from "./AddAnswer";
// // import SurveyBuilder from "./SurveyBuilder";
// import classes from "./SurveyBuilder.css";
// // import AddAnswer from "./AddAnswer";
//
// class AddQuestion extends Component {
//     state = {
//         questions: [
//             {
//                 id: 1,
//                 answer: "yes"
//             },
//             {
//                 id: 2,
//                 answer: "no"
//             }
//         ]
//     };
//
//     render() {
//         return (
//             <div>
//                 <h1>Add a New Question</h1>
//
//                 <form className={classes.form}>
//                     <FormGroup>
//                         <ControlLabel className={classes.label}>Question</ControlLabel>
//                         <FormControl className={classes.input}/>
//                     </FormGroup>
//                     <NavLink to="/surveybuilder" className="btn btn-success">Save</NavLink>
//
//                 </form>
//
//                 <p>Answers</p>
//                 <Table className={classes.table}>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Answer</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                     {this.state.questions.map(question => {
//                         return (
//                             <tr key={question.id}>
//                                 <td>{question.id}</td>
//                                 <td className={classes.tableText}>{question.answer}</td>
//                                 <td className={classes.tableAction}>
//                                     <ButtonGroup>
//                                         <Button bsStyle="primary">Edit</Button>
//                                         <Button bsStyle="danger">Delete</Button>
//                                     </ButtonGroup>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//
//                     </tbody>
//                 </Table>
//                 <NavLink to="/addanswer" className="btn btn-primary" >Add an Answer</NavLink>
//
//             </div>
//         );
//     }
// }
//
// export default AddQuestion;