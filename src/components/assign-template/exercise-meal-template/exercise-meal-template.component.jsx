import React, {Component} from 'react';
import {Tab} from "semantic-ui-react";
import ExerciseComponent from "../../trainee-modal/exercise-component/exercise.component";
import MealComponent from "../../trainee-modal/meal-component/meal.component";
import {withTranslation} from "react-i18next";
import {toast} from "react-toastify";
import ToasterComponent from "../../common/toaster/toaster.component";
import AddDaysTemplateComponent from "../add-days-template/add-days-template.component";
import MealItemComponent from "../../meal-excerise-itemComponent/meal-item.component";
import ExceriseItemComponent from "../../meal-excerise-itemComponent/excerise-item.component";

class ExerciseMealTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            exerciseMealForThisDay: [],
            activeDay: 1,
            mealDataItem: [],
            ExceriseDataItem: [],
            openDetails: false,
            openExceriseDetails: false
        }
    }
    async componentWillMount() {
       this.props.getTemplateForDay();
    }
    clickNumberHandler= (e) =>{
        const {templateId} = this.props;
        this.props.getTemplateForDay(templateId, e);
    }

    render() {

        const {t, templateId, daysNumber, exerciseMealForThisDay} = this.props;
        let {activeDay, mealDataItem, openDetails, openExceriseDetails, ExceriseDataItem} = this.state;
        return (
            <>
                <div className={openDetails || openExceriseDetails ? ' d-none':'' }>
                    <ToasterComponent />

                    <AddDaysTemplateComponent  daysNumber={daysNumber} parentCallback={(e)=>this.setState({activeDay: e})} clickNumberHandler={this.clickNumberHandler} />

                    <div className="mt-4">
                    <Tab menu={{ secondary: true }} panes={ [
                        {
                            menuItem:  t('traineeModal.exercises'),
                            render: () =>
                                <Tab.Pane attached={false}>
                                    <ExerciseComponent getTemplateForDay2={(e)=> this.props.getTemplateForDay(templateId,this.state.activeDay)} openDetailsExceriseFunction={(e)=>this.setState({ExceriseDataItem: e, openExceriseDetails: true})} exerciseMealData={exerciseMealForThisDay} templateId={templateId} />
                                </Tab.Pane>,
                        },
                        {
                            menuItem:  t('traineeModal.meals'),
                            render: () => <Tab.Pane attached={false}>
                                <MealComponent getTemplateForDay2={(e)=> this.props.getTemplateForDay(templateId,this.state.activeDay)}  openDetailsFunction={(e)=>this.setState({mealDataItem: e, openDetails: true})} activeDay={activeDay} exerciseMealData={exerciseMealForThisDay} templateId={templateId} />
                            </Tab.Pane>,
                        },
                    ]} />
                    </div>
                </div>

                {!openDetails?
                     '':
                    <MealItemComponent foodImage={mealDataItem.meal.foods} parentCall={(e)=> this.setState({openDetails: e})} nutrition_info={mealDataItem.nutrition_info} openDetails={openDetails}  mealTitle={mealDataItem.meal.title}  mealComment={mealDataItem.comment} imgPath={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'} />
                }
                {!openExceriseDetails?
                     '':
                    <ExceriseItemComponent parentCallExcersise={(e)=> this.setState({openExceriseDetails: e})} ExceriseDataItem={ExceriseDataItem} openExceriseDetails={openExceriseDetails} />
                }
                </>
        );
    }
}

export default withTranslation('translation') (ExerciseMealTemplateComponent);