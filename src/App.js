import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from "./pages/login/login.component";
import React from "react";
import RegisterComponent from "./pages/register/register.component";
import ForgetPasswordComponent from "./pages/forget-password/forget-password.component";
import SideBarComponent from "./components/common/side-bar/side-bar.component";
import FooterComponent from "./components/common/footer/footer.component";


function App(props) {
  return (
      <div className="App">
          <SideBarComponent />
          {props.children}
          <FooterComponent />
      </div>
  );
}

export default App;
