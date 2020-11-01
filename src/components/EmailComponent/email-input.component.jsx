import React, {Component} from 'react';
import PropTypes from "prop-types";
import InputTextComponent from "../InputTextComponent/input-text.component";

class EmailInputComponent extends Component {
    constructor(props) {
        super(props);
       this.state = {
           hasError : false,
           isEmailNotValid : false
       }
    }
    changeHandler = e => {
        debugger
        const value = e.target.value;
        const isRequired = this.props.isRequired;
        if(value.length === 0 && isRequired ) {
            this.setState({hasError :true,isEmailNotValid : false })
            if(this.props.validationFn) {
                this.props.validationFn(false);
            }
        }else {
            const isEmailValid  =  this.emailValidate(value);
            if(isEmailValid === false) {
                this.setState({isEmailNotValid : true , hasError:true})
                if(this.props.validationFn) {
                    this.props.validationFn(false);
                }
            }else {
                this.setState({hasError :false , isEmailNotValid : false })
                if(this.props.valueHandler) {
                    this.props.valueHandler(e);
                }
                if(this.props.validationFn) {
                    this.props.validationFn(true);
                }
            }
        }
    }

    showError = (show)  =>  {
        this.setState({hasError : show})
    }
    emailValidate  = (val) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val);
    }
    render() {
        const {isArabic} = this.props;
        return (
            <div className="form-group miran-primary-input">
                <label> {isArabic ? 'البريد الألكترونى' : 'Email'} </label>
                <input  type="email"
                        className={this.state.hasError  ? 'error-input form-control' : 'form-control'}
                        onBlur={this.changeHandler}
                        name={this.props.name ? this.props.name : 'email'}
                        required={this.props.isRequired}/>
                {
                    this.state.hasError  && !this.state.isEmailNotValid?
                        <small className="error-title">
                            {this.props.labelTitle } {isArabic ? 'البريد الألكترونى مطلوب !' : 'Email is Required !'}
                        </small> : null
                }
                {
                    this.state.hasError  && this.state.isEmailNotValid?
                        <small className="error-title">
                            {this.props.labelTitle } {isArabic ? 'إدخل البريد الألكترونى بشكل صحيح !' : 'Email is not' +
                            ' Valid !'}
                        </small> : null
                }
            </div>
        );
    }
}

EmailInputComponent.propTypes = {
    isRequired : PropTypes.bool.isRequired,
    paceHolderTitle : PropTypes.string,
    name: PropTypes.string,
    valueHandler : PropTypes.func,
    validationFn : PropTypes.func
}
export default EmailInputComponent;