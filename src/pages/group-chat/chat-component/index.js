import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './defaultPages/App';

import * as serviceWorker from './serviceWorker';
import { CometChat } from "@cometchat-pro/chat"
import { COMETCHAT_CONSTANTS } from './consts';

import reducer from './store/reducer';

import './index.scss';
import AccountService from "../../../services/account-service/account.service";
import {ChatService} from "../service/chat.service";

const store = createStore(reducer, compose(
  applyMiddleware(thunk)
));

var appID = COMETCHAT_CONSTANTS.APP_ID;
var region = COMETCHAT_CONSTANTS.REGION;

var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();

export default class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            AppReturned: <></>
        }
    }
    componentDidMount() {
        let AppReturned=<></>
        CometChat.init(appID, appSetting).then(() => {
                // console.log('asma')

                if(CometChat.setSource) {
                    CometChat.setSource("ui-kit", "web", "reactjs");
                }
                console.log("Initialization completed successfully");
                AppReturned=
                    <Provider store={store}>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </Provider>;
                this.setState({AppReturned: AppReturned})
            },
            error => {
                console.log("Initialization failed with error:", error);
                // Check the reason for error and take appropriate action.
            }
        )
    }


    render() {
        return(this.state.AppReturned);
    }

}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
