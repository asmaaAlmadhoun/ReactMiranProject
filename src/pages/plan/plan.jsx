import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {Loader, Menu, Tab} from 'semantic-ui-react';
import AddDaysTemplateComponent from "../../components/assign-template/add-days-template/add-days-template.component";
import {BsThreeDotsVertical} from "react-icons/bs";
import ToasterComponent from "../../components/common/toaster/toaster.component";
import PlanServices from "../../services/plan-service/plan.service";
import ExerciseComponent from "../../components/trainee-modal/exercise-component/exercise.component";
import MealComponent from "../../components/trainee-modal/meal-component/meal.component";
import MealItemComponent from "../../components/meal-excerise-itemComponent/meal-item.component";
import ExceriseItemComponent from "../../components/meal-excerise-itemComponent/excerise-item.component";
import Report from "../../assets/icons/report-01.svg";
import {Link} from "react-router-dom";
import Slider from "react-slick";
import DateComponent from "../../components/trainee-modal/dates-components/date.component";

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planId : null,
            data: [],
            activeDay: '2021-03-15',
            fullTemplateDataForThisDay: [],
            exerciseMealForThisDay: [],
            activeIndex: '',
            loader: true,
            mealDataItem: [],
            ExceriseDataItem: [],
            openDetails: false,
            openExceriseDetails: false,
            loading: false
        }
    }
    clickNumberHandler= (e) =>{
        this.setState({loading: true})
        const {planId} = this.state;
        this.getTemplateForDay(planId, e);
        this.setState({loading: false})
    }
    getTemplateForDay = (tempId,activeDay) =>{
        const {t} = this.props;
        if(activeDay === undefined){
            activeDay = this.state.activeDay;
        }
        const planServices = new PlanServices();
        planServices.getPlanSchedule(tempId, activeDay).then(response => {
            if (response) {
                this.setState({exerciseMealForThisDay :response.result, loader : false });
            }
        })
        return this.state.exerciseMealForThisDay
    }
    componentWillMount() {
        const dataFromLocation = this.props.location.state;
        this.setState({planId: dataFromLocation.planId});
    }
    componentDidMount() {
        const planId = this.state.planId;
        this.getTemplateForDay(planId);
    }

    SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            >
                next
            </div>
        );
    }
    SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block"}}
                onClick={onClick}
            />
        );
    }

    render() {
        const {t } = this.props;
        let {activeDay, mealDataItem, planId, exerciseMealForThisDay, openDetails, openExceriseDetails, ExceriseDataItem} = this.state;
        const settings = {
            dots: false,
            infinite: false,
            speed: 1000,
            slidesToShow: 7,
            slidesToScroll: 7,
            rtl: false,
            draggable:false,
            lazyLoad: true,
            nextArrow: <this.SampleNextArrow />,
            prevArrow: <this.SamplePrevArrow />
        };
        const panes = this.state.exerciseMealForThisDay.length > 0 ? this.state.exerciseMealForThisDay.map(item =>({
            menuItem:
                <Menu.Item key={item.id} activeIndex={item.id} className={this.state.planId === item.id? ' active ':''}  onClick={()=>this.getTemplateForDay(item.id)}>
                    <a className='row'>
                        <div className="col-8"> {item.title}</div>
                        <div className="col-4 text-left"><BsThreeDotsVertical/></div>
                    </a>
                </Menu.Item>,
            render: () =>
                <Tab.Pane attached={false} key={this.state.planId}>
                    {
                        this.state.loader ? <Loader active={true} inline='centered'/> :
                            <>
                                <div className={openDetails || openExceriseDetails ? ' d-none':'' }>
                                    <ToasterComponent />

                                    <div className="heading row">
                                        <div className="col-sm-1 d-flex">
                                            <img src={Report} alt="icon" width="30px" />
                                        </div>
                                        <div className="col-sm-11 ">
                                            <div className="headings d-flex align-items-center">
                                                <h3 className="text-right flex-grow-1"> {t('traineeModal.title')} </h3>
                                                <Link to={""}>
                                                    {t('traineeModal.Calories')}
                                                </Link>
                                            </div>
                                            <div className="dates">
                                                <Slider {...settings}>

                                                    <DateComponent dateNumber={10} dateName={'sun'} />
                                                    <DateComponent dateNumber={11} dateName={'sun'} />
                                                    <DateComponent dateNumber={12} dateName={'sun'} />
                                                    <DateComponent dateNumber={13} isActive={true} dateName={'sun'} />
                                                    <DateComponent dateNumber={14} dateName={'sun'} />
                                                    <DateComponent dateNumber={15} dateName={'sun'}  />
                                                    <DateComponent dateNumber={16} dateName={'sun'} />
                                                    <DateComponent dateNumber={17} dateName={'sun'} />
                                                    <DateComponent dateNumber={18} dateName={'sun'} />
                                                    <DateComponent dateNumber={19} dateName={'sun'} />
                                                    <DateComponent dateNumber={20} dateName={'sun'} />
                                                    <DateComponent dateNumber={21} dateName={'sun'} />
                                                    <DateComponent dateNumber={22} dateName={'sun'} />
                                                    <DateComponent dateNumber={23} dateName={'sun'} />
                                                    <DateComponent dateNumber={24} dateName={'sun'} />
                                                    <DateComponent dateNumber={25} dateName={'sun'} />
                                                    <DateComponent dateNumber={26} dateName={'sun'} />
                                                    <DateComponent dateNumber={27} dateName={'sun'}  />
                                                    <DateComponent dateNumber={28} dateName={'sun'} />
                                                    <DateComponent dateNumber={29} dateName={'sun'} />
                                                    <DateComponent dateNumber={30} dateName={'sun'} />
                                                    <DateComponent dateNumber={31} dateName={'sun'} />
                                                    <DateComponent dateNumber={32} dateName={'sun'} />
                                                    <DateComponent dateNumber={33} dateName={'sun'} />
                                                </Slider>
                                            </div>

                                        </div>
                                    </div>
                                    {
                                        this.state.loading ? <Loader active={true} inline='centered'/> :

                                            <div className="mt-4">
                                                <Tab menu={{secondary: true}} panes={[
                                                    {
                                                        menuItem: t('traineeModal.exercises'),
                                                        render: () =>
                                                            <Tab.Pane attached={false}>
                                                                <ExerciseComponent daysNumber={item.days}
                                                                                   getTemplateForDay2={(e) => this.getTemplateForDay(item.id, this.state.activeDay)}
                                                                                   openDetailsExceriseFunction={(e) => this.setState({
                                                                                       ExceriseDataItem: e,
                                                                                       openExceriseDetails: true
                                                                                   })} exerciseMealData={exerciseMealForThisDay}
                                                                                   planMode={true} planId={item.id} activeDay={activeDay}/>
                                                            </Tab.Pane>,
                                                    },
                                                    {
                                                        menuItem: t('traineeModal.meals'),
                                                        render: () =>
                                                            <Tab.Pane attached={false}>
                                                                <MealComponent  daysNumber={item.days}
                                                                                getTemplateForDay2={(e) => this.getTemplateForDay(item.id, this.state.activeDay)}
                                                                                openDetailsFunction={(e) => this.setState({
                                                                                    mealDataItem: e,
                                                                                    openDetails: true
                                                                                })} activeDay={activeDay} exerciseMealData={exerciseMealForThisDay}
                                                                               planMode={true}  planId={item.id}/>
                                                            </Tab.Pane>,
                                                    },
                                                ]}/>
                                            </div>
                                    }
                                </div>

                                {!openDetails?
                                    '':
                                    <MealItemComponent getTemplateForDay2={(e)=> this.getTemplateForDay(item.id,this.state.activeDay)} parentCall={(e)=> this.setState({openDetails: e})} openDetails={openDetails} mealDataItem={mealDataItem}  mealTitle={mealDataItem.meal.title}  />
                                }
                                {!openExceriseDetails?
                                    '':
                                    <ExceriseItemComponent  parentCallExcersise={(e)=> this.setState({openExceriseDetails: e})} ExceriseDataItem={ExceriseDataItem} openExceriseDetails={openExceriseDetails} getTemplateForDay2={(e)=> this.getTemplateForDay(item.id,this.state.activeDay)}
                                                            planId={item.id}
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
                         activeTab={this.state.planId}  onTabChange={this.handleTabChange}
                    />
                </div>
                <ToasterComponent />
            </>
        );
    }
}

export default withTranslation('translation') (Plan);