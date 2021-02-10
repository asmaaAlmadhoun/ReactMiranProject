import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './add-meal-template.component.css';
import {Header, Modal} from "semantic-ui-react";
import SearchableListWithImgTemplateComponent from '../searchable-list-template/searchable-list-withImg-template.component.jsx'
import ModalComponent from "../../common/modal/modal.component";
import MealService from "../../../../src/services/trainee-service/meal.service";
import PrimaryButtonComponent from "../../ButtonComponent/primary-button.component";
import InputTextComponent from "../../InputTextComponent/input-text-no-label.component";
import {FiPlus   } from "react-icons/fi";
import { BiCopy  } from "react-icons/bi";
import { BsClockHistory  } from "react-icons/bs";

class AddMealTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            __addModal__ : false,
            isLoading: false,
            FoodList : [],
            size: 'mini',
            mealComment: '',
            mealTitle: ''
        }
    }
    async componentWillMount() {
        const mealService  = new MealService();
        this.setState({isLoading : true})
        mealService.food.then(data => {
            this.setState({isLoading : false})
            if(data && data.status) {
                this.setState({FoodList : data.result})
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
                <div className={"AddMealTemplateComponent col-sm-4 p-0 mt-4"}>
                    <div className="meal-buttons justify-content-center">
                        <button onClick={e => {
                            e.preventDefault();
                            this.showModalHandler();
                        }} className="btn primary-color">
                            <FiPlus />
                            <div><small>{t('traineeModal.addMeal')}</small></div>
                        </button>
                        <button className="btn danger-color">
                            <BsClockHistory />
                            <div><small>{t('traineeModal.breakDay')}</small></div>
                        </button>
                        <button className="btn primary-color">
                            <BiCopy />
                            <div><small>{t('traineeModal.copyMeal')}</small></div>
                        </button>
                    </div>
                </div>

                {/*<ModalComponent  size='tiny' isOpen={this.state.__addModal__}  hideAction={true} handleClosed={this.closeModalHandler} >*/}
                {/*    <SearchableListWithImgTemplateComponent list={this.state.FoodList}/>*/}
                {/*</ModalComponent>*/}

                <ModalComponent size='mini' isOpen={this.state.__addModal__} hideAction={true} handleClosed={this.closeModalHandler} >
                    <div className="text-center mini-shared-modal px-3">
                        <h4 className='mb-4'>  {t('traineeModal.addMeal')} </h4>
                        <InputTextComponent
                            valueHandler={e => {
                                this.setState({val: e.target.value})
                            }}
                            value={this.state.mealTitle}
                            isArabic={t('local') === 'ar'} style={{textAlign:t('local') === 'ar' ? 'right' : 'left'}}
                            isRequired={true} labelTitle={t('traineeModal.mealTitle')}  />
                        <InputTextComponent
                            valueHandler={e => {
                                this.setState({val: e.target.value})
                            }}
                            value={this.state.mealComment}
                            isArabic={t('local') === 'ar'} style={{textAlign:t('local') === 'ar' ? 'right' : 'left'}}
                            isRequired={true} labelTitle={t('templatePage.comments')}  />

                        <button className='btn btn-secondary w-50'>{t('shared.add')} </button>
                    </div>
                </ModalComponent>
            </>
        );
    }
}

export default withTranslation('translation')( AddMealTemplateComponent);