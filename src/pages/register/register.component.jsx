import React, {Component} from 'react';
import PreAuthorizationComponent from "../../components/PreAuthorizationComponent/pre-authorization.component";
import EmailInputComponent from "../../components/EmailComponent/email-input.component";
import { withTranslation } from "react-i18next";
import InputTextComponent from "../../components/InputTextComponent/input-text.component";
import PrimaryButtonComponent from "../../components/ButtonComponent/primary-button.component";
import {Link , withRouter} from "react-router-dom";
import AccountService from "../../services/account-service/account.service";
import ToasterComponent from "../../components/common/toaster/toaster.component";
import { toast } from 'react-toastify';


class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email :null,
            fullName : null ,
            password:null,
            isMiranTrainer : false,
            isSASTrainer : false,
            isLoading:false,
            emailValid:false,
            fullNameValid:false,
            passwordValid: false
        }

        // create component references;
        this.emailRef = React.createRef();
        this.fullNameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    onSubmit = async (e) => {

        // check if all valid ;
        debugger;
        if(!this.state.emailValid || !this.state.fullNameValid || !this.state.passwordValid ) {
            /*
            * show error for specific element ;
            */
            if(!this.state.emailValid) {
                this.emailRef.current.showError(true);
            }
            if(!this.state.fullNameValid) {
                this.fullNameRef.current.showError(true);
            }

            if(!this.state.passwordValid) {
                this.passwordRef.current.showError(true);
            }
            return ;
        }

        const {email , fullName ,password } = this.state;
        const data = {
            email, full_name : fullName , password
        }
        const accountService = new AccountService();
        this.setState({isLoading: true});
          const {t} = this.props;
         accountService.register(data).then(response => {

             this.setState({isLoading: false});
             if(!response) {
                 toast.error(t('shared.errors.globalError'));
                 return ;
             }

             if(response && response.status) {
                 /*
                 * account is created successfully.
                 * show message and redirect to home page;
                 */
                 toast.success(t('shared.success.accountCreated'))
                 if(response.result) {
                     accountService.becomeAuthorize(response.result.token).then( _ =>  {
                         accountService.userData = response.result;
                         setTimeout(() => {
                             this.props.history.push('/');
                         } , 1000)
                     });

                 }
             }

             if(response && response.status === false) {
                 /*
                 * bad request, maybe because email is exist before.
                 */
                 this.setState({isLoading: false});
                 toast.warn(t('shared.warnings.emailExistBefore'))
             }
         }).catch(error => {
             console.log(error);
             toast.error(t('shared.errors.globalError'))
         });
    }

    makeEmailValidOrNot = value => {
        this.setState({emailValid : value})
    }
    makeFullNameValidOrNot = value => {
        this.setState({fullNameValid : value})
    }

    makePasswordValidOrNot = value => {
        this.setState({passwordValid : value})
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
            <>
                <PreAuthorizationComponent>
                    <EmailInputComponent validationFn={this.makeEmailValidOrNot} ref={this.emailRef} valueHandler={this.onChangeHandler} isRequired={true} isArabic={t('local')==='ar'} />
                    <InputTextComponent validationFn={this.makeFullNameValidOrNot} ref={this.fullNameRef} valueHandler={this.onChangeHandler} name="fullName" isRequired={true} isArabic={t('local')==='ar'} labelTitle={t('register.fullName')} />
                    <InputTextComponent validationFn={this.makePasswordValidOrNot} ref={this.passwordRef} valueHandler={this.onChangeHandler} name="password" isRequired={true} isPassword={true} labelTitle={t('login.password')} isArabic={t('local')==='ar'}/>
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
                <ToasterComponent />
            </>
        );
    }
}

export default withTranslation("translation") ( withRouter(RegisterComponent));