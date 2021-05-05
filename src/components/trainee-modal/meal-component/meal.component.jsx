import React, {Component, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FiX,FiMove } from "react-icons/fi";
import {withTranslation} from "react-i18next";
import  './meal.component.css';
import DragContainer from '../../../pages/template/DragContainer.jsx';
import AddMealTemplateComponent from "../../assign-template/add-meal-template/add-meal-template.component";
import MealItemComponent from "../../meal-excerise-itemComponent/meal-item.component";
import BreakDayComponent from "../../common/empty-page/breakDay.component";
import TemplateServices from "../../../services/template-service/template.service";
import {toast} from "react-toastify";
import ToasterComponent from "../../common/toaster/toaster.component";
import {BiCopy} from "react-icons/bi";
import ModalComponent from "../../common/modal/modal.component";
import EmptyDataComponent from "../../common/empty-page/emptyData.component";
import {DndProvider} from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import MessageComponent from "../../common/message/message.component";
import {Card} from "../../../pages/template/Card";
import update from "immutability-helper";
import PlanService from "../../../services/plan-service/plan.service";
import {confirmAlert} from "react-confirm-alert";
class MealComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullTemplateDataForThisDay: '',
            openDetails: false,
            mealId_selected: 1,
            copyDays: [],
            openCopyModel: false,
            mealItemTemplateToggle: 0,
            successState: false,
            fullCards: [],
            fullCards2: [],
            subscriptionData: {calories: 0, fat: 0, carbs: 0, protein: 0}
        }
    }

    openDetailsFunc(item) {
        this.props.openDetailsFunction(item);
    }

    componentDidMount() {
        const {t, exerciseMealData, planMode} = this.props;
        toast.done(t('shared.success.addedSuccess'));
    }

    calculateCaloriesTotal() {
        let {caloriesTotal} = 0;
        let {planMode,exerciseMealData}=this.props;
        let meal = (!planMode)?exerciseMealData.day.meals : exerciseMealData.meals;
        if (meal && meal.length){
            caloriesTotal = meal.reduce((totalCal, item) => totalCal = totalCal + item.nutrition_info.calories, 0);
        }
        else {
            caloriesTotal=0;
        }
        return caloriesTotal
    }

    calculateFatTotal() {
        let {fatTotal} = 0;
        let {planMode,exerciseMealData}=this.props;
        let meal = (!planMode)?exerciseMealData.day.meals : exerciseMealData.meals;
        if (meal && meal.length){
            fatTotal = meal.reduce((totalFat, item) => totalFat = totalFat + item.nutrition_info.fat, 0);
        }
        else {
            fatTotal=0;
        }
        return fatTotal
    }

    calculateCarbsTotal() {
        let {carbsTotal} = 0;
        let {planMode,exerciseMealData}=this.props;
        let meal = (!planMode)?exerciseMealData.day.meals : exerciseMealData.meals;
        if (meal && meal.length){
            carbsTotal = meal.reduce((carbsTotal, item) => carbsTotal = carbsTotal + item.nutrition_info.carbs, 0);
        }
        else {
            carbsTotal=0;
        }
        return carbsTotal
    }

    calculateProteinTotal() {
        let {proteinTotal} = 0;
        let {planMode,exerciseMealData}=this.props;
        let meal = (!planMode)?exerciseMealData.day.meals : exerciseMealData.meals;
        if (meal && meal.length){
            proteinTotal = meal.reduce((proteinTotal, item) => proteinTotal = proteinTotal + item.nutrition_info.protein, 0);
        }
        else {
            proteinTotal=0;
        }
        return proteinTotal
    }
    deleteMealTemplate(id) {
        // deleteMealTemplate
        const {t, planMode,  mealDataItem,planId, activeDay} = this.props;
        confirmAlert({
            title: t('shared.confirmTitle'),
            message: t('shared.confirmMessage'),
            buttons: [
                {
                    label: t('shared.yes'),
                    onClick: () => {
                        if(planMode){
                            const planService = new PlanService();
                            const data = {
                                'schedule_meal_id':  id,
                            }
                            planService.RemoveMealTrainee(data).then(response => {
                                if (response) {
                                    this.setState({successState: true})
                                    this.props.getTemplateForDay2(planId, activeDay);
                                } else {
                                }
                            })
                        }
                        else{
                            const templateServices = new TemplateServices();
                            const data = {
                                'template_day_meal_id': id,
                            }
                            templateServices.deleteMealTemplate(data).then(response => {
                                if (response) {
                                    this.setState({successState: true})
                                    this.props.getTemplateForDay2();
                                } else {
                                    toast.done(t('shared.success.addedSuccess'));
                                }
                            })
                        }
                    }
                },
                {
                    label: t('shared.no'),
                }
            ]
        });
    }

    openModalCopyMeal(e, id, mealItemTemplateToggle) {
        let {planMode, activeDay}=this.props;
        e.stopPropagation();

        this.setState({
            openCopyModel: true,
            copyDays:(planMode)?[activeDay]: ['1'],
            mealId_selected: id,
            mealItemTemplateToggle: mealItemTemplateToggle
        })
    }

    submitTemplateCopyMeal(id) {
        const {t, exerciseMealData, planMode, traineesId, activeDay} = this.props;
        let {copyDays, mealId_selected, mealItemTemplateToggle} = this.state;
        if (mealItemTemplateToggle) {
            this.templateCopyMaelDay(copyDays);
        } else {
            copyDays = JSON.stringify(copyDays);
            if(planMode){
                console.log(copyDays);
                const planService = new PlanService();
                const data = {
                    "schedule_meal_id": mealId_selected,
                    "user_id": traineesId,
                    'days': copyDays
                }
                planService.copyMealTrainee(data).then(response => {
                    if (response) {
                        toast.done(t('shared.success.addedSuccess'));
                        this.props.getTemplateForDay2(traineesId,activeDay);
                        this.setState({'openCopyModel': false,successState: true})

                    } else {
                        toast.done(t('shared.success.addedSuccess'));
                    }
                })
            }
            else {
                const templateServices = new TemplateServices();
                const data = {
                    'template_day_meal_id': mealId_selected,
                    'days': copyDays
                }
                templateServices.templateCopyMeal(data).then(response => {
                    if (response) {
                        toast.done(t('shared.success.addedSuccess'));
                        this.props.getTemplateForDay2();
                        this.setState({'openCopyModel': false,successState: true})

                    } else {
                        toast.done(t('shared.success.addedSuccess'));
                    }
                })
            }

        }
    }

    parentCallback = (e) => {
        console.log(e)
    }
    templateCopyMaelDay(copyDays) {
        const {t, exerciseMealData, planMode, traineesId} = this.props;
        const {mealId_selected} = this.state;
        copyDays = JSON.stringify(copyDays);
        if(planMode){
            const planService = new PlanService();
            const data = {
                "schedule_id": exerciseMealData.schedule_id,
                "user_id": traineesId,
                'days': copyDays
            }
            planService.copyMealTraineeDay(data).then(response => {
                if (response) {
                    toast.done(t('shared.success.addedSuccess'));
                    this.props.getTemplateForDay2();
                    this.setState({'openCopyModel': false,successState: true})

                } else {
                    toast.done(t('shared.success.addedSuccess'));
                }
            })
        }
        else {
            let Dayid = exerciseMealData.day.id;
            const templateServices = new TemplateServices();
            const data = {
                'template_day_id': Dayid,
                'days': copyDays
            }
            templateServices.templateCopyMaelDay(data).then(response => {
                if (response) {
                    toast.done(t('shared.success.addedSuccess'));
                    this.props.getTemplateForDay2();
                    this.setState({'openCopyModel': false, successState: true})
                } else {
                    toast.done(t('shared.success.addedSuccess'));
                }
            })
        }
    }

    renderDaysButtons = () => {
        let daysButton = [];
        if(this.props.planMode){
            for (let i = 1; i <= this.props.daysNumber; i++) {
                daysButton.push(
                    <span key={this.props.calendarDays[i]}>
                    {this.props.calendarDays[i]}
               </span>
                )
            }
        }
        else {
            for (let i = 1; i <= this.props.daysNumber; i++) {
                daysButton.push(
                    <span key={i} >
                    {i}
               </span>
                )
            }
        }

        return daysButton;
    }
    addDays(pushObj) {
        let {planMode}= this.props
        let daysButton = this.state.copyDays;

        if(planMode){
            if (!daysButton.includes(pushObj.item.key)) {
                daysButton.push(pushObj.item.key);
                console.log(pushObj.item.key);
                console.log(daysButton);

            } else {
                let objToDelete = (pushObj.item.key);
                daysButton.splice(daysButton.indexOf(objToDelete), 1);
            }
        }
        else{
            if (!daysButton.includes((pushObj.key + 1) + '')) {
                daysButton.push((pushObj.key + 1) + '');
            } else {
                let objToDelete = (pushObj.key + 1) + '';
                daysButton.splice(daysButton.indexOf(objToDelete), 1);
            }
        }
        this.setState({daysButton: daysButton});
    }
    moveCard = ((dragIndex, hoverIndex) => {
        let {fullCards, fullCards2} =this.state;
        fullCards2 = [...fullCards];
        const dragCard = fullCards[dragIndex];
        this.setState( prevState => ({...prevState,fullCards2: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }}));
        setTimeout(()=>{this.setState(prevState => ({...prevState,fullCards: fullCards2})); console.log('asma')},1000)
    });

    generateMealList=(item)=>{
        const {t, planMode}= this.props;
        return <>
            <div className="row" onClick={(e) => {
                e.preventDefault();
                this.openDetailsFunc(item);
            }}>
                <div className="col-sm-6">
                    <h5 className={t('local') === 'ar' ? 'text-right' : 'text-left'}> {item.meal.title} </h5>
                    <div className="images">
                        {
                            (item.meal.foods) ? item.meal.foods.map((item,i) =>
                                <span key={i}>
                                                        <img className='w-100'
                                                             src={'https://miranapp.com/media/' + item.image}
                                                             alt="image"/>
                                                        </span>
                            ) : ''
                        }
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="icons d-flex flex-row-reverse">
                        <span className="icon delete"
                              onClick={(e) => {
                                  e.stopPropagation();
                                  this.deleteMealTemplate(!planMode?item.template_day_meal_id:item.schedule_meal_id)
                              }}>
                            <FiX/>
                        </span>
                        <span className="icon copy"
                              onClick={(e) => {
                                  e.stopPropagation();
                                  this.openModalCopyMeal(e, !planMode?item.template_day_meal_id:item.schedule_meal_id, 0)
                              }}>
                                                    <BiCopy/>
                                                </span>
                        <span className="icon move">
                                    <FiMove/>
                                </span>
                    </div>
                    <div className='d-flex flex-row-reverse'>
                        <button className="btn btn-secondary w-50 mt-3 p-1"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.openDetailsFunc(item);
                                }}>
                            {t('traineeModal.mealDetails')}
                        </button>
                    </div>

                </div>
                <div className="col-sm-6">
                    <div>
                        <span
                            className="key"> {t('traineeModal.calories')} : </span>
                        <span
                            className="val"> {item.nutrition_info.calories}  </span>
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
                        <span
                            className="val"> {item.nutrition_info.protein}  </span>
                    </div>
                </div>
            </div>
            <hr/>
        </>
    }
    Update(exerciseMealData2){
        const {t,exerciseMealData, planMode}=this.props;
        let MealLength =exerciseMealData.day.meals.length
        let cards3 = [];
        {exerciseMealData2.day.meals.map((item, i) =>
            cards3.push(
                {
                    id: i,
                    text:
                        <div key={i}>
                            <div className="row" onClick={(e) => {
                                e.preventDefault();
                                this.openDetailsFunc(item);
                            }}>
                                <div className="col-sm-6">
                                    <h5 className={t('local') === 'ar' ? 'text-right' : 'text-left'}> {item.meal.title} </h5>
                                    <div className="images">
                                        {
                                            (item.meal.foods) ? item.meal.foods.map((item,i) =>
                                                <span  key={i}>
                                                            <img className='w-100'
                                                                 src={'https://miranapp.com/media/' + item.image}
                                                                 alt="image"/>
                                                            </span>
                                            ) : ''
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-6 text-left">
                                    <div className="icons d-flex flex-row-reverse">
                                    <span className="icon delete"
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              this.deleteMealTemplate(item.template_day_meal_id)
                                          }}>
                                        <FiX/>
                                    </span>
                                        <span className="icon copy"
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  this.openModalCopyMeal(e,!planMode?item.template_day_meal_id:item.schedule_meal_id, 0)
                                              }}>
                                                        <BiCopy/>
                                                    </span>
                                        <span className="icon move">
                                        <FiMove/>
                                    </span>
                                    </div>
                                    <button className="btn btn-secondary w-50 mt-3 p-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                this.openDetailsFunc(item);
                                            }}>
                                        {t('traineeModal.mealDetails')}
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <div>
                                                            <span
                                                                className="key"> {t('traineeModal.calories')} : </span>
                                        <span
                                            className="val"> {item.nutrition_info.calories}  </span>
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
                                        <span
                                            className="val"> {item.nutrition_info.protein}  </span>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>
                }
            )
        )}

        if(this.state.fullCards.length !== cards3.length){
            if(cards3.length === MealLength){
                console.log('test ' +MealLength)
                // this.setState( prevState => ({...prevState,fullCards:cards3}))
                this.setState( {fullCards:cards3})
            }
        }

    }
    render() {
        const {t, templateId, daysNumber, activeDay, exerciseMealData, getTemplateForDay, subscriptionData,planMode, traineesId} = this.props;
        const buttons = this.renderDaysButtons();
        return (
            <>
                {this.state.successState ?
                    <>
                        <MessageComponent status='true' onClick={(e)=> this.setState({successState: false})} content={t('shared.success.processSuccess')}/>
                        <div className='d-none'> { setTimeout(function(){
                            this.setState({successState:false});
                        }.bind(this),8000)}
                        </div>
                    </>
                    : ''
                }
                <div className="meal">

                    {
                        (planMode)?
                            (exerciseMealData.meals && exerciseMealData.meals.length) ?
                                exerciseMealData.meals.map(item =>
                                    this.generateMealList(item)
                                )
                                :  <BreakDayComponent/>
                            :
                            exerciseMealData.day.break_day_meal ?
                                <BreakDayComponent/> :
                                !(exerciseMealData.day.meals && exerciseMealData.day.meals.length) ?
                                    <EmptyDataComponent title={t('traineeModal.emptyDataMeal')}/> :
                                    <div className=''>
                                        {/*{ this.Update(exerciseMealData) }*/}
                                        { exerciseMealData.day.meals.map((item, i) =>
                                            this.generateMealList(item)
                                        )}
                                    </div>

                    }

                    {/*<DndProvider backend={HTML5Backend}>*/}
                    {/*<DragContainer parentCallback={(e) => this.parentCallback(e)} cards={this.state.fullCards}/>*/}
                    {/*/!*{this.setState({fullCards: cards2})}*!/*/}
                    {/*{this.state.fullCards.map((card, i) =>*/}
                    {/*    <Card key={card.id} index={i} id={card.id} text={card.text} moveCard={this.moveCard.bind(this)}/>*/}
                    {/*)}*/}
                    {/*</DndProvider>*/}

                    <div className={t('local') === 'ar' ? 'row text-right' : 'row'}>
                        <div className="col-sm-8 p-0">
                            <div className={["d-flex align-items-center ", (planMode)? '': ' mt-3']}>
                                    <span className="strip-title">
                                        {t('traineeModal.totalDayIntakes')}
                                    </span>
                                <div className="stripe grey">
                                    <div className="">
                                        <span className="key"> {t('traineeModal.calories')}: </span>
                                        <span className="val"> {this.calculateCaloriesTotal()} </span>
                                    </div>
                                    <div className="">
                                        <span className="key"> {t('traineeModal.carbs')}: </span>
                                        <span className="val"> {this.calculateCarbsTotal()} </span>
                                    </div>
                                    <div className="">
                                        <span className="key"> {t('traineeModal.fat')}: </span>
                                        <span className="val"> {this.calculateFatTotal()}  </span>
                                    </div>
                                    <div className="">
                                        <span className="key"> {t('traineeModal.protein')} : </span>
                                        <span className="val"> {this.calculateProteinTotal()} </span>
                                    </div>
                                </div>
                            </div>
                            {(planMode)?
                                subscriptionData !== null?
                                <div className="d-flex align-items-center mt-2">
                                    <span className="strip-title">
                                        {t('traineeModal.totalTargetIntakes')}
                                    </span>
                                    <div className="stripe primary-color">
                                        <div className="">
                                            <span className="key"> {t('traineeModal.calories')}: </span>
                                            <span className="val"> {subscriptionData.calories}  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.carbs')}: </span>
                                            <span className="val"> {subscriptionData.carbs}  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.fat')}: </span>
                                            <span className="val"> {subscriptionData.fat}  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.protein')} : </span>
                                            <span className="val"> {subscriptionData.protein}  </span>
                                        </div>
                                    </div>
                                </div>
                                : ''
                            :''
                            }
                        </div>
                        <div className={"AddMealTemplateComponent col-sm-4 p-0"}>
                            <div className="meal-buttons justify-content-center text-left">
                                <AddMealTemplateComponent traineesId={traineesId} planMode={this.props.planMode}  dayNumbers={daysNumber} parentTriggerAdd={(e) => {
                                    let NewData = this.props.getTemplateForDay2();
                                    setTimeout(() => this.setState({exerciseMealData: NewData}), 100)
                                }} getTemplateForDay2={this.props.getTemplateForDay2} exerciseMealData={this.props.exerciseMealData} activeDay={activeDay}
                                                          templateId={templateId}/>
                                <button className="btn primary-color p-1"
                                        onClick={(e) => this.openModalCopyMeal(e, null, 1)}>
                                    <BiCopy/>
                                    <div><small>{t('traineeModal.copyMeal')}</small></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <ModalComponent Actions={
                        <div className='text-center w-100'>
                            <button className='btn-secondary w-75' onClick={(e) => this.submitTemplateCopyMeal(e)}>
                                {t('shared.add')}
                            </button>
                        </div>
                    } isOpen={this.state.openCopyModel} size={planMode ? 'small' :'tiny'} modalCenter={!planMode}
                                    handleClosed={(e) => this.setState({'openCopyModel': false})}>
                        <h3 className='text-center'>  {t('traineeModal.titleCopyMeal')} </h3>
                        <div className="add-days-template ">
                            { (planMode) ?
                                    <div className="row">
                                        {buttons && buttons.length > 0 && buttons.map((item, key) => {
                                            return (
                                                <div className='col-sm-2 p-0 my-2 text-center'>
                                                    <div key={item}
                                                         className={['item-num item-num-custom custom-item', this.state.copyDays.includes(item.key) ? ' active' : '']}
                                                         onClick={(e) => this.addDays({item})}>
                                                        {item}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                            :
                                <div className='row'>
                                    {buttons && buttons.length > 0 && buttons.map((item, key) => {
                                        return (
                                                <div className='col-sm-2 p-0 my-2'>
                                                    <div key={key}
                                                         className={['item-num  custom-item ', this.state.copyDays.includes((key + 1) + '') ? ' active' : '']}
                                                         onClick={(e) => this.addDays({key})}>
                                                        {item}
                                                    </div>
                                                </div>
                                        );
                                    })}
                                </div>
                            }
                        </div>
                    </ModalComponent>


                </div>
            </>
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
    activeDay:PropTypes.number,
    getTemplateForDay2: PropTypes.func
}
export default withTranslation('translation') (MealComponent);