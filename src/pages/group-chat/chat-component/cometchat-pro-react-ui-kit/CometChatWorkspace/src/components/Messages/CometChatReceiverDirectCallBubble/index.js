import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatMessageActions, CometChatThreadedMessageReplyCount, CometChatReadReceipt } from "../index";
import { CometChatMessageReactions } from "../Extensions";
import { CometChatAvatar } from "../../Shared";

import { checkMessageForExtensionsData } from "../../../util/common";
import * as enums from "../../../util/enums.js";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import {
    messageContainerStyle,
    messageWrapperStyle,
    messageThumbnailStyle,
    messageDetailStyle,
    nameWrapperStyle,
    nameStyle,
    messageTxtContainerStyle,
    messageTxtWrapperStyle,
    messageTxtTitleStyle,
    messageTxtStyle,
    messageBtnStyle,
    messageInfoWrapperStyle,
    messageReactionsWrapperStyle
} from "./style";

import callIcon from "./resources/receivervideocall.png";

class CometChatReceiverDirectCallBubble extends React.Component {

    messageFrom = "receiver";

    constructor(props) {

        super(props);

        const message = Object.assign({}, props.message, { messageFrom: this.messageFrom });
        this.state = {
            message: message,
            isHovering: false
        }
    }

    componentDidUpdate(prevProps) {

        const previousMessageStr = JSON.stringify(prevProps.message);
        const currentMessageStr = JSON.stringify(this.props.message);

        if (previousMessageStr !== currentMessageStr) {

            const message = Object.assign({}, this.props.message, { messageFrom: this.messageFrom });
            this.setState({ message: message })
        }
    }

    handleMouseHover = () => {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState = (state) => {

        return {
            isHovering: !state.isHovering,
        };
    }

    render () {

        let avatar = null, name = null;
        if (this.state.message.receiverType === CometChat.RECEIVER_TYPE.GROUP) {

            avatar = (
                <div style={messageThumbnailStyle} className="message__thumbnail">
                    <CometChatAvatar user={this.state.message.sender} />
                </div>
            );

            name = (<div style={nameWrapperStyle(avatar)} className="message__name__wrapper">
                <span style={nameStyle(this.props)} className="message__name">{this.props.message.sender.name}</span>
            </div>);
        }

        let messageReactions = null;
        const reactionsData = checkMessageForExtensionsData(this.state.message, "reactions");
        if (reactionsData) {

            if (Object.keys(reactionsData).length) {
                messageReactions = (
                    <div style={messageReactionsWrapperStyle()} className="message__reaction__wrapper">
                        <CometChatMessageReactions  {...this.props} message={this.state.message} reaction={reactionsData} />
                    </div>
                );
            }
        }

        let toolTipView = null;
        if (this.state.isHovering) {
            toolTipView = (<CometChatMessageActions {...this.props} message={this.state.message} name={name} />);
        }

        const messageTitle = `${this.state.message.sender.name} ${Translator.translate("INITIATED_GROUP_CALL", this.props.lang)}`;

        return (
            <div style={messageContainerStyle()}
            className="receiver__message__container message__directcall"
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}>

                <div style={messageWrapperStyle()} className="message__wrapper">
                    {avatar}
                    <div style={messageDetailStyle()} className="message__details">
                        {name}
                        {toolTipView}
                        <div style={messageTxtContainerStyle()} className="message__directcall__container">
                            <div style={messageTxtWrapperStyle(this.props)} className="message__directcall__wrapper">
                                <div style={messageTxtTitleStyle(this.props)} className="message__directcall__title">
                                    <img src={callIcon} alt={Translator.translate("VIDEO_CALL", this.props.lang)} />
                                    <p style={messageTxtStyle()} className="directcall__title">{messageTitle}</p>
                                </div>

                                <ul style={messageBtnStyle(this.props)} className="directcall__button">
                                    <li onClick={() => this.props.actionGenerated(enums.ACTIONS["JOIN_DIRECT_CALL"], this.state.message)}>
                                        <p>{Translator.translate("JOIN", this.props.lang)}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {messageReactions}

                        <div style={messageInfoWrapperStyle()} className="message__info__wrapper">
                            <CometChatReadReceipt {...this.props} message={this.state.message} />
                            <CometChatThreadedMessageReplyCount {...this.props} message={this.state.message} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Specifies the default values for props:
CometChatReceiverDirectCallBubble.defaultProps = {
    lang: Translator.getDefaultLanguage(),
    theme: theme,
    message: {},
    loggedInUser: {}
};

CometChatReceiverDirectCallBubble.propTypes = {
    lang: PropTypes.string,
    theme: PropTypes.object,
    message: PropTypes.object,
    loggedInUser: PropTypes.object
}

export default CometChatReceiverDirectCallBubble;
