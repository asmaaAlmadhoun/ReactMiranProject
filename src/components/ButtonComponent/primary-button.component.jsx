import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react'
class PrimaryButtonComponent extends Component {


    render() {
        const {switchLoading}  = this.props;

        return (
            <button disabled={switchLoading} onClick={(e) => {
                e.preventDefault();
                if(this.props.clickHandler) {
                    this.props.clickHandler();
                }
            }} className="btn btn-primary font-weight-bold">
                {!switchLoading ?  this.props.title : null}
                <Loader active={switchLoading} inline='centered' />
            </button>
        );
    }
}
PrimaryButtonComponent.propTypes = {
    title:PropTypes.string.isRequired,
    clickHandler: PropTypes.func,
    switchLoading : PropTypes.bool
}
export default PrimaryButtonComponent;