import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PrimaryButtonComponent extends Component {

    render() {
        return (
            <button onClick={(e) => {
                e.preventDefault();
                if(this.props.clickHandler) {
                    this.props.clickHandler();
                }
            }} className="btn btn-primary font-weight-bold">
                {this.props.title}
            </button>
        );
    }
}
PrimaryButtonComponent.propTypes = {
    title:PropTypes.string.isRequired,
    clickHandler: PropTypes.func
}
export default PrimaryButtonComponent;