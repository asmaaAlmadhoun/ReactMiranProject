import React, {Component} from "react";
import { Input } from 'semantic-ui-react'
import {withTranslation} from "react-i18next";
import './searchable-list-template.component.css';

class Contact extends Component{
    render () {
        return (
            <li>
                <img src={this.props.image} alt="img"/>
                <span>{this.props.name}</span>
                <span className="phone">{this.props.phone}</span>
            </li>
        )
    }
}

class SearchableListTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedContacts: this.props.contact
        }
    }
    searchHandler (event) {
        let searchjQuery = event.target.value.toLowerCase(),
            displayedContacts = this.props.contact.filter((el) => {
                let searchValue = el.name.toLowerCase();
                return searchValue.indexOf(searchjQuery) !== -1;
            })
        this.setState({
            displayedContacts: displayedContacts
        })
    }
    render () {
        const {t} = this.props;
        let contacts = this.state.displayedContacts;
        return (
            <div className="SearchableListTemplateComponent">
                <Input type="text" icon='search' className="search" placeholder={t('traineeModal.searchFor')} onChange={this.searchHandler.bind(this)}/>
                <ul>
                    {
                        contacts.map((el) => {
                            return <Contact key={el.id}
                                            name={el.name}
                                            image={el.image}
                                            phone={el.phoneNumber}
                            />
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default withTranslation('translation')( SearchableListTemplateComponent);
