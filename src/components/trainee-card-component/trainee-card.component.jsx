import React, {Component} from 'react';
import './trainee-card.component.css';
import PropTypes from "prop-types";
import  userProfile from '../../assets/icons/user-profile.jpg';
import  reportIco from '../../assets/icons/report-01.svg'
import tempIco from '../../assets/icons/temp.svg'
class TraineeCardComponent extends Component {

    render() {
        let {imgPath ,username , remainingDays} = this.props;
        if(!imgPath)
            imgPath = userProfile;
        return (
            <div className="trainee-card">
                <div className="user-img">
                    <img src={imgPath} width="56px"  alt={"user image"}   />
                </div>
                <div className="user-name">
                     <span> {username} </span>
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
    username: PropTypes.string.isRequired,
    imgPath : PropTypes.string,
    remainingDays : PropTypes.number,
}
export default TraineeCardComponent;