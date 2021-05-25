import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {Image, Loader, Menu, Tab} from 'semantic-ui-react';
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
import PlanService from "../../services/plan-service/plan.service";
import {toast} from "react-toastify";
import tempIco from "../../assets/icons/temp.svg";
import moment from "moment";
let activeDay= moment().format('YYYY-M-D');
class Plan extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            planId : null,
            data: [],
            activeDay: moment().format('YYYY-MM-DD'),
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
            subscriptionData: [],
            slickGoTo: 13,
            dateIndex: 1
        }
    }
    clickNumberHandler= (i,month,year) =>{
        this.setCalendarPlan();
        this.setState({loading: true, activeDay: year+'-'+month+'-'+i})
        activeDay=year+'-'+month+'-'+i
        const {planId} = this.state;
        this.getTemplateForDay(planId, year+'-'+month+'-'+i);
        this.setState({loading: false});
    }
    getTemplateForDay = (tempId,activeDay1) =>{
        const {t} = this.props;
        if(activeDay1 === undefined){
            activeDay1 = activeDay;
        }
        if(tempId === undefined){
            console.log(' long2 ' + tempId)
            tempId = this.state.planId;
        }
        const planServices = new PlanServices();

        planServices.getPlanSchedule(tempId, activeDay1).then(response => {
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
        this.setState({planId: dataFromLocation.planId, traineesId: dataFromLocation.traineesId, fullData: dataFromLocation.fullData, subscription: dataFromLocation.subscription, activeDay: dataFromLocation.subscription.start_date});
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        this._isMounted = true;
        const planId = this.state.planId;
        this.getTemplateForDay(planId);
        this.setCalendarPlan();
        this.getSubscriptionData(this.state.subscription);


    }
    getSubscriptionData = (subscription) =>{
        const planService = new PlanService();
        planService.getSubscriptionData(subscription.subscription_goal_id).then(response => {
            if (response) {
                this.setState({subscriptionData: response.result})
            }
            else {
                this.setState({subscriptionData: {subscription: 1885, id: 336, calories: 0, fat: 0, carbs: 0, protein: 0}})
            }
        })

    }
    setCalendarPlan(){
        let calendarReturned =  this.setCalendar();
        this.setState({calendarReturned: calendarReturned})
        calendarReturned.map((item,index) =>{
            if (item.props.dateYear+'-'+item.props.dateMonth+'-'+item.props.dateNumber===activeDay){
                this.setState({dateIndex:index})
            }
        })
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
                <DateComponent isActive={activeDay === year+'-'+month+'-'+i} onClick={(e)=> {activeDay=year+'-'+month+'-'+i;this.clickNumberHandler(i,month,year)}} dateNumber={i} dateName={week[(dayName  + k) % 7]} dateYear={year} dateMonth={month} />
            )
            if(i === daysInMonth){
                for (let j = 1, k = ((total_days-startDateDay) +1); j <= endDateDay, k<= total_days; j++, k++) {
                    calendarDays.push(year2+'-'+secondMonth+'-'+j +' \n '+week[(dayName  + k) % 7]);
                    Component.push(
                        <DateComponent isActive={activeDay === year2 + '-' + secondMonth + '-' + j} onClick={(e)=> {activeDay=year2+'-'+secondMonth+'-'+j;this.clickNumberHandler(j,secondMonth,year2)}} dateYear={year2} dateNumber={j} dateName={week[(dayName  + k) % 7]} dateMonth={secondMonth}/>
                    )
                }
            }
        }
        setTimeout( ()=>{this.setState({calendarDays: calendarDays})},50)
        return Component
    }

    render() {
        const {t } = this.props;
        let {activeDay, mealDataItem, planId, exerciseMealForThisDay, subscriptionData,openDetails, openExceriseDetails, ExceriseDataItem, traineesId, calendarDays, subscription} = this.state;
        const settings = {
            dots: false,
            infinite: false,
            speed: 1000,
            slidesToShow: 7,
            slidesToScroll: 7,
            rtl: false,
            draggable:false,
            lazyLoad: true,
            slickGoTo: this.state.slickGoTo || 0,
            nextArrow: <this.SampleNextArrow />,
            prevArrow: <this.SamplePrevArrow />
        };
        const panes = this.state.fullData.length > 0 ? this.state.fullData.map(item =>({
            menuItem:
                <Menu.Item key={item.id} activeIndex={item.id} className={['' + this.state.planId === item.id? ' active ':'']}  onClick={()=>this.getTemplateForDay(item.id)}>
                    <a className='row'>
                        <div className="col-8"> {item.profile.full_name}</div>
                        <div className="col-4 text-left"><BsThreeDotsVertical/></div>
                    </a>
                </Menu.Item>,
            render: () =>
                <Tab.Pane attached={false} key={this.state.planId} className='containerTab'>
                    {
                        this.state.loader ? <Loader active={true} inline='centered'/> :
                            <>
                                <div className={openDetails || openExceriseDetails ? ' d-none':'' }>
                                    <ToasterComponent />
                                    <h1 className='mb-3 bg-light text-center p-3'>
                                        <Image src={tempIco} className='icon d-inline mx-3' width={25} />
                                        {item.profile.full_name}
                                    </h1>
                                    <div className="heading row">
                                        <div className="col-sm-12">
                                            <div className="headings d-flex align-items-center mb-3">
                                                <img src={Report} alt="icon" className='mx-2' width="20px" />
                                                <h3 className="flex-grow-1"> {t('traineeModal.title')} </h3>
                                                {/*<Link to={""}>*/}
                                                {/*    {t('traineeModal.Calories')}*/}
                                                {/*</Link>*/}
                                                <div className='d-none'>
                                                {
                                                    setTimeout(()=>{
                                                        return(
                                                                <button className='btn btn-secondary w-25 m-auto' ref={button => this.button = button} onClick={this.slider.slickGoTo(this.state.dateIndex)}>{t('progressPage.day')}</button>
                                                        )
                                                    },100)
                                                }
                                                </div>

                                            </div>

                                            <div className="dates">
                                                <Slider ref={slider => (this.slider = slider)} {...settings}>
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
                                                                                getTemplateForDay2={(e) => this.getTemplateForDay()}
                                                                                subscriptionData={subscriptionData}
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
                                    <MealItemComponent planMode={true} getTemplateForDay2={(e)=> this.getTemplateForDay()} parentCall={(e)=> {this.setState({openDetails: e}); toast.done(t('shared.success.addedSuccess'))}} openDetails={openDetails} mealDataItem={mealDataItem}  mealTitle={mealDataItem.meal.title}  />
                                }
                                {!openExceriseDetails?
                                    '':
                                    <ExceriseItemComponent planMode={true}  parentCallExcersise={(e)=> this.setState({openExceriseDetails: e})} ExceriseDataItem={ExceriseDataItem} openExceriseDetails={openExceriseDetails} getTemplateForDay2={(e)=> this.getTemplateForDay()}
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
                    />
                </div>
                <ToasterComponent />
            </>
        );
    }
}

export default withTranslation('translation') (Plan);