import React, {Component} from 'react';
import './login.cmponent.css';
import PreAuthorizationComponent from "../../components/PreAuthorizationComponent/pre-authorization.component";
import InputTextComponent from "../../components/InputTextComponent/input-text.component";
import PrimaryButtonComponent from "../../components/ButtonComponent/primary-button.component";
import { withTranslation } from "react-i18next";
import {Link}  from "react-router-dom";
import AccountService from "../../services/account-service/account.service";
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : null,
            password:null
        }
    }
    onSubmit = () => {

        const {username , password} = this.state;
        const data = {
            username,password
        }
        const accountService = new AccountService();
        accountService.login(data);
    }

    onChangeHandler = (e) => {
        debugger;
        if(!e)
            return ;
        const value = e.target.value;
        this.setState({[e.target.name] : value} , () => {
            console.log('current state = ', this.state);
        });
    }
    render() {
        const {t} = this.props;
        return (
           <PreAuthorizationComponent>
               <form>
                   <InputTextComponent valueHandler={this.onChangeHandler} name="username" isRequired={true} isArabic={t('local') === 'ar'} labelTitle={t('login.userName')}/>
                   <InputTextComponent valueHandler={this.onChangeHandler} name="password" isRequired={true} isArabic={t('local') === 'ar'}  labelTitle={t('login.password')} isPassword={true}/>
                    <div className="form-group d-flex mt-4">
                        <div className="round flex-grow-1">
                            <input type="checkbox" id="checkbox"/>
                            <label htmlFor="checkbox">
                            </label>
                            <span className="checbox-lable"> {t('login.rememberMe')} </span>
                        </div>
                        <div>
                            <Link to={'/forget-pw'}>
                                {t('login.forgetPW')}
                            </Link>
                        </div>
                    </div>
                   <PrimaryButtonComponent  clickHandler={this.onSubmit}  title={t('login.title')}/>
                   <div className="text-center mt-4 reg-title">
                       <span>
                           {t('login.newTrainer')}
                       </span>
                       <Link to={'/register'} >
                           {t('login.signUp')}
                       </Link>
                   </div>
               </form>
           </PreAuthorizationComponent>
        );
    }
}

export default withTranslation("translation")( LoginComponent);