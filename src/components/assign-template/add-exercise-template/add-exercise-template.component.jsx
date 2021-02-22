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

class AddExerciseTemplateComponent extends  React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            muscles: [],
            openExceriseListDetails: false
        }
    }
    render() {
        const {t, exerciseMealForThisDay} = this.props;
        return (
            <React.Fragment>



            </React.Fragment>
        );
    }
}

export default withTranslation('translation')( AddExerciseTemplateComponent);