import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './progress.component.css';


class progressWaterComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t} = this.props;
        return (
            <>
                Water
            </>
        );
    }
}

export default withTranslation('translation') (progressWaterComponent);