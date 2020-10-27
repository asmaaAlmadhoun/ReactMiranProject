import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {I18nextProvider} from "react-i18next";
import i18n from './i18n';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from "./pages/login/login.component";
import RegisterComponent from "./pages/register/register.component";
import ForgetPasswordComponent from "./pages/forget-password/forget-password.component";
import HomeComponent from "./pages/home/home.component";

ReactDOM.render(
  <React.StrictMode>
      <I18nextProvider i18n={i18n}>
          <Router>
              <Switch>
                  <Route path="/login" component={() => <LoginComponent className="login-Component" />} />
                  <Route path="/register" component={() => <RegisterComponent className="register-Component" />} />
                  <Route path="/forget-pw" component={() => <ForgetPasswordComponent className="forgetPw-Component" />} />

              <App >
                  <Route path="/" exact component={HomeComponent} />
              </App>
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
