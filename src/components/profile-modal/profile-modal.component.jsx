import React, {Component} from 'react';
import PropTypes from "prop-types";
import ModalComponent from "../common/modal/modal.component";
import {withTranslation} from "react-i18next";
import {AiOutlineClose} from "react-icons/ai";
import {BsCheck} from "react-icons/bs";
import UserService from "../../services/user-service/user-version.services";
import {toast} from "react-toastify";
import {Button} from "semantic-ui-react";

class ProfileModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
            notes: [],
            newNote: '',
            __addNoteModal__: false
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {isOpen} = nextProps;
        this.setState({ isOpen});
    }
    componentWillMount() {
        this.fetchData();
    }
    fetchData = () => {
        const userService  = new UserService();
        this.setState({isLoading : true})
        userService.note.then(data => {
            this.setState({isLoading : false})
            if(data) {
                this.setState({notes : data.result})
            }
        }).catch(error => {
            this.setState({isLoading : false})
        })
    }

    onSubmit = async () => {
        const { newNote } = this.state;
        const data = {
            newNote
        }
        const userService  = new UserService();
        this.setState({isLoading:true})
        const {t} = this.props;
        userService.addNote(data).then(response => {
            this.setState({isLoading : false})
            if(response && response.message) {
                toast.done(t('shared.success.addedSuccess'));
                this.fetchData();
                this.onClose();
            }else {
                toast.error(t('shared.errors.globalError'))
            }
        }).catch(error => {
            // todo: handling error.
            toast.error("Error")
        });
    }
    onClose = (e) => {
        if(e) {
            e.preventDefault();
        }
        this.setState({__addNoteModal__:false , newNote : null});
    }
    render() {
        const { t } = this.props;
        return (
            <div>
                <ModalComponent size="tiny" isOpen={this.state.isOpen}  handleClosed={e => {
                    this.setState({isOpen:false})
                }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-4">
                                <img src="https://www.w3schools.com/howto/img_avatar.png" className='w-100' alt="img_avatar"/>
                            </div>
                            <div className="col-8">
                                <h3>{t('traineeModal.notes')}</h3>
                                <div>
                                    <button className="ui button icon red py-2 px-3">
                                        <i><AiOutlineClose /></i>
                                        <span>{t('shared.reject')}</span>
                                    </button>
                                    <button className="ui button icon primary py-2 px-3">
                                        <i><BsCheck /></i>
                                        <span>{t('shared.accept')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="container">
                        <div className='my-2'>
                            <label className='text-primary'>{t('profile.BirthDate')}</label>
                            <p>6/6</p>
                            <hr/>
                        </div>
                        <div className='my-2'>
                            <label className='text-primary'>{t('profile.nationality')}</label>
                            <p>6/6</p>
                            <hr/>
                        </div>
                        <div className='my-2'>
                            <label className='text-primary'>{t('profile.height')}</label>
                            <p>6/6</p>
                            <hr/>
                        </div>
                        <div className='my-2'>
                            <label className='text-primary'>{t('progressPage.weight')}</label>
                            <p>6/6</p>
                            <hr/>
                        </div>

                        <div className='my-2'>
                            <label className='text-primary'>{t('profile.levelOfActivity')}</label>
                            <p>6/6</p>

                            <div className="row">
                                <div className="col-6">
                                    <label className='text-primary'>{t('profile.warning')}</label>
                                    <p>6/6</p>
                                </div>
                                <div className="col-6">
                                    <label className='text-primary'>{t('profile.Allergies')}</label>
                                    <p>6/6</p>
                                </div>
                            </div>
                            <hr/>
                        </div>
                        <div className='my-2'>
                            <label className='text-primary'>{t('profile.myGoal')}</label>
                            <p>6/6</p>
                        </div>

                    </div>

                </ModalComponent>

            </div>
        );
    }
}

ProfileModalComponent.propTypes = {
    isOpen : PropTypes.bool
}

export default  withTranslation('translation')(ProfileModalComponent);

