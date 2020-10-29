import React, {Component} from 'react';
import { Dropdown } from "semantic-ui-react";
import {withTranslation} from "react-i18next";
import arFlgIco from '../../../assets/icons/ar-flag.png';
import enFlgIco from '../../../assets/icons/en-flg.png';
import './change-language.component.css';
class ChangeLanguageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages : [
                {
                    key : 'ar'  ,
                    text:'عربى' ,
                    value:'ar' ,
                    image : {
                        avatar:true,
                        src : arFlgIco
                    }
                },
                {
                    key : 'en'  ,
                    text:'English' ,
                    value:'en' ,
                    image : {
                        avatar:true,
                        src : enFlgIco
                    }
                }
            ]
        }
    }
    render() {
        const { t } = this.props;
        const isArabic = this.props.i18n.language === 'ar';
        return (
            <div>
                <Dropdown
                    placeholder="change lang"
                    inline
                    options={this.state.languages}
                />
            </div>
        );
    }
}
export default withTranslation('translation') (ChangeLanguageComponent);