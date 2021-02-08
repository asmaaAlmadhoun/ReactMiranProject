import React, {Component} from "react";
import { Input } from 'semantic-ui-react'
import {withTranslation} from "react-i18next";
import './searchable-list-template.component.css';
import ModalComponent from "../../common/modal/modal.component";
import DetailListItemTemplateComponent from "./detail-list-item-template/detail-list-item-template.component";

class ListItemWithImg extends Component{
    constructor(props) {
        super(props);
        this.state = {
            __addModal__ : false,
            isLoading: false,
            FoodList : []
        }
    }

    showModalHandler =() => {
        this.setState({__addModal__ : true});
    }
    closeModalHandler = () =>  {
        this.setState({__addModal__ : false});
    }
    render () {
        return (
            <React.Fragment>
                <li>
                    <a href="#" className='item' onClick= {() => this.showModalHandler()}>
                        <span>
                            <img src={this.props.image} alt="img"/>
                        </span>
                            <span>{this.props.name}</span>
                    </a>
                </li>
                <ModalComponent size="small" isOpen={this.state.__addModal__} hideAction={true} handleClosed={this.closeModalHandler} >
                    <DetailListItemTemplateComponent key={this.props.id} quantity={this.props.quantity} calories={this.props.calories} fat={this.props.fat}
                                                     image={this.props.image}  protein={this.props.protein} carbs={this.props.carbs}
                                                   />
                </ModalComponent>
            </React.Fragment>
        )
    }
}

class SearchableListWithImgTemplateComponent extends Component {
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
            <div className="SearchableListTemplateComponent-withImg">
                <Input type="text" icon='search' className="search" placeholder={t('traineeModal.searchFor')} onChange={this.searchHandler.bind(this)}/>
                <ul>
                    {
                        List.map((el) => {
                            return <ListItemWithImg key={el.id} quantity={el.quantity} calories={el.calories} fat={el.fat}
                                                    image={el.image}  protein={el.protein} carbs={el.carbs}
                                             name={t('local')==='ar' ? el.title_ar : el.title}
                            />
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default withTranslation('translation')( SearchableListWithImgTemplateComponent );
