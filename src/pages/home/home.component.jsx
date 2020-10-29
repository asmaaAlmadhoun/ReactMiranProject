import React, {Component} from 'react';
import SideBarComponent from "../../components/common/side-bar/side-bar.component";
import TraineeCardComponent from "../../components/trainee-card-component/trainee-card.component";
import BreadcrumbComponent from "../../components/common/breadcrumb/breadcrumb.component";

class HomeComponent extends Component {
    render() {
        return (
            <>
             <div className="container">
                 <div className="row" style={{marginLeft:0, marginRight:0}}>
                     <div className="col-sm-12">
                         <BreadcrumbComponent title="عام" />
                     </div>
                     <div className="col-md-3 mt-4">
                         <TraineeCardComponent username={"ay haga"} />
                     </div>
                     <div className="col-md-3 mt-4">
                         <TraineeCardComponent username={"ay haga"} />
                     </div>
                     <div className="col-md-3 mt-4">
                         <TraineeCardComponent username={"ay haga"} />
                     </div>
                     <div className="col-md-3 mt-4">
                         <TraineeCardComponent username={"ay haga"} />
                     </div>

                 </div>
             </div>
            </>
        );
    }
}

export default HomeComponent;