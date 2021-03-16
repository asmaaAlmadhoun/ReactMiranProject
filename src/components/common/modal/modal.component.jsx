import React, {Component} from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types';
class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
            size : 'small',
        }
    }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     const {isOpen} = this.props;
    //     this.setState({isOpen})
    // }

    render() {
        const  {isOpen} = this.props;
        const  {size} = this.props;
        return (
            <Modal
                centered={true}
                onClose={() => {
                    // this.setState({isOpen:false});
                     const {handleClosed} = this.props;
                    if(handleClosed) {
                        handleClosed();
                    }
                }}
                size={size}
                open={ isOpen} className={this.props.modalCenter?' modal-center ':' mb-2 '}
            >
                <Modal.Content scrolling={this.props.modalScrolling}>
                    {this.props.children}
                </Modal.Content>
                {
                    !this.props.hideAction ?
                    <Modal.Actions>
                        {this.props.Actions}
                    </Modal.Actions> : null
                }

            </Modal>
        );
    }
}
ModalComponent.propTypes = {
    isOpen : PropTypes.bool.isRequired,
    modalCenter : PropTypes.bool,
    modalScrolling : PropTypes.bool,
    size : PropTypes.string,
    Actions: PropTypes.element,
    hideAction:PropTypes.bool,
    handleClosed: PropTypes.func
}

export default ModalComponent;