import React, {Component} from 'react';
import PreAuthorizationComponent from "../../components/PreAuthorizationComponent/pre-authorization.component";
import EmailInputComponent from "../../components/EmailComponent/email-input.component";
import PrimaryButtonComponent from "../../components/ButtonComponent/primary-button.component";
import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import AccountService from "../../services/account-service/account.service";

class ForgetPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : null
        }
    }

    onSubmit = () => {
        const {email} = this.state;
        const accountService = new AccountService();
        accountService.forgetPassword({email});
    }

    onChangeHandler = e => {
        if(!e)
            return;
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name ;
        this.setState({[name] : value} , () => {
            console.log("Current state ==>" , this.state);
        });
    }
    render() {
        const {t} = this.props;
        return (
           <PreAuthorizationComponent>
               <EmailInputComponent valueHandler={this.onChangeHandler}  isRequired={true} isArabic={t('local') === 'ar'} />
               <PrimaryButtonComponent  clickHandler={this.onSubmit} title={t('shared.send')} />
               <div className="mt-4 text-center">
                   <Link to="/login"> {t('login.title')} </Link>
               </div>
           </PreAuthorizationComponent>
        );
    }
}

export default withTranslation("translation") (ForgetPasswordComponent);