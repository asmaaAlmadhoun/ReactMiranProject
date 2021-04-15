import React, {Component} from 'react';
import PropTypes from "prop-types";
import ModalComponent from "../common/modal/modal.component";
import {withTranslation} from "react-i18next";
import {FiPlus, FiX} from "react-icons/fi";
import {AiOutlineClose} from "react-icons/ai";
import {BiEditAlt} from "react-icons/bi";
import EmptyComponent from "../common/empty-page/empty.component";
import UserService from "../../services/user-service/user-version.services";
import {Message, TextArea} from 'semantic-ui-react'
import {toast} from "react-toastify";
import PrimaryButtonComponent from "../ButtonComponent/primary-button.component";
import {confirmAlert} from "react-confirm-alert";
import './trainee-modal.css'

class TraineeModalNoteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
            notes: [],
            newNote: '',
            __addNoteModal__: false,
            itemToEdit: '',
            editStatus: ''
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {isOpen} = nextProps;
        this.setState({ isOpen});
        this.fetchData();
    }
    componentWillMount() {
        this.fetchData();
    }
    fetchData = () => {
        const { traineesId } = this.props
        const userService  = new UserService();
        this.setState({isLoading : true})
        userService.note(traineesId).then(data => {
            this.setState({isLoading : false})
            if(data) {
                this.setState({notes : data.result})
            }
        }).catch(error => {
            this.setState({isLoading : false})
        })
    }

    onSubmit =  () => {
        console.log('click');
        const { newNote, editStatus, itemToEdit } = this.state;
        this.setState({isLoading:true})
        const { traineesId, subscriptionID,t } = this.props;
        const userService  = new UserService();
        if(editStatus){
            const data = {
                note: newNote,
                noteId: itemToEdit.id
            }
            userService.editNote(data,itemToEdit.id).then(response => {
                this.setState({isLoading : false})
                if(response) {
                    toast.done(t('shared.success.addedSuccess'));
                    this.fetchData();
                    this.onClose();
                }else {
                    toast.error(t('shared.errors.globalError'))
                }
            })
        }
        else {
            const data = {
                note: newNote,
                trainee_id:traineesId,
                subscription: subscriptionID,
            }
            this.setState({isLoading:true})
            const {t} = this.props;
            userService.addNote(data).then(response => {
                this.setState({isLoading : false})
                if(response) {
                    toast.done(t('shared.success.addedSuccess'));
                    this.fetchData();
                    this.onClose();
                }else {
                    toast.error(t('shared.errors.globalError'))
                }
            })
        }

    }
    deleteNote = async (item) => {
        const userService  = new UserService();
        const {t} = this.props;
        confirmAlert({
            title: t('shared.confirmTitle'),
            message: t('shared.confirmMessage'),
            buttons: [
                {
                    label: t('shared.yes'),
                    onClick: () => {
                        userService.deleteNote(item.id).then(response => {
                            if(response.status) {
                                toast.done(t('shared.success.deletedSuccess'));
                                this.fetchData();
                            }else {
                                toast.error(t('shared.errors.globalError'))
                            }
                        })
                    }
                },
                {
                    label: t('shared.no'),
                }
            ]
        });
    }
    handleChange = (e) =>{
        console.log('   dd '+ e)
        this.setState({'newNote':e.target.value})
        return e
    }
    onClose = (e) => {
        if(e) {
            e.preventDefault();
        }
        this.setState({__addNoteModal__:false , newNote : null, note: null});
    }
    render() {
        const {t  } = this.props;
        return (
            <div>
                <ModalComponent size="tiny" modalCenter={true} isOpen={this.state.isOpen}  handleClosed={e => {
                    this.setState({isOpen:false})
                }} Actions={
                    <div>
                        <button className="ui button icon primary p-2" onClick={e => {
                            this.setState({__addNoteModal__:true, editStatus: false})
                        }}>
                            <FiPlus />
                            <div><small>{t('traineeModal.note')}</small></div>
                        </button>
                    </div>
                }>
                        <h3 className="btn-primary text-center w-75 mx-auto mb-5">{t('traineeModal.notes')}</h3>
                        <div className="container-note-list">
                         {
                            this.state.notes && this.state.notes.length ?
                                this.state.notes.map( (item,i) => {
                                    return (
                                        <div className='my-3' key={item.id}>
                                            <Message className='custom-message' content={
                                                <div className="row">
                                                    <div className='col-sm-9'>
                                                        {item.note}
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <button className="ui button icon p-2 blue" onClick={(e)=> this.setState({itemToEdit: item,__addNoteModal__: true, editStatus: true})}>
                                                            <BiEditAlt />
                                                        </button>
                                                        <button className="ui button icon p-2 red" onClick={(e)=> this.deleteNote(item)}>
                                                            <FiX/>
                                                        </button>
                                                    </div>
                                                </div>
                                            } />

                                        </div>
                                    );
                                })
                                :
                                <EmptyComponent />
                        }
                        </div>


                </ModalComponent>

                <ModalComponent size='tiny' modalCenter={true} isOpen={this.state.__addNoteModal__}  hideAction={true} handleClosed={e => {
                    this.setState({__addNoteModal__:false})
                }} >
                    <div className="text-center mini-shared-modal px-3">
                        <h4 className='mb-4'>  {t('traineeModal.addNote')} </h4>
                        <TextArea rows={7}  className='form-control mb-4' onChange={(e)=>this.handleChange(e)} defaultValue={this.state.itemToEdit? this.state.itemToEdit.note :  this.state.newNote} />
                        <PrimaryButtonComponent switchLoading={this.state.isLoading} isSecondaryBtn='true' className='btn w-50' clickHandler={this.onSubmit} title={t('shared.add')}> </PrimaryButtonComponent>
                    </div>
                </ModalComponent>

            </div>
        );
    }
}

TraineeModalNoteComponent.propTypes = {
    isOpen : PropTypes.bool,
    traineesId : PropTypes.number
}

export default  withTranslation('translation')(TraineeModalNoteComponent);

