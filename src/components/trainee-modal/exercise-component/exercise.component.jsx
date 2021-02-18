import React, {Component} from 'react';
import QierPlayer from 'qier-player';
import {withTranslation} from "react-i18next";
import './exercise.component.css';
import { FiX, FiMaximize,FiMove } from "react-icons/fi";
import BreakDayComponent from "../../common/empty-page/breakDay.component";
class ExerciseComponent extends Component {
    render() {
        const {t, exerciseMealData}  = this.props;
        return (
            <>
                {exerciseMealData.day.break_day_exercise === false ? [
                    exerciseMealData.day.exercises !== null ?
                        exerciseMealData.day.exercises.map(item =>
                            <>
                                <div className="row" key={item.exercise.exercise_id}>
                                    <div className="col-sm-4">
                                        <div className="video">
                                            <QierPlayer
                                                srcOrigin={'https://testing.miranapp.com/media/'+item.exercise.video}
                                                language="en"
                                                width={200}
                                                height={100}
                                                showVideoQuality={true}
                                                src480p={'https://testing.miranapp.com/media/'+item.exercise.video}
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
                                                <h5> {t('local') === 'ar' ? item.exercise.title_ar : item.exercise.title}</h5>
                                            </li>
                                            <li>
                                                <span className="key">
                                                   {t('progressPage.weight')} ({t('traineeModal.kGram')}) :
                                                </span>
                                                <span className="val">
                                                   {item.weight}
                                                </span>
                                            </li>
                                            <li>
                                                <span className="key">
                                                    {t('traineeModal.Reps')}  :
                                                </span>
                                                <span className="val">
                                                   {item.count}
                                                </span>
                                            </li>
                                            <li>
                                                <span className="key">
                                                   {t('traineeModal.rest')} :
                                                </span>
                                                <span className="val">
                                                     {item.rest_period}
                                                 </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-sm-4">
                                        <div className="icons d-flex flex-row-reverse">
                        <span className="icon delete">
                             <FiX/>
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
                            </>
                        )
                        : <h3> {t('shared.empty')}</h3>
                ]: <BreakDayComponent/>
                }

            </>
        );
    }
}

export default withTranslation('translation') (ExerciseComponent);