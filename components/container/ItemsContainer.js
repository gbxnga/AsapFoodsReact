import React from 'react'
import PropTypes from 'prop-types'

import NavComponent from '../NavComponent'
import Header from '../presentation/Header'
import KitchenItems from '../presentation/KitchenItems'

import toast from '../../modules/toast'
import axios from "axios";
import C from '../../constants/constants'
import ErrorPage from '../presentation/ErrorPage'

const KEYS_TO_FILTERS = ['name'];


class ItemsContainer extends React.Component
{
    constructor(props)
    {
        super(props)

        const { params } = this.props.match

        this.state = {
            kitchens: {},
            items: [],
            loading: true,
            selectedItems:[],
            kitchen:{},
            searchTerm: '',
            category:'All',
            kitchenId: params ? params.id : null,
            kitchenName: params ? params.name : null,
        } 
        this._searchUpdated = this._searchUpdated.bind(this)  
        this._incrementItem = this._incrementItem.bind(this)  
        this._createPlate = this._createPlate.bind(this)   
        this._filterItemsBy = this._filterItemsBy.bind(this)
    }
    componentWillMount()
    {
        
        const {user} = this.context.store.getState()
    
        axios.get(`${C.KITCHEN_DETAILS_API}/${this.props.match.params.id}/${this.props.match.params.name}?token=${user.details.auth_token}`)
          .then(response => {
            console.log(response)
            return response
          })
          .then(json => {
            if (json.data.success)
            {
                let myObj = json.data.data
                
                let array = $.map(myObj, function(value, index) {
                    return [value];
                });
                let kitchen = json.data.kitchen
                let items = array
                this.setState({kitchen:kitchen, items:items, loading:false})
            }
            else
            {
                this.setState({kitchens:[],loading:false, kitchenName:this.props.match.params.name})
                
                console.log('kitchens empty')
                //this.state.kitchens = []                
            }
          })
          .catch((error) => {
              console.log(` ${error}`)
          });
    }

    _filterItemsBy(value){
         this.setState({category:value})
    }

    _incrementItem(id, type = "plus") {

        let isUpdate = false;
        let {
            selectedItems
        } = this.state
        let initialState = selectedItems
        let newState = []

        newState = initialState.map(myObj => {

            // filter the item to be increases/decreased from selectedItems 
            if (myObj.id == id && myObj.quantity != 0) {

                // if object is found, it means is an update of its quantity
                isUpdate = true;

                myObj.quantity = (type === "plus") ? myObj.quantity + 1 : myObj.quantity - 1
            }
            return myObj
        })
        let filteredNewState = newState.filter((object) => {
            if (object.quantity > 0) return true;
        });

        if (!isUpdate && type == "plus") {
            let item = {
                id: id,
                quantity: 1
            }
            initialState.push(item)
        } else if (type == "minus") console.log('its minus, ot updating!!')
        console.log(filteredNewState)
        this.setState({
            selectedItems: (isUpdate) ? filteredNewState : initialState
        })




        //alert(JSON.stringify(this.state.selectedItems))
    }
    _searchUpdated(term = "") {
        this.setState({
            searchTerm: term
        })
    }
    _createPlate() {
        //this.setState({loading: true})
        $('#create-plate-form button').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');
        let formData = new FormData();
        const { user } = this.context.store.getState()

        formData.append("token", user.details.auth_token);
        formData.append("kitchen_id", this.state.kitchenId)
        //formData.append("kitchen_id", 4)

        //let array = $('#create-plate-form').serializeArray()

        this.state.selectedItems.map((item) => {console.log(item);formData.append(item.id, item.quantity)})

        console.log(this.state.selectedItems)
        console.log(user)

        axios.post(`${C.CREATE_PLATE_API}?token=${user.details.auth_token}`, formData)
            .then(response => {
                console.log(response)
                return response
            })
            .then(json => {
                if (json.data.success) {
                    toast('Items added!')
                    this.props.history.push('../../checkout')
                } else {
                    toast('Failed to add items')
                }
                $("#create-plate-form button").removeAttr("disabled").html('<span class="glyphicon glyphicon-plus"></span> Add Items to Plate');
            })
            .catch((error) => {
                console.log(` ${error}`)
                $("#create-plate-form button").removeAttr("disabled").html('<span class="glyphicon glyphicon-plus"></span> Add Items to Plate');
            });
    }
    
    componentDidMount()
    {
        const {plates} = this.context.store.getState()
        $('header #right').attr('data-content', `${plates.length}`);
    }
    render(){
        const {kitchen, items, loading, searchTerm, category, selectedItems, kitchens} = this.state
        const {openNav, closeNav, createPlate} = this.context

        if (kitchens === undefined || kitchens.length == 0) {
            // array empty or does not exist

            return (
                <div>
                <NavComponent closeNav={closeNav}/>
                <Header title="Add Items" openNav={openNav}/>
                <ErrorPage message="Sorry! No Item in Kitchen"/>
                </div>
            )
        }
        const filteredItems = this.state.items.filter(item => {
           
            if (item.food.toLowerCase().includes(searchTerm.toLowerCase()) && (category == 'All' || category.toLowerCase() == item.category.toLowerCase())) return true
        })
        return(
            


            
            <div>
            
            <NavComponent closeNav={closeNav}/>
            <Header showBack={true}  title='Add Items' openNav={openNav}/>
            {(loading) ? 
            <div id="load" style={{backgroundColor:"transparent",opacity:0.9}}>
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                
            </div>
            :
            (items.length == 0) ?         
            <ErrorPage message="Sorry! No Item"/> : <KitchenItems _createPlate={this._createPlate} 
                                                                  _searchUpdated={this._searchUpdated} 
                                                                  filterItem={this.filterItem} 
                                                                  filter={this.filter} 
                                                                  createPlate={createPlate} 
                                                                  kitchen={kitchen} 
                                                                  items={filteredItems}
                                                                  _incrementItem={this._incrementItem}
                                                                  selectedItems={selectedItems}
                                                                  _filterItemsBy={this._filterItemsBy}
                                                                  category={category}
                                                    />
            }
            
            </div>
        )
    }

}
ItemsContainer.contextTypes = {
    store: PropTypes.object,
    openNav: PropTypes.func,
    closeNav: PropTypes.func,
    createPlate: PropTypes.func
}

module.exports = ItemsContainer;