import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './progress.component.css';
import { AgChartsReact } from 'ag-charts-react';
import TranieeService from "../../services/trainee-service/trainer.service";
import UserService from "../../services/user-service/user.service";
import {toast} from "react-toastify";
import UserVersionServices from "../../services/user-service/user-version.services";
import waistIcon from "../../assets/icons/waist-diet.svg";
import {Loader} from "semantic-ui-react";

class progressWeightComponent extends Component {
    data = [
        {
            beverage: 'Coffee',
            Q1: 450,
            Q2: 560,
            Q3: 600,
            Q4: 700,
        },
        {
            beverage: 'Tea',
            Q1: 270,
            Q2: 380,
            Q3: 450,
            Q4: 520,
        },
        {
            beverage: 'Milk',
            Q1: 180,
            Q2: 170,
            Q3: 190,
            Q4: 200,
        },
    ];
    constructor(props) {
        super(props);
        this.state = {
            traineesId: '',
            weightHistory: '',
            loader: true,
            extraData:'',
            options: {
                data: this.data,
                title: { text: 'Beverage Expenses' },
                subtitle: { text: 'per quarter' },
                padding: {
                    top: 40,
                    right: 40,
                    bottom: 40,
                    left: 40,
                },
                series: [
                    {
                        type: 'column',
                        xKey: 'beverage',
                        yKeys: ['Q1', 'Q2', 'Q3', 'Q4'],
                    },
                ],
                legend: { spacing: 40 },
            },
        };
    }
    componentWillMount() {
        this.getTraineeWeightHistory(this.props.traineesId)
        this.traineeWeightHistoryChart(this.props.traineesId,'year_now')
    }
    getTraineeWeightHistory = (traineesId) =>{
        const userService  = new UserVersionServices();
        userService.traineeWeightHistory(traineesId).then(response => {
            this.setState({loader:true})
            console.log(response)
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
            console.log(response)
            if(response.status) {
                // this.setState({loader:false,weightHistory:response.result})
                console.log(response)
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
                <div className='h-50'>
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
                        {
                            weightHistory.map(items => {
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
                </div>
            </>
        );
    }
}

export default withTranslation('translation') (progressWeightComponent);