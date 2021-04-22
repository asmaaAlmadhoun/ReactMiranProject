import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import { Menu, Tab } from 'semantic-ui-react';
import './progress.component.css';
import {RiRuler2Line} from "react-icons/ri";
import {GiWaterBottle, GiWeightLiftingUp} from "react-icons/gi";
import {FaWeight} from "react-icons/fa";
import ProgressMeasure from "./progress-measure.component";
import ProgressPicture from "./progress-picture.component";
import ProgressWeight from "./progress-weight.component";
import ProgressWater from "./progress-water.component";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";


class progressComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <button className='ui button icon primary p-1 mb-3' onClick={(e)=>   this.props.history.push({pathname: '/'})}>
                    {t('local') === 'ar'?  <i><IoIosArrowForward/> </i>: <i><IoIosArrowBack/></i> }
                </button>
                <div className="container progressComponent py-5">
                    <h3  className={['btn-primary w-75 text-center mb-4 ' , t('local') === "ar" ? ' mr-auto' : ' ml-auto']}>  {t('progressPage.progress')} </h3>

                    <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={[
                        {
                            menuItem:
                                <Menu.Item>
                                    <i className='f-2 p-2'>
                                        <RiRuler2Line/>
                                    </i>
                                    {t('progressPage.measurement')}
                                </Menu.Item>,
                            render: () =>
                                <Tab.Pane attached={false}>
                                    <ProgressMeasure />
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
                                    <ProgressWeight/>
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
                                    <ProgressWater/>
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
                                    <ProgressPicture />
                                </Tab.Pane>,
                        },
                    ]}/>

                </div>
            </>
        );
    }
}

export default withTranslation('translation') (progressComponent);