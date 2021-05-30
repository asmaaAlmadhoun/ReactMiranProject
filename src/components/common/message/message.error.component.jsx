import React, {Component} from 'react';
import { Message } from 'semantic-ui-react'
import {withTranslation} from "react-i18next";

class MessageErrorComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }


    handleDismiss = () => {
        this.setState({ visible: false })
    }
    render(){
        const {t} = this.props;
        const isArabic = this.props.i18n.language === 'ar';

            return (
                (this.state.visible)?
                        <Message className='text-center'
                            rtl={isArabic} error={this.props.status}
                            content={this.props.content}
                        />
                : ''
            )

    }

}

export default withTranslation("translation") (MessageErrorComponent)
