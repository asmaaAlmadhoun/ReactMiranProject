import React, {Component} from "react";
import { Input } from 'semantic-ui-react'
import {withTranslation} from "react-i18next";
import './searchable-list-template.component.css';

class ListItem extends Component{
    render () {
        return (
            <li>
                <span>{this.props.name}</span>
            </li>
        )
    }
}

class SearchableListTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedData: this.props.list
        }
    }
    searchHandler (event) {
        let searchjQuery = event.target.value.toLowerCase(),
            displayedData = this.props.list.filter((el) => {
                let searchValue = el.name.toLowerCase();
                return searchValue.indexOf(searchjQuery) !== -1;
            })
        this.setState({
            displayedData: displayedData
        })
    }
    render () {
        const {t} = this.props;
        let List = this.state.displayedData;
        return (
            <div className="SearchableListTemplateComponent">
                <Input type="text" icon='search' className="search" placeholder={t('traineeModal.searchFor')} onChange={this.searchHandler.bind(this)}/>
                <ul>
                    {
                        List.map((el) => {
                            return <ListItem key={el.id}
                                             category={el.category}
                                             name={t('local')==='ar' ? el.title_ar : el.title}
                            />
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default withTranslation('translation')( SearchableListTemplateComponent);
