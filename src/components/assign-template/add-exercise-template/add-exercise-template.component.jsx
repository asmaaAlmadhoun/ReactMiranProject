import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import  './add-exercise-template.component.css';
import {Header, Modal} from "semantic-ui-react";
import ModalComponent from "../../common/modal/modal.component";
class AddExerciseTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            __addModal__ : false,
            
        }
    }
    
    
    showModalHandler =() => {
        this.setState({__addModal__ : true});
    }
    closeModalHandler = () =>  {
        this.setState({__addModal__ : true});

    }
    render() {
        const {t} = this.props;
        return (
            <React.Fragment>
                <div className={"AddMealTemplateComponent mt-4"}>
                    <div className="d-flex meal-buttons justify-content-center">
                        <button onClick={e => {
                            e.preventDefault();
                            this.showModalHandler();
                        }} className="btn primary-color">
                            {t('traineeModal.addExercise')}
                        </button>
                        <button className="btn danger-color">
                            {t('traineeModal.breakDay')}
                        </button>
                        <button className="btn primary-color">
                            {t('traineeModal.copyMeal')}
                        </button>
                    </div>
                </div>
                <ModalComponent isOpen={this.state.__addModal__} handleClosed={this.closeModalHandler} >
                    <div className="form-group">
                        <label></label>
                    </div>
                </ModalComponent>
            </React.Fragment>
        );
    }
}

export default withTranslation('translation')( AddExerciseTemplateComponent);