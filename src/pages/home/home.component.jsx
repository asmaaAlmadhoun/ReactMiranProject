import React, {Component} from 'react';
import SideBarComponent from "../../components/common/side-bar/side-bar.component";
import TraineeCardComponent from "../../components/trainee-card-component/trainee-card.component";
import BreadcrumbComponent from "../../components/common/breadcrumb/breadcrumb.component";
import TraineeService from "../../services/trainee-service/traniee.service";
import { Loader } from 'semantic-ui-react'
import TraineeModalComponent from "../../components/trainee-modal/trainee-modal.component";

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainees : [],
            isLoading : false
        }
    }

    componentWillMount() {
        const traineeService  = new TraineeService();
        this.setState({isLoading : true})
        traineeService.trainees.then(data => {
            this.setState({isLoading : false})
            console.log("trainees" , data);
            if(data && data.status) {
                this.setState({trainees : data.result})
            }
        }).catch(error => {
            this.setState({isLoading : false})
        })
    }

    render() {
        return (
            <>
             <div className="container">


                 <div className="row" style={{marginLeft:0, marginRight:0}}>
                     <div className="col-sm-12">
                         <BreadcrumbComponent title="عام" />
                     </div>
                     {
                         this.state.isLoading ? <div className="col-sm-12 mt-4">
                             <Loader active={true} inline='centered' />
                         </div> : null
                     }
                     {
                         this.state.trainees.length >0 ?
                              this.state.trainees.map(item => {
                                  const _isFemale = item.profile && item.profile.gender && item.profile.gender.name === "female";
                                  const _remainingTime = item.profile && item.profile.subscription  ? item.profile.subscription.remaining_days : null;
                                  const _imgPath = item.profile ? item.profile.avatar : null
                                  return (
                                      <div className="col-md-3 mt-4">
                                          <TraineeCardComponent isFemale={ _isFemale} imgPath={_imgPath} remainingDays={_remainingTime}  full_name={item.full_name} id={item.id}/>
                                      </div>
                                  );
                              })
                             :null
                     }


                 </div>
                 <TraineeModalComponent />
             </div>
            </>
        );
    }
}

export default HomeComponent;