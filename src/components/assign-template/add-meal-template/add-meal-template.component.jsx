import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './add-meal-template.component.css';
import {Header, Modal} from "semantic-ui-react";
import SearchableListWithImgTemplateComponent from '../searchable-list-template/searchable-list-withImg-template.component.jsx'
import ModalComponent from "../../common/modal/modal.component";
import MealService from "../../../../src/services/trainee-service/meal.service";
import PrimaryButtonComponent from "../../ButtonComponent/primary-button.component";
import InputTextComponent from "../../InputTextComponent/input-text.component";

class AddMealTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            __addModal__ : false,
            isLoading: false,
            FoodList : [],
            size: 'mini'
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
            <React.Fragment>
                <div className={"AddMealTemplateComponent mt-4"}>
                    <div className="d-flex meal-buttons justify-content-center">
                        <button onClick={e => {
                            e.preventDefault();
                            this.showModalHandler();
                        }} className="btn primary-color">
                            {t('traineeModal.addMeal')}
                        </button>
                        <button className="btn danger-color">
                            {t('traineeModal.breakDay')}
                        </button>
                        <button className="btn primary-color">
                            {t('traineeModal.copyMeal')}
                        </button>

                    </div>
                </div>

                <ModalComponent isOpen={this.state.__addModal__} hideAction={true} handleClosed={this.closeModalHandler} >
                    <SearchableListWithImgTemplateComponent list={this.state.FoodList}/>
                </ModalComponent>

                <ModalComponent size={this.state.size} isOpen={this.state.open} hideAction={true} handleClosed={e => {
                    this.setState({open:false})
                }}>
                    <div className="">
                        <h2>  {t('traineeModal.addMeal')} </h2>
                        <InputTextComponent
                            valueHandler={e => {
                                this.setState({val: e.target.value})
                            }}
                            value={this.state.val}
                            isArabic={t('local') === 'ar'} style={{textAlign:t('local') === 'ar' ? 'right' : 'left'}}
                            isRequired={true} labelTitle={t('traineeModal.mealTitle')}  />
                        <InputTextComponent
                            valueHandler={e => {
                                this.setState({val: e.target.value})
                            }}
                            value={this.state.val}
                            isArabic={t('local') === 'ar'} style={{textAlign:t('local') === 'ar' ? 'right' : 'left'}}
                            isRequired={true} labelTitle={t('templatePage.comments')}  />

                        <PrimaryButtonComponent disable={this.state.disableBtn}
                                                switchLoading={this.state.loading}
                                                clickHandler={this.sendInvitation}
                                                title={t('shared.add')} />
                    </div>
                </ModalComponent>
            </React.Fragment>
        );
    }
}

export default withTranslation('translation')( AddMealTemplateComponent);