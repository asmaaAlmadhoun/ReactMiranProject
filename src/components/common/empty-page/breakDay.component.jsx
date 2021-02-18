import React, {Component} from 'react';
import EmptyPage from "../../../assets/icons/breakDay.png";

class BreakDayComponent extends Component {
    render() {
        return (
            <div className="text-center mt-4" style={{width:'100%'}}>
                <img src={EmptyPage} alt="empty"
                     style={{
                         width:'500px'
                }} />
            </div>
        );
    }
}

export default BreakDayComponent;