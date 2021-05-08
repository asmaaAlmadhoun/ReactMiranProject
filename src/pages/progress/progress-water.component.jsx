import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './progress.component.css';
import UserService from "../../services/user-service/user.service";
import {toast} from "react-toastify";
import UserVersionServices from "../../services/user-service/user-version.services";
import {Loader} from "semantic-ui-react";
import { Range, getTrackBackground } from 'react-range';
import {AgChartsReact} from "ag-charts-react";
import {number} from "prop-types";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;
class progressWaterComponent extends Component {
    data = [];
    constructor(props) {
        super(props);
        this.state={
            waterHistory: [],
            loader: true,
            values: [this.props.water_consumed],
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
        this.waterMeasurementsHistoryChart(this.props.traineesId)
    }

    waterMeasurementsHistoryChart = (traineesId) =>{
        const {t} = this.props;
        const userService  = new UserVersionServices();
        userService.waterMeasurementsHistoryChart(traineesId).then(response => {
            this.setState({isLoading : false})
            if(response.status) {
                this.setState({loader:false,waterHistory:response.result});
                console.log(response.result);
            }else {
            }
        }).catch(error => {
            // todo: handling error.
            toast.error("Error")
        });
    }
    render() {
        const {t, water_goal, water_consumed} = this.props;
        const {waterHistory} = this.state;
        return (
            this.state.loader ? <Loader active={true} inline='centered'/> :
            <>
                <div className='text-center'>
                    <h1>{t('progressPage.consumed')}</h1>
                    <p className='text-info'>{water_consumed} {t('progressPage.ml')}</p>
                    <p>{t('progressPage.stay')}</p>
                </div>
                <div className='range-container'>
                    <output id="output">
                        {this.state.values[0].toFixed(1)}
                    </output>
                    <Range
                        values={this.state.values}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={(values) => this.setState({ values })}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                className='range-slide'
                                style={{...props.style}}>
                                <div className='range-slide-bar'
                                    ref={props.ref}>
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({ props, isDragged }) => (
                            <div
                                {...props}
                                style={{
                                    display: "none",
                                }}
                            >
                            </div>
                        )}
                    />

                </div>
                <h3 className='text-info f-2'>{t('progressPage.waterChanges')}</h3>
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

                    </div>
                    {
                        waterHistory.map((items,index) => {
                            let change= 0
                            if(index > 0){
                                change = items.pucket[0].value - waterHistory[index-1].pucket[0].value;
                            }
                            return <div key={items.id}>

                                {items.pucket.map((item,index) =>{
                                    this.data.push({date: item.date, value: item.value, change: change})
                                    return<div className='row mx-0 text-center' key={item.id}>
                                        <div className="col-sm-4 my-1">
                                            <p>{item.date}</p>
                                        </div>
                                        <div className="col-sm-4 my-1">
                                            <p>{item.value}</p>
                                        </div>
                                        <div className="col-sm-4 my-1">
                                            <p className={change >= 0 ?'text-success':'text-danger'}>{change} {t('progressPage.waterUnit')}</p>
                                        </div>
                                    </div>
                                })}
                            </div>
                        })
                    }
                </div>
            </>
        )
    }
}

export default withTranslation('translation') (progressWaterComponent);