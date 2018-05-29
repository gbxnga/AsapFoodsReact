import React from 'react'
import constants from '../../constants/constants';
class Item extends React.Component
{
    constructor(props)
    {
        super(props)
        this.increase= this.increase.bind(this);
        this.decrease= this.decrease.bind(this);
    }
    increase(e) {
        //alert('increase')
        let element = e.target;
        let pay = $(element).siblings('.item-qty-val');
        let initial = pay.attr("data-val");
        let newVal = parseFloat(initial) + 1;
        pay.html(newVal).attr("data-val", newVal);
        let item_id = pay.attr("data-item-id");
        if ($(element).siblings('.input-form')) {
            $(element).siblings('.input-form').remove();
            pay.before('<input name="' + item_id + '" value="' + newVal + '" type="num" class="input-form" hidden="hidden"/>');
        }
        $(element).parents('.inner-item-con').css('border', '2px solid #FF4C00');
    }
    decrease(e){
        let element = e.target;
        let newVal;
        let pay = $(element).siblings('.item-qty-val');
        let initial = pay.attr("data-val");
        // Don't allow decrementing below zero
        if (initial > 0) {
            newVal = parseFloat(initial) - 1;
            pay.html(newVal).attr("data-val", newVal);
    
            if (newVal == "0") {
                $(element).parents('.inner-item-con').css('border', '2px solid white');
                $(element).siblings('.input-form').remove();
    
            } else {
                var item_id = pay.attr("data-item-id");
                if ($(element).siblings('.input-form')) {
                    $(element).siblings('.input-form').remove();
                    pay.before('<input name="' + item_id + '" value="' + newVal + '" type="num" class="input-form" hidden="hidden"/>');
                }
            }
        } else {
            newVal = 0;
            $(element).parents('.inner-item-con').css('border', '2px solid white');
            pay.siblings('.input-form').remove();
        } 
    }

    render(){
        const {item} = this.props
        return (
            <div className={`item-parent-${item.category} col-xs-4 col-l-4 item-parent`} style={{padding:2.5}}>
                <div className="inner-item-con has-shadow">
                    <img src={`${constants.site}/src/images/${item.image}`} style={{width:"100%"}} height="70"/>
                    <div className="price">{item.food}<span style={{float:"right"}}>&#8358;{item.price}</span></div>
                    <div className="qty">
                        <span onClick={this.decrease} className="glyphicon glyphicon-minus"></span>
                        <span data-item-id={item.id} data-val="0" className="item-qty-val">0</span>
                        <span onClick={this.increase} className="glyphicon glyphicon-plus"></span>
                    </div>
                </div>
            </div>
        )
    }

}

module.exports = Item;