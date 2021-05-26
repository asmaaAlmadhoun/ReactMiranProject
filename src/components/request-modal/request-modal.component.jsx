import React, {Component} from 'react';
import PropTypes from "prop-types";
import ModalComponent from "../common/modal/modal.component";
import {withTranslation} from "react-i18next";
import {AiOutlineClose} from "react-icons/ai";
import {BsCheck} from "react-icons/bs";
import TranieeService from "../../services/trainee-service/trainer.service";
import {toast} from "react-toastify";
import ToasterComponent from "../common/toaster/toaster.component";
import EmptyComponent from "../common/empty-page/empty.component";
import TraineeModalNoteComponent from "../trainee-modal/trainee-modal-note.component";
import {confirmAlert} from "react-confirm-alert";
import PlanService from "../../services/plan-service/plan.service";
import TemplateServices from "../../services/template-service/template.service";

class RequestModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenRequest : false,
            notes: [],
            openModalNote: false
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {isOpenRequest} = nextProps;
        this.setState({ isOpenRequest});
    }

    submitRequest = (Status) => {
        const {t, requestId} = this.props;
        const data = {
            'request' : requestId,
            'status' : Status
        }
        const tranieeService  = new TranieeService();
        this.setState({isLoading:true})
        confirmAlert({
            title: t('shared.confirmTitle'),
            message: t('shared.confirmMessageRequest'),
            buttons: [
                {
                    label: t('shared.yes'),
                    onClick: () => {
                        tranieeService.acceptRequest(data).then(response => {
                            this.setState({isLoading : false})
                            if(response.status) {
                                this.props.updateTrainersRequest();
                                this.onClose();
                                toast.done(t('shared.success.addedSuccess'));
                            }else {
                                toast.error(t('shared.errors.globalError'))
                            }
                        }).catch(error => {
                            // todo: handling error.
                            toast.error("Error")
                        });
                    }
                },
                {
                    label: t('shared.no')
                }
            ]
        });
    }
    onClose = (e) => {
        this.setState({isOpenRequest:false});
        this.props.onCloseRequest()
        if(e) {
            e.preventDefault();
        }
    }

    render() {
        const { t,profileData,data, traineesId, requestClass, noteClass, subscriptionID } = this.props;

        return (
            <div>
                <ModalComponent size="tiny" hideAction={true} modalCenter={true} isOpen={this.state.isOpenRequest}  handleClosed={e=>this.onClose(e)}>
                    {data !== null?
                        <div className='card' key={data.id}>
                            <div className="card-body text-right">
                                <div className="row">
                                    <div className="col-4">

                                        <img src={(data.trainee_avatar !== null && data.trainee_avatar !== undefined)?'https://miranapp.com/media/' + data.trainee_avatar : 'https://www.w3schools.com/howto/img_avatar.png'} className='w-100' alt="img_avatar"/>
                                    </div>
                                    <div className="col-8">
                                        <h3 className='pb-3'>{data.trainee_name}</h3>
                                        <div>
                                            <button className="ui button icon red py-2 px-3" onClick={()=>
                                                this.submitRequest('rejected')
                                            }>
                                                <i><AiOutlineClose /></i>
                                                <span>{t('shared.reject')}</span>
                                            </button>
                                            <button className="ui button icon primary py-2 px-3" onClick={()=>{
                                                this.submitRequest('approved')
                                            }}>
                                                <i><BsCheck /></i>
                                                <span>{t('shared.accept')}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        ''
                    }
                </ModalComponent>

            </div>
        );
    }
}

RequestModalComponent.propTypes = {
    isOpenRequest : PropTypes.bool,
    requestId : PropTypes.number,
    profileData : PropTypes.array,
    data : PropTypes.array,
}

export default  withTranslation('translation')(RequestModalComponent);

