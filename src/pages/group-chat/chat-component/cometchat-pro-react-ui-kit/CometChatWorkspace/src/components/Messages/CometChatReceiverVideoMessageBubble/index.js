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

import { theme } from "../../../resources/theme";

import {
  messageContainerStyle,
  messageWrapperStyle,
  messageThumbnailStyle,
  messageDetailStyle,
  nameWrapperStyle,
  nameStyle,
  messageVideoContainerStyle,
  messageVideoWrapperStyle,
  messageInfoWrapperStyle,
  messageReactionsWrapperStyle
} from "./style";

class CometChatReceiverVideoMessageBubble extends React.Component {

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

  render() {

    let avatar = null, name = null;
    if (this.props.message.receiverType === CometChat.RECEIVER_TYPE.GROUP) {

      avatar = (
        <div style={messageThumbnailStyle()} className="message__thumbnail">
          <CometChatAvatar user={this.props.message.sender} />
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
      toolTipView = (<CometChatMessageActions {...this.props} message={this.state.message} name={name} /> );
    }

    return (
      <div 
      style={messageContainerStyle()}
      className="receiver__message__container message__video"
      onMouseEnter={this.handleMouseHover}
      onMouseLeave={this.handleMouseHover}>

        <div style={messageWrapperStyle()} className="message__wrapper">
          {avatar}
          <div style={messageDetailStyle(name)} className="message__details">
            {name}
            {toolTipView}
            <div style={messageVideoContainerStyle()} className="message__video__container">
              <div style={messageVideoWrapperStyle(this.props)} className="message__video__wrapper">
                <video controls>
                  <source src={this.props.message.data.url} />
                </video>
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
CometChatReceiverVideoMessageBubble.defaultProps = {
  theme: theme
};

CometChatReceiverVideoMessageBubble.propTypes = {
  theme: PropTypes.object
}

export default CometChatReceiverVideoMessageBubble;
