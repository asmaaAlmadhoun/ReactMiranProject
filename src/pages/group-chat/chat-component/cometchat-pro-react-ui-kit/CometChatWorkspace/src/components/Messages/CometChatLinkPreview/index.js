import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";

import { checkMessageForExtensionsData } from "../../../util/common";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import {
    messagePreviewContainerStyle,
    messagePreviewWrapperStyle,
    previewImageStyle,
    previewDataStyle,
    previewTitleStyle,
    previewDescStyle,
    previewLinkStyle,
    previewTextStyle,
} from "./style";

class CometChatLinkPreview extends React.PureComponent {

    constructor(props) {

        super(props);

        this.state = {
            message: props.message,
            messageText: props.messageText
        }
    }

    render() {

        const linkPreviewData = checkMessageForExtensionsData(this.state.message, "link-preview");
        const linkObject = linkPreviewData["links"][0];

        const pattern = /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)(\S+)?/;
        const linkText = (linkObject["url"].match(pattern)) ? Translator.translate("VIEW_ON_YOUTUBE", this.props.lang) : Translator.translate("VISIT", this.props.lang);

        return (
            <div style={messagePreviewContainerStyle(this.props)} className="message__preview">
                <div style={messagePreviewWrapperStyle()} className="preview__card">
                    <div style={previewImageStyle(linkObject["image"])} className="card__image"></div>
                    <div style={previewDataStyle(this.props)} className="card__info">
                        <div style={previewTitleStyle(this.props)} className="card__title"><span>{linkObject["title"]}</span></div>
                        <div style={previewDescStyle(this.props)} className="card__desc"><span>{linkObject["description"]}</span></div>
                        <div style={previewTextStyle(this.props)} className="card__text">{this.state.messageText}</div>
                    </div>
                    <div style={previewLinkStyle(this.props)} className="card__link">
                        <a href={linkObject["url"]} target="_blank" rel="noopener noreferrer">{linkText}</a>
                    </div>
                </div>
            </div>
        );
    }
}

// Specifies the default values for props:
CometChatLinkPreview.defaultProps = {
    lang: Translator.getDefaultLanguage(),
    theme: theme
};

CometChatLinkPreview.propTypes = {
    lang: PropTypes.string,
    theme: PropTypes.object
}

export default CometChatLinkPreview;
