import React, {Component} from 'react';
import './template.component.css';
import {withTranslation} from "react-i18next";
import { Menu, Tab } from 'semantic-ui-react';
import AddDaysTemplateComponent from "../../components/assign-template/add-days-template/add-days-template.component";
import ExerciseMealTemplateComponent
    from "../../components/assign-template/exercise-meal-template/exercise-meal-template.component";
import {BsThreeDotsVertical} from "react-icons/bs";


class TemplateDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateId : null
        }
    }

    componentWillMount() {
        const templateId1 = this.props.location.state;
        // this.setState({templateId: templateId1.templateId})
    }

    render() {
        const {t } = this.props;

        return (
            <>
                <div className="container">
                    <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={[
                        {
                            menuItem: <Menu.Item key='location'>
                                {t('templatePage.templateName')}
                                <BsThreeDotsVertical/></Menu.Item>,
                            render: () =>
                                <Tab.Pane attached={false}>
                                    <AddDaysTemplateComponent daysNumber={7} clickNumberHandler={this.clickNumberHandler} />
                                    <ExerciseMealTemplateComponent />
                                </Tab.Pane>,
                        },
                        {    menuItem: <Menu.Item key='location'>{t('templatePage.templateName')}
                                <BsThreeDotsVertical/></Menu.Item>
                            , render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
                        },
                        {    menuItem: <Menu.Item key='location'>{t('templatePage.templateName')}
                                <BsThreeDotsVertical/></Menu.Item>
                            , render: () => <Tab.Pane>Tab 3 Content....</Tab.Pane> }
                    ]}/>

                </div>
            </>
        );
    }
}

export default withTranslation('translation') (TemplateDetailsComponent);