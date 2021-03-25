﻿import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './add-meal-template.component.css';
import ModalComponent from "../../common/modal/modal.component";
import ResourcesService from "../../../services/trainee-service/resources.service";
import PrimaryButtonComponent from "../../ButtonComponent/primary-button.component";
import InputTextComponent from "../../InputTextComponent/input-text-no-label.component";
import {FiPlus} from "react-icons/fi";
import {BiCopy} from "react-icons/bi";
import {BsClockHistory} from "react-icons/bs";
import MealServices from "../../../services/meal-services/meal.services";
import TemplateServices from "../../../services/template-service/template.service";
import {toast} from "react-toastify";
import ToasterComponent from "../../common/toaster/toaster.component";
import PropTypes from "prop-types";
import {Loader} from "semantic-ui-react";
import PlanService from "../../../services/plan-service/plan.service";

class AddMealTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            __addModal__ : false,
            isLoading: false,
            size: 'mini',
            mealComment: '',
            mealTitle: '',
            fullDataDay: [],
            dataMeal: '',
        }
    }
    onChangeHandler = (e) => {
        if(!e)
            return ;
        const value = e.target.value;
        this.setState({[e.target.name] : value});
    }
    submitNewMeal = async () => {
        const {t, exerciseMealData, planMode, traineesId, activeDay} = this.props;
        const {mealTitle, mealComment} = this.state;
        if(planMode){
            const dataMeal = {
                'user_id': traineesId,
                'title': mealTitle,
                'comment': mealComment,
                'day' : activeDay
            }
            const planService = new PlanService();
            planService.AddMealTrainee(dataMeal).then(response => {
                this.setState({isLoading: true})
                if (response.status) {
                    this.closeModalHandler();
                    this.props.parentTriggerAdd();
                    toast.done(t('shared.success.addedSuccess'));
                    this.setState({isLoading: false})
                } else {
                    toast.error(t('shared.errors.globalError'))
                    this.setState({isLoading: false})
                    this.closeModalHandler();
                }
            })
        }
        else {
            let id= exerciseMealData.day.id;
            const dataMeal = {
                'template_day': id,
                'title': mealTitle,
                'comment': mealComment
            }
            const mealServices = new MealServices();
            mealServices.addMealToTemplateDay(dataMeal).then(response => {
                this.setState({isLoading: true})
                if (response.status) {
                    this.closeModalHandler();
                    this.props.parentTriggerAdd();
                    toast.done(t('shared.success.addedSuccess'));
                    this.setState({isLoading: false})

                } else {
                    toast.error(t('shared.errors.globalError'))
                }
            })
        }

    }
    addTemplateBreakDay = () => {
        const {t, exerciseMealData, planMode, activeDay} = this.props;
        let id= planMode?exerciseMealData.subscribtion:exerciseMealData.day.id;
        if(planMode){
            const planService = new PlanService();
            const dataBreak = {
                'subscribtion': id,
                "day": activeDay,
                'type': 'meal',
            }
            planService.addMealExcerisebreakDay(dataBreak).then(response => {
                if (response.status) {
                    toast.done(t('shared.success.addedSuccess'));
                    this.props.getTemplateForDay2();
                } else {
                    toast.done(t('shared.success.addedSuccess'));
                }
            })
        }
        else{
            const templateServices = new TemplateServices();
            const dataBreak = {
                'template_day_id': id,
                'type': 'meal',
            }
            templateServices.addTemplateBreakDay(dataBreak).then(response => {
                this.setState({isLoading: true})
                if (response.status) {
                    toast.done(t('shared.success.addedSuccess'));
                    this.props.parentTriggerAdd();
                    this.setState({isLoading: false})
                } else {
                    toast.done(t('shared.success.addedSuccess'));
                }
            })

        }
    }
    showModalHandler =() => {
        this.setState({__addModal__ : true});
    }
    closeModalHandler = () =>  {
        this.setState({__addModal__ : false});
    }
    render() {
        const {t, templateId} = this.props;
        return (
            this.state.loading ?
                <div className="row">
                    <div className="col-sm-12">
                        <Loader active={this.state.isLoading} inline='centered' />
                    </div>
                </div> :
            <>

                        <button onClick={e => {
                            e.preventDefault();
                            this.showModalHandler();
                        }} className="btn primary-color p-1">
                            <FiPlus />
                            <div><small>{t('traineeModal.addMeal')}</small></div>
                        </button>
                        <button className="btn danger-color p-1" onClick={e => {
                            e.preventDefault();
                            this.addTemplateBreakDay();
                        }}>
                            <BsClockHistory />
                            <div><small>{t('traineeModal.breakDay')}</small></div>
                        </button>


                <ModalComponent size='mini' modalCenter={true} isOpen={this.state.__addModal__} hideAction={true} handleClosed={this.closeModalHandler} >
                    <div className="text-center mini-shared-modal px-3 miran-primary-input">
                        <h4 className='mb-4'>  {t('traineeModal.addMeal')} </h4>
                        <InputTextComponent
                            valueHandler={this.onChangeHandler} name='mealTitle'
                            isArabic={t('local') === 'ar'} style={{textAlign:t('local') === 'ar' ? 'right' : 'left'}}
                            isRequired={true} labelTitle={t('traineeModal.mealTitle')}  />
                        <textarea className='form-control mb-3' rows='3'
                            onChange={this.onChangeHandler} name='mealComment' placeholder={t('templatePage.comments')}
                             style={{textAlign:t('local') === 'ar' ? 'right' : 'left'}}
                            required />
                        <PrimaryButtonComponent switchLoading={this.state.isLoading}
                                                isSecondaryBtn='true' className='btn w-50'
                                                clickHandler={this.submitNewMeal}
                                                title={t('shared.add')}> </PrimaryButtonComponent>

                    </div>
                </ModalComponent>

            </>
        );
    }
}
AddMealTemplateComponent.propTypes = {
    parentTriggerAdd: PropTypes.func
}
export default withTranslation('translation')( AddMealTemplateComponent);