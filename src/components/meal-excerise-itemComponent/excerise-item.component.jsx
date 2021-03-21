import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './meal-excerise-item.component.css'
import {FiPlus} from "react-icons/fi";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {BiCopy, BiEditAlt} from "react-icons/bi";
import SearchableListTemplateComponent
    from "../assign-template/searchable-list-template/searchable-list-template.component";
import ModalComponent from "../common/modal/modal.component";
import ResourcesService from "../../services/trainee-service/resources.service";
import MusclesService from "../../services/trainee-service/muscles.service";
import {Input, Label, Loader} from "semantic-ui-react";
import QierPlayer from "qier-player";
import UserService from "../../services/user-service/user.service";
import TemplateService from "../../services/template-service/template.service";
import InputTextComponent from "../InputTextComponent/input-text-no-label.component";
import {toast} from "react-toastify";
import ToasterComponent from "../common/toaster/toaster.component";

class ExceriseItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDetails2: true,
            __addModal__: false,
            muscles: [],
            openExceriseListDetails: false,
            imgDefaultPath: '',
            EditExceriseItem: false,
            weight:this.props.ExceriseDataItem.weight,
            comment:this.props.ExceriseDataItem.comment,
            count:this.props.ExceriseDataItem.count,
            rest_period:this.props.ExceriseDataItem.rest_period,
            ExceriseDataItem : this.props.ExceriseDataItem,
            loader: false
        }
    }
    componentWillMount() {
        const userService = new UserService();
        this.setState({imgDefaultPath : userService.imageDefaultPath })
    }
    async editExcerise(){
        const templateService = new TemplateService();
        const {t, ExceriseDataItem, planMode}= this.props;
        const {weight,comment,count,rest_period}=this.state;
        if(planMode){

        }
        const data = {
            'template_day_exercise_id': ExceriseDataItem.template_day_exercises_id,
            "weight":weight,
            "comment":comment,
            "count":count,
            "rest_period":rest_period
        }
        templateService.editExerciseTemplate(data).then(response => {
            if (response.status) {
                toast.done(t('shared.success.addedSuccess'));
                this.updateExcerise(ExceriseDataItem.template_day_exercises_id);

                this.setState({EditExceriseItem :false})
            }
        })

    }
    async updateExcerise(template_day_exercises_id){
        const {t, templateId, activeDay,ExceriseDataItem}= this.props;
         let data = await this.props.getTemplateForDay2(templateId, activeDay);
        setTimeout(() => {
            data.day.exercises.map(item => {
                if (item.template_day_exercises_id === template_day_exercises_id) {
                    this.setState({
                        ...this.state,
                        ExceriseDataItem: item
                    })
                }
            })
        }, 500)
    }
    onChangeHandler = (e) => {
        if(!e)
            return ;
        const value = e.target.value;
        this.setState({[e.target.name] : value});
    }
    render() {
        const {t, openExceriseDetails} = this.props;
        const {ExceriseDataItem} =this.state;
        return (
            this.state.loader ? <Loader active={true} inline='centered'/> :

            <>

                <div className={["container" , (openExceriseDetails) ? '' : ' d-none']}>
                    <button className='ui button icon primary p-1 mb-3' onClick={(e)=> this.props.parentCallExcersise(false)}>
                        {t('local') === 'ar'?  <i><IoIosArrowForward/> </i>: <i><IoIosArrowBack/></i> }
                    </button>
                    <ToasterComponent />
                    <div className="row">
                        <div className="col-sm-12 mb-3">
                            <div className="video">
                                <QierPlayer
                                    srcOrigin={this.state.imgDefaultPath+ExceriseDataItem.exercise.video}
                                    language="en"
                                    width='100%'
                                    height={300}
                                    showVideoQuality={true}
                                    src480p={this.state.imgDefaultPath+ExceriseDataItem.exercise.video}
                                    src1080p={''}
                                    src720p={null}
                                    src2k={''}
                                    src4k={''}
                                    themeColor="#00a4f8"
                                />
                            </div>
                        </div>
                        <div className="col-sm-3 text-center">
                            <div>
                                <label className='primary d-block'>
                                    {t('progressPage.weight')}
                                </label>
                                {this.state.EditExceriseItem ?

                                    <InputTextComponent type="text" valueHandler={this.onChangeHandler} className='w-100'
                                           name='weight' labelTitle={ExceriseDataItem.weight} required/>
                                    :
                                    <Label className='p-3' size='medium'>{ExceriseDataItem.weight}</Label>
                                }
                            </div>
                            <div>
                                <label className='primary d-block'> {t('traineeModal.Reps')}  </label>
                                {this.state.EditExceriseItem ?
                                    <InputTextComponent type="text" valueHandler={this.onChangeHandler} className='w-100'
                                           name='count' labelTitle={ExceriseDataItem.count} required/>
                                    :
                                    <Label className='p-3' size='medium'>{ExceriseDataItem.count}</Label>
                                }
                            </div>
                        </div>
                        <div className="col-sm-6 text-center">
                            <h4 className='mb-5'>{t('local') === 'ar'? ExceriseDataItem.exercise.title_ar : ExceriseDataItem.exercise.title}</h4>
                            <h4>{t('templatePage.comments')}</h4>
                        </div>
                        <div className="col-sm-3 text-center">
                            <div>
                                <label className='primary d-block'>
                                    {t('traineeModal.rest')}
                                </label>
                                {this.state.EditExceriseItem ?
                                    <InputTextComponent type="text" valueHandler={this.onChangeHandler} className='w-100'
                                           name='rest_period' labelTitle={ExceriseDataItem.rest_period} required/>
                                    :
                                    <Label className='p-3' size='medium'>{ExceriseDataItem.rest_period}</Label>
                                }
                            </div>
                            <div>
                                <label className='primary d-block'> {t('traineeModal.sets')} </label>
                                {this.state.EditExceriseItem ?
                                    <InputTextComponent type="text" valueHandler={this.onChangeHandler} className='w-100'
                                           name='sets' labelTitle={ExceriseDataItem.sets} required/>
                                    :
                                    <Label className='p-3' size='medium'>{ExceriseDataItem.sets}</Label>
                                }
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <textarea name='comment' onChange={this.onChangeHandler}  value= {!this.state.EditExceriseItem ?ExceriseDataItem.comment : null} rows='4' placeholder={ this.state.EditExceriseItem ? ExceriseDataItem.comment:''} className='bg-light w-100 my-4 form-control'/>
                        </div>
                        <div className="col-sm-12 text-left">
                            <button className="ui button icon py-1" onClick={(e)=> this.setState({EditExceriseItem: true})}>
                                <BiEditAlt />
                                <div className='f-1-half'>{t('shared.edit')}</div>
                            </button>
                            {
                                this.state.EditExceriseItem ?
                                    <button className="ui button icon py-1 primary" onClick={(e)=> this.editExcerise()}>
                                        <FiPlus />
                                        <div className='f-1-half'>
                                            {t('templatePage.editExcer')}
                                        </div>
                                    </button>
                                    : ''
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withTranslation('translation')( ExceriseItemComponent);