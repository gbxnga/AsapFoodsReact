import KitchenBanner from './KitchenBanner'
import Item from './Item'

const KitchenItems = ({kitchen, items, createPlate=f=>f, filter=f=>f, filterItem=f=>f}) =>
<div className="items-page page-container" style={{display:"block"}}>
<div className="container">
    <div className="row" style={{marginLeft:0,marginRight:0}}>
        <div id="kitchen-banner" style={{padding:0}} className="col-xs-12 col-lg-4 col-lg-offset-4">

            <KitchenBanner kitchen={kitchen}/>

        </div>
        <div className="center-block col-md-12" style={{padding:0}}>
            <div className="row">
                <div className="center-block col-md-12">

                    <input autoComplete="off" style={{fontSize:16,borderRadius:"none"}} id="search-item-input" className="center-block col-md-12" placeholder="Search through items.." type="text" onKeyUp={()=>filter('#items-div-con')} />
                </div>
                <div style={{marginBottom:15}} className="center-block col-md-12">
                    <span className="fa fa-filter"> Filter:</span> 
                    <button type="button" onClick={()=>filterItem('all')} style={{outline:"none",border:"none",backgroundColor:"#FF4C00",color:"white",marginRight:5}} className="present-btn category-btn btn btn-sm">All</button>
                      
                    <button onClick={()=>filterItem(this,'swallow')}  className="category-btn old-btn btn btn-sm" style={{marginRight:5}}>Swallow</button>
                    <button onClick={()=>filterItem('sides')}  className="category-btn old-btn btn btn-sm" style={{marginRight:5}}>Sides</button>
                    <button onClick={()=>filterItem('grains')}  className="category-btn old-btn btn btn-sm" style={{marginRight:5}}>Grains</button>
                    <button onClick={()=>filterItem('protein')}  className="category-btn old-btn btn btn-sm" style={{marginRight:5}}>Protein</button>
                    <button onClick={()=>filterItem('snack')}  className="category-btn old-btn btn btn-sm" style={{marginRight:5}}>Snacks</button>
                    <button onClick={()=>filterItem('soup')} className="category-btn old-btn btn btn-sm" style={{marginRight:5}}>Soup</button>
                    <button onClick={()=>filterItem('other')}  className="category-btn old-btn btn btn-sm">Others</button>
                </div>

            </div>
        </div>

        <form id="create-plate-form" onSubmit={(e)=>{e.preventDefault();createPlate()}}>
            <input autoComplete="off" type="text" name="submit" value="create_plate" hidden="hidden" />
            <div className="row" style={{padding:7.5,float:"left",marginBottom:80,minWidth:"100%"}} id="items-div-con">
                {
                    (items.length == 0) ? 
                        "No item" :
                        items.map(item => <Item key={item.id} item={item}/>)
                }
            </div>
            <input autoComplete="off" id="kitchen_id" name="kitchen_id" type="text" value={kitchen.kitchen_id} hidden="hidden" />
            <div style={{width:"100%",height:100,width:"100%"}}></div>
            <div id="create-plate-form-container">
                <button style={{height:34}} className="center-block" type="submit"><span style={{fontSize:14}} className="glyphicon glyphicon-plus"></span> Add Items to Plate</button>
            </div>
        </form>

    </div>
</div>
</div>

module.exports = KitchenItems;