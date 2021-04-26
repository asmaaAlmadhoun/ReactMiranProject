import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {Loader, Menu, Tab} from 'semantic-ui-react';
import './progress.component.css';
import {RiRuler2Line} from "react-icons/ri";
import {GiWaterBottle, GiWeightLiftingUp} from "react-icons/gi";
import {FaWeight} from "react-icons/fa";
import ProgressMeasure from "./progress-measure.component";
import ProgressPicture from "./progress-picture.component";
import ProgressWeight from "./progress-weight.component";
import ProgressWater from "./progress-water.component";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import UserVersionServices from "../../services/user-service/user-version.services";
import {toast} from "react-toastify";

class progressComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            traineesId: this.props.location.state.traineesId,
            water_consumed: 0,
            water_goal: 0,
            weight: 0,
            weight_goal: 0,
            loader: false
        }
    }
    componentWillMount() {
         this.extraProgressData(this.props.location.state.traineesId)
    }
    extraProgressData = (traineesId) =>{
        const userService  = new UserVersionServices();
        userService.extraProgressData(traineesId).then(response => {
            console.log(response)
            if(response.status) {
                this.setState({
                    loader:false,
                    water_consumed: response.result.water_consumed,
                    water_goal: response.result.water_goal,
                    weight: response.result.weight,
                    weight_goal: response.result.weight_goal
                })
            }
        }).catch(error => {
            // todo: handling error.
            toast.error("Error")
        });
    }
    render() {
        const {t} = this.props;
        const {traineesId,water_consumed,water_goal,weight,weight_goal} = this.state;
        return (
            this.state.loader ? <Loader active={true} inline='centered'/> :
            <>
                <button className='ui button icon primary p-1 mb-3' onClick={(e)=>   this.props.history.push({pathname: '/'})}>
                    {t('local') === 'ar'?  <i><IoIosArrowForward/> </i>: <i><IoIosArrowBack/></i> }
                </button>
                <div className="container progressComponent py-5">
                    <h3  className={['btn-primary w-75 text-center mb-4 ' , t('local') === "ar" ? ' mr-auto' : ' ml-auto']}>  {t('progressPage.progress')} </h3>

                    <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={[
                        {
                            menuItem:
                                <Menu.Item className=''>
                                    <i className='f-2 p-2'>
                                        <RiRuler2Line/>
                                    </i>
                                    {t('progressPage.measurement')}
                                </Menu.Item>,
                            render: () =>
                                <Tab.Pane attached={false}>
                                    <ProgressMeasure traineesId={traineesId} />
                                </Tab.Pane>,
                        },
                        {
                            menuItem:
                                <Menu.Item>
                                    <i className='f-2 p-2'>
                                    <FaWeight/>
                                    </i>
                                    {t('progressPage.weight')}
                                </Menu.Item>,
                            render: () =>
                                <Tab.Pane attached={false}>
                                    <ProgressWeight weight={weight} weight_goal={weight_goal} traineesId={traineesId} />
                                </Tab.Pane>,
                        },
                        {
                            menuItem:
                                <Menu.Item>
                                    <i className='f-2 p-2'>
                                    <GiWaterBottle/>
                                    </i>
                                    {t('progressPage.water')}
                                </Menu.Item>,
                            render: () =>
                                <Tab.Pane attached={false}>
                                    <ProgressWater water_goal={water_goal} water_consumed={water_consumed} traineesId={traineesId} />
                                </Tab.Pane>,
                        },
                        {
                            menuItem:
                                <Menu.Item>
                                    <i className='f-2 p-2'>
                                    <GiWeightLiftingUp/>
                                    </i>
                                    {t('progressPage.picture')}
                                </Menu.Item>,
                            render: () =>
                                <Tab.Pane attached={false}>
                                    <ProgressPicture traineesId={traineesId} />
                                </Tab.Pane>,
                        },
                    ]}/>

                </div>
            </>
        );
    }
}

export default withTranslation('translation') (progressComponent);