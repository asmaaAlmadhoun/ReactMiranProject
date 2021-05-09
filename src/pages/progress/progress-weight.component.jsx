import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './progress.component.css';
import { AgChartsReact } from 'ag-charts-react';
import {toast} from "react-toastify";
import UserVersionServices from "../../services/user-service/user-version.services";
import {Loader} from "semantic-ui-react";

class progressWeightComponent extends Component {
    _isMounted = false;
    data = []
    constructor(props) {
        super(props);
        this.state = {
            traineesId: '',
            weightHistory: '',
            loader: true,
            extraData:'',
            options: {
                autoSize: true,
                data: this.data,
                series: [
                    {
                        type: 'line',
                        xKey: 'date',
                        yKey: 'value',
                        stroke: '#01c185',
                        marker: {
                            stroke: '#01c185',
                            fill: '#01c185',
                        },
                    },
                    {
                        type: 'line',
                        xKey: 'date',
                        yKey: 'change',
                        stroke: '#000000',
                        marker: {
                            stroke: '#000000',
                            fill: '#000000',
                        },
                    },
                ],
            },
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        this._isMounted = true;
        this.getTraineeWeightHistory(this.props.traineesId)
        this.traineeWeightHistoryChart(this.props.traineesId,'year_now')
    }
    getTraineeWeightHistory = (traineesId) =>{
        const userService  = new UserVersionServices();
        userService.traineeWeightHistory(traineesId).then(response => {
            this.setState({loader:true})
            if(response.status) {
                this.setState({loader:false,weightHistory:response.result})
            }else {
            }
        }).catch(error => {
            // todo: handling error.
            toast.error("Error")
        });
    }
    traineeWeightHistoryChart = (traineesId,period) =>{
        const userService  = new UserVersionServices();
        userService.traineeWeightHistoryChart(traineesId,period).then(response => {
            this.setState({loader:true})
            if(response.status) {
                 this.setState({loader:false,weightHistory:response.result})
                response.result.map(items => {
                        {
                            items.pucket.map((item,index) => {
                                let change= 0
                                if(index!==0){
                                    change = item.value - items.pucket[index-1].value
                                }
                                this.data.push({date: item.date, value: item.value, change: change})
                            })
                        }
                    })

            }else {
            }
        }).catch(error => {
            // todo: handling error.
            toast.error("Error")
        });
    }

    render() {
        const {t, weight_goal,weight} = this.props;
        const {weightHistory} = this.state;
        return (
            this.state.loader ? <Loader active={true} inline='centered'/> :
            <>
                <div className="text-center">
                    <button className='ui button icon bg-light'>
                        <span className='text-primary'>{t('progressPage.current')}</span>
                        <div className='f-2 mt-3'>{weight}</div>
                    </button>
                    <button className='ui button icon bg-light'>
                        <span className='text-primary'>{t('progressPage.target')}</span>
                        <div className='f-2 mt-3'>{weight_goal}</div>
                    </button>
                </div>
                <div className='row'>
                    <div className="col-sm-5">
                        <h3 className='text-primary f-3'>{t('progressPage.weightChanges')}</h3>
                    </div>
                    <div className="col-sm-7">
                    </div>
                </div>
                <div className='h-75'>
                    <AgChartsReact options={this.state.options} />

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

                    </div>
                    {
                        weightHistory.map(items => {
                            return <div key={items.id} >
                                {items.pucket.map((item,index) =>{
                                    let change= 0
                                    if(index!==0){
                                        change = item.value - items.pucket[index-1].value
                                    }
                                    return<div key={items.id} className='row mx-0 text-center'>
                                        <div className="col-sm-4 my-1">
                                            <p>{item.date}</p>
                                        </div>
                                        <div className="col-sm-4 my-1">
                                            <p>{item.value}</p>
                                        </div>
                                        <div className="col-sm-4 my-1">
                                            <p className={change >= 0 ?'text-success':'text-danger'}>{change} {t('progressPage.wightUnit')}</p>
                                        </div>
                                    </div>
                                })}
                            </div>
                        })
                    }
                </div>
            </>
        );
    }
}
export default withTranslation('translation') (progressWeightComponent);