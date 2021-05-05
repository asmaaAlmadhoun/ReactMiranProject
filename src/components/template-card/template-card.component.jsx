import React, {Component} from 'react';
import PenWriteIco from '../../assets/icons/pen_write.svg';
import PropTypes from 'prop-types';
import {withTranslation} from "react-i18next";
import  './template-card.component.css';
import { withRouter} from "react-router-dom";
import { FiX } from "react-icons/fi";
import ModalComponent from "../common/modal/modal.component";
import {Loader} from "semantic-ui-react";
import EmptyComponent from "../common/empty-page/empty.component";
import UserService from "../../services/user-service/user.service";
import TemplateService from "../../services/template-service/template.service";
import ToasterComponent from "../common/toaster/toaster.component";
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";

class TemplateCardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            __addModal__: false,
            id: this.props.id,
            traineeList: this.props.traineeList,
            selectedTrainerList: [],
            startDate: new Date()
        }
    }
    showModalHandler =(e) => {
        e.stopPropagation();
        this.setState({__addModal__ : true});
    }
    closeModalHandler = () =>  {
        this.setState({__addModal__ : false});
    }
    addTrainers(pushObj){
        let trainerButton = this.state.selectedTrainerList;
        if (!trainerButton.includes((pushObj.id)+'')) {
            trainerButton.push((pushObj.id)+'');
        }
        else{
            let objToDelete = (pushObj.id)+'';
            trainerButton.splice(trainerButton.indexOf(objToDelete), 1);
        }
        this.setState({selectedTrainerList: trainerButton});
    }
    assignTrainer=()=>{
        const templateService = new TemplateService();
        let {id, t}=this.props
        let {startDate, selectedTrainerList}=this.state
        const data = {
            "template_id": id,
            "user_id": selectedTrainerList,
            "start_date": moment(startDate).format('YYYY-MM-DD')
        }
        templateService.assignTrainer(data).then(data => {
            if(data) {
                toast.done(t('shared.success.addedSuccess'));
                this.closeModalHandler()
            }
        }).catch(error => {
            console.log(error);
        })
    }
    setStartDate= (startDate) =>{
        this.setState({
            startDate
        });
    }
    render() {
        const {t, data} = this.props;
        return (
            <>
                <ToasterComponent />
            <a className="template-card" onClick={e => {
                const {openAssignModal , id} = this.props;
                this.props.history.push({
                    pathname: '/template-details',
                    state: { templateId: id, data: data },
                });
            }}>
               <div className="content">
                   <div className="ico">
                       <img src={PenWriteIco} alt="icon"  />
                   </div>
                   <div className="temp-name">
                       <span> {this.props.tempName} </span>
                   </div>
                   <div className="action">
                       <button className="btn" onClick={e => {
                           const {openAssignModal , id} = this.props;
                           e.preventDefault();
                           this.showModalHandler(e);
                       }} style={{borderRadius:'50px'}}>
                           {t('templatePage.assign')}
                       </button>
                   </div>
               </div>
                <div className="delete-icon" onClick={e => {
                    e.stopPropagation();
                    const {deleteFn , id} = this.props;
                    if(deleteFn) {
                        deleteFn(id);
                    }
                }}>
                    <span> <FiX /> </span>
                </div>
            </a>
                <ModalComponent size="tiny" modalCenter={true} handleClosed={this.closeModalHandler}  isOpen={this.state.__addModal__}
                    Actions={
                        <div className="text-center">
                            <button className="btn-secondary w-50" onClick={(e)=>this.assignTrainer()}>
                                {t('templatePage.assign')}
                            </button>
                        </div>
                    }>
                    <div className="mb-4">
                        <div className="text-center">
                            <div className='modal-title'> {t('templatePage.chooseTrainee')}</div>
                            <h4 className='text-primary text-center mt-5 mb-3'>{t('templatePage.date')}</h4>
                            <div className='text-center'>
                                <DatePicker  className='modal-title-date'
                                             selected={this.state.startDate}
                                             onChange={(startDate)=>this.setStartDate(startDate)} />
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {
                        this.state.loading ?  <Loader active={true} inline='centered' /> :
                            this.props.traineeList && this.props.traineeList.length > 0 ?  this.props.traineeList.map( (item , i) => {
                                const _imgPath = item.profile && item.profile.avatar ? 'https://miranapp.com/media/' +  item.profile.avatar : 'https://www.w3schools.com/howto/img_avatar.png'
                                return (
                                    <a key={item.id}
                                       className={['trainee-card card-custom ', this.state.selectedTrainerList.includes(item.id+'') ? ' active' : '']}
                                       onClick={(e) => this.addTrainers(item)}>
                                        <div className="user-img">
                                            <img src={_imgPath} width="56px"  alt={"user image"}   />
                                        </div>
                                        <div className="user-name">
                                            <span> {item.full_name} </span>
                                        </div>
                                    </a>
                                );
                            } ) : <EmptyComponent />
                    }
                </ModalComponent>
            </>
        );
    }
}

TemplateCardComponent.propTypes = {
    id:PropTypes.number.isRequired,
    tempName : PropTypes.string.isRequired,
    deleteFn: PropTypes.func,
    openAssignModal : PropTypes.func.isRequired,
    data : PropTypes.array,
    traineeList : PropTypes.array,
}

export default withTranslation('translation') (withRouter(TemplateCardComponent));