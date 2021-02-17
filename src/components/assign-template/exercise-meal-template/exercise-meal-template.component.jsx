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

class ExerciseMealTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            exerciseMealForThisDay: []
        }
    }
    async componentWillMount() {
       this.getTemplateForDay();
    }


    getTemplateForDay = () =>{
        let {t, templateId, activeDay} = this.props;

        const templateServices = new TemplateServices();
        this.setState({isLoading: true})
        if(activeDay === ''){
            activeDay = 1;
        }
        templateServices.getTemplateForDay(templateId, activeDay).then(response => {
            if (response.message) {
                this.setState({exerciseMealForThisDay :response.result });
            } else {
                toast.error(t('shared.errors.globalError'))
            }
        })
    }
    render() {

        const {t, templateId, activeDay} = this.props;
        return (
            <div className="mt-4">
                <Tab menu={{ secondary: true }} panes={ [
                    {
                        menuItem:  t('traineeModal.exercises'),
                        render: () =>
                            <Tab.Pane attached={false}>
                                <ExerciseComponent />
                                <AddExerciseTemplateComponent />
                            </Tab.Pane>,
                    },
                    {
                        menuItem:  t('traineeModal.meals'),
                        render: () => <Tab.Pane attached={false}>
                            <MealComponent activeDay={activeDay} getTemplateForDay={this.getTemplateForDay} exerciseMealData={this.state.exerciseMealForThisDay} templateId={templateId} />
                            {/*<MealItemComponent calories={128} carbs={16} fat={6} protein={3} meadId={1} mealTitle={"Snack"} imgPath={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'} />*/}
                        </Tab.Pane>,
                    },
                ]} />
                <ToasterComponent />

            </div>
        );
    }
}

export default withTranslation('translation') (ExerciseMealTemplateComponent);