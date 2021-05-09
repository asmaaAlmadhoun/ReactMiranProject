import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './progress.component.css';
import waistIcon from '../../assets/icons/waist-diet.svg'
import {Image, Loader, Menu} from "semantic-ui-react";
import {toast} from "react-toastify";
import UserVersionServices from "../../services/user-service/user-version.services";
import {AgChartsReact} from "ag-charts-react";

class progressMeasureComponent extends Component {
    data = [];
    constructor(props) {
        super(props);
        this.state={
            measureHistory: [],
            loader: true,
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
        }
    }

    componentDidMount() {
        this.userBodyMeasurementsHistory(this.props.traineesId,localStorage.getItem('measureType'))
    }

    userBodyMeasurementsHistory = (traineesId,measureType) =>{
        const {t} = this.props;
        const userService  = new UserVersionServices();
        if(!measureType){
            measureType ='chest';
        }
        userService.userBodyMeasurementsHistory(traineesId,measureType).then(response => {
            this.setState({isLoading : false})
            console.log(response)
            if(response.status) {
                this.setState({loader:false,measureHistory:response.result})
                response.result.map((items,index) => {
                    {
                        items.pucket.map((item) => {
                            let change= 0;
                            if(index!==0){
                                change = item.value - response.result[index-1].pucket[0].value
                            }
                            this.data.push({date: item.date, value: item.value, change: change})
                        })
                    }
                })
            }else {
                this.setState({loader:false,measureHistory:[]})
            }
        }).catch(error => {
            // todo: handling error.
            toast.error("Error")
            this.setState({loader:false,measureHistory:[]})
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
                        <div className="col-sm-12">
                            <img src={waistIcon} className='icon waistIcon  d-inline-block' />
                            <h3 className='text-primary d-inline-block f-3'>{t('progressPage.changesWaist')}</h3>
                        </div>
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
                    {measureHistory && measureHistory.length>0 ?
                        measureHistory.map((items,index) => {
                            return <>
                                {items.pucket.map((item) =>{
                                    let change= 0;
                                    if(index!==0){
                                       change = item.value - measureHistory[index-1].pucket[0].value
                                    }
                                    return<>
                                        <div className="col-sm-4 my-1">
                                            <p>{item.date}</p>
                                        </div>
                                        <div className="col-sm-4 my-1">
                                            <p>{item.value}</p>
                                        </div>
                                        <div className="col-sm-4 my-1">
                                            <p className={change >= 0 ?'text-success':'text-danger'}>{change} {t('progressPage.waistUnit')}</p>
                                        </div>
                                    </>
                                })}
                            </>
                        })
                        :''
                    }
                    </div>
                </div>
            </>
        );
    }
}

export default withTranslation('translation') (progressMeasureComponent);