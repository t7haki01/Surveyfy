

import React from 'react';
import {Button, ButtonGroup} from "react-bootstrap";
import classes from "./SurveyBuilder.css";


const newQuestion = props => {
    return (
        <tr key={props.id}>
            <td className={classes.tableId}>{props.id}</td>
            <td>
                <textarea
                    onChange={evt => props.onChange(evt)}
                    value={props.inputValue}
                    id={props.id}/>
            </td>
            {/**/}
            <td>
                <ButtonGroup>
                    <Button bsStyle="success" onClick={() => props.save(props.question)}>Save</Button>
                    <Button bsStyle="default" onClick={() => props.cancel(props.id, props.inputValue)}>Cancel</Button>
                </ButtonGroup>
            </td>
        </tr>
    );
};

export default newQuestion;
