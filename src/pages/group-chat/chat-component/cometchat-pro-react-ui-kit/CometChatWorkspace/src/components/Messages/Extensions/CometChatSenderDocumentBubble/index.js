import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";

import { CometChatMessageActions, CometChatThreadedMessageReplyCount, CometChatReadReceipt } from "../../index";
import { CometChatMessageReactions } from "../index";

import { checkMessageForExtensionsData } from "../../../../util/common";

import { theme } from "../../../../resources/theme";
import Translator from "../../../../resources/localization/translator";

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

import documentIcon from "./resources/senderdocument.png";

class CometChatSenderDocumentBubble extends React.PureComponent {

    messageFrom = "sender";

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

        const documentTitle = Translator.translate("CREATED_DOCUMENT", this.props.lang); 
        return (
            <div 
            style={messageContainerStyle()}
            className="sender__message__container message__document"
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}>

                {toolTipView}
                    
                <div style={messageWrapperStyle()} className="message__wrapper">
                    <div style={messageTxtWrapperStyle(this.props)} className="message__document__wrapper">
                        <div style={messageTxtContainerStyle()} className="message__document__container">
                            <img src={documentIcon} alt={Translator.translate("COLLABORATIVE_DOCUMENT", this.props.lang)} />
                            <p style={messageTxtStyle()} className="document__title">{documentTitle}</p>
                        </div>
                        <ul style={messageBtnStyle(this.props)} className="document__button">
                            <li onClick={this.launchCollaborativeDocument}>
                                <p>{Translator.translate("LAUNCH", this.props.lang)}</p>
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
CometChatSenderDocumentBubble.defaultProps = {
    lang: Translator.getDefaultLanguage(),
    theme: theme
};

CometChatSenderDocumentBubble.propTypes = {
    lang: PropTypes.string,
    theme: PropTypes.object
}

export default CometChatSenderDocumentBubble;
