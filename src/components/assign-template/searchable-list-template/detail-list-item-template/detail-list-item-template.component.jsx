import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import './detail-list-item-template.component.css';
import {Input, Label} from "semantic-ui-react";
import UserService from "../../../../services/user-service/user.service";
import MealServices from "../../../../services/meal-services/meal.services";
import TemplateService from "../../../../services/template-service/template.service";
import PlanService from "../../../../services/plan-service/plan.service";
import PlanServices from "../../../../services/plan-service/plan.service";

class DetailListItemTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedData: this.props.list,
            ratio : 1,
            imgDefaultPath: '',
            food_quantity: '',
            quantity: this.props.MealForThisDay.quantity,
            template_day_meal_id: this.props.mealDataItem.template_day_meal_id,
            food_id: this.props.MealForThisDay.id,
        }
    }
    onChangeGram = e => {
        if(!e)
            return;
        e.preventDefault();
        this.setState({
            quantity: e.target.value
        });
        const value = e.target.value;
        let oldValue = this.props.MealForThisDay.quantity;
        if (value !== ''){
            this.prepareTotalDataSource(oldValue,value);
            this.setState({food_quantity: value})
        }
        else{
            this.prepareTotalDataSource(oldValue,oldValue);
            this.setState({food_quantity: oldValue})
        }
    }
    componentWillMount() {
        const userService = new UserService();
        this.setState({imgDefaultPath : userService.imageDefaultPath,
            quantity: this.props.mealDataItem.quantity,
        })
    }
    componentDidMount() {
        this.setState({
            quantity: this.props.mealDataItem.quantity,
        })
    }

    async addFood() {
        const {food_quantity, template_day_meal_id, food_id} = this.state;
        const {mealDataItem} = this.props;
        const mealServices = new MealServices();
        const templateService = new TemplateService();
        const planService = new PlanService();
        if (this.props.planMode){
            const data2 = {
                "meal_id": mealDataItem.meal.id,
                "schedule_meal_id": mealDataItem.schedule_meal_id,
                'food_id': food_id,
                'food_quantity': food_quantity
            }
        this.props.EditMealItem ?
            planService.addFoodTrainee(data2).then(response => {
                if (response.status) {
                    this.props.getTemplateForDay2();
                    this.props.closeModal();
                }
            })
            :
            planService.addFoodTrainee(data2).then(response => {
                if (response.status) {
                    let DataNEW = this.props.getTemplateForDay2();
                    let Data = {};
                    DataNEW.meals.map(item => {
                        if (item.meal.id === this.props.mealDataItem.meal.id)
                            Data = item
                    });
                    setTimeout(() => {
                        this.props.parentUpdatemealDataItem(Data)
                    }, 600)
                    this.props.closeModal();
                } else {
                    //  toast.done(t('shared.success.addedSuccess'));
                }
            })
         }
         else{
                const data = {
                    'template_day_meal_id': template_day_meal_id,
                    'food_id': food_id,
                    'food_quantity': food_quantity
                }
                this.props.EditMealItem ?
                    templateService.editFood(data).then(response => {
                        if (response.status) {
                            //      toast.done(t('shared.success.addedSuccess'));
                            this.props.getTemplateForDay2();
                            this.props.closeModal();
                        } else {
                            //  toast.done(t('shared.success.addedSuccess'));
                        }
                    })
                    :
                mealServices.addFood(data).then(response => {
                    if (response.status) {
                        //      toast.done(t('shared.success.addedSuccess'));
                         let DataNEW =this.props.getTemplateForDay2();
                         setTimeout(()=>{
                             let Data = {};
                             DataNEW.day.meals.map(item =>{
                                 if(item.template_day_meal_id === this.props.mealDataItem.template_day_meal_id)
                                     Data= item
                             });
                             this.props.parentUpdatemealDataItem(Data)
                         } ,200)
                         this.props.closeModal();
                    } else {
                        //  toast.done(t('shared.success.addedSuccess'));
                    }
                })
        }
    }
    parseArabic(str) {
        // if( typeof(str) === "string"){
            return Number( str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
                return d.charCodeAt(0) - 1632; // Convert Arabic numbers
            }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(d) {
                return d.charCodeAt(0) - 1776; // Convert Persian numbers
            }) );
        // }
    }
    prepareTotalDataSource(oldQty,newQty){
        newQty=this.parseArabic(newQty+'')
        let NewRatio = parseFloat(newQty) / parseFloat(oldQty)
        console.log( ' newQty  '+ parseFloat(newQty) + '  '+newQty);
        if(NewRatio.isNaN) {
            return
        }
        this.setState({
            ratio : NewRatio
        });
    }

    render () {
        const {t, EditMealItem} = this.props;
        return (
            <div className={t('local')==='ar' ? 'text-right' : ''}>
                <div className="row detail-list">
                    <div className="col-sm-12 text-center">
                        <img className='w-50 m-auto' src={this.state.imgDefaultPath+this.props.MealForThisDay.image} alt="image"/>
                        <h3 className='my-4'>{t('local')==='ar' ? this.props.MealForThisDay.title_ar : this.props.MealForThisDay.title}</h3>
                    </div>
                    <div className="col-sm-6 text-center">
                        <div>
                            <div className="key mb-2"> {t('traineeModal.calories')}</div>
                            <Label className='p-3' size='medium'> {((parseFloat(this.props.MealForThisDay.calories)) * this.state.ratio).toFixed(2)}  </Label>
                        </div>
                        <div>
                            <div className="key mb-2"> {t('traineeModal.fat')}</div>
                            <Label className='p-3' size='medium'> {((parseFloat(this.props.MealForThisDay.fat)) * this.state.ratio).toFixed(2)} </Label>
                        </div>
                    </div>
                    <div className="col-sm-6 text-center">
                        <div>
                            <div className="key mb-2"> {t('traineeModal.carbs')}</div>
                            <Label className='p-3' size='medium'> {((parseFloat(this.props.MealForThisDay.carbs)) * this.state.ratio).toFixed(2)} </Label>
                        </div>
                        <div>
                            <div className="key mb-2"> {t('traineeModal.protein')}</div>
                            <Label className='p-3' size='medium'> {((parseFloat(this.props.MealForThisDay.protein)) * this.state.ratio).toFixed(2)} </Label>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center">
                        <div>
                            <Input type="text" value={this.state.quantity} onChange={e => this.onChangeGram(e)} placeholder={  this.props.EditMealItem ? this.props.MealForThisDay.quantity: t('templatePage.numberOf')} required/>
                            <span>{t('traineeModal.gram')}</span>
                        </div>
                    </div>
                    <div className='text-center w-100 mt-4'>
                        <button className="btn btn-secondary w-50 m-auto" onClick={(e)=> this.addFood()}>
                            {
                                this.props.EditMealItem ?
                                    t('templatePage.editFood')
                                    :
                                    t('templatePage.addFood')
                            }

                        </button>
                    </div>

                </div>
            </div>
        )
    }
}
export default withTranslation('translation')( DetailListItemTemplateComponent);
