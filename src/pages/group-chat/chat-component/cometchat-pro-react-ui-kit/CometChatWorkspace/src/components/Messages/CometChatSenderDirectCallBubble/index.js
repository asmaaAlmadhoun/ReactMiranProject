import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";

import { CometChatMessageActions, CometChatThreadedMessageReplyCount, CometChatReadReceipt } from "../index";
import { CometChatMessageReactions } from "../Extensions";

import { checkMessageForExtensionsData } from "../../../util/common";
import * as enums from "../../../util/enums.js";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import {
    messageContainerStyle,
    messageWrapperStyle,
    messageTxtWrapperStyle,
    messageTxtContainerStyle,
    messageTxtStyle,
    messageBtnStyle,
    messageInfoWrapperStyle,
    messageReactionsWrapperStyle,
} from "./style";

import callIcon from "./resources/sendervideocall.png";

class CometChatSenderDirectCallBubble extends React.Component {

    messageFrom = "sender";

    constructor(props) {

        super(props);
        const message = Object.assign({}, props.message, { messageFrom: this.messageFrom });

        this.state = {
            message: message, 
            isHovering: false,
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

    render() {

        let messageReactions = null;
        const reactionsData = checkMessageForExtensionsData(this.state.message, "reactions");
        if (reactionsData) {

            if (Object.keys(reactionsData).length) {
                messageReactions = (
                    <div style={messageReactionsWrapperStyle()} className="message__reaction__wrapper">
                        <CometChatMessageReactions {...this.props} message={this.state.message} reaction={reactionsData} />
                    </div>
                );
            }
        }

        let toolTipView = null;
        if (this.state.isHovering) {
            toolTipView = (<CometChatMessageActions {...this.props} message={this.state.message} />);
        }

        const messageTitle = Translator.translate("YOU_INITIATED_GROUP_CALL", this.props.lang);
        return (
            <div style={messageContainerStyle()}
            className="sender__message__container message__directcall"
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}>

                {toolTipView}

                <div style={messageWrapperStyle()} className="message__wrapper">
                    <div style={messageTxtWrapperStyle(this.props)} className="message__directcall__wrapper">
                        <div style={messageTxtContainerStyle()} className="message__directcall__container">
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
                    <CometChatThreadedMessageReplyCount {...this.props} message={this.state.message} />
                    <CometChatReadReceipt {...this.props} message={this.state.message} />
                </div>

            </div>
        )
    }
}

// Specifies the default values for props:
CometChatSenderDirectCallBubble.defaultProps = {
    lang: Translator.getDefaultLanguage(),
    theme: theme,
    message: {},
    loggedInUser: {}
};

CometChatSenderDirectCallBubble.propTypes = {
    lang: PropTypes.string,
    theme: PropTypes.object,
    message: PropTypes.object,
    loggedInUser: PropTypes.object
}

export default CometChatSenderDirectCallBubble;
