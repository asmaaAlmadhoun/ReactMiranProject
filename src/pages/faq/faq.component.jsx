import React, {Component} from 'react';
import { withTranslation } from "react-i18next";
import './faq.component.css';
import { toast } from 'react-toastify';
import ModalComponent from "../../components/common/modal/modal.component";
import InputTextComponent from "../../components/InputTextComponent/input-text-no-label.component";
import {FiPlus} from "react-icons/fi/index";
import UserService from "../../services/user-service/user.service";
import EmptyComponent from "../../components/common/empty-page/empty.component";

class FaqComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            __addModal__ : false,
            faq: [],
            question: '',
            answer: ''
        }
    }
    componentWillMount() {
        const userService  = new UserService();
        this.setState({isLoading : true})
        userService.faq.then(data => {
            this.setState({isLoading : false})
            if(data) {
                this.setState({faq : data.result})
            }
        }).catch(error => {
            this.setState({isLoading : false})
        })
    }

    showModalHandler =() => {
        this.setState({__addModal__ : true});
    }
    closeModalHandler = () =>  {
        this.setState({__addModal__ : false});
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <div className="container px-5 position-relative">
                <h3 className='btn-primary text-center w-75 mx-auto mb-5'>{t('faqPage.faq')}</h3>
                    {
                        this.state.faq.length > 0 ?
                            this.state.faq.map( (item,i) => {
                                 return (
                                    <div className='my-2' key={i}>
                                        <label className='text-primary'>{item.question}</label>
                                        <p>{item.answer}</p>
                                        <hr/>
                                    </div>
                                );
                            })
                            :
                            <EmptyComponent />
                    }



                <button className='p-1 ui icon button primary position-absolute p-bottom font-size-large' style={ t('local') === 'ar' ? {left: '3rem'} : {right: '3rem' }} onClick={e => {
                    e.preventDefault();
                    this.setState({__addModal__:true})
                }}><FiPlus className='f-5-half'/></button>
                </div>
                <ModalComponent size='mini' isOpen={this.state.__addModal__} hideAction={true} handleClosed={this.closeModalHandler} >
                    <div className="text-center mini-shared-modal px-3">
                        <h4 className='mb-4'>  {t('faqPage.addQuestion')} </h4>
                        <InputTextComponent
                            valueHandler={e => {
                                this.setState({val: e.target.value})
                            }}
                            value={this.state.question}
                            isArabic={t('local') === 'ar'} style={{textAlign:t('local') === 'ar' ? 'right' : 'left'}}
                            isRequired={true} labelTitle={t('faqPage.question')}  />
                        <InputTextComponent
                            valueHandler={e => {
                                this.setState({val: e.target.value})
                            }}
                            value={this.state.answer}
                            isArabic={t('local') === 'ar'} style={{textAlign:t('local') === 'ar' ? 'right' : 'left'}}
                            isRequired={true} labelTitle={t('faqPage.answer')}  />

                        <button className='btn btn-secondary w-50'>{t('shared.add')} </button>
                    </div>
                </ModalComponent>

            </>
        );
    }
}

export default  withTranslation("translation")( FaqComponent);