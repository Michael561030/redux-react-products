import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormLabel from 'react-bootstrap/FormLabel'
import FormGroup from 'react-bootstrap/FormGroup'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormControl from 'react-bootstrap/FormControl'
import {Link} from 'react-router-dom'

const Input = ({currentLocation, onChangeHandler, resetField, input}) => (
    <FormGroup controlId="searchField">
        <FormLabel>Search field by name</FormLabel>
        <Link to={currentLocation}>
            <InputGroup className="mb-0">

                <FormControl
                    value={input}
                    type="text"
                    placeholder="Type here you're looking for"
                    onChange={onChangeHandler}
                />

                <InputGroup.Append>
                    <Button variant="outline-secondary"
                            onClick={resetField}>Clear field
                    </Button>
                    <div/>
                </InputGroup.Append>
            </InputGroup>
        </Link>
    </FormGroup>
);

export default Input;