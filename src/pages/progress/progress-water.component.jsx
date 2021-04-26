import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './progress.component.css';
import UserService from "../../services/user-service/user.service";
import {toast} from "react-toastify";
import UserVersionServices from "../../services/user-service/user-version.services";
import {Loader} from "semantic-ui-react";
import { Range, getTrackBackground } from 'react-range';

const STEP = 0.1;
const MIN = 0;
const MAX = 100;
class progressWaterComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            waterHistory: [],
            loader: true,
            values: [this.props.water_consumed]
        }
    }
    componentWillMount() {
        this.waterMeasurementsHistoryChart(this.props.traineesId)
    }

    waterMeasurementsHistoryChart = (traineesId) =>{
        const {t} = this.props;
        const userService  = new UserVersionServices();
        userService.waterMeasurementsHistoryChart(traineesId).then(response => {
            this.setState({isLoading : false})
            if(response.status) {
                this.setState({loader:false,waterHistory:response.result})
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
                        waterHistory.map(items => {
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

export default withTranslation('translation') (progressWaterComponent);