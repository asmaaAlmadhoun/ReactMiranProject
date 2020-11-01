import React, {Component} from 'react';
import './trainee-card.component.css';
import PropTypes from "prop-types";
import  userProfileMale from '../../assets/icons/user-profile.jpg';
import  userProfileFemale from '../../assets/images/femaleImage.jpg';
import  reportIco from '../../assets/icons/report-01.svg'
import tempIco from '../../assets/icons/temp.svg'
class TraineeCardComponent extends Component {

    render() {
        let {imgPath ,full_name , remainingDays , isFemale} = this.props;
        if(!imgPath)
            imgPath = isFemale ?userProfileFemale  :userProfileMale ;
        return (
            <div className="trainee-card">
                <div className="user-img">
                    <img src={imgPath} width="56px"  alt={"user image"}   />
                </div>
                <div className="user-name">
                     <span> {full_name} </span>
                </div>
                <div className="remaining-days">
                    <span>
                        {remainingDays ? remainingDays : 'Unknown'}
                    </span>
                </div>
                <div className="action-icons d-flex justify-content-center">
                    <div className="ico">
                        <img src={reportIco}  alt="icon" />
                    </div>
                    <div className="ico">
                        <img src={tempIco}  alt="icon" />
                    </div>
                </div>
            </div>
        );
    }
}
TraineeCardComponent.propTypes = {
    id:PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
    imgPath : PropTypes.string,
    isFemale: PropTypes.bool ,
    remainingDays : PropTypes.number,
}
export default TraineeCardComponent;