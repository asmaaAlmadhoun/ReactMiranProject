import React, {Component} from 'react';
import PreAuthorizationComponent from "../../components/PreAuthorizationComponent/pre-authorization.component";
import EmailInputComponent from "../../components/EmailComponent/email-input.component";
import { withTranslation } from "react-i18next";
import InputTextComponent from "../../components/InputTextComponent/input-text.component";
import PrimaryButtonComponent from "../../components/ButtonComponent/primary-button.component";
import {Link} from "react-router-dom";
import AccountService from "../../services/account-service/account.service";


class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email :null,
            fullName : null ,
            password:null,
            isMiranTrainer : false,
            isSASTrainer : false,
            isLoading:false
        }
    }

    onSubmit = (e) => {

        const {email , fullName ,password } = this.state;
        const data = {
            email, full_name : fullName , password
        }
        const accountService = new AccountService();
        this.setState({isLoading: true});
        accountService.register(data);
        // fetch("https://testing.miranapp.com/api/user/register/trainer",{
        //     method: "POST",
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // }).then(response => {
        //
        // }).catch(error => {
        //
        // })
    }

    onChangeHandler = (e) => {
        if(!e)
            return ;
        const name = e.target.name;
        const value = e.target.value ;
        this.setState({[name] : value} , () => {
            console.log('Current State => ' , this.state);
        });
    }
    render() {
        const  {t} = this.props;
        return (
           <PreAuthorizationComponent>
              <EmailInputComponent valueHandler={this.onChangeHandler} isRequired={true} isArabic={t('local')==='ar'} />
               <InputTextComponent valueHandler={this.onChangeHandler} name="fullName" isRequired={true} isArabic={t('local')==='ar'} labelTitle={t('register.fullName')} />
               <InputTextComponent valueHandler={this.onChangeHandler} name="password" isRequired={true} isPassword={true} labelTitle={t('login.password')} isArabic={t('local')==='ar'}/>
               <div className="form-group d-flex justify-content-center mt-4">
                   <div className="form-check d-flex align-items-center">
                       <input onChange={(e) => {
                           this.setState({isMiranTrainer : e.target.checked , isSASTrainer : !e.target.checked})
                       }} className="form-check-input" type="radio" name="trainerType" id="exampleRadios1"
                              value="option1"  />
                           <label className="form-check-label" style={{margin:'0 15px'}} htmlFor="exampleRadios1">
                               {t('register.miranTrainer')}
                           </label>
                   </div>
                   <div className="form-check d-flex align-items-center">
                       <input onChange={(e) => {
                           this.setState({isSASTrainer : e.target.checked , isMiranTrainer:!e.target.checked})

                       }} className="form-check-input" type="radio" name="trainerType" id="exampleRadios2"
                              value="option2" />
                           <label className="form-check-label" style={{margin:'0 15px'}} htmlFor="exampleRadios2">
                               {t('register.sasTrainer')}
                           </label>
                   </div>
               </div>
              <PrimaryButtonComponent switchLoading={this.state.isLoading} title={t('register.title')}  clickHandler={this.onSubmit} />
              <div className="mt-4 text-center">
                  <Link to="/login"> {t('register.hasAccount')} </Link>
              </div>
           </PreAuthorizationComponent>
        );
    }
}

export default withTranslation("translation") (RegisterComponent);