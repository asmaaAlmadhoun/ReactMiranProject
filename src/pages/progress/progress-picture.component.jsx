import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './progress.component.css';
import UserService from "../../services/user-service/user.service";
import {toast} from "react-toastify";
import UserVersionServices from "../../services/user-service/user-version.services";
import {Loader} from "semantic-ui-react";


class progressPictureComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            pictureHistory: [],
            loader: true
        }
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
                this.setState({loader:false,pictureHistory:response.result})
            }else {
            }
        }).catch(error => {
            // todo: handling error.
            toast.error("Error")
        });
    }
    render() {
        const {t} = this.props;
        const {pictureHistory} = this.state;
        return (
            this.state.loader ? <Loader active={true} inline='centered'/> :
            <>
                <h3 className='text-primary f-3'>{t('progressPage.pictureChanges')}</h3>
                <div className="row mt-3 text-center">
                    <div className="col-sm-3 mb-2">
                    </div>
                    <div className="col-sm-3 mb-2">
                        <h4>{t('progressPage.back')}</h4>
                    </div>
                    <div className="col-sm-3 mb-2">
                        <h4>{t('progressPage.front')}</h4>
                    </div>
                    <div className="col-sm-3 mb-2">
                        <h4>{t('progressPage.side')}</h4>
                    </div>
                    {
                        pictureHistory.map(items => {
                            return <>
                                <div className="col-sm-3 my-1 progress-picture-date">
                                    <p>{items.date}</p>
                                </div>
                                {items.pucket.map(item =>{
                                    return<>
                                        <div className="col-sm-3 my-2">
                                            <img src={'https://miranapp.com/media/resources/'+item.image} className='w-75 m-auto progress-picture' id={item.id}/>
                                        </div>
                                    </>
                                })}
                            </>
                        })
                    }

                </div>

            </>
        );
    }
}

export default withTranslation('translation') (progressPictureComponent);