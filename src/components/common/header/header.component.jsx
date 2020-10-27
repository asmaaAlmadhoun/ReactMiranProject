import React from 'react';
import  './header.component.css';
import InputTextComponent from "../../InputTextComponent/input-text.component";
import {withTranslation} from "react-i18next";
class HeaderComponent extends React.PureComponent {
    render() {
        const {t} = this.props;

        return (
          <div className="header-app" >
              <div className="row">
                  <div className="col-md-7">
                     <div className="row">
                         <div className="col-sm-8">
                             <div className="form-group search-container">
                                 <input type="text"
                                        className="form-control"
                                        placeholder={t('header.searchTitle')}/>
                             </div>
                         </div>
                         <div className="col-sm-4">

                         </div>
                     </div>
                  </div>
                  <div className="col-md-5">
                      second
                  </div>

              </div>
          </div>
        );
    }
}

export default withTranslation("translation")( HeaderComponent);