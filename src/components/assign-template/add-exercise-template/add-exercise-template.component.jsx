import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import  './add-exercise-template.component.css';
import {Header, Modal} from "semantic-ui-react";
import SearchableListTemplateComponent from '../searchable-list-template/searchable-list-template.component.jsx'
import ModalComponent from "../../common/modal/modal.component";
import MusclesService from "../../../../src/services/trainee-service/muscles.service";
import ExerciseService from "../../../../src/services/trainee-service/exercise.service";
import {FiPlus} from "react-icons/fi";
import {BsClockHistory} from "react-icons/bs";
import {BiCopy} from "react-icons/bi";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import UserService from "../../../services/user-service/user.service";

class AddExerciseTemplateComponent extends  React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgDefaultPath: '',
            openExceriseListDetails: false
        }
    }
    componentWillMount() {
        const userService = new UserService();
        this.setState({imgDefaultPath : userService.imageDefaultPath })
    }
    render() {
        const {t, exerciseMealForThisDay} = this.props;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <img width='100%' src={this.state.imgDefaultPath+exerciseMealForThisDay.image} alt="image"/>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h4 className='mb-2'>{t('local')==='ar' ? exerciseMealForThisDay.title_ar : exerciseMealForThisDay.title}</h4>
                    </div>
                    <div className="col-sm-4 text-center">
                        <div>
                            <label className='primary d-block'>
                                {t('progressPage.weight')}
                            </label>
                            <div className='ui input'>
                                <input className='w-100'/>
                            </div>
                        </div>
                        <div>
                            <label className='primary d-block'> {t('traineeModal.Reps')}  </label>
                            <div className='ui input'>
                                <input className='w-100'/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4 text-center">
                        <div>
                            <label className='primary d-block'>
                                {t('traineeModal.rest')}
                            </label>
                            <div className='ui input'>
                                <input className='w-100'/>
                            </div>
                        </div>
                        <div>
                            <label className='primary d-block'> {t('traineeModal.sets')} </label>
                            <div className='ui input'>
                                <input className='w-100'/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h4>{t('templatePage.comments')}</h4>
                    </div>
                    <div className="col-sm-12">
                        <textarea rows='4' className='bg-light w-100 my-4 form-control'/>
                    </div>
                </div>
                <div className="meal-buttons text-center">
                    <button className="ui btn w-50 m-auto btn-secondary">
                        {t('shared.add')}
                    </button>
                </div>

            </React.Fragment>
        );
    }
}

export default withTranslation('translation')( AddExerciseTemplateComponent);