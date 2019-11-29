/*
* NewAnswer.js
*
*/

import React from 'react';
import {Button, ButtonGroup} from "react-bootstrap";


const newAnswer = props => {
    return (
        <tr key={props.id}>
            <td>{props.id}</td>
            <td><textarea
                    onChange={evt => props.onChange(evt)}
                    value={props.inputValue}
                    id={props.id}/></td>
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