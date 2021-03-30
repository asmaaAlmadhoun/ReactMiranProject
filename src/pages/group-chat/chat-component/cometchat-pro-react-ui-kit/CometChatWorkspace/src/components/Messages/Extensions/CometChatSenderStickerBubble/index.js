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
    messageImgWrapper,
    messageInfoWrapperStyle,
    messageReactionsWrapperStyle,
} from "./style";

class CometChatSenderStickerBubble extends React.Component {

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

    handleMouseHover = () => {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState = (state) => {

        return {
            isHovering: !state.isHovering,
        };
    }

    render() {

        let stickerData = null;
        let stickerImg = null;
        if (this.state.message.hasOwnProperty("data") && this.state.message.data.hasOwnProperty("customData")) {

            stickerData = this.state.message.data.customData;

            if (stickerData.hasOwnProperty("sticker_url")) {
                const stickerName = (stickerData.hasOwnProperty("sticker_name")) ? stickerData.sticker_name : Translator.translate("STICKER", this.props.lang);
                stickerImg = (<img src={stickerData.sticker_url} alt={stickerName} />);
            }
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
            toolTipView = (<CometChatMessageActions {...this.props} message={this.state.message} />);
        }

        return (
            <div 
            style={messageContainerStyle()}
            className="sender__message__container message__sticker"
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}>
                
                {toolTipView}
                
                <div style={messageWrapperStyle()} className="message__wrapper">
                    <div style={messageImgWrapper(this.props)} className="message__img__wrapper">{stickerImg} </div>
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
CometChatSenderStickerBubble.defaultProps = {
    lang: Translator.getDefaultLanguage(),
    theme: theme
};

CometChatSenderStickerBubble.propTypes = {
    lang: PropTypes.string,
    theme: PropTypes.object
}

export default CometChatSenderStickerBubble;
