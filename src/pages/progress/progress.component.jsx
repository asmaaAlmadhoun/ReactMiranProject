import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import { Menu, Tab } from 'semantic-ui-react';
import {RiRuler2Line} from "react-icons/ri";
import {GiWaterBottle, GiWeightLiftingUp} from "react-icons/gi";
import {FaWeight} from "react-icons/fa";


class progressComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <div className="container">
                    <h3>  {t('progressPage.progress')} </h3>
                    <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={[
                        {
                            menuItem:
                                <Menu.Item key='location'>
                                    <RiRuler2Line/>
                                    {t('progressPage.measurement')}
                                </Menu.Item>,
                            render: () =>
                                <Tab.Pane attached={false}>

                                </Tab.Pane>,
                        },
                        {
                            menuItem:
                                <Menu.Item key='location'>
                                    <FaWeight/>
                                    {t('progressPage.weight')}
                                </Menu.Item>,
                            render: () =>
                                <Tab.Pane attached={false}>

                                </Tab.Pane>,
                        },
                        {
                            menuItem:
                                <Menu.Item key='location'>
                                    <GiWaterBottle/>
                                    {t('progressPage.water')}
                                </Menu.Item>,
                            render: () =>
                                <Tab.Pane attached={false}>

                                </Tab.Pane>,
                        },
                        {
                            menuItem:
                                <Menu.Item key='location'>
                                    <GiWeightLiftingUp/>
                                    {t('progressPage.picture')}
                                </Menu.Item>,
                            render: () =>
                                <Tab.Pane attached={false}>

                                </Tab.Pane>,
                        },
                    ]}/>

                </div>
            </>
        );
    }
}

export default withTranslation('translation') (progressComponent);