import React, {Component} from 'react';
import QierPlayer from 'qier-player';
import {withTranslation} from "react-i18next";
import './exercise.component.css';
import { FiX } from "react-icons/fi";
import  {FiMaximize} from "react-icons/fi";
import  {FiMove} from "react-icons/fi";
class ExerciseComponent extends Component {
    render() {
        const {t}  = this.props;
        return (
            <div className="row">
               <div className="col-sm-4">
                   <div className="video">
                       <QierPlayer
                           srcOrigin="http://www.w3schools.com/html/mov_bbb.mp4"
                           language="en"
                           width={200}
                           height={100}
                           showVideoQuality={true}
                           src480p={'http://www.w3schools.com/html/mov_bbb.mp4'}
                           src1080p={''}
                           src720p={null}
                           src2k={''}
                           src4k={''}
                           themeColor="#00a4f8"
                       />
                   </div>
               </div>
                <div className="col-md-4">
                    <ul className={t('local') === 'ar' ? ' data text-right' : 'data'} >
                        <li>
                          <h5> Jumping Rope </h5>
                        </li>
                        <li>
                            <span className="key">
                                Weight (Kg) :
                            </span>
                        </li>
                        <li>
                            <span className="key">
                                Reps :
                            </span>
                            <span className="val">
                                0
                            </span>
                        </li>
                        <li>
                            <span className="key">
                                Rest Period :
                            </span>
                            <span className="val">

                            </span>
                        </li>
                    </ul>
                </div>

                <div className="col-sm-4">
                    <div className="icons d-flex flex-row-reverse">
                        <span className="icon delete">
                             <FiX />
                        </span>
                        <span className="icon max">
                            <FiMaximize />
                        </span>
                        <span className="icon move">
                            <FiMove />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation('translation') (ExerciseComponent);