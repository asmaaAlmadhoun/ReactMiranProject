import React, {Component} from 'react';
import {Tab} from "semantic-ui-react";
import ExerciseComponent from "../../trainee-modal/exercise-component/exercise.component";
import MealComponent from "../../trainee-modal/meal-component/meal.component";
import {withTranslation} from "react-i18next";
import AddExerciseTemplateComponent from "../add-exercise-template/add-exercise-template.component";

class ExerciseMealTemplateComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {t} = this.props;
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
                            <MealComponent calories={128} carbs={16} fat={6} protein={3} meadId={1} mealTitle={"Snack"} images={['https://homepages.cae.wisc.edu/~ece533/images/airplane.png','https://homepages.cae.wisc.edu/~ece533/images/cat.png']} />
                        </Tab.Pane>,
                    },
                ]} />
            </div>
        );
    }
}

export default withTranslation('translation') (ExerciseMealTemplateComponent);