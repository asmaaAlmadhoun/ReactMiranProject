import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './meal-item.component.css'
import {FiPlus} from "react-icons/fi";
import {BsClockHistory} from "react-icons/bs";
import {BiCopy, BiEditAlt} from "react-icons/bi";

class MealItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const {t} = this.props;
        let {mealTitle ,comment , carbs , calories ,fat, protein, imgPath} = this.props;
        if(!imgPath)
            imgPath = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' ;
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 mb-3 img-thumbnail">
                            <img src={imgPath}  alt="Meal Image"/>
                        </div>
                        <div className="col-sm-4">
                            <div>
                                <label className='primary'> {t('traineeModal.calories')} : </label>
                                <span>{calories}</span>
                            </div>
                            <div>
                                <label className='primary'> {t('traineeModal.fat')} : </label>
                                <span>{fat}</span>
                            </div>
                        </div>
                        <div className="col-sm-4 text-center">
                            <h3>{mealTitle}</h3>
                            <h3>{t('templatePage.comments')}</h3>
                        </div>
                        <div className="col-sm-4">
                            <div>
                                <label className='primary'> {t('traineeModal.carbs')} : </label>
                                <span>{carbs}</span>
                            </div>
                           <div>
                               <label className='primary'> {t('traineeModal.protein')} : </label>
                               <span>{protein}</span>
                           </div>
                        </div>
                        <div className="col-sm-12">
                            <textarea value={comment} rows='4' className='bg-light w-100 my-4 form-control'/>
                        </div>
                    </div>
                    <div className="meal-buttons justify-content-center">
                        <button onClick={e => {
                            e.preventDefault();
                            this.showModalHandler();
                        }} className="ui button icon primary p-1">
                            <FiPlus />
                            <div className='f-1-half'>{t('templatePage.addFood')}</div>
                        </button>
                        <button className="ui button icon py-1">
                            <BiCopy />
                            <div className='f-1-half'>{t('traineeModal.copyMeal')}</div>
                        </button>
                        <button className="ui button icon py-1">
                            <BiEditAlt />
                            <div className='f-1-half'>{t('shared.edit')}</div>
                        </button>
                    </div>
                </div>

            </>
        );
    }
}

export default withTranslation('translation')( MealItemComponent);