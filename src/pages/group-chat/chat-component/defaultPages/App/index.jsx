import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import PrivateRoute from '../../PrivateRoute';

import KitchenSinkApp from '../KitchenSinkApp';
import HomePage from '../HomePage';

import * as actions from '../../store/action';

import {
    CometChatConversationList,
    CometChatUserListWithMessages,
    CometChatConversationListWithMessages,
    CometChatUI,
} from '../../cometchat-pro-react-ui-kit/CometChatWorkspace/src';

import {
    wrapperStyle
} from "./style";

const history = createBrowserHistory();

class App extends React.Component {
    state = {
        isLoggedin: this.props.isLoggedIn
    }

    componentDidMount() {
        this.props.getLoggedinUser();
        console.log('asma 2 ');

    }

    render() {

        return (
            <div style={wrapperStyle()}>
                <Router history={history}>
                    <Switch>
                        <Route path="/chat-app" component={CometChatUI} />
                        <Route path="/users"  component={CometChatUserListWithMessages} />
                        <Route path="/users2"  component={CometChatConversationListWithMessages} />
                        <PrivateRoute path="/conversation-list" component={CometChatConversationList} />
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login1" component={KitchenSinkApp} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLoggedinUser: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
