import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatMessageActions, CometChatThreadedMessageReplyCount, CometChatReadReceipt } from "../../index";
import { CometChatMessageReactions } from "../index";
import { CometChatAvatar } from "../../../Shared";

import { checkMessageForExtensionsData } from "../../../../util/common";

import { theme } from "../../../../resources/theme";
import Translator from "../../../../resources/localization/translator";

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


import documentIcon from "./resources/receiverdocument.png";

class CometChatReceiverDocumentBubble extends React.PureComponent {

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

    launchCollaborativeDocument = () => {

        let documentUrl = null;
        let documentData = checkMessageForExtensionsData(this.state.message, "document");
        if (documentData
        && documentData.hasOwnProperty("document_url")
        && documentData.document_url.length) {

            documentUrl = documentData.document_url;
            window.open(documentUrl, '', 'fullscreen=yes, scrollbars=auto');
        }
    }

    render() {

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
                        <CometChatMessageReactions {...this.props} message={this.state.message} reaction={reactionsData} />
                    </div>
                );
            }
        }

        let toolTipView = null;
        if (this.state.isHovering) {
            toolTipView = (<CometChatMessageActions {...this.props} message={this.state.message} name={name} />);
        }

        const documentTitle = `${this.state.message.sender.name} ${Translator.translate("SHARED_COLLABORATIVE_DOCUMENT", this.props.lang)}`;

        return (
            <div 
            style={messageContainerStyle()}
            className="receiver__message__container message__document"
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}>

                <div style={messageWrapperStyle()} className="message__wrapper">
                    {avatar}
                    <div style={messageDetailStyle()} className="message__details">
                        {name}
                        {toolTipView}
                        <div style={messageTxtContainerStyle()} className="message__document__container">
                            <div style={messageTxtWrapperStyle(this.props)} className="message__document__wrapper">
                                <div style={messageTxtTitleStyle(this.props)} className="message__document__title">
                                    <img src={documentIcon} alt={Translator.translate("COLLABORATIVE_DOCUMENT", this.props.lang)} />
                                    <p style={messageTxtStyle()} className="document__title">{documentTitle}</p>
                                </div>
                                
                                <ul style={messageBtnStyle(this.props)} className="document__button">
                                    <li onClick={this.launchCollaborativeDocument}>
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
CometChatReceiverDocumentBubble.defaultProps = {
    lang: Translator.getDefaultLanguage(),
    theme: theme
};

CometChatReceiverDocumentBubble.propTypes = {
    lang: PropTypes.string,
    theme: PropTypes.object
}

export default CometChatReceiverDocumentBubble;
