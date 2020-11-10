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
import PhoneNumberInputComponent from "../../components/phone-number-input/phone-number-input.component";
import AddLanguageComponent from "../../components/register-add-language/add-language.component";
import ImageUploader from 'react-images-upload';
import './register.component.css';
import RegisterAddDocComponent from "../../components/register-add-doc/register-add-doc.component";

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email :null,
            fullName : null ,
            password:null,
            isMiranTrainer : false,
            isSASTrainer : false,
            experienceYear : 0 ,
            phoneNumber: null ,
            nationality: null,
            isLoading:false,
            isMale : false ,
            isFemale : false ,
            languages : [] ,
            emailValid:false,
            fullNameValid:false,
            passwordValid: false,
            stage : 1,
            profile: null,
            displayProfileImg : null,
            bio : null,
            docs:[]
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

        const {email , fullName ,password ,isMale ,phoneNumber , bio , nationality , experienceYear , isSASTrainer } = this.state;

        const data = {
            email,
            full_name : fullName ,
            password ,
            profile : {
                full_name : fullName,
                email,
                gender : isMale ? 'male' : 'female',
                mobile:phoneNumber,
                bio,
                nationality:nationality,
                years_of_experience : experienceYear,
                is_saas : isSASTrainer
            }
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

    phoneNumberHandling = (val) => {

        this.setState({phoneNumber:val} , () => {
            console.log('current State' , this.state);
        })
    }


    onDrop = (pictureFiles, pictureDataURLs) => {
        debugger;
        this.setState({
            profile: pictureFiles[0],
            displayProfileImg : pictureDataURLs[0]
        });
    }
    render() {
        const  {t} = this.props;


        /*
        * switch case for re-render UI depends on stage.
        */
        const stage_render = () => {
            switch (this.state.stage) {
                case 1 :  return (
                    <>
                        <EmailInputComponent value={this.state.email} validationFn={this.makeEmailValidOrNot} ref={this.emailRef} valueHandler={this.onChangeHandler} isRequired={true} isArabic={t('local')==='ar'} />
                        <InputTextComponent value={this.state.fullName} validationFn={this.makeFullNameValidOrNot} ref={this.fullNameRef} valueHandler={this.onChangeHandler} name="fullName" isRequired={true} isArabic={t('local')==='ar'} labelTitle={t('register.fullName')} />
                        <InputTextComponent value={this.state.password} validationFn={this.makePasswordValidOrNot} ref={this.passwordRef} valueHandler={this.onChangeHandler} name="password" isRequired={true} isPassword={true} labelTitle={t('login.password')} isArabic={t('local')==='ar'}/>
                        <div className="form-group d-flex justify-content-center mt-4">
                            <div className="form-check d-flex align-items-center">
                                <input onChange={(e) => {
                                    this.setState({isMiranTrainer : e.target.checked , isSASTrainer : !e.target.checked})
                                }} className="form-check-input" type="radio" name="trainerType" id="exampleRadios1"
                                       checked={this.state.isMiranTrainer}  />
                                <label className="form-check-label" style={{margin:'0 15px'}} htmlFor="exampleRadios1">
                                    {t('register.miranTrainer')}
                                </label>
                            </div>
                           <div className="form-check d-flex align-items-center">
                               <input onChange={(e) => {
                                   this.setState({isSASTrainer : e.target.checked , isMiranTrainer:!e.target.checked})

                               }} className="form-check-input" type="radio" name="trainerType" id="exampleRadios2"
                                      checked={this.state.isSASTrainer} />
                               <label className="form-check-label" style={{margin:'0 15px'}} htmlFor="exampleRadios2">
                                   {t('register.sasTrainer')}
                               </label>
                           </div>
                       </div>

                   </>
               );

               case 2 : return (
                   <>
                      <InputTextComponent value={this.state.experienceYear} valueHandler={e => {
                          this.setState({experienceYear : e.target.value})
                      }} isRequired={true} labelTitle={t('register.experienceYear')} isNumber={true} />
                      <PhoneNumberInputComponent onChange={this.phoneNumberHandling} label={t('register.phoneNumber')} value={this.state.phoneNumber} />
                      <InputTextComponent value={this.state.nationality} isRequired={false} labelTitle={t('register.nationality')} name="nationality" valueHandler={this.onChangeHandler} />
                       <div className="form-group d-flex align-items-center justify-content-center mt-4">
                           <div className="mx-2" style={{color:'#8c99a5'}}>
                               <label style={{marginBottom:0}}> {t('register.gender')} : </label>
                           </div>
                           <div className="form-check d-flex align-items-center">
                               <input onChange={(e) => {
                                   this.setState({isMale : e.target.checked , isFemale : !e.target.checked})
                               }} className="form-check-input" type="radio" name="trainerType" id="exampleRadios1"
                                      checked={this.state.isMale}  />
                               <label className="form-check-label" style={{margin:'0 15px'}} htmlFor="exampleRadios1">
                                   {t('register.male')}
                               </label>
                           </div>
                           <div className="form-check d-flex align-items-center">
                               <input onChange={(e) => {
                                   this.setState({isFemale : e.target.checked , isMale:!e.target.checked})

                               }} className="form-check-input" type="radio" name="trainerType" id="exampleRadios2"
                                      checked={this.state.isFemale} />
                               <label className="form-check-label" style={{margin:'0 15px'}} htmlFor="exampleRadios2">
                                   {t('register.female')}
                               </label>
                           </div>
                       </div>
                       <AddLanguageComponent  value={this.state.languages}
                                              addHandler={ (languages) => {
                                                  debugger;
                                                 this.setState({languages})
                                                 }}
                                               removeHandler={(language) => {
                                                  debugger;
                                               let {languages} = this.state;
                                               languages = languages.filter(item => item !== language);
                                               this.setState({languages});
                        }}
                       />
                   </>
               );

               case 3 : return (
                   <>
                       <div className="form-group">
                           <label style={{color:'#8c99a5'}}>
                               {t('register.aboutMe')}
                           </label>
                           <textarea rows="3" className="form-control" value={this.state.bio}
                            onChange={e => {
                                this.setState({bio : e.target.value})
                            }}
                           />
                       </div>
                       <div className="form-group">
                           <label style={{color:'#8c99a5'}}> {t('register.profileImg')} </label>
                           <ImageUploader
                               withIcon={true}
                               buttonText='Choose images'
                              onChange={this.onDrop}
                               singleImage={true}
                               imgExtension={['.jpg', '.gif', '.png', '.gif']}
                               maxFileSize={5242880}
                           />
                           {
                               this.state.displayProfileImg ? <img src={this.state.displayProfileImg}
                                                                   style={{width:'50px' , height:'50px'}}
                                                                   alt=""/> : null
                           }
                       </div>

                       <RegisterAddDocComponent  receiveImages={ images => {
                           this.setState({docs:  images} , () => {
                               console.log('current State is ==>' , this.state);
                           })
                       }}/>



                       <div className="form-group mt-2">
                           <small style={{color:'#8c99a5'}}> {
                               t('local') === 'ar' ? 'بالضغط على التسجيل فإنك توافق على الشروط والأحكام ' : 'By clicking on register, you agree to the terms and conditions'
                           } </small>
                       </div>
                   </>
               );
           }
       }

        return (
            <>
                <PreAuthorizationComponent>
                    {stage_render()}

                    {
                        this.state.stage === 3 ?
                            <>
                                <PrimaryButtonComponent switchLoading={this.state.isLoading} title={t('register.title')}  clickHandler={this.onSubmit} />
                                <div className="mx-auto  mt-2">
                                    <PrimaryButtonComponent isSecondaryBtn={true} isOutline={true} title={t('register.previous')} clickHandler={e => {
                                        let {stage} = this.state;
                                        stage--;
                                        this.setState({stage})
                                    } }  />
                                </div>
                            </>
                            :
                           <div className="d-flex justify-content-center align-items-center">
                               {
                                   this.state.stage < 3 ?  <div className="mx-2 w-50">
                                       <PrimaryButtonComponent isSecondaryBtn={true}  title={t('register.next')} clickHandler={e => {
                                           let {stage} = this.state;
                                           stage++;
                                           this.setState({stage})
                                       } }  />
                                   </div> : null
                               }
                               {
                                   this.state.stage > 1 ?   <div className={`mx-2 w-50`}>
                                       <PrimaryButtonComponent isSecondaryBtn={true} title={t('register.previous')} clickHandler={e => {
                                           let {stage} = this.state;
                                           stage--;
                                           this.setState({stage})
                                       } }  />
                                   </div>  :null
                               }
                           </div>
                    }


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