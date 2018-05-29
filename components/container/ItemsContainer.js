import React from 'react'
import PropTypes from 'prop-types'

import NavComponent from '../NavComponent'
import Header from '../presentation/Header'
import KitchenItems from '../presentation/KitchenItems'

import toast from '../../modules/toast'
import axios from "axios";
import C from '../../constants/constants'

class ItemsContainer extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            kitchens: {},
            items: [],
            loading: true,
            selectedItems:[],
            kitchen:{},
            searchTerm: '',
            category:'All'
        }        
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
                console.log('kitchens empty')
                this.state.kitchens = []                
            }
          })
          .catch((error) => {
              console.log(` ${error}`)
          });
    }
    filter(what) {
        var value = $('#search-item-input').val();
        //$(what+' .item-parent').hide();
    
        value = value.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
    
        if (value == '') {
            $(what + ' .item-parent').show();
        } else {
            $(what + ' .item-parent:not(:contains(' + value + '))').hide();
            $(what + ' .item-parent:contains(' + value + ')').show();
        }
    }
    filterItem(itemClass)
    {
        let numOf_Items = $('.item-parent').length;
        $(".category-btn:first-child").html('All ('+numOf_Items+')');
        
            $(".category-btn").removeClass('present-btn').addClass('old-btn');
            $(this).removeClass('old-btn').addClass('present-btn');
            
            if (itemClass == 'all')
            {
                $(".item-parent").show();
                return;
            }
            $(".item-parent").hide();
            $(".item-parent-"+itemClass).show();
            if ($(".item-parent-"+itemClass).length < 1)
                toast('No Item in category');

        
    }
    _incrementItem(id, type = "plus") {

        let isUpdate = false;
        let {
            selectedItems
        } = this.state
        let initialState = selectedItems
        let newState = []

        newState = initialState.map(myObj => {
            if (myObj.id == id) {
                isUpdate = true;

                myObj.quantity = (type == "plus") ? myObj.quantity + 1 : myObj.quantity - 1
            }
            return myObj
        })
        let filteredNewState = newState.filter((object) => {
            if (object.quantity > 0) return true;
        });

        if (!isUpdate) {
            let item = {
                id: id,
                quantity: 1
            }
            initialState.push(item)
        }
        this.setState({
            selectedItems: (isUpdate) ? filteredNewState : initialState
        })




        //alert(JSON.stringify(this.state.selectedItems))
    }
    _searchUpdated(term) {
        this.setState({
            searchTerm: term
        })
    }
    
    componentDidMount()
    {
        const {plates} = this.context.store.getState()
        $('header #right').attr('data-content', `${plates.length}`);
    }
    render(){
        const {kitchen, items, loading} = this.state
        const {openNav, closeNav, createPlate} = this.context
        return(
            


            
            <div>
            
            <NavComponent closeNav={closeNav}/>
            <Header showBack={true}  title='Add Items' openNav={openNav}/>
            {(loading) ? 
            <div id="load" style={{backgroundColor:"transparent",opacity:0.9}}>
                <div id="loading-image" class="loader">
                    <svg viewBox="0 0 32 32" width="32" height="32">
                    <circle style={{color:"#FF4C00"}} id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                    </svg>
                </div>
            </div>
            :
            (items.length == 0) ? "No items here" : <KitchenItems filterItem={this.filterItem} filter={this.filter} createPlate={createPlate} kitchen={kitchen} items={items}/>}
            
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