import React from 'react';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  wrapperStyle,
  titleStyle,
  subTitleStyle,
  componentStyle,
  boxStyle,
  titleWrapperStyle,
  thumbnailWrapperStyle,
  componentTitleStyle,
  UIComponentStyle,
  descWrapperStyle,
  linkWrapperStyle,
  linkStyle,
  logoutBtn
} from "./style";

import * as actions from '../../store/action';


class HomePage extends React.Component {

  render() {

    let authRedirect = null;
    if (!this.props.isLoggedIn) {
       authRedirect = <Redirect to="/login1" />
    }
    else {
       authRedirect = <Redirect to="/login1" />
    }

    return (
        <div style={wrapperStyle()}>
          {/*{authRedirect}*/}
          <p style={titleStyle()}>The UI Kit has different ways to make fully customizable UI required to build a chat application.</p>
          <p style={subTitleStyle()}>The UI Kit has been developed to help developers of different levels of experience to build a chat application in a few minutes to a couple of hours.</p>

          <div style={UIComponentStyle()}>
            <div style={boxStyle()}>
              <div style={titleWrapperStyle()}>
                <div style={thumbnailWrapperStyle}><img src='' alt="CometChatUI" /></div>
                <h2 style={componentTitleStyle()}>CometChatUI</h2>
              </div>
              <div style={descWrapperStyle()}>
                <p>The <code>CometChatUI</code> component launches a fully working chat application.</p>
              </div>
              <ul style={linkWrapperStyle()}>
                <li><Link style={linkStyle()} to="/chat-app">Launch</Link></li>
              </ul>
            </div>
          </div>

          <div style={componentStyle()}>
            <div style={boxStyle()}>
              <div style={titleWrapperStyle()}>
                <div style={thumbnailWrapperStyle}><img src='' alt="Conversations" /></div>
                <h2 style={componentTitleStyle()}>Conversations</h2>
              </div>
              <div style={descWrapperStyle()}>
                <p>The <code>CometChatConversationListWithMessages</code> component launches Conversation list with messaging.</p>
              </div>
              <ul style={linkWrapperStyle()}>
                <li><Link style={linkStyle()} to="/conversations">Launch</Link></li>
              </ul>
            </div>


            <div style={boxStyle()}>
              <div style={titleWrapperStyle()}>
                <div style={thumbnailWrapperStyle}><img src='' alt="Users" /></div>
                <h2 style={componentTitleStyle()}>Users</h2>
              </div>
              <div style={descWrapperStyle()}>
                <p>The <code>CometChatUserListWithMessages</code> component launches User list with messaging.</p>
              </div>
              <ul style={linkWrapperStyle()}>
                <li><Link style={linkStyle()} to="/users">Launch</Link></li>
              </ul>
            </div>
          </div>

          <div style={componentStyle()}>

            <div style={boxStyle()}>
              <div style={titleWrapperStyle()}>
                <div style={thumbnailWrapperStyle}><img src='' alt="Conversation List" /></div>
                <h2 style={componentTitleStyle()}>Conversation List</h2>
              </div>
              <div style={descWrapperStyle()}>
                <p>The <code>CometChatConversationList</code> component launches Conversation list.</p>
              </div>
              <ul style={linkWrapperStyle()}>
                <li><Link style={linkStyle()} to="/conversation-list">Launch</Link></li>
              </ul>
            </div>

            <div style={boxStyle()}>
              <div style={titleWrapperStyle()}>
                <div style={thumbnailWrapperStyle}><img src='' alt="Group List" /></div>
                <h2 style={componentTitleStyle()}>Group List</h2>
              </div>
              <div style={descWrapperStyle()}>
                <p>The <code>CometChatGroupList</code> component launches Group list.</p>
              </div>
              <ul style={linkWrapperStyle()}>
                <li><Link style={linkStyle()} to="/group-list">Launch</Link></li>
              </ul>
            </div>

            <div style={boxStyle()}>
              <div style={titleWrapperStyle()}>
                <div style={thumbnailWrapperStyle}><img src='' alt="User List" /></div>
                <h2 style={componentTitleStyle()}>User List</h2>
              </div>
              <div style={descWrapperStyle()}>
                <p>The <code>CometChatUserList</code> component launches User list.</p>
              </div>
              <ul style={linkWrapperStyle()}>
                <li><Link style={linkStyle()} to="/user-list">Launch</Link></li>
              </ul>
            </div>
          </div>

          <div style={logoutBtn()}><button type="button" onClick={this.props.onLogout}>Logout</button></div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( HomePage );
