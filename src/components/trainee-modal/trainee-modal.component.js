import React, {Component} from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import ModalComponent from "../common/modal/modal.component";
import Report from '../../assets/icons/report-01.svg';
import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import  './trainee-modal.css';
import DateComponent from "./dates-components/date.component";
class TraineeModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        }
    }
    render() {
        const {t} = this.props;
        return (
            <div>
                <ModalComponent isOpen={true}  Actions={<div>
                    actions
                </div>}>

                   <div className="planing-schedule">
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
                                   <DateComponent dateName={11} dateNumber={'Sun'}/>
                                   <DateComponent dateName={12} dateNumber={'Sun'}/>
                                   <DateComponent dateName={13} dateNumber={'Sun'}/>
                                   <DateComponent dateName={14} dateNumber={'Sun'} isActive={true}/>
                                   <DateComponent dateName={15} dateNumber={'Sun'}/>
                                   <DateComponent dateName={16} dateNumber={'Sun'}/>
                                   <DateComponent dateName={17} dateNumber={'Sun'}/>
                               </div>
                           </div>
                       </div>
                   </div>
                </ModalComponent>
            </div>
        );
    }
}

export default  withTranslation('translation')(TraineeModalComponent);