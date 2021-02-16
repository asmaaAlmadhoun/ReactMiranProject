import React, {Component} from 'react';
import './template.component.css';
import {withTranslation} from "react-i18next";
import {Loader, Menu, Tab} from 'semantic-ui-react';
import AddDaysTemplateComponent from "../../components/assign-template/add-days-template/add-days-template.component";
import ExerciseMealTemplateComponent
    from "../../components/assign-template/exercise-meal-template/exercise-meal-template.component";
import {BsThreeDotsVertical} from "react-icons/bs";
import TemplateService from "../../services/template-service/template.service";
import TemplateCardComponent from "../../components/template-card/template-card.component";
import EmptyComponent from "../../components/common/empty-page/empty.component";


class TemplateDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateId : null,
            data: []
        }
    }

    componentWillMount() {
        const dataFromLocation = this.props.location.state;
         this.setState({data: dataFromLocation.data})
    }

    render() {
        const {t } = this.props;

        return (
            <>
                <div className="container">
                    <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={[
                        {
                            menuItem:
                                this.state.data.length > 0 ? this.state.data.map(item => {
                                    return(
                                        <Menu.Item key='location'>
                                            {item.name}
                                            <BsThreeDotsVertical/>
                                        </Menu.Item>
                                    )
                                }):
                                    <Menu.Item key='location'>
                                        <BsThreeDotsVertical/>
                                    </Menu.Item>,
                            render: () =>
                                <Tab.Pane attached={false}>
                                    {/*<AddDaysTemplateComponent  daysNumber={item.days} clickNumberHandler={this.clickNumberHandler} />*/}
                                    {/*<ExerciseMealTemplateComponent templateId={item.id} />*/}
                                </Tab.Pane>
                        },
                        {    menuItem: <Menu.Item key='location'>{t('templatePage.templateName')}
                                <BsThreeDotsVertical/></Menu.Item>
                            , render: () => <Tab.Pane>Tab 3 Content....</Tab.Pane> } ,
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