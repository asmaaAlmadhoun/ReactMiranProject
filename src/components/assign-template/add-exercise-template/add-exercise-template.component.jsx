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

class AddExerciseTemplateComponent extends  React.Component {

    constructor(props) {
        super(props);
        this.state = {
            __addModal__ : false,
            isLoading: false,
            CONTACTS : [
                {
                    id: 1,
                    name: 'Box',
                    image: 'https://accounts-cdn.9gag.com/media/avatar/12368885_100_3.jpg'
                },
                {
                    id: 2,
                    name: 'Box Jumps',
                    image: 'http://forums.animeboston.com/download/file.php?avatar=11355_1455595397.png'

                },
                {
                    id: 3,
                    name: 'Box Jumps',
                    image: 'http://avatars-cdn.9gag.com/avatar/erickson8903_14899765_100.jpg'
                },
                {
                    id: 4,
                    name: 'Box Jumps',
                    image: 'https://38.media.tumblr.com/4249a67e76729e9126ef3f70e741c323/tumblr_inline_mixcyvIPd81qz4rgp.jpg'
                }
            ],
            muscles: []
        }
    }
    async componentWillMount() {
        const musclesService  = new MusclesService();
        this.setState({isLoading : true})
        musclesService.muscles.then(data => {
            this.setState({isLoading : false})
            if(data && data.status) {
                this.setState({muscles : data.result})
            }
        }).catch(error => {
            this.setState({isLoading : false})
        })
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
                <div className={"AddMealTemplateComponent col-sm-4 p-0 mt-4"}>
                    <div className="meal-buttons justify-content-center">
                        <button onClick={e => {
                            e.preventDefault();
                            this.showModalHandler();
                        }} className="btn primary-color">
                            <FiPlus />
                            <div><small>{t('traineeModal.addExercise')}</small></div>
                        </button>
                        <button className="btn danger-color">
                            <BsClockHistory />
                            <div><small>{t('traineeModal.breakDay')}</small></div>
                        </button>
                        <button className="btn primary-color">
                            <BiCopy />
                            <div><small>{t('traineeModal.copyExercise')}</small></div>
                        </button>
                    </div>
                </div>


                <ModalComponent size="tiny" isOpen={this.state.__addModal__} hideAction={true} handleClosed={this.closeModalHandler} >
                    <SearchableListTemplateComponent list={this.state.muscles}/>
                </ModalComponent>
            </React.Fragment>
        );
    }
}

export default withTranslation('translation')( AddExerciseTemplateComponent);