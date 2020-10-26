import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from "./pages/login/login.component";
import React from "react";
import RegisterComponent from "./pages/register/register.component";
import ForgetPasswordComponent from "./pages/forget-password/forget-password.component";


function App() {
  return (
      <Router>
          <Route path="/login" component={() => <LoginComponent className="login-Component" />} />
          <Route path="/register" component={() => <RegisterComponent className="register-Component" />} />
          <Route path="/forget-pw" component={() => <ForgetPasswordComponent className="forgetPw-Component" />} />

          <div className="App">
          {/*<Route exact path='/' component={Login} />*/}
          {/*<Route exact path='/' component={Register} />*/}
          {/*<Route exact path='/' component={ForgetPassword} />*/}
          <Switch>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
