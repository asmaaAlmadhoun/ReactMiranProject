﻿import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import  './add-exercise-template.component.css';
import {Header, Modal} from "semantic-ui-react";
import SearchableListTemplateComponent from '../searchable-template-list/searchable-list-template.component.jsx'
import ModalComponent from "../../common/modal/modal.component";
class AddExerciseTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            __addModal__ : false,
            CONTACTS : [
                {
                    id: 1,
                    name: 'Ahmed',
                    phoneNumber: '0938073320',
                    image: 'https://accounts-cdn.9gag.com/media/avatar/12368885_100_3.jpg'
                },
                {
                    id: 2,
                    name: 'Ramy',
                    phoneNumber: '0945565655',
                    image: 'http://forums.animeboston.com/download/file.php?avatar=11355_1455595397.png'

                },
                {
                    id: 3,
                    name: 'Mohammed',
                    phoneNumber: '0975149873',
                    image: 'http://avatars-cdn.9gag.com/avatar/erickson8903_14899765_100.jpg'
                },
                {
                    id: 4,
                    name: 'Tamer',
                    phoneNumber: '0638546385',
                    image: 'https://38.media.tumblr.com/4249a67e76729e9126ef3f70e741c323/tumblr_inline_mixcyvIPd81qz4rgp.jpg'
                }
            ]
        }
    }

    showModalHandler =() => {
        this.setState({__addModal__ : true});
    }
    closeModalHandler = () =>  {
        this.setState({__addModal__ : false});
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

                <ModalComponent isOpen={this.state.__addModal__} hideAction={true} handleClosed={this.closeModalHandler} >
                    <SearchableListTemplateComponent contact={this.state.CONTACTS}/>
                </ModalComponent>
            </React.Fragment>
        );
    }
}

export default withTranslation('translation')( AddExerciseTemplateComponent);