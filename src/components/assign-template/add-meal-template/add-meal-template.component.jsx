import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './add-meal-template.component.css';
import {Header, Modal} from "semantic-ui-react";
import SearchableListWithImgTemplateComponent from '../searchable-list-template/searchable-list-withImg-template.component.jsx'
import ModalComponent from "../../common/modal/modal.component";
import MealService from "../../../../src/services/trainee-service/meal.service";

class AddMealTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            __addModal__ : false,
            isLoading: false,
            FoodList : []
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
            </React.Fragment>
        );
    }
}

export default withTranslation('translation')( AddMealTemplateComponent);