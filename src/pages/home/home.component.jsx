import React, {Component} from 'react';
import SideBarComponent from "../../components/common/side-bar/side-bar.component";
import TraineeCardComponent from "../../components/trainee-card-component/trainee-card.component";
import BreadcrumbComponent from "../../components/common/breadcrumb/breadcrumb.component";
import TraineeService from "../../services/trainee-service/traniee.service";
import { Loader } from 'semantic-ui-react'
import TraineeModalComponent from "../../components/trainee-modal/trainee-modal.component";
import {withTranslation} from "react-i18next";
import EmptyComponent from "../../components/common/empty-page/empty.component";

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainees : [],
            isLoading : false,
            openModal : false
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
    openModalHandler = (traineeId) => {
        /*
        * TODO : get trainee id from trainee card component and pass it to modal and fetch specific data which
        *  depends on user id
        */
        debugger;
        this.setState({openModal : true})
    }
    render() {
        const {openModal} = this.state;
        const {t} = this.props;
        return (
            <>
                <TraineeModalComponent isOpen={openModal} />
             <div className="container">


                 <div className="row" style={{marginLeft:0, marginRight:0}}>
                     <div className="col-sm-12">
                         <BreadcrumbComponent title={t('breadcrumb.overview')} />
                     </div>
                     {
                         this.state.isLoading ? <div className="col-sm-12 mt-4">
                             <Loader active={true} inline='centered' />
                         </div> : null
                     }
                     {
                         this.state.trainees.length >0 ?
                              this.state.trainees.map( (item,i) => {
                                  const _isFemale = item.profile && item.profile.gender && item.profile.gender.name === "female";
                                  const _remainingTime = item.profile && item.profile.subscription  ? item.profile.subscription.remaining_days : null;
                                  const _imgPath = item.profile && item.profile.avatar ? 'https://testing.miranapp.com/media/' +  item.profile.avatar : null
                                  return (
                                      <div className="col-md-3 mt-4" key={i}>
                                          <TraineeCardComponent
                                              openModalFn={this.openModalHandler}
                                              isFemale={ _isFemale} imgPath={_imgPath} remainingDays={_remainingTime}  full_name={item.full_name} id={item.id}/>
                                      </div>
                                  );
                              })
                             :
                             <EmptyComponent />
                     }


                 </div>

             </div>
            </>
        );
    }
}

export default withTranslation('translation') (HomeComponent);