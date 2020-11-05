import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FiX } from "react-icons/fi";
import  {FiMaximize} from "react-icons/fi";
import  {FiMove} from "react-icons/fi";
import {withTranslation} from "react-i18next";
import  './meal.component.css';
class MealComponent extends Component {

    render() {
        const {mealTitle , meadId , images , calories, fat , carbs , protein ,t} = this.props;
        return (
            <div className="row meal">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-8  ">
                            <h5 className={t('local') === 'ar' ? 'text-right' : 'text-left'}> {mealTitle} </h5>
                        </div>
                        <div className="col-sm-4">
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
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 mt-4">
                    <div className="images">
                        {
                            images && images.length > 0 && images.map((image , i) => {
                                return (
                                    <span key={i}>
                                        <img src={image} alt="image" />
                                    </span>
                                );
                            })
                        }
                    </div>
                </div>

                <div className="col-sm-12 mt-4">
                    <button className="btn btn-full-width">
                        {t('traineeModal.mealDetails')}
                    </button>
                </div>
                <div className="col-sm-12 mt-4">
                    <div className="row">
                        <div className={t('local')==='ar' ? 'col-sm-6 text-right' : 'col-sm-6'}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div>
                                        <span className="key"> {t('traineeModal.calories')} : </span>
                                        <span className="val"> {calories}  </span>
                                    </div>
                                    <div>
                                        <span className="key"> {t('traineeModal.fat')} : </span>
                                        <span className="val"> {fat}  </span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div>
                                        <span className="key"> {t('traineeModal.carbs')} : </span>
                                        <span className="val"> {carbs}  </span>
                                    </div>
                                    <div>
                                        <span className="key"> {t('traineeModal.protein')} : </span>
                                        <span className="val"> {protein}  </span>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>

                <div className="col-sm-12 mt-4">
                   <div className="row">
                       <div className="col-sm-8">
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
                           <div className="d-flex align-items-center mt-4">
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
                       <div className="col-sm-4">
                           <div className="d-flex meal-buttons">
                               <button className="btn primary-color">
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
                   </div>
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
    protein:PropTypes.number
}
export default withTranslation('translation') (MealComponent);