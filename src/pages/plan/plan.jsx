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
            activeDay: '2021-03-20',
            fullTemplateDataForThisDay: [],
            exerciseMealForThisDay: [],
            activeIndex: '',
            loader: true,
            mealDataItem: [],
            ExceriseDataItem: [],
            openDetails: false,
            openExceriseDetails: false,
            loading: false,
            subscription: [],
            traineesId: '',
            planList: '',
            fullData: [],
            calendarDays:[],
        }
    }
    clickNumberHandler= (i,month,year) =>{
        this.setCalendarPlan();
        this.setState({loading: true, activeDay: year+'-'+month+'-'+i})
        const {planId} = this.state;
        this.getTemplateForDay(planId, year+'-'+month+'-'+i);
        this.setState({loading: false});
    }
    getTemplateForDay = (tempId,activeDay) =>{
        const {t} = this.props;
        if(activeDay === undefined){
            activeDay = this.state.activeDay;
        }
        if(tempId === undefined){
            tempId = this.state.planId;
        }
        else {
            this.setState({planId: tempId, traineesId: tempId})
        }
        const planServices = new PlanServices();
        planServices.getPlanSchedule(tempId, activeDay).then(response => {
            if (response) {
                if(response.result && response.result.length){
                    this.setState({exerciseMealForThisDay :response.result[0], loader : false });
                }
                else {
                    this.setState({exerciseMealForThisDay: [], loader: false})
                }
                let fullData= this.state.fullData;
                if(fullData && fullData.length){
                    fullData.map(item => {
                        if(response.result[0] && response.result[0].length){
                            if (response.result[0].subscribtion === item.profile.subscription.id){
                                this.setState({loader : false, subscription: item.profile.subscription, traineesId: item.id });
                                console.log(item.profile.subscription);
                            }
                        }
                    })
                }
            }
        })
        return this.state.exerciseMealForThisDay
    }
    componentWillMount() {
        const dataFromLocation = this.props.location.state;
        this.setState({planId: dataFromLocation.planId, traineesId: dataFromLocation.traineesId, fullData: dataFromLocation.fullData, subscription: dataFromLocation.subscription});
    }
    componentDidMount() {
        const planId = this.state.planId;
        this.getTemplateForDay(planId);
        this.setCalendarPlan();
    }
    setCalendarPlan(){
        let calendarReturned =  this.setCalendar();
        this.setState({calendarReturned: calendarReturned})
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
    getDaysInMonth= (month, year, day) => {
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let d = new Date(year, (month - 1), day);
        return d.getDay();
    }
    daysInMonth= (month, year, day) =>{
        return new Date(year, month, 0).getDate();
    }

    setCalendar= () =>{
        let Component = [];
        let startDateDay = this.state.subscription.start_date.substring(8,11);
        let month= this.state.subscription.start_date.substring(5, 7);
        let secondMonth= parseFloat(month) +1 ;
        let year= this.state.subscription.start_date.substring(0, 4);
        let year2= this.state.subscription.end_date.substring(0, 4);
        let endDateDay = this.state.subscription.end_date.substring(8, 11);
        let daysInMonth = this.daysInMonth(month,year);
        let dayName = this.getDaysInMonth(month,year,startDateDay);
        let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let total_days = this.state.subscription.total_days;
        let calendarDays = this.state.calendarDays;

        for (let i = startDateDay, k=0; i <= total_days , k <= (total_days-startDateDay); i++, k++) {
            calendarDays.push(year+'-'+month+'-'+i+' \n '+week[(dayName  + k) % 7]);
            Component.push(
                <DateComponent isActive={(this.state.activeDay === year+'-'+month+'-'+i)} onClick={(e)=> this.clickNumberHandler(i,month,year)} dateNumber={i} dateName={week[(dayName  + k) % 7]} dateMonth={month} />
            )
            if(i === daysInMonth){
                for (let j = 1, k = ((total_days-startDateDay) +1); j <= endDateDay, k<= total_days; j++, k++) {
                    calendarDays.push(year2+'-'+month+'-'+j +' \n '+week[(dayName  + k) % 7]);
                    Component.push(
                        <DateComponent isActive={(this.state.activeDay === year2+'-'+month+'-'+j)} onClick={(e)=> this.clickNumberHandler(j,month,year2)} dateNumber={j} dateName={week[(dayName  + k) % 7]}  dateMonth={secondMonth}/>
                    )
                }
            }
        }
        setTimeout( ()=>{this.setState({calendarDays: calendarDays})},50)
        return Component
    }

    render() {
        const {t } = this.props;
        let {activeDay, mealDataItem, planId, exerciseMealForThisDay, openDetails, openExceriseDetails, ExceriseDataItem, traineesId, calendarDays, subscription} = this.state;
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
        const panes = this.state.fullData.length > 0 ? this.state.fullData.map(item =>({
            menuItem:
                <Menu.Item key={item.id} activeIndex={item.id} className={this.state.planId === item.id? ' active ':''}  onClick={()=>this.getTemplateForDay(item.id)}>
                    <a className='row'>
                        <div className="col-8"> {item.profile.full_name}</div>
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
                                        <div className="col-sm-12">
                                            <div className="headings d-flex align-items-center">
                                                <img src={Report} alt="icon" className='mx-2' width="20px" />
                                                <h3 className="flex-grow-1"> {t('traineeModal.title')} </h3>
                                                <Link to={""}>
                                                    {t('traineeModal.Calories')}
                                                </Link>
                                            </div>
                                            <div className="dates">
                                                <Slider {...settings}>
                                                    {
                                                       this.state.calendarReturned.map(item => item)
                                                    } 
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
                                                                <ExerciseComponent daysNumber={item.profile.subscription.total_days}  calendarDays={calendarDays}
                                                                                   getTemplateForDay2={(e) => this.getTemplateForDay(item.id, this.state.activeDay)}
                                                                                   openDetailsExceriseFunction={(e) => this.setState({
                                                                                       ExceriseDataItem: e,
                                                                                       openExceriseDetails: true
                                                                                   })} exerciseMealData={exerciseMealForThisDay} traineesId={traineesId}
                                                                                   planMode={true} planId={item.id} activeDay={activeDay}/>
                                                            </Tab.Pane>,
                                                    },
                                                    {
                                                        menuItem: t('traineeModal.meals'),
                                                        render: () =>
                                                            <Tab.Pane attached={false}>
                                                                <MealComponent  daysNumber={item.profile.subscription.total_days} calendarDays={calendarDays}
                                                                                getTemplateForDay2={(e) => this.getTemplateForDay(item.id, this.state.activeDay)}
                                                                                subscription={subscription}
                                                                                openDetailsFunction={(e) => this.setState({
                                                                                    mealDataItem: e,
                                                                                    openDetails: true
                                                                                })} traineesId={traineesId} activeDay={activeDay} exerciseMealData={exerciseMealForThisDay}
                                                                               planMode={true}  planId={item.id}/>
                                                            </Tab.Pane>,
                                                    },
                                                ]}/>
                                            </div>
                                    }
                                </div>

                                {!openDetails?
                                    '':
                                    <MealItemComponent planMode={true} getTemplateForDay2={(e)=> this.getTemplateForDay(item.id,this.state.activeDay)} parentCall={(e)=> this.setState({openDetails: e})} openDetails={openDetails} mealDataItem={mealDataItem}  mealTitle={mealDataItem.meal.title}  />
                                }
                                {!openExceriseDetails?
                                    '':
                                    <ExceriseItemComponent planMode={true}  parentCallExcersise={(e)=> this.setState({openExceriseDetails: e})} ExceriseDataItem={ExceriseDataItem} openExceriseDetails={openExceriseDetails} getTemplateForDay2={(e)=> this.getTemplateForDay(item.id,this.state.activeDay)}
                                                            planId={item.id} traineesId={traineesId}
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