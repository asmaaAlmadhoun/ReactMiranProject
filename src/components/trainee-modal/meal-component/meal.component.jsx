import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FiX,FiMaximize,FiMove } from "react-icons/fi";
import {withTranslation} from "react-i18next";
import  './meal.component.css';
import AddMealTemplateComponent from "../../assign-template/add-meal-template/add-meal-template.component";
import {Tab} from "semantic-ui-react";
import ExerciseMealTemplateComponent
    from "../../assign-template/exercise-meal-template/exercise-meal-template.component";
import EmptyComponent from "../../common/empty-page/empty.component";
class MealComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullTemplateDataForThisDay : ''
        }
    }

    render() {
        const {mealTitle , meadId , images , calories, fat , carbs , protein ,t, templateId, activeDay, exerciseMealData} = this.props;
        return (
            <div className="meal">
                {
                    exerciseMealData !== null ? exerciseMealData.day.meals.map(item =>
                        <>
                        <div className="row">
                            <div className="col-sm-6">
                                <h5 className={t('local') === 'ar' ? 'text-right' : 'text-left'}> {item.meal.title} </h5>
                                <div className="images">
                                    {
                                        (item.meal.foods) ? item.meal.foods.map(item =>
                                            <span>
                                            <img className='w-100' src={'https://testing.miranapp.com/media/'+item.image} alt="image" />
                                            </span>

                                        ) : ''
                                    }
                                </div>
                            </div>
                            <div className="col-sm-6 text-left">
                                <div className="icons d-flex flex-row-reverse">
                                <span className="icon delete">
                                    <FiX />
                                </span>
                                    <span className="icon max">
                                    <FiMaximize />
                                </span>
                                    <span className="icon move">
                                    <FiMove />
                            </span>
                                </div>
                                <button className="btn btn-secondary w-50 mt-3 p-1">
                                    {t('traineeModal.mealDetails')}
                                </button>
                            </div>
                            <div className="col-sm-6">
                                <div>
                                    <span className="key"> {t('traineeModal.calories')} : </span>
                                    <span className="val"> {item.nutrition_info.calories}  </span>
                                </div>
                                <div>
                                    <span className="key"> {t('traineeModal.fat')} : </span>
                                    <span className="val"> {item.nutrition_info.fat}  </span>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div>
                                    <span className="key"> {t('traineeModal.carbs')} : </span>
                                    <span className="val"> {item.nutrition_info.carbs}  </span>
                                </div>
                                <div>
                                    <span className="key"> {t('traineeModal.protein')} : </span>
                                    <span className="val"> {item.nutrition_info.protein}  </span>
                                </div>
                            </div>




                        </div>
                        <hr/>
                        </>
                    ):  <EmptyComponent/>
                }

                <div className={t('local')==='ar' ? 'row text-right' : 'row'}>

                            <div className="col-sm-8 mt-4">
                                <div className="d-flex align-items-center">
                                        <span className="strip-title">
                                            {t('traineeModal.totalDayIntakes')}
                                        </span>
                                    <div className="stripe grey">
                                        <div className="">
                                            <span className="key"> {t('traineeModal.calories')}: </span>
                                            <span className="val"> 128  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.carbs')}: </span>
                                            <span className="val"> 16  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.fat')}: </span>
                                            <span className="val"> 6  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.protein')} : </span>
                                            <span className="val"> 3  </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                            <span className="strip-title">
                                {t('traineeModal.totalTargetIntakes')}
                            </span>
                                    <div className="stripe primary-color">
                                        <div className="">
                                            <span className="key"> {t('traineeModal.calories')}: </span>
                                            <span className="val"> 128  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.carbs')}: </span>
                                            <span className="val"> 16  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.fat')}: </span>
                                            <span className="val"> 6  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.protein')} : </span>
                                            <span className="val"> 3  </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AddMealTemplateComponent getTemplateForDay={this.getTemplateForDay}  exerciseMealData={this.props.exerciseMealData} activeDay={activeDay} templateId={templateId}/>
                    </div>

            </div>
        );
    }
}
MealComponent.propTypes = {
    meadId: PropTypes.number.isRequired ,
    mealTitle:PropTypes.string.isRequired,
    images : PropTypes.array,
    calories:PropTypes.number,
    fat:PropTypes.number,
    carbs:PropTypes.number,
    protein:PropTypes.number,
    templateId:PropTypes.number,
    activeDay:PropTypes.number
}
export default withTranslation('translation') (MealComponent);