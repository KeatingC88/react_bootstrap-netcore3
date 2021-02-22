﻿//App Core
import React, { Component } from "react";
//State Management Connection
import { connect } from "react-redux";
//Page Structure
import { Form, Button } from "react-bootstrap";
//Page Security
import email from "../../../security/validations/email";
//Page Action
import { addUser } from "../../../redux/actions";

class AddUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            input: "",
            adminAccount: false,
            validated: false
        }
        this.updateCheck = this.updateCheck.bind(this);
    }    
    //Check Email Validation Before Submitting to the Database.
    handleSubmit = () => {
        if (this.state.validated === false) {            
            console.log("Invalid Input for Email Address.");
        } else if (this.props.authenticated !== true) {
            console.log("Not Authorized to Add an Email.");
        } else {
            this.submit();//If valid email address, submit to the database.
            this.setState({ input: "", adminAccount: false, validated: false });//Reset the Page State to Default Setting.
        }
    }//Handled the Submit Process of Checking User Authentication, Checking if the User Input is a Valid Email Address at Client-Side Only.
    /*Add the User to the UsersDB via Action POST to the API*/
    submit = () => {
        this.props.addUser(this.state.input, this.state.adminAccount);//Submit to the database using Action Method in /Redux/Actions.js.
    }//Submit
    /*Update the Check State based on User Keydown Events*/
    updateCheck = (e) => {
        this.setState({ adminAccount: e.target.checked });
    }//updateCheck
    /*Update the Input State based on User Keydown Events*/
    updateInput = (input) => {
        this.setState({ input })//Update component state for User's Input.        
        let e = new email(input);//Check if User has input a full email address...
        let testResult = e.validation(input);//Returns bool
        this.setState({ validated: testResult})//Apply the email validation result to the state of this component to allow the user to submit the input.
    }//UpdateInput

    render() {
        return (
            <Form inline>
                <Form.Row>
                    <Form.Group className="m-0" controlId="emailAddress">
                        <Form.Label>Add User By Email Address:&nbsp;&nbsp;</Form.Label>
                            <Form.Control
                                placeholder="Enter a New Email"
                                aria-label="User Email"
                                aria-describedby="Adding a User Email"
                                onChange={e => this.updateInput(e.target.value)}
                                value={this.state.input}
                                type="email"
                                required
                                size="sm"
                            />
                        <Form.Control.Feedback>Added!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Must Enter a Valid Email</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="submitFormButton">
                        <Button variant="outline-secondary btn-sm" onClick={this.handleSubmit}>Add Email</Button>
                    </Form.Group>   
                    <Form.Group controlId="adminAccountCheckBox">
                        <Form.Label>&nbsp;&nbsp;<b>Admin Account?&nbsp;</b></Form.Label>
                        <Form.Check
                            type="checkbox"
                            className="mt-1"
                            checked={this.state.adminAccount}
                            onChange={this.updateCheck}
                        />
                    </Form.Group>                 
                </Form.Row>                
            </Form>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state;
    let authenticated = user.authenticated;
    return {authenticated}
};

export default connect(
    mapStateToProps,
    { addUser }
)(AddUser)