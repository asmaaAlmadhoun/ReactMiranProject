import React, {Component, useRef} from 'react';
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
import ToasterComponent from "../../components/common/toaster/toaster.component";

class TemplateDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateId : null,
            data: [],
            activeDay: '',
            fullTemplateDataForThisDay: []
        }
    }

    componentWillMount() {
        const dataFromLocation = this.props.location.state;
         this.setState({data: dataFromLocation.data})
    }
    render() {
        const {t } = this.props;
        const data = [
            { name: "10jan", key: "10jan" },
            { name: "12jan", key: "12jan" },
            { name: "14jan", key: "14jan" },
        ];

        const panes = this.state.data.length > 0 ? this.state.data.map(item =>({
            menuItem:
                <Menu.Item key={item.id}>
                    <div className='row'>
                        <div className="col-8"> {item.name}</div>
                        <div className="col-4 text-left"><BsThreeDotsVertical/></div>
                    </div>
                </Menu.Item>,
            render: () =>
                <Tab.Pane attached={false}>
                    <AddDaysTemplateComponent  daysNumber={item.days} parentCallback={(e)=>this.setState({activeDay: e})} clickNumberHandler={this.clickNumberHandler} />
                    <ExerciseMealTemplateComponent  ref="child" templateId={item.id} activeDay={this.state.activeDay} />
                </Tab.Pane>
        })): '';

        return (
            <>
                <div className="container">
                    <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={panes} />
                </div>
                <ToasterComponent />
            </>
        );
    }
}

export default withTranslation('translation') (TemplateDetailsComponent);