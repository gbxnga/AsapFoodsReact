import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NavComponent from '../NavComponent'
import Header from '../presentation/Header'
import KitchensList from '../presentation/KitchensList'
import getKitchens from '../../actions/getKitchens'
import kitchens from '../../reducers/kitchens'

import ComponentWithHeader from '../componentWithHeader'

class KitchensContainer extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            kitchens: [],
            loading: true
        }
        
               
    }
    async componentDidMount()
    {
        // if kitchens list has not been loaded to store
        // call getKitchens action
        let {kitchens, plates} = this.context.store.getState()
        
        
        $('header #right').attr('data-content', `${plates.length}`);
        
        
        if (kitchens.length < 1)
        {
            const { getKitchens } = this.props
            const { user } = this.context.store.getState()
            const { auth_token } = user.details
            

            // the state should be reset after the kitchens list is feched from the sever and the store updated
            
            try {

                const kitchens = await getKitchens(auth_token)

                console.table(kitchens)
            
                this.setState({kitchens, loading:false})
            }
            catch (error){
                console.error(error)
                this.setState({kitchens:[], loading:false})
            }
                       
        }
        else  this.setState({kitchens, loading:false}) // load from store and setState*/
        
        
    }
    render(){
        //const {kitchens} = this.state
        const {openNav, closeNav} = this.context
        const {kitchens,loading} = this.state
        //if (kitchens.length > 0) this.state.loading = false;
        
        
        return(
            
            <div>
                
                <ComponentWithHeader 
                    headerTitle="Pick Kitchen"
                    Component={ () => loading ? 
                        <div id="load" style={{backgroundColor:"transparent",opacity:0.9}}>
                                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            
                        </div>
                        :
                        <KitchensList kitchens={kitchens}/>}
                />
            </div>
        )
    }

}
KitchensContainer.contextTypes = {
    store: PropTypes.object,
    openNav: PropTypes.func,
    closeNav: PropTypes.func
}
export default connect(
    (state, props) =>  { kitchens },
    dispatch =>
        ({
            getKitchens(auth_token) {
                return getKitchens(auth_token,dispatch)
            }
        })
)(KitchensContainer)
//module.exports = KitchensContainer;

