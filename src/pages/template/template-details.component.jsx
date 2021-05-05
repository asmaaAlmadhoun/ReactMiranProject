import React, {Component} from 'react';
import './template.component.css';
import {withTranslation} from "react-i18next";
import {Image, Loader, Menu, Tab} from 'semantic-ui-react';
import AddDaysTemplateComponent from "../../components/assign-template/add-days-template/add-days-template.component";
import {BsThreeDotsVertical} from "react-icons/bs";
import ToasterComponent from "../../components/common/toaster/toaster.component";
import TemplateServices from "../../services/template-service/template.service";
import ExerciseComponent from "../../components/trainee-modal/exercise-component/exercise.component";
import MealComponent from "../../components/trainee-modal/meal-component/meal.component";
import MealItemComponent from "../../components/meal-excerise-itemComponent/meal-item.component";
import ExceriseItemComponent from "../../components/meal-excerise-itemComponent/excerise-item.component";
import {toast} from "react-toastify";
import templateIcon from "../../assets/icons/template.svg";

class TemplateDetailsComponent extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            templateId : null,
            data: [],
            activeDay: 1,
            fullTemplateDataForThisDay: [],
            exerciseMealForThisDay: [],
            activeIndex: '',
            loader: true,
            mealDataItem: [],
            ExceriseDataItem: [],
            openDetails: false,
            openExceriseDetails: false,
            loading: false,
            templateName: ''
        }
    }
    clickNumberHandler= (e) =>{
        this.setState({loading: true})
        const {templateId} = this.state;
        this.getTemplateForDay(templateId, e);
        this.setState({loading: false})
    }
    getTemplateForDay = (tempId,activeDay) =>{
        console.log(tempId + '  #  '+ activeDay)
        const {t} = this.props;
        if(activeDay === undefined){
            activeDay = this.state.activeDay;
        }
        const templateServices = new TemplateServices();
        templateServices.getTemplateForDay(tempId, activeDay).then(response => {
            if (response) {
                this.setState({exerciseMealForThisDay :response.result, templateId: response.result.id , templateName: response.result.name , loader : false,});
            }
        })
        return this.state.exerciseMealForThisDay
    }
    componentWillMount() {
        const dataFromLocation = this.props.location.state;
        this.setState({data: dataFromLocation.data, templateId: dataFromLocation.templateId});
    }
    componentDidMount() {
        this._isMounted = true;
        const templateId = this.state.templateId;
        this.getTemplateForDay(templateId);
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const {t } = this.props;
        let {activeDay, mealDataItem, templateId, exerciseMealForThisDay, openDetails, openExceriseDetails, ExceriseDataItem} = this.state;

        const panes = this.state.data.length > 0 ? this.state.data.map(item => ({
                menuItem:
                    <Menu.Item key={item.id} activeIndex={item.id} className={templateId === item.id? ' active ':''}  onClick={()=>this.getTemplateForDay(item.id)}>
                        <a className='row'>
                            <div className="col-8"> {item.name}</div>
                            <div className="col-4 text-left"><BsThreeDotsVertical/></div>
                        </a>
                    </Menu.Item>,
                render: () =>
                    <Tab.Pane attached={false} key={templateId}>
                        {
                            this.state.loader ? <Loader active={true} inline='centered'/> :
                                <>
                                    <div className={openDetails || openExceriseDetails ? ' d-none':'' }>
                                        <ToasterComponent />
                                        <h1 className='mb-3 bg-light text-center p-3'>
                                            <Image src={templateIcon} className='icon d-inline mx-3' width={25} />
                                            {this.state.templateName}
                                        </h1>

                                        <AddDaysTemplateComponent templateId={templateId}  daysNumber={exerciseMealForThisDay.days} getTemplateForDay2={(e,z) => this.getTemplateForDay(e,z)} exerciseMealData={exerciseMealForThisDay} parentCallback={(e)=>{this.setState({activeDay: e, loading: true}); setTimeout( () => this.setState({ loading: false}),500)} } clickNumberHandler={this.clickNumberHandler} />
                                        {
                                            this.state.loading ? <Loader active={true} inline='centered'/> :

                                                <div className="mt-4">
                                                    <Tab menu={{secondary: true}} panes={[
                                                        {
                                                            menuItem: t('traineeModal.exercises'),
                                                            render: () =>
                                                                <Tab.Pane attached={false}>
                                                                    <ExerciseComponent daysNumber={exerciseMealForThisDay.days}
                                                                                       getTemplateForDay2={(e) => this.getTemplateForDay(templateId, activeDay)}
                                                                                       openDetailsExceriseFunction={(e) => this.setState({
                                                                                           ExceriseDataItem: e,
                                                                                           openExceriseDetails: true
                                                                                       })} exerciseMealData={exerciseMealForThisDay}
                                                                                       templateId={templateId} activeDay={activeDay}/>
                                                                </Tab.Pane>,
                                                        },
                                                        {
                                                            menuItem: t('traineeModal.meals'),
                                                            render: () =>
                                                                <Tab.Pane attached={false}>
                                                                    <MealComponent  daysNumber={exerciseMealForThisDay.days}
                                                                                getTemplateForDay2={(e) => this.getTemplateForDay(templateId, activeDay)}
                                                                                openDetailsFunction={(e) => this.setState({
                                                                                    mealDataItem: e,
                                                                                    openDetails: true
                                                                                })} activeDay={activeDay} exerciseMealData={exerciseMealForThisDay}
                                                                                templateId={templateId}/>
                                                            </Tab.Pane>,
                                                        },
                                                    ]}/>
                                                </div>
                                        }
                                    </div>

                                    {!openDetails?
                                        '':
                                        <MealItemComponent getTemplateForDay2={(e)=> this.getTemplateForDay(templateId,this.state.activeDay)} parentCall={(e,status)=> {this.setState({openDetails: e}); toast.done(t('shared.success.addedSuccess'))}} openDetails={openDetails} mealDataItem={mealDataItem}  mealTitle={mealDataItem.meal.title}  />
                                    }
                                    {!openExceriseDetails?
                                        '':
                                        <ExceriseItemComponent  parentCallExcersise={(e)=> this.setState({openExceriseDetails: e})} ExceriseDataItem={ExceriseDataItem} openExceriseDetails={openExceriseDetails} getTemplateForDay2={(e)=> this.getTemplateForDay(item.id,this.state.activeDay)}
                                                                templateId={item.id}
                                                                activeDay={this.state.activeDay} />
                                    }
                                </>
                        }
                    </Tab.Pane>
                })): '';

        return (
            <>
                <div className="container">
                    <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={panes}
                         activeTab={this.state.templateId}  onTabChange={this.handleTabChange}
                    />
                </div>
                <ToasterComponent />
            </>
        );
    }
}

export default withTranslation('translation') (TemplateDetailsComponent);