import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from "react-i18next";
import ChatUserItemComponent from "../chat-user-item/chat-user-item.component";
class ChatUsersComponent extends Component {
    render() {
        const {users} = this.props;
        const chatUserList = [];
        if(!users) {
            return (
                <div>
                    <strong> No User yet ! </strong>
                </div>
            );
        }
        else{
            for (let i = 0; i < users.length; i++) {
                chatUserList.push(<ChatUserItemComponent username={users[1].email}   />)
            }
            return (
                <div>
                    User List
                    {  chatUserList.map(item => item)}
                </div>
            );
        }

    }
}
ChatUsersComponent.propTypes = {
    users : PropTypes.array.isRequired
}
export default withTranslation('translation') (ChatUsersComponent);