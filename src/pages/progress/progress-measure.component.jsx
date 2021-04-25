import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './progress.component.css';
import waistIcon from '../../assets/icons/waist-diet.svg'
import {Image, Loader, Menu} from "semantic-ui-react";
import chatIcon from "../../assets/icons/chat.svg";
import UserService from "../../services/user-service/user.service";
import {toast} from "react-toastify";
import UserVersionServices from "../../services/user-service/user-version.services";

class progressMeasureComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            measureHistory: [],
            loader: true
        }
    }

    componentWillMount() {
        this.userBodyMeasurementsHistory(this.props.traineesId)
    }

    userBodyMeasurementsHistory = (traineesId) =>{
        const {t} = this.props;
        const userService  = new UserVersionServices();
        userService.userBodyMeasurementsHistory(traineesId).then(response => {
            this.setState({isLoading : false})
            console.log(response)
            if(response.status) {
                this.setState({loader:false,measureHistory:response.result})
            }else {
            }
        }).catch(error => {
            // todo: handling error.
            toast.error("Error")
        });
    }
    render() {
        const {t} = this.props;
        const {measureHistory} = this.state;
        return (
            this.state.loader ? <Loader active={true} inline='centered'/> :
            <>
                <div className="header">
                    <div className='row'>
                        <div className="col-sm-5">
                            <img src={waistIcon} className='icon w-25 d-inline-block' />
                            <h3 className='text-primary d-inline-block f-3'>{t('progressPage.changesWaist')}</h3>
                        </div>
                        <div className="col-sm-7">
                        </div>
                    </div>
                </div>
                <div className="row mt-3 text-center">
                    <div className="col-sm-4 mb-2">
                        <h4>{t('progressPage.day')}</h4>
                    </div>
                    <div className="col-sm-4 mb-2">
                        <h4>{t('progressPage.value')}</h4>
                    </div>
                    <div className="col-sm-4 mb-2">
                        <h4>{t('progressPage.change')}</h4>
                    </div>
                    {
                        measureHistory.map(items => {
                            return <>
                                {items.pucket.map(item =>{
                                    return<>
                                        <div className="col-sm-4 my-1">
                                            <p>{item.date}</p>
                                        </div>
                                        <div className="col-sm-4 my-1">
                                            <p>{item.value}</p>
                                        </div>
                                        <div className="col-sm-4 my-1">
                                            <p className='text-success'>{item.value}</p>
                                        </div>
                                    </>
                                })}
                            </>
                        })
                    }

                </div>
            </>
        );
    }
}

export default withTranslation('translation') (progressMeasureComponent);