import React, {Component} from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types';
class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        }
    }
    componentWillMount() {
        const {isOpen} = this.props;
        if(isOpen)
            this.setState({isOpen});
    }

    render() {
        return (
            <Modal
                centered={true}
                onClose={() => this.setState({isOpen:false})}
                onOpen={() => this.setState({isOpen: true})}
                size="small"
                open={this.state.isOpen}
                style={{height:'auto' , position:'absolute' , top:'50%' , left:'50%' , transform:'translate(-50%,-50%)'}}
            >
                <Modal.Content>
                    {this.props.children}
                </Modal.Content>

                <Modal.Actions>
                    {this.props.Actions}
                </Modal.Actions>
            </Modal>
        );
    }
}
ModalComponent.propTypes = {
    isOpen : PropTypes.bool.isRequired,
    Actions: PropTypes.element
}

export default ModalComponent;