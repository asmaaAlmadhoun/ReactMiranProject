import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import './detail-list-item-template.component.css';
import {Input} from "semantic-ui-react";

class DetailListItemTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedData: this.props.list,
            ratio : 1
        }
    }
    onChangeGram = e => {
        if(!e)
            return;
        e.preventDefault();
        const value = e.target.value;
        let oldValue = this.props.quantity;
        if (value !== ''){
            this.prepareTotalDataSource(oldValue,value);
        }
        else{
            this.prepareTotalDataSource(oldValue,oldValue);
        }
    }
    prepareTotalDataSource(oldQty,newQty){
        let NewRatio = parseFloat(newQty) / parseFloat(oldQty)
        if(NewRatio.isNaN) {
            return
        }
        this.setState({
            ratio : NewRatio
        });
    }

    render () {
        const {t} = this.props;
        return (
            <div className={t('local')==='ar' ? 'text-right' : ''}>
                <h2>{this.props.title}</h2>
                <div className="row detail-list">
                    <div className="col-sm-12">
                        <img src={this.props.image} alt="image"/>
                    </div>
                    <div className="col-sm-6">
                        <div>
                            <span className="key"> {t('traineeModal.calories')} : </span>
                            <span className="val"> {((parseFloat(this.props.calories)) * this.state.ratio).toFixed(2)}  </span>
                        </div>
                        <div>
                            <span className="key"> {t('traineeModal.fat')} : </span>
                            <span className="val"> {((parseFloat(this.props.fat)) * this.state.ratio).toFixed(2)} </span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div>
                            <span className="key"> {t('traineeModal.carbs')} : </span>
                            <span className="val"> {((parseFloat(this.props.carbs)) * this.state.ratio).toFixed(2)} </span>
                        </div>
                        <div>
                            <span className="key"> {t('traineeModal.protein')} : </span>
                            <span className="val"> {((parseFloat(this.props.protein)) * this.state.ratio).toFixed(2)} </span>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div>
                            <Input type="text" onChange={this.onChangeGram} placeholder={t('templatePage.numberOf')} />
                            <span>{t('traineeModal.gram')}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withTranslation('translation')( DetailListItemTemplateComponent);
