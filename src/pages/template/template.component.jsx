import React, {Component} from 'react';
import './template.component.css';
import BreadcrumbComponent from "../../components/common/breadcrumb/breadcrumb.component";
import {withTranslation} from "react-i18next";
import TemplateCardComponent from "../../components/template-card/template-card.component";
import TemplateService from "../../services/template-service/template.service";
import {Loader, Menu} from "semantic-ui-react";
import ToasterComponent from "../../components/common/toaster/toaster.component";
import {toast} from "react-toastify";
import { FiPlus } from "react-icons/fi";
import AddTemplateComponent from "../../components/add-template/add-template.component";
import EmptyPage from '../../assets/icons/empty.svg';
import EmptyComponent from "../../components/common/empty-page/empty.component";
import AssignTemplateComponent from "../../components/assign-template/assign-template.component";
import {confirmAlert} from "react-confirm-alert";
import PlanService from "../../services/plan-service/plan.service";
import TemplateServices from "../../services/template-service/template.service";
import UserService from "../../services/user-service/user.service";
class TemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : null,
            loading:false,
            openAssignModal: false,
            templateModalId : null,
            traineeList: []
        }
    }

    componentDidMount() {
        this.fetchData();
        this.getTraineeList();
    }
    
    openAssignTemplateModal = (templateId) => {
        if(!templateId)
            return ;
        this.setState({openAssignModal : true ,templateModalId : templateId })
        
    }
    getTraineeList = () => {
        console.log('test')
        const userService = new UserService();
        this.setState({loading:true})
        userService.traineeList.then(data => {
            this.setState({loading:false})
            if(data) {
                this.setState({traineeList : data.result})
            }
        }).catch(error => {
            this.setState({loading:false})
            console.log(error);
        })
    }
    fetchData = () => {
        const templateService = new TemplateService();
        this.setState({loading:true})
        templateService.getAll.then(data => {
            this.setState({loading:false})
            console.log(data);
            if(data) {
                this.setState({data : data.result})
            }
        }).catch(error => {
            this.setState({loading:false})
            console.log(error);
        })
    }
    deleteTemplateHandler = async (id) => {
        const {t} = this.props;
        confirmAlert({
            title: t('shared.confirmTitle'),
            message: t('shared.confirmMessage'),
            buttons: [
                {
                    label: t('shared.yes'),
                    onClick: () => {
                        if(id) {
                            const templateService = new TemplateService();
                            this.setState({loading:true})
                            templateService.deleteTemplate(id).then(result => {
                                this.setState({loading:false})
                                if(result) {
                                    toast.success(t('shared.success.deletedSuccess'));
                                    this.setState({data:result.result})

                                }else {
                                    toast.error(t('shared.errors.globalError'));
                                }

                            }).catch(error => {
                                this.setState({loading:false})
                                toast.error(t('shared.errors.globalError'));
                            })
                        }
                    }
                },
                {
                    label: t('shared.no'),
                }
            ]
        });
    }

    onAddTemplate = (isAdded) => {
        const {t} = this.props;
        if(isAdded) {
            toast.success(t('shared.success.addedSuccess'))
            this.fetchData();
        }else {
            toast.error(t('shared.errors.globalError'));
        }
    }


    onCloseAssignModal = () => {

        this.setState({openAssignModal : false})
    }

    render() {

        const {t } = this.props;
        return (
            <>
                <ToasterComponent />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <BreadcrumbComponent title={t('breadcrumb.templates')} />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-sm-12">
                            <AddTemplateComponent t={t} afterAdded={this.onAddTemplate} />
                        </div>
                    </div>
                    <div className="row mt-4 mx-0 template-container">
                        {
                            this.state.loading ?  <Loader active={true} inline='centered' /> :
                                this.state.data && this.state.data.length > 0 ?  this.state.data.map( (item , i) => {
                                    return (
                                        <div className="col-md-3 mt-4" key={i}>
                                            <TemplateCardComponent traineeList={this.state.traineeList} openAssignModal={this.openAssignTemplateModal} deleteFn={this.deleteTemplateHandler} tempName={item.name} data={this.state.data}  id={item.id}/>
                                        </div>
                                    );
                                } ) : <EmptyComponent />
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default withTranslation('translation') (TemplateComponent);