import React, {Component} from 'react';
import {Tab} from "semantic-ui-react";
import ExerciseComponent from "../../trainee-modal/exercise-component/exercise.component";
import MealComponent from "../../trainee-modal/meal-component/meal.component";
import {withTranslation} from "react-i18next";
import AddExerciseTemplateComponent from "../add-exercise-template/add-exercise-template.component";
import MealItemComponent from "../../meal-itemComponent/meal-item.component";
import {toast} from "react-toastify";
import ToasterComponent from "../../common/toaster/toaster.component";
import TemplateServices from "../../../services/template-service/template.service";
import AddDaysTemplateComponent from "../add-days-template/add-days-template.component";

class ExerciseMealTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            exerciseMealForThisDay: [],
            activeDay: 1
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
        let {activeDay} = this.state;
        return (
            <>
                <AddDaysTemplateComponent  daysNumber={daysNumber} parentCallback={(e)=>this.setState({activeDay: e})} clickNumberHandler={this.clickNumberHandler} />

                <div className="mt-4">
                <Tab menu={{ secondary: true }} panes={ [
                    {
                        menuItem:  t('traineeModal.exercises'),
                        render: () =>
                            <Tab.Pane attached={false}>
                                <ExerciseComponent  exerciseMealData={exerciseMealForThisDay} templateId={templateId} />
                                <AddExerciseTemplateComponent />
                            </Tab.Pane>,
                    },
                    {
                        menuItem:  t('traineeModal.meals'),
                        render: () => <Tab.Pane attached={false}>
                            <MealComponent activeDay={activeDay} getTemplateForDay={this.getTemplateForDay} exerciseMealData={exerciseMealForThisDay} templateId={templateId} />
                            {/*<MealItemComponent calories={128} carbs={16} fat={6} protein={3} meadId={1} mealTitle={"Snack"} imgPath={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'} />*/}
                        </Tab.Pane>,
                    },
                ]} />
                <ToasterComponent />

            </div>
                </>
        );
    }
}

export default withTranslation('translation') (ExerciseMealTemplateComponent);