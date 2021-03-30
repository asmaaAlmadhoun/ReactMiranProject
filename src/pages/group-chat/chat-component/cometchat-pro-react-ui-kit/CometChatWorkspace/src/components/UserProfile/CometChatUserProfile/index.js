import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatAvatar } from "../../Shared";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import {
  userInfoScreenStyle,
  headerStyle,
  headerTitleStyle,
  detailStyle,
  thumbnailStyle,
  userDetailStyle,
  userNameStyle,
  userStatusStyle,
  optionsStyle,
  optionTitleStyle,
  optionListStyle,
  optionStyle,
  optionNameStyle
} from "./style";

import notificationIcon from "./resources/notification-black-icon.svg";
import privacyIcon from "./resources/privacy-black-icon.svg";
import chatIcon from "./resources/chat-black-icon.svg";
import helpIcon from "./resources/help-black-icon.svg";
import reportIcon from "./resources/report-black-icon.svg";

class CometChatUserProfile extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      user: {},
    }
  }
  
  componentDidMount() {
    this.getProfile();
  }

  getProfile() {

    CometChat.getLoggedinUser().then(user => {

      this.setState({ user: user });

    }).catch(error => {
      console.log("[CometChatUserInfoScreen] getProfile getLoggedinUser error", error);
    });

  }

  render() {

    let avatar = null;
    if(Object.keys(this.state.user).length) {
      avatar = (<CometChatAvatar user={this.state.user} borderColor={this.props.theme.borderColor.primary} />);
    }

    return (
      <div style={userInfoScreenStyle(this.props)} className="userinfo">
        <div style={headerStyle(this.props)} className="userinfo__header">
          <h4 style={headerTitleStyle()} className="header__title">{Translator.translate("MORE", this.props.lang)}</h4>
        </div>
        <div style={detailStyle()} className="userinfo__detail">
          <div style={thumbnailStyle()} className="detail__thumbnail">{avatar}</div>
          <div style={userDetailStyle()} className="detail__user" dir={Translator.getDirection(this.props.lang)}>
            <div style={userNameStyle()} className="user__name">{this.state.user.name}</div>
            <p style={userStatusStyle(this.props)} className="user__status">{Translator.translate("ONLINE", this.props.lang)}</p>
          </div>
        </div>
        <div style={optionsStyle()} className="userinfo__options">
          <div style={optionTitleStyle(this.props)} className="options__title">{Translator.translate("PREFERENCES", this.props.lang)}</div>
          <div style={optionListStyle()} className="options_list">
            <div style={optionStyle(notificationIcon)} className="option option-notification">
              <div style={optionNameStyle()} className="option_name">{Translator.translate("NOTIFICATIONS", this.props.lang)}</div>
            </div>
            <div style={optionStyle(privacyIcon)} className="option option-privacy">
              <div style={optionNameStyle()} className="option_name">{Translator.translate("PRIVACY_AND_SECURITY", this.props.lang)}</div>
            </div>
            <div style={optionStyle(chatIcon)} className="option option-chats">
              <div style={optionNameStyle()} className="option_name">{Translator.translate("CHATS", this.props.lang)}</div>
            </div>
          </div>
          <div style={optionTitleStyle(this.props)} className="options__title">{Translator.translate("OTHER", this.props.lang)}</div>
          <div style={optionListStyle()} className="options_list">
            <div style={optionStyle(helpIcon)} className="option option-help">
              <div style={optionNameStyle()} className="option_name">{Translator.translate("HELP", this.props.lang)}</div>
            </div>
            <div style={optionStyle(reportIcon)} className="option option-report">
              <div style={optionNameStyle()} className="option_name">{Translator.translate("REPORT_PROBLEM", this.props.lang)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Specifies the default values for props:
CometChatUserProfile.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme
};

CometChatUserProfile.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object
}

export default CometChatUserProfile;
