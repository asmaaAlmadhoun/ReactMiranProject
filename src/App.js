import './App.css';
import  { BrowserRouter as Router, Route, Switch  , Redirect } from 'react-router-dom'
import LoginComponent from "./pages/login/login.component";
import React from "react";
import RegisterComponent from "./pages/register/register.component";
import ForgetPasswordComponent from "./pages/forget-password/forget-password.component";
import SideBarComponent from "./components/common/side-bar/side-bar.component";
import FooterComponent from "./components/common/footer/footer.component";
import HeaderComponent from "./components/common/header/header.component";
import {ToastContainer} from "react-toastify";
import AccountService from "./services/account-service/account.service";



class App extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthorize : false,
            hasHorizontalScrollbar : false,
            hasVerticalScrollbar:false
        }
    }
    componentWillMount() {

        const accountService = new AccountService();
         const _authorize = accountService.isAuthorize();
         this.setState({
             isAuthorize : _authorize
         })
    }


    displayScrollbar  = () => {
        const pusherElement = document.getElementsByClassName('pusher')[0];
        if(pusherElement) {
            const hasHorizontalScrollbar = pusherElement.scrollWidth > pusherElement.clientWidth;
            const hasVerticalScrollbar = pusherElement.scrollHeight > pusherElement.clientHeight;
            this.setState({hasHorizontalScrollbar , hasVerticalScrollbar})
        }

    }

    render() {
        if(!this.state.isAuthorize) {
            return <Redirect to={'/login?notAuth=true'} />
        }
        return (
            <>
                <SideBarComponent>
                    <HeaderComponent />
                    {this.props.children}
                    <div className="mt-4">
                        <FooterComponent />
                    </div>

                    {

                        this.state.hasVerticalScrollbar ?   <div className="scroll-bar">
                            scroll
                        </div>  : null
                    }
                </SideBarComponent>
            </>
        );
    }
}
export default App;
