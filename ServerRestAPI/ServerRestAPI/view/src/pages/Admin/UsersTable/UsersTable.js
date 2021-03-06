﻿import React, { Component } from "react";
import UserTableRow from "./UsersTableRow/UserTableRow";
import {Table }from "react-bootstrap";

class UsersTable extends Component {

    render() {
        const users = this.props.users;
        return (                           
            <Table striped bordered hover size="sm" className="mt-5">
                <thead>
                    <tr>
                        <th>ID#</th>
                        <th>Active</th>
                        <th>Admin</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length
                        ? users.map((user, index) => {
                            return <UserTableRow key={user.id} user={user} />;
                        }) : <tr><td>No Users Found</td><td> No Users at all</td><td> Codeflow is broken </td><td> Try Adding a User</td></tr>
                    }
                </tbody>
            </Table>
        )
    }
}

export default UsersTable;