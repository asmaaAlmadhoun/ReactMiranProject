/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from '@emotion/core';
import PropTypes from 'prop-types';

import { theme } from "../../../../resources/theme";

import {
    previewWrapperStyle,
    previewHeadingStyle,
    previewCloseStyle,
    previewOptionsWrapperStyle,
    previewOptionStyle,
} from "./style";

import closeIcon from "./resources/close.png";

const CometChatSmartReplyPreview = (props) => {

    const options = props.options.map((option, key) => {

        return (<div key={key} style={previewOptionStyle(props)} className="option" onClick={() => props.clicked(option)}>{option}</div>)
    })

    return (
        <div style={previewWrapperStyle(props, keyframes)} className="reply__preview__wrapper">
            <div style={previewHeadingStyle()} className="preview__heading">
                <div style={previewCloseStyle(closeIcon)} onClick={props.close} className="preview__close"></div>
            </div>
            <div style={previewOptionsWrapperStyle()} className="preview__options">{options}</div>
        </div>
    )
}

// Specifies the default values for props:
CometChatSmartReplyPreview.defaultProps = {
    theme: theme
};

CometChatSmartReplyPreview.propTypes = {
    theme: PropTypes.object
}

export default CometChatSmartReplyPreview;
