import KitchenBanner from './Banner';
import Item from './Item';
import ErrorPage from '../ErrorPage';
import constants from '../../constants/constants';

const KitchenItems = ({kitchen, items, createPlate=f=>f, filter=f=>f, filterItem=f=>f, _searchUpdated=f=>f, _createPlate=f=>f, _incrementItem=f=>f, selectedItems, _filterItemsBy=f=>f, category, loading}) =>{
let _searchTerm
const ITEM_CATEGORIES = ['All', 'Swallow','Sides','Grain','Protein','Snacks','Soup','Others']

const updateSearch = () => _searchUpdated(_searchTerm.value)

return (
<div className="items-page page-container" style={{display:"block"}}>
<div className="container">
    <div className="row" style={{marginLeft:0,marginRight:0}}>
        <div id="kitchen-banner" style={{padding:0,borderRadius:10}} className="col-xs-12 col-lg-4 col-lg-offset-4">

            <KitchenBanner kitchen={kitchen}/>

        </div>
        <div className="center-block col-md-12" style={{padding:0}}>
            <div className="row">
                <div className="center-block col-md-12">

                    <input autoComplete="off" style={{fontSize:16,borderRadius:20}} id="search-item-input" className="center-block col-md-12" placeholder="Search through items.." type="text" 
                    ref={input => _searchTerm = input} 
                    onKeyUp={updateSearch
                    //onKeyUp={()=>filter('#items-div-con')
                    }
                    />
                </div>
                <div style={{marginBottom:15}} className="center-block col-md-12">
                    <span className="fa fa-filter"> Filter:</span> 
                    {ITEM_CATEGORIES.map((value) => 
                    <button onClick={() => _filterItemsBy(value)}  className="category-btn old-btn btn btn-sm" style={{marginRight:5,backgroundColor:(value == category)? '#FF4C00':'#ff824d'}}>{value}</button>
                    )
                    }
                </div>

            </div>
        </div>

        <form id="create-plate-form" onSubmit={(e)=>{e.preventDefault();_createPlate()}}>
            <input autoComplete="off" type="text" name="submit" value="create_plate" hidden="hidden" />
            <div className="row" style={{padding:7.5,float:"left",marginBottom:80,minWidth:"100%"}} id="items-div-con">
                {
                    (items.length == 0) ? 
                    <div style={{width:"110%"}}>
                    <img className="center-block" style={{marginTop:5}} width="120" height="120" src={`${constants.site}/src/icons/empty.png`}/>
                    <h3 style={{textAlign:"center"}}>Sorry! No item in category</h3>  
                    </div>:
                        items.map(item => {

                            let qty =0
                            let width = 0
                            //const {selectedItems} = this.state
                            // iterate through all selected objects in state
                            selectedItems.map(theItem => {
                                if (theItem.id == item.id )
                                {
                                    qty = theItem.quantity
                                    // it is selected 
                                    width = 2;
                                }
                            })

                            return <Item qty={qty} width={width} _incrementItem={_incrementItem} key={item.id} item={item}/>
                    
                        }
                    )
                }
            </div>
            <input autoComplete="off" id="kitchen_id" name="kitchen_id" type="text" value={kitchen.kitchen_id} hidden="hidden" />
            <div style={{width:"100%",height:100,width:"100%"}}></div>
            <div id="create-plate-form-container">
                <button style={{height:34}} className="center-block" type="submit" disabled={loading}>
                    { loading ?
                    <span>
                        <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
                        <span className="sr-only">Loading...</span>
                    </span>
                    :
                    <span>
                        <span style={{fontSize:14, fontFamily:"inherit !important"}} className="glyphicon glyphicon-plus"></span> 
                        <span>Add Items to Plate</span>
                    </span>
                    }
                </button>
            </div>
        </form>

    </div>
</div>
</div>
            )
}

module.exports = KitchenItems;