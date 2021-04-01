import React from 'react';

import { Global } from "@emotion/core";

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { CometChatAvatar } from '../../cometchat-pro-react-ui-kit/CometChatWorkspace/src';
import { COMETCHAT_CONSTANTS } from '../../consts';

import {
  wrapperStyle,
  errorStyle,
  titleStyle,
  subtitleStyle,
  userContainerStyle,
  userWrapperStyle,
  thumbnailWrapperStyle,
  uidWrapperStyle,
  inputWrapperStyle,
  loginBtn,
} from "./style";

import { loaderStyle } from "./loader";

import * as actions from '../../store/action';
import {CometChat} from "@cometchat-pro/chat";

class KitchenSinkApp extends React.PureComponent {

  constructor(props) {
    super(props);

    this.myRef = React.createRef();
  }
  componentDidMount() {
    // console.log('asmaa 3444');
    CometChat.getLoggedinUser().then((user) => {
      localStorage.setItem('loggedInUser',JSON.stringify(user));
      // console.log('asma 44 ');
      this.UserListManager.fetchNextUsers().then((userList) => {
        if(userList.length !== 0) {
          localStorage.setItem('userlist', userList);
        }
      }).catch((error) => {
        console.error("[CometChatUserList] getUsers fetchNext error", error);
        // console.log('asma 44 12 ');

      });
    }).catch((error) => {
      console.log("[CometChatUnified] getLoggedinUser error", error);
    });

  }

  login = (uid) => {
    
    if(!uid) {
      uid = localStorage.getItem('chat_uid') ;
    }
    // console.log('asma 44 ');

    this.uid = uid ;
    this.props.onLogin(this.uid, COMETCHAT_CONSTANTS.AUTH_KEY);
    // return <Redirect to="/users" />
  }
  
  render() {

    let loader = null;
    let authRedirect = null;
    if (this.props.loading) {
      loader = (<div className="loading">Loading...</div>);
    }
    if (this.props.isLoggedIn) {
        authRedirect = <Redirect to="/chat-app" />
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (<p style={errorStyle()}>{this.props.error.message}</p>);
    }


    return (
      <React.Fragment>
      <Global styles={loaderStyle} />
      <div style={wrapperStyle()}>
          {authRedirect}
          {loader}
          {errorMessage}

          <div style={uidWrapperStyle()}>
            <div>
              <p style={subtitleStyle()}>Login with UID</p>
            </div>
            <div style={inputWrapperStyle()}>
              <input ref={this.myRef} type="text" value={ localStorage.getItem('chat_uid') } placeholder="Enter your UID here" />
            </div>
            <div style={loginBtn()}><button type="button" onClick={(e)=>this.login()}>Login</button></div>
          </div>
        </div>
      </React.Fragment>
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
    onLogin: ( uid, authKey ) => dispatch( actions.auth( uid, authKey ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( KitchenSinkApp );
