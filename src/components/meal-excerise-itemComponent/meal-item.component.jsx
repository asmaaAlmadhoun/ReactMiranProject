import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './meal-excerise-item.component.css'
import {FiPlus, FiX} from "react-icons/fi";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {BiCopy, BiEditAlt} from "react-icons/bi";
import SearchableListWithImgTemplateComponent
    from "../assign-template/searchable-list-template/searchable-list-withImg-template.component";
import ModalComponent from "../common/modal/modal.component";
import ResourcesService from "../../services/trainee-service/resources.service";
import UserService from "../../services/user-service/user.service";
import TemplateServices from "../../services/template-service/template.service";
import DetailListItemTemplateComponent
    from "../assign-template/searchable-list-template/detail-list-item-template/detail-list-item-template.component";
import MessageComponent from "../common/message/message.component";
import PlanService from "../../services/plan-service/plan.service";
import {confirmAlert} from "react-confirm-alert";

class MealItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDetails2: true,
            __addModal__: false,
            FoodList: [],
            imgDefaultPath: '',
            openEditModal: false,
            itemToEdit: [],
            successState: false,
            mealDataItem: this.props.mealDataItem,
        }
    }
    async componentWillMount() {
        const userService = new UserService();
        this.setState({imgDefaultPath : userService.imageDefaultPath })
        const mealService  = new ResourcesService();
        this.setState({isLoading : true})
        mealService.food.then(data => {
            if(data && data.status) {
                this.props.getTemplateForDay2();
                this.setState({FoodList : data.result})
            }
        }).catch(error => {
            this.setState({isLoading : false})
        });

    }
    deleteFood=(item)=>{
        let {t}=this.props;
        confirmAlert({
            title: t('shared.confirmTitle'),
            message: t('shared.confirmMessage'),
            buttons: [
                {
                    label: t('shared.yes'),
                    onClick: () => {
                        if(this.props.planMode){
                            const planService  = new PlanService();
                            // ["food_id": "422", "meal_id": "1034372", "schedule_meal_id": "309303"]
                            const data = {
                                'meal_id': this.props.mealDataItem.meal.id,
                                'food_id': item.id,
                                'schedule_meal_id': this.props.mealDataItem.schedule_meal_id
                            }
                            planService.removeFoodTrainee(data).then(data => {
                                if(data && data.status) {
                                    let DataNEW = this.props.getTemplateForDay2();
                                    let Data = {};
                                    DataNEW[0].meals.map(item => {
                                        if (item.meal.id === this.props.mealDataItem.meal.id)
                                            Data = item
                                    });
                                    setTimeout(() => {
                                        this.setState({FoodList : Data.meal.foods,successState: true })
                                    }, 600)
                                }
                            }).catch(error => {
                                this.setState({isLoading : false})
                            });
                        }
                        else{
                            const templateServices  = new TemplateServices();
                            const data = {
                                'template_day_meal_id': this.props.mealDataItem.template_day_meal_id,
                                'food_id': item.id
                            }
                            templateServices.deleteFood(data).then(data => {
                                if(data && data.status) {
                                    this.props.getTemplateForDay2();
                                    this.setState({FoodList : data.result.meal.foods,successState: true })
                                }
                            }).catch(error => {
                                this.setState({isLoading : false})
                            });
                        }
                    }
                },
                {
                    label: t('shared.no'),
                }
            ]
        });

    }
    render() {
        const {t, openDetails, mealTitle } = this.props;
        let {mealDataItem} = this.state;
        let { imgPath} = this.props;
        if(!imgPath)
            imgPath = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' ;
        return (
            <>
                {this.state.successState ?
                    <>
                        <MessageComponent status='true' onClick={(e)=> this.setState({successState: false})} content={t('shared.success.processSuccess')}/>
                        <div className='d-none'> { setTimeout(function(){
                            this.setState({successState:false});
                        }.bind(this),80000)}
                        </div>
                    </>
                    : ''
                }
                <div className={["container" , openDetails ? '' : ' d-none']}>
                    <button className='ui button icon primary p-1 mb-3' onClick={(e)=> this.props.parentCall(false)}>
                        {t('local') === 'ar'?  <i><IoIosArrowForward/> </i>: <i><IoIosArrowBack/></i> }
                    </button>

                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <h3>{mealTitle}</h3>
                        </div>
                        <div className="col-sm-12 mb-3 mealItemsList">
                            {
                                (mealDataItem.meal.foods && mealDataItem.meal.foods.length) ?
                                    mealDataItem.meal.foods.map(item =>
                                        <>
                                            <div className='row mb-2'>
                                                <div className="col-md-2 text-center">
                                                    <img src={this.state.imgDefaultPath+item.image}  alt="img"/>
                                                </div>
                                                <div className="col-md-8">
                                                    {t('local') === "ar" ?  item.title_ar : item.title}
                                                </div>
                                                <div className="col-sm-2">
                                                    <button className="ui button icon p-2 blue" onClick={(e)=> this.setState({openEditModal: true, itemToEdit: item})}>
                                                        <BiEditAlt />
                                                    </button>
                                                    <button className="ui button icon p-2 red" onClick={(e)=> this.deleteFood(item)}>
                                                        <FiX/>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                    : t('traineeModal.emptyDataMeal')
                            }
                            <ModalComponent size="small" modalCenter={true} isOpen={this.state.openEditModal} hideAction={true} handleClosed={(e) => this.setState({openEditModal: false})} >
                                <DetailListItemTemplateComponent EditMealItem='true' planMode={this.props.planMode}
                                                                 closeModal={(e)=>this.setState({openEditModal : false})}
                                                                 mealDataItem={mealDataItem}
                                                                 getTemplateForDay2={(e)=>{this.props.getTemplateForDay2(e)}}
                                                                 MealForThisDay={this.state.itemToEdit}/>
                            </ModalComponent>
                        </div>
                        <div className="col-sm-6 text-center">
                            <div>
                                <label className='primary'> {t('traineeModal.calories')} : </label>
                                <span>{mealDataItem.nutrition_info.calories}</span>
                            </div>
                            <div>
                                <label className='primary'> {t('traineeModal.fat')} : </label>
                                <span>{mealDataItem.nutrition_info.fat}</span>
                            </div>
                        </div>
                        <div className="col-sm-6 text-center">
                            <div>
                                <label className='primary'> {t('traineeModal.carbs')} : </label>
                                <span>{mealDataItem.nutrition_info.carbs}</span>
                            </div>
                           <div>
                               <label className='primary'> {t('traineeModal.protein')} : </label>
                               <span>{mealDataItem.nutrition_info.protein}</span>
                           </div>
                        </div>
                        <div className="col-sm-12 text-center">
                            <h3>{t('templatePage.comments')}</h3>
                            <textarea value={mealDataItem.comment} rows='4' className='bg-light w-100 my-4 form-control'/>
                        </div>
                    </div>
                    <div className="meal-buttons d-flex flex-row-reverse">
                        <button onClick={e => {
                            e.preventDefault();
                            this.setState({__addModal__: true});
                        }} className="ui button icon primary py-2 px-1">
                            <FiPlus className='f-2'/>
                            <div className='f-1'>{t('templatePage.addFood')}</div>
                        </button>
                    </div>
                </div>

                <ModalComponent  size='small' isOpen={this.state.__addModal__}  hideAction={true} handleClosed={(e)=>this.setState({__addModal__: false})} >
                    <SearchableListWithImgTemplateComponent planMode={this.props.planMode} getTemplateForDay2={this.props.getTemplateForDay2}
                                                            mealDataItem={this.props.mealDataItem}
                                                            parentUpdatemealDataItem={(e) =>{ this.setState({mealDataItem:e})}}
                                                            list={this.state.FoodList}/>
                </ModalComponent>

            </>
        );
    }
}

export default withTranslation('translation')( MealItemComponent);