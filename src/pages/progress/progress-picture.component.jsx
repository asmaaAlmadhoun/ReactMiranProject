import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './progress.component.css';
import UserService from "../../services/user-service/user.service";
import {toast} from "react-toastify";
import UserVersionServices from "../../services/user-service/user-version.services";


class progressPictureComponent extends Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.userPicturesHistory(this.props.traineesId)
    }

    userPicturesHistory = (traineesId) =>{
        const {t} = this.props;
        const userService  = new UserVersionServices();
        userService.userPicturesHistory(traineesId).then(response => {
            this.setState({isLoading : false})
            console.log(response)
            if(response.status) {
                console.log(response)
            }else {
            }
        }).catch(error => {
            // todo: handling error.
            toast.error("Error")
        });
    }
    render() {
        const {t} = this.props;
        return (
            <>
                <h3 className='text-primary f-3'>{t('progressPage.pictureChanges')}</h3>

            </>
        );
    }
}

export default withTranslation('translation') (progressPictureComponent);