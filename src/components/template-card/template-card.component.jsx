import React, {Component} from 'react';
import PenWriteIco from '../../assets/icons/pen_write.svg';
import PropTypes from 'prop-types';
import {withTranslation} from "react-i18next";
import  './template-card.component.css';
import { FiX } from "react-icons/fi";
class TemplateCardComponent extends Component {
    render() {
        const {t} = this.props;
        return (
            <div className="template-card">
               <div className="content">
                   <div className="ico">
                       <img src={PenWriteIco} alt="icon"  />
                   </div>
                   <div className="temp-name">
                       <span> {this.props.tempName} </span>
                   </div>
                   <div className="action">
                       <button className="btn" style={{borderRadius:'50px'}}>
                           {t('templatePage.assign')}
                       </button>
                   </div>
               </div>
                <div className="delete-icon" onClick={e => {
                    const {deleteFn , id} = this.props;
                    if(deleteFn) {
                        deleteFn(id);
                    }
                }}>
                    <span> <FiX /> </span>
                </div>
            </div>
        );
    }
}

TemplateCardComponent.propTypes = {
    id:PropTypes.number.isRequired,
    tempName : PropTypes.string.isRequired,
    deleteFn: PropTypes.func
}

export default withTranslation('translation') (TemplateCardComponent);