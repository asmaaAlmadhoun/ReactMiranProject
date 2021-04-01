import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App1 from './App1';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {I18nextProvider} from "react-i18next";
import i18n from './i18n';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from "./pages/login/login.component";
import RegisterComponent from "./pages/register/register.component";
import ForgetPasswordComponent from "./pages/forget-password/forget-password.component";
import HomeComponent from "./pages/home/home.component";
import {ToastContainer} from "react-toastify";
import ProfileComponent from "./pages/profile/profile.component";
import SettingComponent from "./pages/setting/setting.component";
import TemplateComponent from "./pages/template/template.component";
import ConfirmAlertComponent from "./pages/confirm-alert/confirm-alert.component";
import TemplateDetailsComponent from "./pages/template/template-details.component";
import ProgressComponent from "./pages/progress/progress.component";
import SendInvitationComponent from "./pages/send-invitation/send-invitation.component";
import Index from "./pages/group-chat/chat-component/index";
import LoginChatComponent from "./pages/group-chat/login-chat/login-chat.component";
import FaqComponent from "./pages/faq/faq.component";
import PlanComponent from "./pages/plan/plan";
import DisplayTraineesComponent from "./pages/display-trainees/display-trainees.component";
import PrivateRoute from "./pages/group-chat/chat-component/PrivateRoute";
import {
    CometChatUI,
    CometChatUserList,
    CometChatUserListWithMessages
} from "./pages/group-chat/chat-component/cometchat-pro-react-ui-kit/CometChatWorkspace/src";

ReactDOM.render(
  <React.StrictMode>
      <I18nextProvider i18n={i18n}>
          <Router>
              <Switch>

                  <Route path="/login" component={() => <LoginComponent className="login-Component" />} />
                  <Route path="/register" component={() => <RegisterComponent className="register-Component" />} />
                  <Route path="/forget-pw" component={() => <ForgetPasswordComponent className="forgetPw-Component" />} />
                  <Route  path="/confirm-alert" component={() => <ConfirmAlertComponent />} />
              <App1 >
                  <Route path="/" exact component={HomeComponent} />
                  <Route path="/profile"  component={ProfileComponent} />
                  <Route path="/setting"  component={SettingComponent} />
                  <Route path="/template"  component={TemplateComponent} />
                  <Route path="/template-details"  component={TemplateDetailsComponent} />
                  <Route path="/progress"  component={ProgressComponent} />
                  <Route path="/plan"  component={PlanComponent} />
                  <Route path="/faq"  component={FaqComponent} />
                  <Route path="/trainees"  component={DisplayTraineesComponent} />
                  <Route path="/users" component={CometChatUserListWithMessages} />
                  <Route path="/chat-app" component={CometChatUI} />
                  <Route path="/chat2" component={LoginChatComponent} />
              </App1>
              </Switch>
          </Router>
      </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
