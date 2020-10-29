import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from "./pages/login/login.component";
import React from "react";
import RegisterComponent from "./pages/register/register.component";
import ForgetPasswordComponent from "./pages/forget-password/forget-password.component";
import SideBarComponent from "./components/common/side-bar/side-bar.component";
import FooterComponent from "./components/common/footer/footer.component";
import HeaderComponent from "./components/common/header/header.component";
import {ToastContainer} from "react-toastify";


function App(props) {
  return (
      <>

      <SideBarComponent>
          <HeaderComponent />
          {props.children}
          {/*<FooterComponent />*/}
      </SideBarComponent>
      </>
  );
}

export default App;
