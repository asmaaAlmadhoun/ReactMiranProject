import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './input-text.component.css';
/*
* this component represent input text field as dynamic input.
* */
class InputTextComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError : false
        }
    }
    changeHandler = (e) => {
        debugger;
        const value  = e.target.value;
        const isRequired = this.props.isRequired;
        if(value.length === 0 && isRequired) {
            this.setState({hasError : true})
        }else {
            this.setState({hasError : false})
            if(this.props.valueHandler) {
                this.props.valueHandler(e);
            }
        }

    }


    render() {
        const {isPassword} = this.props;
        const {isArabic} = this.props;
        return (
            <div className="form-group miran-primary-input">
                <label> {this.props.labelTitle} </label>
                <input className={this.state.hasError ? 'error-input form-control' : 'form-control'}
                       onBlur={this.changeHandler}  onChange={this.changeHandler} required={this.props.isRequired}
                       name={this.props.name}
                       type={isPassword ? 'password' : 'text'} />
                {
                    this.state.hasError ?
                        <small className="error-title">
                            {this.props.labelTitle } {isArabic ? 'مطلوب !' : 'is required !'}
                        </small> : null
                }
            </div>
        );
    }
}

const classInput = {

}
/*
* component validation
* */
InputTextComponent.propTypes = {

    isRequired : PropTypes.bool.isRequired,
    minLength: PropTypes.number,
    maxLength: PropTypes.number ,
    labelTitle : PropTypes.string.isRequired ,
    isPassword : PropTypes.bool ,
    paceHolderTitle : PropTypes.string,
    name:PropTypes.string,
    valueHandler : PropTypes.func
}

export default InputTextComponent;