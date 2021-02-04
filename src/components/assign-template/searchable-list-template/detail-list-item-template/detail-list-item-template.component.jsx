import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import './detail-list-item-template.component.css';
import {Input} from "semantic-ui-react";

class DetailListItemTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedData: this.props.list
        }
    }

    render () {
        const {t} = this.props;
        return (
            <div className={t('local')==='ar' ? 'text-right' : ''}>
                <h2>{this.props.title}</h2>
                <div className="row">
                    <div className="col-sm-6">
                        <div>
                            <span className="key"> {t('traineeModal.calories')} : </span>
                            <span className="val"> {this.props.calories}  </span>
                        </div>
                        <div>
                            <span className="key"> {t('traineeModal.fat')} : </span>
                            <span className="val"> {this.props.fat}  </span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div>
                            <span className="key"> {t('traineeModal.carbs')} : </span>
                            <span className="val"> {this.props.carbs}  </span>
                        </div>
                        <div>
                            <span className="key"> {t('traineeModal.protein')} : </span>
                            <span className="val"> {this.props.protein}  </span>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div>
                            <Input type="text" placeholder={t('templatePage.numberOf')} />
                            <span>g</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withTranslation('translation')( DetailListItemTemplateComponent);
