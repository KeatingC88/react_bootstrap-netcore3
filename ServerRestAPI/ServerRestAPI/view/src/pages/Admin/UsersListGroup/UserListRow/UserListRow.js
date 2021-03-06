﻿import React from "react";
import { connect } from "react-redux";
import { toggleUserAdminStatus, editUserEmail, toggleUserAccountStatus } from "../../../../redux/actions";
import { Button, ButtonGroup, FormControl, InputGroup, Popover, OverlayTrigger, ListGroup } from "react-bootstrap";

let input = "";

const handleSubmit = (id, user) => {
    editUserEmail(id, user, input)
}

const updateInput = (_input) => {
    input = _input;
}

export const UserListRow = ({ user, toggleUserAdminStatus, toggleUserAccountStatus }) => (
    <ListGroup.Item>
        {user.email}
        <ButtonGroup toggle size="sm" className="float-right">
            <OverlayTrigger rootClose={true} trigger="click" placement="left" overlay=
                {
                    <Popover>
                        <Popover.Title>Change {user.email}?</Popover.Title>
                        <Popover.Content>
                            <InputGroup>
                                <FormControl placeholder={user.email} onChange={e => updateInput(e.target.value)} />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick={() => handleSubmit(user.id, user)}>Save Email</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Popover.Content>
                    </Popover>
                }>
                <Button variant="outline-secondary">Edit</Button>
            </OverlayTrigger>
            <Button variant="outline-secondary" onClick={() => toggleUserAdminStatus(user.id, user)}>
                {user && user.admin ? "Revert to User Account" : "Make Admin Account"}
            </Button>
            <Button variant="outline-secondary" onClick={() => toggleUserAccountStatus(user)}>
                {user && user.active ? "Disable Account" : "Enable Account"}
            </Button>
        </ButtonGroup>
    </ListGroup.Item>
);

export default connect(
    null,
    { toggleUserAdminStatus, editUserEmail, toggleUserAccountStatus }
)(UserListRow);