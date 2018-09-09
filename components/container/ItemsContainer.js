import React from 'react';
import PropTypes from 'prop-types';

import NavComponent from '../NavComponent';
import Header from '../presentation/Header';
import KitchenItems from '../presentation/KitchenItems';
import ComponentWithHeader from '../componentWithHeader';

import toast from '../../modules/toast'
import axios from "axios";
import C from '../../constants/constants'
import ErrorPage from '../presentation/ErrorPage'
import { connect } from 'react-redux'

const KEYS_TO_FILTERS = ['name'];

import createPlate from '../../actions/createPlate'
import { kitchens, user, plates } from '../../reducers'

const mapStateToProps = state => {
    return {
      kitchens: state.kitchens,
      user: state.user,
      plates: state.plates,
      
    }
};
const mapDispatchToProps = dispatch => ({
    createPlate(auth_token, items, kitchenId) {
        return createPlate(auth_token, items, kitchenId, dispatch)
    }
})

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
            creatingPlate: false
        } 
        this._searchUpdated = this._searchUpdated.bind(this)  
        this._incrementItem = this._incrementItem.bind(this)  
        this._createPlate = this._createPlate.bind(this)   
        this._filterItemsBy = this._filterItemsBy.bind(this)
    }
    
    componentDidMount()
    {
        
        const {user, plates} = this.props
        $('header #right').attr('data-content', `${plates.length}`);
    
        axios.get(`${C.KITCHEN_DETAILS_API}/${this.props.match.params.id}/${this.props.match.params.name}?token=${user.details.auth_token}`)
          .then(response => {
            console.log(response)
            return response
          })
          .then(json => {
            if (json.data.success)
            {
                const {data} = json.data
                
                const items = $.map(data, function(value, index) {
                    return [value];
                });
                const {kitchen} = json.data
                
                this.setState({kitchen, items, loading:false})
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

    async _createPlate() {

        this.setState({creatingPlate:true})
        const { createPlate, user } = this.props
        const { auth_token } = user.details
        const items = this.state.selectedItems
        const { kitchenId } = this.state
        
        
        try {

            const status = await createPlate (auth_token, items, kitchenId)

            if(status){
                toast('Items added!')
                this.props.history.push('../../checkout')
            }
            else 
            {
                toast('Failed to add items')
            }
            this.setState({creatingPlate:false})
            
            
        }
        catch (error){
            console.error(error)
            toast('Failed to add items')
            this.setState({creatingPlate:false})
            
          
        }
    }
    

    render(){
        const {kitchen, items, loading, searchTerm, category, selectedItems, kitchens, creatingPlate} = this.state


        if (kitchens === undefined || kitchens.length < 1) {
            // array empty or does not exist

            return (
                <div>                   
                    <ComponentWithHeader
                    
                        headerProps={{
                            title:"Add Items",
                            showBack:true
        
                        }} 
                        Component={ _ => <ErrorPage message="Sorry! No Item in Kitchen"/> }
                    />
                </div>
            )
        }
        const filteredItems = this.state.items.filter(item => {
           
            if (item.food.toLowerCase().includes(searchTerm.toLowerCase()) && (category == 'All' || category.toLowerCase() == item.category.toLowerCase())) return true
        })

        return(

            <div>

            <ComponentWithHeader 
                
                headerProps={{
                    title:"Add Items",
                    showBack:true

                }}
                Component={ _ => loading ? 
                    <div id="load" style={{backgroundColor:"transparent",opacity:0.9}}>

                            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        
                    </div>
                    :
                    (items.length < 1) ?  

                    <ErrorPage message="Sorry! No Item"/> 
                    
                    : 
                    
                    <KitchenItems 
                        _createPlate={this._createPlate} 
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
                        loading={creatingPlate}
                    />
                    }
            />

            </div>
        )
    }

}

export default connect( mapStateToProps, mapDispatchToProps )( ItemsContainer )