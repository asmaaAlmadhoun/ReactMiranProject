import React, {Component} from 'react';
import QierPlayer from 'qier-player';
import {withTranslation} from "react-i18next";
import './exercise.component.css';
import {FiX, FiMaximize, FiMove, FiPlus} from "react-icons/fi";
import BreakDayComponent from "../../common/empty-page/breakDay.component";
import TemplateServices from "../../../services/template-service/template.service";
import {toast} from "react-toastify";
import ToasterComponent from "../../common/toaster/toaster.component";
import {BsClockHistory} from "react-icons/bs";
import {BiCopy} from "react-icons/bi";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import SearchableListTemplateComponent
    from "../../assign-template/searchable-list-template/searchable-list-template.component";
import MusclesService from "../../../services/trainee-service/muscles.service";
import {  Loader } from "semantic-ui-react";
import ExerciseService from "../../../services/trainee-service/exercise.service";
import SearchableListWithImgTemplateComponent
    from "../../assign-template/searchable-list-template/searchable-list-withImg-template.component";
import ModalComponent from "../../common/modal/modal.component";
class ExerciseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            muscles: [],
            openExceriseListDetails: false,
            openMuscleExerciseList: false,
            loader: true,
            loader2: true,
            muscleExercise: [],
            ExceriseMuscleItem: ''
        }
    }
    openDetailsFunc(item){
        this.props.openDetailsExceriseFunction(item);
    }
    deleteExerciseTemplate(id){
        // deleteMealTemplate
        const {t} = this.props;
        const templateServices = new TemplateServices();
        const data = {
            'template_day_exercises_id': id,
        }
        templateServices.deleteExerciseTemplate(id).then(response => {
            if (response) {
                toast.done(t('shared.success.addedSuccess'));
            } else {
                toast.done(t('shared.success.addedSuccess'));
            }
        })
    }
    async componentWillMount() {
        const musclesService  = new MusclesService();
        this.setState({isLoading : true})
        musclesService.muscles.then(data => {
            this.setState({isLoading : false})
            if(data && data.status) {
                this.setState({muscles : data.result, loader : false})
            }
        }).catch(error => {
            this.setState({isLoading : false})
        })
    }
    exercise_muscleFunc = async (muscle_title) => {
        const exerciseService  = new ExerciseService();
        this.setState({isLoading : true, openExceriseListDetails: false, openMuscleExerciseList: true})
        exerciseService.exercise_muscle(muscle_title).then(data => {
            this.setState({isLoading : false})
            if(data) {
                this.setState({muscleExercise : data.result, loader2 : false,
                     })
            }
        }).catch(error => {
            this.setState({isLoading : false})
        })
    }
    openModalToAdd= (e)=>{
        this.setState({openModal : true, ExceriseMuscleItem: e})
    }
    render() {
        const {t, exerciseMealData}  = this.props;
        const {openExceriseListDetails, ExceriseMuscleItem, muscles, muscleExercise, openMuscleExerciseList}  = this.state;
        return (
            <>
            <ToasterComponent />
            <div className={["container" , (!openExceriseListDetails && !openMuscleExerciseList) ? '' : ' d-none']}>
                <div>
                    {exerciseMealData.day.break_day_exercise ?
                        <BreakDayComponent/> :
                        exerciseMealData.day.exercises !== null ?
                            exerciseMealData.day.exercises.map(item =>
                                <>
                                    <div className="row" key={item.exercise.exercise_id} onClick={(e) =>
                                    {
                                        e.preventDefault();
                                        this.openDetailsFunc(item);
                                    }}>
                                        <div className="col-sm-4">
                                            <div className="video">
                                                <QierPlayer
                                                    srcOrigin={'https://testing.miranapp.com/media/'+item.exercise.video}
                                                    language="en"
                                                    width={200}
                                                    height={100}
                                                    showVideoQuality={true}
                                                    src480p={'https://testing.miranapp.com/media/'+item.exercise.video}
                                                    src1080p={''}
                                                    src720p={null}
                                                    src2k={''}
                                                    src4k={''}
                                                    themeColor="#00a4f8"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <ul className={t('local') === 'ar' ? ' data text-right' : 'data'} >
                                                <li>
                                                    <h5> {t('local') === 'ar' ? item.exercise.title_ar : item.exercise.title}</h5>
                                                </li>
                                                <li>
                                                    <span className="key">
                                                       {t('progressPage.weight')} ({t('traineeModal.kGram')}) :
                                                    </span>
                                                    <span className="val">
                                                       {item.weight}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="key">
                                                        {t('traineeModal.Reps')}  :
                                                    </span>
                                                    <span className="val">
                                                       {item.count}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="key">
                                                       {t('traineeModal.rest')} :
                                                    </span>
                                                    <span className="val">
                                                         {item.rest_period}
                                                     </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="col-sm-4">
                                            <div className="icons d-flex flex-row-reverse">
                                                <span className="icon delete" onClick={(e)=> this.deleteExerciseTemplate(item.exercise.exercise_id)}>
                                                     <FiX/>
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
                                    <hr/>
                                </>
                            )
                            : <h3> {t('shared.empty')}</h3>
                    }
                </div>
                <div className={"AddMealTemplateComponent row p-0 mt-4"}>
                    <div className="col-sm-7">
                        <span className='text-primary f-2'>
                            {t('traineeModal.Calories')} :
                        </span>
                        <span>
                        </span>
                    </div>
                    <div className="meal-buttons col-sm-5 text-left">
                        <button onClick={(e)=> this.setState({openExceriseListDetails:true})} className="btn primary-color">
                            <FiPlus />
                            <div><small>{t('traineeModal.addExercise')}</small></div>
                        </button>
                        <button className="btn danger-color">
                            <BsClockHistory />
                            <div><small>{t('traineeModal.breakDay')}</small></div>
                        </button>
                        <button className="btn primary-color">
                            <BiCopy />
                            <div><small>{t('traineeModal.copyExercise')}</small></div>
                        </button>
                    </div>
                </div>
            </div>
            <div className={["container" , openExceriseListDetails ? '' : ' d-none']}>
                <button className='ui button icon primary p-1 mb-3' onClick={(e)=> this.setState({openExceriseListDetails:false})}>
                    {t('local') === 'ar'?  <i><IoIosArrowForward/> </i>: <i><IoIosArrowBack/></i> }
                </button>
                {
                    this.state.loader ? <Loader active={true} inline='centered'/> :
                        <SearchableListTemplateComponent exercise_muscleFunc={(e)=> this.exercise_muscleFunc(e)} list={muscles}/>
                }
            </div>
            <div className={["container" , openMuscleExerciseList ? '' : ' d-none']}>
                <button className='ui button icon primary p-1 mb-3' onClick={(e)=> this.setState({openMuscleExerciseList:false, openExceriseListDetails:true})}>
                    {t('local') === 'ar'?  <i><IoIosArrowForward/> </i>: <i><IoIosArrowBack/></i> }
                </button>
                {  muscleExercise !== null?
                    this.state.loader2 ? <Loader active={true} inline='centered'/> :
                        <SearchableListWithImgTemplateComponent list={muscleExercise} openModalToAdd={(e)=> this.openModalToAdd(e)} />
                   :''
                }
            </div>

            {/*<ModalComponent  size="tiny" isOpen={this.state.openModal} hideAction={true} handleClosed={(e)=>this.setState({openModal: false})}>*/}
            {/*    <div className="row">*/}
            {/*        <div className="col-sm-12 mb-3 img-thumbnail">*/}
            {/*            <div className="images">*/}

            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-sm-12 text-center">*/}
            {/*            <h4 className='mb-2'>{ExceriseMuscleItem}</h4>*/}
            {/*        </div>*/}
            {/*        <div className="col-sm-4 text-center">*/}
            {/*            <div>*/}
            {/*                <label className='primary d-block'>*/}
            {/*                    {t('progressPage.weight')}*/}
            {/*                </label>*/}
            {/*                <div className='ui input'>*/}
            {/*                    <input className='w-100'/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <label className='primary d-block'> {t('traineeModal.Reps')}  </label>*/}
            {/*                <div className='ui input'>*/}
            {/*                    <input className='w-100'/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-sm-4"></div>*/}
            {/*        <div className="col-sm-4 text-center">*/}
            {/*            <div>*/}
            {/*                <label className='primary d-block'>*/}
            {/*                    {t('traineeModal.rest')}*/}
            {/*                </label>*/}
            {/*                <div className='ui input'>*/}
            {/*                    <input className='w-100'/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <label className='primary d-block'> {t('traineeModal.sets')} </label>*/}
            {/*                <div className='ui input'>*/}
            {/*                    <input className='w-100'/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-sm-12 text-center">*/}
            {/*            <h4>{t('templatePage.comments')}</h4>*/}
            {/*        </div>*/}
            {/*        <div className="col-sm-12">*/}
            {/*            <textarea value='' rows='4' className='bg-light w-100 my-4 form-control'/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="meal-buttons text-center">*/}
            {/*        <button onClick={(e)=> this.setState({openExceriseListDetails:true})} className="ui btn w-50 m-auto btn-secondary">*/}
            {/*            {t('shared.add')}*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</ModalComponent>*/}
            </>
        );
    }
}

export default withTranslation('translation') (ExerciseComponent);