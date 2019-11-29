/*
* Question.js
* */

import React from 'react';
import {Button,
    ButtonGroup,
} from 'react-bootstrap';

const question = (props) => {

    return (
        <tr>
            <td>{props.question.id}</td>
            <td>{props.question.question}</td>
            <td>
                <ButtonGroup>
                    <Button bsStyle="primary" onClick={() => props.edit(props.question)}>Edit</Button>
                    <Button bsStyle="danger" onClick={() => props.delete(props.question.id)}>Delete</Button>
                    <Button bsStyle="info" onClick={() => props.answers(props.question)}>Answers</Button>
                </ButtonGroup>
            </td>
        </tr>
    )
};
export default question;