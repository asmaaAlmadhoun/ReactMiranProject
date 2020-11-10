import React, {Component} from 'react';
import './profile.component.css';
import BreadcrumbComponent from "../../components/common/breadcrumb/breadcrumb.component";
import {withTranslation} from "react-i18next";
import maleProfileDefault from '../../assets/icons/user-profile.jpg';
import femaleProfileDefault from '../../assets/images/femaleImage.jpg';
import UserService from "../../services/user-service/user.service";
import {Loader} from "semantic-ui-react";
import { FiPlus } from "react-icons/fi";
import InputTextComponent from "../../components/InputTextComponent/input-text.component";
import EmailInputComponent from "../../components/EmailComponent/email-input.component";
import { Select } from 'semantic-ui-react'
import PrimaryButtonComponent from "../../components/ButtonComponent/primary-button.component";

class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading:false,
            imgDefaultPath : null
        }
    }

    componentWillMount() {
        // Fetch user profile.
        const userService = new UserService();
        this.setState({loading:true ,imgDefaultPath : userService.imageDefaultPath })
        userService.profile.then(data => {
            // Todo Handle the data before log it.
            console.log('profile data ===>',data);
            this.setState({loading:false })
            if(data.status) {
                this.setState({data : data.result})
            }
        }).catch(error => {
            this.setState({loading:false})
            console.log(error);
        })
    }

    render() {
        const {t} = this.props;
        const imgPath = this.state.data &&  this.state.imgDefaultPath  ? this.state.imgDefaultPath + this.state.data.profile.avatar :
            this.state.data && this.state.data.profile && this.state.data.profile.gender && this.state.data.profile.gender.name === 'female'? femaleProfileDefault :
            maleProfileDefault;
        return (

            <div className="container user-profile">
                {
                    this.state.loading ?
                        <div className="row">
                            <div className="col-sm-12">
                                <Loader active={true} inline='centered' />
                            </div>
                        </div> : <>
                            <div className="row">

                                <div className="col-sm-12">
                                    <BreadcrumbComponent title={t('breadcrumb.profile')} />
                                </div>
                            </div>
                            <div className="row mt-4">
                               <div className="col-sm-10  m-auto">
                                   <div className="row mt-4">
                                       <div className="col-md-2 col-sm-12 text-sm-center">
                                           {/*  TODO: User Image  */}
                                           <div className="user-img-container">
                                               <div className="user-img">
                                                   <img  src={imgPath} alt={"user image"}/>
                                               </div>
                                               <div className="icon">
                                                   <FiPlus />
                                               </div>
                                           </div>
                                       </div>
                                       <div className="col-md-10 col-sm-12">
                                           <div className="row">
                                               <div className="col-sm-12">
                                                   <InputTextComponent value={this.state.data && this.state.data.profile.full_name}  isRequired={false}  labelTitle={t('profile.fullName')} />
                                               </div>
                                               <div className="col-sm-12 mt-2">
                                                   <EmailInputComponent isRequired={false} value={this.state.data && this.state.data.profile.email} isArabic={t('local') === 'ar'} />
                                               </div>
                                               <div className="col-sm-12 mt-2">
                                                   <InputTextComponent isRequired={false} labelTitle={t('profile.tele')} value={this.state.data && this.state.data.profile.mobile.replace(/\s+/g, '').replace('+','')} />
                                               </div>
                                               <div className="col-sm-6 mt-2">
                                                   <label >
                                                       {t('profile.gender')}
                                                   </label>
                                                   <div >
                                                       <Select style={{textAlign:t('local')==='ar' ? 'right' : 'left'}}
                                                               fluid placeholder='Select your Gender'
                                                                value={this.state.data && this.state.data.profile.gender.name}
                                                               onChange={ (e , v)=> {
                                                                   console.log(v);
                                                                   const _data = this.state.data;
                                                                   _data.profile.gender.name = v.value;
                                                                   this.setState( {_data})
                                                               }}
                                                               options={[{key: 'male' , value:'male' , text:t('local') === 'ar' ? 'ذكر' :  'male'} , {key: 'female' , value:'female' , text:t('local') === 'ar' ? 'أنثى' :'female'}]} />
                                                   </div>
                                               </div>
                                               <div className="col-sm-6 mt-2">
                                                   <InputTextComponent
                                                        value={this.state.data && this.state.data.profile && this.state.data.profile.nationality ?
                                                          t('local') === 'ar' ? this.state.data.profile.nationality.name_ar : this.state.data.profile.nationality.name  : null
                                                        }
                                                       isRequired={false} labelTitle={t('profile.country')} />
                                               </div>
                                               <div className="col-sm-12 mt-2">
                                                   <label >
                                                       {t('profile.aboutMe')}
                                                   </label>
                                                   <textarea  className="form-control" rows={5}/>
                                               </div>
                                               <div className="col-sm-12 mt-4 ">
                                                   <PrimaryButtonComponent title={t('shared.update')} />
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                            </div>
                        </>
                }

            </div>
        );
    }
}

export default  withTranslation('translation')(ProfileComponent);